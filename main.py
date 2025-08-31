# Run-Hinweise
# Install pygame: pip install pygame
# Start: python main.py
# Tasten: F1 Arena, F2 Character, F3 Skill, F4 AI, F5 Settings, ESC schliesst

import os, sys, json, random, math, time
import pygame
from dataclasses import dataclass, asdict, field
from typing import Literal, Optional, List, Dict

pygame.init()

# --- Farb-Theme ---
COLOR_BG = pygame.Color('#0e0f12')
COLOR_PANEL = pygame.Color('#16181d')
COLOR_ACCENT = pygame.Color('#3b82f6')
COLOR_SUCCESS = pygame.Color('#22c55e')
COLOR_WARN = pygame.Color('#f59e0b')
COLOR_ERROR = pygame.Color('#ef4444')
COLOR_TEXT = pygame.Color('#cfd3dc')

FONT = pygame.font.Font(None, 18)
FONT_H1 = pygame.font.Font(None, 28)
FONT_H2 = pygame.font.Font(None, 22)

DATA_DIR = 'data'
TOKENS_DIR = os.path.join(DATA_DIR, 'tokens')
LOG_DIR = os.path.join(DATA_DIR, 'logs')
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)
if not os.path.exists(TOKENS_DIR):
    os.makedirs(TOKENS_DIR)
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)
AUTOSAVE_FILE = os.path.join(DATA_DIR, 'autosave.json')

# --- Datenmodelle ---
@dataclass
class Skill:
    id: str
    name: str
    type: str
    cooldown_ms: int
    windup_ms: int = 0
    cast_ms: int = 0
    recovery_ms: int = 0
    range_px: Optional[int] = None
    energy_cost: int = 0
    params: Dict[str, float|int|bool] = field(default_factory=dict)
    anim_on_cast: List[Dict] = field(default_factory=list)
    anim_on_travel: List[Dict] = field(default_factory=list)
    anim_on_hit: List[Dict] = field(default_factory=list)
    anim_on_expire: List[Dict] = field(default_factory=list)

@dataclass
class TokenFigure:
    shape: str
    scale: float
    rotation: int = 0
    offset_x: int = 0
    offset_y: int = 0
    fill: str = 'base'
    outline: bool = True
    enabled: bool = True

@dataclass
class TokenDesign:
    size: int = 32
    palette: Dict[str, str] = field(default_factory=dict)
    main: TokenFigure = field(default_factory=lambda: TokenFigure('circle',1.0))
    top: TokenFigure = field(default_factory=lambda: TokenFigure('circle',0.5,enabled=False))
    meta: Dict = field(default_factory=dict)

    @staticmethod
    def from_dict(data):
        if isinstance(data, TokenDesign):
            return data
        main_data=data.get('main',{})
        top_data=data.get('top',{})
        main_fig=main_data if isinstance(main_data,TokenFigure) else TokenFigure(**main_data) if main_data else TokenFigure('circle',1.0)
        top_fig=top_data if isinstance(top_data,TokenFigure) else TokenFigure(**top_data) if top_data else TokenFigure('circle',0.5,enabled=False)
        return TokenDesign(
            size=data.get('size',32),
            palette=data.get('palette',{}),
            main=main_fig,
            top=top_fig,
            meta=data.get('meta',{})
        )

@dataclass
class Character:
    id: str
    name: str
    color: str
    stats: Dict[str, int]
    skills: List[str]
    ai_profile_id: str
    token: TokenDesign

    @staticmethod
    def from_dict(data):
        return Character(
            id=data['id'],
            name=data['name'],
            color=data['color'],
            stats=data['stats'],
            skills=data.get('skills', []),
            ai_profile_id=data.get('ai_profile_id',''),
            token=TokenDesign.from_dict(data.get('token', {}))
        )

@dataclass
class Rule:
    id: str
    name: str
    priority: int
    cooldown_ms: int = 0
    conditions: List[Dict] = field(default_factory=list)
    action: Dict = field(default_factory=dict)
    cooldown_until: float = 0.0

@dataclass
class AIProfile:
    id: str
    name: str
    rules: List[Rule]

# --- Storage ---
class Storage:
    def __init__(self):
        self.data = {'skills':{},'characters':{},'ai_profiles':{}}
        self.load()

    def load(self):
        if os.path.exists(AUTOSAVE_FILE):
            try:
                with open(AUTOSAVE_FILE,'r') as f:
                    self.data = json.load(f)
            except Exception:
                print('Fehler beim Laden autosave')
        if not self.data['skills']:
            self.seed_data()
            self.save()

    def save(self):
        with open(AUTOSAVE_FILE,'w') as f:
            json.dump(self.data,f,indent=2)

    def seed_data(self):
        # simple token designs
        def tdesign(shape_main, shape_top):
            return TokenDesign(32,
                {'outline':'#000000','base':'#14b8a6','accent':'#ffffff'},
                TokenFigure(shape_main,0.8,fill='base'),
                TokenFigure(shape_top,0.4,fill='accent'))
        # skills
        skills=[
            Skill('dash','Dash','dash',2000,params={'speed':5,'duration':200}),
            Skill('projectile','Projectile','projectile',1500,params={'damage':10,'speed':5,'lifetime':2000}),
            Skill('barrier','Barrier','barrier',5000,params={'duration':1500,'reduction':0.5}),
            Skill('heal','Heal','heal',5000,params={'amount':20}),
            Skill('heavySlam','Heavy Slam','heavySlam',4000,params={'damage':20}),
            Skill('stun','Stun','stun',3000,params={'stunMs':1000}),
            Skill('spreadShot','Spread Shot','spreadShot',4000,params={'count':3,'damage':5}),
            Skill('knockbackWave','Knockback Wave','knockbackWave',4000,params={'force':5}),
            Skill('regen','Regen','regen',6000,params={'amount':2,'durationMs':3000}),
            Skill('dodge','Dodge','dodge',3500,params={'duration':500}),
        ]
        for s in skills:
            self.data['skills'][s.id]=asdict(s)
        # ai profiles
        rules_aggr=[
            Rule('r1','CloseAttack',100,conditions=[{'kind':'distance_lt','value':60}],action={'kind':'attack_basic'}),
            Rule('r2','Dash',90,conditions=[{'kind':'distance_gt','value':80},{'kind':'cooldown_ready','slot':0}],action={'kind':'cast_skill','slot':0})
        ]
        rules_def=[
            Rule('r1','Barrier',100,conditions=[{'kind':'self_hp_lt','value':50},{'kind':'cooldown_ready','slot':0}],action={'kind':'cast_skill','slot':0}),
            Rule('r2','Attack',90,conditions=[{'kind':'distance_lt','value':60}],action={'kind':'attack_basic'})
        ]
        rules_heal=[
            Rule('r1','Heal',100,conditions=[{'kind':'self_hp_lt','value':70},{'kind':'cooldown_ready','slot':0}],action={'kind':'cast_skill','slot':0}),
            Rule('r2','Projectile',90,conditions=[{'kind':'cooldown_ready','slot':1}],action={'kind':'cast_skill','slot':1})
        ]
        profiles=[
            AIProfile('aggr','Aggressive',rules_aggr),
            AIProfile('def','Defensive',rules_def),
            AIProfile('heal','Healer',rules_heal)
        ]
        for p in profiles:
            self.data['ai_profiles'][p.id]={'id':p.id,'name':p.name,'rules':[asdict(r) for r in p.rules]}
        # characters
        c1=Character('scout','Scout','#14b8a6',{'hp':100,'atk':10,'def':5,'spd':2},['dash','projectile','heal'],'aggr',tdesign('circle','triangleUp'))
        c2=Character('tank','Tank','#a3e635',{'hp':150,'atk':8,'def':8,'spd':1},['barrier','heavySlam','regen'],'def',tdesign('hex','square'))
        for c in [c1,c2]:
            self.data['characters'][c.id]=asdict(c)

storage=Storage()

# --- Token Rendering ---
def draw_shape(surface,figure:TokenFigure,palette):
    color=pygame.Color(palette['base'] if figure.fill=='base' else palette.get('accent',palette['base']))
    size=surface.get_width()
    r=figure.scale*size/2
    cx=surface.get_width()/2+figure.offset_x
    cy=surface.get_height()/2+figure.offset_y
    pts=[]
    if figure.shape=='circle':
        pygame.draw.circle(surface,color,(cx,cy),r)
        if figure.outline:
            pygame.draw.circle(surface,pygame.Color(palette['outline']),(cx,cy),r,2)
        return
    elif figure.shape=='square':
        pts=[(cx-r,cy-r),(cx+r,cy-r),(cx+r,cy+r),(cx-r,cy+r)]
    elif figure.shape=='diamond':
        pts=[(cx,cy-r),(cx+r,cy),(cx,cy+r),(cx-r,cy)]
    elif figure.shape=='triangleUp':
        pts=[(cx,cy-r),(cx+r,cy+r),(cx-r,cy+r)]
    elif figure.shape=='triangleDown':
        pts=[(cx-r,cy-r),(cx+r,cy-r),(cx,cy+r)]
    elif figure.shape=='hex':
        for i in range(6):
            ang=math.radians(60*i+figure.rotation)
            pts.append((cx+r*math.cos(ang),cy+r*math.sin(ang)))
    if figure.rotation and pts:
        rad=math.radians(figure.rotation)
        pts=[(cx+(x-cx)*math.cos(rad)-(y-cy)*math.sin(rad), cy+(x-cx)*math.sin(rad)+(y-cy)*math.cos(rad)) for x,y in pts]
    pygame.draw.polygon(surface,color,pts)
    if figure.outline:
        pygame.draw.polygon(surface,pygame.Color(palette['outline']),pts,2)

def render_token(design:TokenDesign):
    surf=pygame.Surface((design.size,design.size),pygame.SRCALPHA)
    draw_shape(surf,design.main,design.palette)
    if design.top.enabled:
        draw_shape(surf,design.top,design.palette)
    return surf

# --- UI Basisklassen ---
class Button:
    def __init__(self,rect,text,callback):
        self.rect=pygame.Rect(rect)
        self.text=text
        self.callback=callback
        self.hover=False
    def draw(self,surf):
        color=COLOR_ACCENT if self.hover else COLOR_PANEL
        pygame.draw.rect(surf,color,self.rect)
        label=FONT.render(self.text,True,COLOR_TEXT)
        surf.blit(label,label.get_rect(center=self.rect.center))
    def handle(self,event):
        if event.type==pygame.MOUSEMOTION:
            self.hover=self.rect.collidepoint(event.pos)
        if event.type==pygame.MOUSEBUTTONDOWN and self.hover:
            self.callback()

class TabBar:
    def __init__(self,tabs):
        self.tabs=tabs
        self.current=0
    def draw(self,surf):
        for i,(name,_) in enumerate(self.tabs):
            rect=pygame.Rect(i*120,0,120,30)
            pygame.draw.rect(surf,COLOR_ACCENT if i==self.current else COLOR_PANEL,rect)
            label=FONT.render(name,True,COLOR_TEXT)
            surf.blit(label,label.get_rect(center=rect.center))
    def handle_click(self,pos):
        for i in range(len(self.tabs)):
            rect=pygame.Rect(i*120,0,120,30)
            if rect.collidepoint(pos):
                self.current=i
                break

# --- Arena ---
class Fighter:
    def __init__(self,character:Character,x,y):
        self.char=character if isinstance(character,Character) else Character.from_dict(character)
        self.char.token=TokenDesign.from_dict(self.char.token)
        self.x=x
        self.y=y
        self.vx=0
        self.vy=0
        self.hp=self.char.stats['hp']
        self.cooldowns={'basic':0}
        for i,sk in enumerate(self.char.skills):
            self.cooldowns[str(i)]=0
        self.token_img=render_token(self.char.token)
        self.radius=16
        self.stunned_until=0
        self.barrier_until=0
        self.regen_until=0
        self.regen_amount=0

    def update(self,dt,enemy,log):
        now=pygame.time.get_ticks()
        for k in list(self.cooldowns.keys()):
            if self.cooldowns[k]>0:
                self.cooldowns[k]-=dt
        if self.regen_until>now:
            self.hp=min(self.char.stats['hp'],self.hp+self.regen_amount*dt/1000)
        if self.stunned_until>now:
            return
        self.x+=self.vx*dt/16
        self.y+=self.vy*dt/16
        self.vx*=0.9
        self.vy*=0.9
        self.ai_decide(enemy,log)

    def ai_decide(self,enemy,log):
        profile=storage.data['ai_profiles'][self.char.ai_profile_id]
        rules=sorted([Rule(**r) for r in profile['rules']],key=lambda r:-r.priority)
        for r in rules:
            now=pygame.time.get_ticks()
            if r.cooldown_until>now:
                continue
            if self.eval_conditions(r.conditions,enemy):
                self.execute_action(r.action,enemy,log)
                r.cooldown_until=now+r.cooldown_ms
                break
        else:
            self.move_towards(enemy,0.3)

    def eval_conditions(self,conds,enemy):
        for c in conds:
            k=c['kind']
            if k=='distance_lt' and self.distance(enemy)>=c['value']:
                return False
            if k=='distance_gt' and self.distance(enemy)<=c['value']:
                return False
            if k=='self_hp_lt' and self.hp>=self.char.stats['hp']*c['value']/100:
                return False
            if k=='cooldown_ready':
                slot=str(c['slot']) if c['slot']!='basic' else 'basic'
                if self.cooldowns.get(slot,0)>0:
                    return False
            if k=='always':
                continue
        return True

    def distance(self,enemy):
        return math.hypot(self.x-enemy.x,self.y-enemy.y)

    def execute_action(self,action,enemy,log):
        kind=action['kind']
        if kind=='move_towards':
            self.move_towards(enemy,action.get('intensity',1))
        elif kind=='move_away':
            self.move_away(enemy,action.get('intensity',1))
        elif kind=='attack_basic':
            self.basic_attack(enemy,log)
        elif kind=='cast_skill':
            slot=str(action['slot'])
            self.cast_skill(int(slot),enemy,log)
        elif kind=='idle':
            pass

    def move_towards(self,enemy,intensity):
        ang=math.atan2(enemy.y-self.y,enemy.x-self.x)
        spd=self.char.stats['spd']*intensity
        self.vx+=math.cos(ang)*spd
        self.vy+=math.sin(ang)*spd

    def move_away(self,enemy,intensity):
        ang=math.atan2(self.y-enemy.y,self.x-enemy.x)
        spd=self.char.stats['spd']*intensity
        self.vx+=math.cos(ang)*spd
        self.vy+=math.sin(ang)*spd

    def basic_attack(self,enemy,log):
        if self.cooldowns['basic']>0:
            return
        if self.distance(enemy)<40:
            dmg=max(1,self.char.stats['atk']-enemy.char.stats['def'])
            enemy.take_damage(dmg,log,self.char.name)
            log.append({'t':'attack','ts':pygame.time.get_ticks(),'actor':self.char.name,'target':enemy.char.name,'dmg':dmg})
            self.cooldowns['basic']=800

    def cast_skill(self,slot,enemy,log):
        if slot>=len(self.char.skills):
            return
        sid=self.char.skills[slot]
        skill=Skill(**storage.data['skills'][sid])
        key=str(slot)
        if self.cooldowns.get(key,0)>0:
            return
        if skill.type=='dash':
            ang=math.atan2(enemy.y-self.y,enemy.x-self.x)
            self.vx+=math.cos(ang)*skill.params.get('speed',5)*5
            self.vy+=math.sin(ang)*skill.params.get('speed',5)*5
        elif skill.type=='projectile':
            dmg=skill.params.get('damage',5)
            Projectile(self,self.x,self.y,enemy,dmg)
        elif skill.type=='barrier':
            self.barrier_until=pygame.time.get_ticks()+skill.params.get('duration',1000)
        elif skill.type=='heal':
            amt=skill.params.get('amount',10)
            self.hp=min(self.char.stats['hp'],self.hp+amt)
            log.append({'t':'heal','ts':pygame.time.get_ticks(),'actor':self.char.name,'amount':amt})
        elif skill.type=='heavySlam':
            if self.distance(enemy)<50:
                dmg=skill.params.get('damage',15)
                enemy.take_damage(dmg,log,self.char.name)
        elif skill.type=='stun':
            if self.distance(enemy)<40:
                enemy.stunned_until=pygame.time.get_ticks()+skill.params.get('stunMs',1000)
        elif skill.type=='spreadShot':
            for i in [-0.2,0,0.2]:
                Projectile(self,self.x,self.y,enemy,skill.params.get('damage',5),spread=i)
        elif skill.type=='knockbackWave':
            if self.distance(enemy)<80:
                ang=math.atan2(enemy.y-self.y,enemy.x-self.x)
                enemy.vx+=math.cos(ang)*skill.params.get('force',5)
                enemy.vy+=math.sin(ang)*skill.params.get('force',5)
        elif skill.type=='regen':
            self.regen_until=pygame.time.get_ticks()+skill.params.get('durationMs',2000)
            self.regen_amount=skill.params.get('amount',1)
        elif skill.type=='dodge':
            self.barrier_until=pygame.time.get_ticks()+skill.params.get('duration',500)
        log.append({'t':'skill','ts':pygame.time.get_ticks(),'actor':self.char.name,'name':skill.name})
        self.cooldowns[key]=skill.cooldown_ms

    def take_damage(self,amount,log,source):
        now=pygame.time.get_ticks()
        if self.barrier_until>now:
            amount*=0.5
        self.hp-=amount
        if self.hp<=0:
            self.hp=0
            log.append({'t':'status','ts':now,'msg':f'{self.char.name} defeated by {source}'})

    def draw(self,surf):
        surf.blit(self.token_img,(self.x-self.radius,self.y-self.radius))
        if self.barrier_until>pygame.time.get_ticks():
            pygame.draw.circle(surf,COLOR_ACCENT,(self.x,self.y),self.radius+4,2)

# Projectiles managed globally
projectiles=[]
class Projectile:
    def __init__(self,owner,x,y,target,damage,spread=0):
        self.owner=owner
        self.x=x
        self.y=y
        self.damage=damage
        ang=math.atan2(target.y-y,target.x-x)+spread
        self.vx=math.cos(ang)*5
        self.vy=math.sin(ang)*5
        self.alive=True
        projectiles.append(self)
    def update(self,dt,enemy,log):
        if not self.alive:
            return
        self.x+=self.vx*dt/16
        self.y+=self.vy*dt/16
        if math.hypot(self.x-enemy.x,self.y-enemy.y)<20:
            enemy.take_damage(self.damage,log,self.owner.char.name)
            log.append({'t':'attack','ts':pygame.time.get_ticks(),'actor':self.owner.char.name,'target':enemy.char.name,'dmg':self.damage})
            self.alive=False
    def draw(self,surf):
        if self.alive:
            pygame.draw.circle(surf,COLOR_ACCENT,(int(self.x),int(self.y)),4)

# --- Kampf-Log ---
class CombatLog:
    def __init__(self):
        self.entries=[]
        self.max_entries=200
    def append(self,e):
        self.entries.append(e)
        if len(self.entries)>self.max_entries:
            self.entries=self.entries[-self.max_entries:]
    def draw(self,surf,rect):
        pygame.draw.rect(surf,COLOR_PANEL,rect)
        y=rect.y+4
        for e in self.entries[-10:]:
            txt=json.dumps(e)
            surf.blit(FONT.render(txt,True,COLOR_TEXT),(rect.x+4,y))
            y+=16

combat_log=CombatLog()

# --- Tabs ---
TAB_ARENA=0
TAB_CHAR=1
TAB_SKILL=2
TAB_AI=3
TAB_SETTINGS=4

# --- App ---
class App:
    def __init__(self):
        self.screen=pygame.display.set_mode((960,600))
        pygame.display.set_caption('Arena')
        self.clock=pygame.time.Clock()
        self.running=True
        self.tabbar=TabBar([
            ('Arena',TAB_ARENA),('Character',TAB_CHAR),('Skill',TAB_SKILL),('AI',TAB_AI),('Settings',TAB_SETTINGS)
        ])
        self.current_tab=TAB_ARENA
        self.arena=Arena()
    def run(self):
        while self.running:
            dt=self.clock.tick(60)
            for event in pygame.event.get():
                if event.type==pygame.QUIT:
                    self.running=False
                elif event.type==pygame.KEYDOWN:
                    if event.key==pygame.K_ESCAPE:
                        self.running=False
                    if event.key==pygame.K_F1: self.current_tab=TAB_ARENA
                    if event.key==pygame.K_F2: self.current_tab=TAB_CHAR
                    if event.key==pygame.K_F3: self.current_tab=TAB_SKILL
                    if event.key==pygame.K_F4: self.current_tab=TAB_AI
                    if event.key==pygame.K_F5: self.current_tab=TAB_SETTINGS
                elif event.type==pygame.MOUSEBUTTONDOWN and event.pos[1]<30:
                    self.tabbar.handle_click(event.pos)
                    self.current_tab=self.tabbar.current
            self.screen.fill(COLOR_BG)
            self.tabbar.current=self.current_tab
            self.tabbar.draw(self.screen)
            rect=pygame.Rect(0,30,960,540)
            if self.current_tab==TAB_ARENA:
                self.arena.update(dt)
                self.arena.draw(self.screen.subsurface(rect))
            elif self.current_tab==TAB_CHAR:
                self.draw_placeholder(rect,'Character Editor coming soon')
            elif self.current_tab==TAB_SKILL:
                self.draw_placeholder(rect,'Skill Editor coming soon')
            elif self.current_tab==TAB_AI:
                self.draw_placeholder(rect,'AI Editor coming soon')
            elif self.current_tab==TAB_SETTINGS:
                self.draw_placeholder(rect,'Settings coming soon')
            pygame.display.flip()
        storage.save()
        pygame.quit()
    def draw_placeholder(self,rect,text):
        surf=self.screen.subsurface(rect)
        pygame.draw.rect(surf,COLOR_PANEL,surf.get_rect())
        label=FONT_H1.render(text,True,COLOR_TEXT)
        surf.blit(label,label.get_rect(center=surf.get_rect().center))

class Arena:
    def __init__(self):
        chars=[Character.from_dict(c) for c in storage.data['characters'].values()]
        self.f1=Fighter(chars[0],120,270)
        self.f2=Fighter(chars[1],840,270)
        self.paused=False
        self.start_time=pygame.time.get_ticks()
    def reset(self):
        self.__init__()
    def update(self,dt):
        if self.paused:
            return
        self.f1.update(dt,self.f2,combat_log)
        self.f2.update(dt,self.f1,combat_log)
        for p in projectiles[:]:
            p.update(dt,self.f2 if p.owner is self.f1 else self.f1,combat_log)
            if not p.alive:
                projectiles.remove(p)
    def draw(self,surf):
        surf.fill(COLOR_BG)
        self.f1.draw(surf)
        self.f2.draw(surf)
        for p in projectiles:
            p.draw(surf)
        # HP bars
        pygame.draw.rect(surf,COLOR_PANEL,(20,20,200,10))
        pygame.draw.rect(surf,COLOR_SUCCESS,(20,20,200*self.f1.hp/self.f1.char.stats['hp'],10))
        pygame.draw.rect(surf,COLOR_PANEL,(740,20,200,10))
        pygame.draw.rect(surf,COLOR_SUCCESS,(740+200-200*self.f2.hp/self.f2.char.stats['hp'],20,200*self.f2.hp/self.f2.char.stats['hp'],10))
        # combat log
        combat_log.draw(surf,pygame.Rect(20,400,920,120))

def main():
    App().run()

if __name__=='__main__':
    main()
