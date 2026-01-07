🗺️ MAP GENERATOR SKILL

**Cross-References:**
- Bewegung/Kino-Logik: Regelwerk §3.3
- Zustände: Regelwerk §4.4
- State-Tracking Schema: STATE_TRACKING_JSON.md
- DM-Anweisungen: DUNGEON_MASTER_PROMPT_v3_2.md

---

**KRITISCHE REGELN:**

✅ **MAP IMMER IM CHAT UND IMMER IM CODEBLOCK**
✅ **LEGENDE IMMER UNTER DER KARTE ABER AUßERHALB DEM CODEBLOCK**
✅ **Eine Map = Eine Location im Registry**
✅ **CURRENT_LOCATION zeigt aktive Map**
✅ **Static Layer = UNVERÄNDERT nach Erstellung**
✅ **Updates nur über update_current_location()**
✅ **Alle Locations bleiben parallel gespeichert**
✅ **Wechsel = kein Datenverlust**
✅ **Nur Symbole aus Symbol-Bank!**
✅ **BAUREGELN: Alle Zugangspunkte (Türen, Treppen, Leitern, Durchgänge, Fenster) müssen beim Erstellen des Static Layers eingeplant werden!**

---

## ⚠️ KOORDINATEN = NUR VISUALISIERUNG (Siehe Regelwerk §3.3)

**Koordinaten dienen AUSSCHLIESSLICH der Kartenvisualisierung:**
- Positionen auf der Karte darstellen
- Übersicht wer wo steht
- Sichtlinien verdeutlichen

**Koordinaten werden NICHT verwendet für:**
- Bewegungsreichweiten berechnen
- Distanzen in Feldern zählen
- Mechanische Einschränkungen

**Bewegung folgt KINO-LOGIK (Regelwerk §3.3):**
- SL entscheidet ob Bewegung narrativ plausibel ist
- Keine Feldzählung, keine Reichweiten
- Karte wird entsprechend der Narration aktualisiert


═══════════════════════════════════════════════════════════════════════════════

## ÜBERSICHT

Dieser Skill erstellt persistente ASCII-Maps für Dungeons & Decisions mit:
- **Multi-Location System**: Mehrere Karten parallel speichern und wechseln
- **State Management**: Maps werden EINMAL erstellt, dann nur aktualisiert
- **Layer-System**: Static (Terrain) + Semi-Static (Interaktive Objekte) + Dynamic (Charaktere)
- **Intelligente Updates**: Positionen werden aus Spielsituation extrahiert und aktualisiert
- **Kontextuelle Fragen**: Automatische Analyse für optimale Kartenerstellung

═══════════════════════════════════════════════════════════════════════════════

## 📚 SYMBOL-BIBLIOTHEK (ZENTRAL & EDITIERBAR)

### ⚠️ ABSOLUTE REGEL: NUR DIESE SYMBOLE VERWENDEN!

TERRAIN (Grundflächen)
▪️  Boden/Leer/Void (begehbar)
⬜  Außenwände (geschlossene Strukturen)
◽  Innenwände (Raumtrenner)
▫️  Zäune/niedrige Barrieren
🔸  Grasland/Steinboden/Sand (begehbar)
🔶  Acker (begehbar mit Malus)
📗  Rasen/Grass (Begehbar)
🔹  Flaches Wasser (begehbar mit Malus)
🔷  Tiefes Wasser (nicht begehbar)
🟫  (weiss noch nicht)
🟧  Straße/Weg ← NUR für Straßen!
🟩  Sumpf/Toxische Pfütze/Giftiges Wasser (schwieriges Terrain)
⬛  Abgrund/Grube
🕳️  Loch

VEGETATION
🌲  Nadelbaum (Deckung)
🌳  Laubbaum (Deckung)
🌴  Palme
🌿  Büsche (halbe Deckung)
🪴  Topfpflanze (Innenraum)
🌱  Gartenpflanzen (Außenbereich)
🍄  Pilze
🌾  Gras/Getreide
🌹  Blume
🥀  Tote Pflanzen
🌵  Kaktus

STRUKTUREN & MÖBEL
🔳  Tisch/schweres Möbel/Barrikade (Deckung)
🪑  Stuhl (kein Hindernis)
🛏️  Bett
📁  Kiste/Box (Deckung)
🗄️  Schrank (Deckung)
🪜  Leiter
🚪  Geschlossene Tür
🪟  Fenster
🧱  Säule/Steinstruktur (Deckung)
⛩️  Tor/Portal
🗿  Statue (Deckung)
⚰️  Sarg
🪦  Grabstein
⛲  Fontäne
⚖️  Wage
🛁  Wanne
⭐  Heiliger Altar
🔔  Alarm/Glocke
🪨  Felsen (Deckung)
🪵  Holz/Baumstamm
⛺️  Zelt

INTERAKTIVE ELEMENTE
➡️  Durchgang/Tür Ost
⬅️  Durchgang/Tür West
⬆️  Durchgang/Tür Nord
⬇️  Durchgang/Tür Süd
⤴️  Treppe aufwärts
⤵️  Treppe abwärts
🚫  Blockiert/Versperrt
🔒  Verschlossen (braucht Schlüssel)
🔓  Geöffnet
⚙️  Mechanismus/Hebel
⭕  Ziel/Markierung

GEFAHREN & EFFEKTE
🔥  Feuer (Schaden)
💥  Explosion
⚡  Blitz/Elektrizität
❄️  Eis/Kälte
☠️  Gift/Gefahr
🕸️  Spinnweben (schwieriges Terrain)
💨  Wind/Luftzug
🌊  Wellen/Strömung
🕯️  Kerze/Fackel (Licht)
💡  Laterne/Lichtquelle
🔆  Helles Licht

CHARAKTERE & KREATUREN
🟢  Spieler (Hauptcharakter)
🟡  Begleiter/Verbündeter
🔵  Begleiter/Verbündeter
⚪  Neutraler NPC
🔴  Boss/Elite-Gegner
♦️  Feind A (schwach)
🛑  Feind B (schwach)
🟥  Feind (mittel/stark)
🐺  Tier (Wolf, Hund)
🐈  Tier (Katze)
🐍  Tier (Schlange)
🐖  Tier (Schwein)
🐑  Tier (Schaf)
🐴  Tier (Pferd)
🦜  Tier (Papagei)
🦆  Tier (Ente)
🐙  Tier (Oktopus)
🐉  Drache/große Kreatur
🕷️  Spinne/Insekt
👤  Humanoid/Person
💀  Skelett/Untot
👻  Geist/Phantom
👹  Dämon/Monster
🤖  Konstrukt/Golem

ITEMS & SCHÄTZE
💰  Goldmünzen/Schatz
💎  Edelstein/wertvoll
🗝️  Schlüssel
📜  Schriftrolle/Dokument
📖  Buch
🗡️  Schwert/Waffe
⚔️  Gekreuzte Waffen
🛡️  Schild
🏹  Bogen/Fernwaffe
🔪  Dolch
🪓  Axt
🔨  Hammer/Werkzeug
⚗️  Trank/Flasche
🧪  Gift/Chemikalien
🥩  Fleisch/Proviant
🍞  Brot/Essen
🍺  Bier/Getränk
💊  Heilung/Medizin
🎒  Rucksack/Tasche
🧰  Werkzeugkiste

MAGISCH & MYSTISCH
✨  Magie/Glitzer
🔮  Kristallkugel
💫  Magischer Effekt
🌟  Leuchtender Stern
🔯  Magisches Symbol
㊗️  Rune
🎴  Karte/Tarot
⚱️  Magische Urne

SONSTIGES
❓  Unbekannt/Geheimnis
❗  Wichtig/Achtung
⁉️  Besonders wichtig
📍  Markierung/Position
🎲  Zufall/Event
🕐  Zeit/Timer
📢  Laut/Geräusch
👁️  Beobachtung/Sicht

═══════════════════════════════════════════════════════════════════════════════

## 🗂️ MULTI-LOCATION REGISTRY SYSTEM

### GLOBALE STRUKTUR

```python
# ZENTRALE LOCATION-VERWALTUNG
LOCATION_REGISTRY = {
    'verlassene_taverne': {
        'meta': {...},
        'static': {...},
        'semi_static': {...},
        'dynamic': {...}
    },
    'steinbruecke_im_wald': {
        'meta': {...},
        'static': {...},
        'semi_static': {...},
        'dynamic': {...}
    },
    # ... weitere Locations
}

# AKTUELL AKTIVE LOCATION
CURRENT_LOCATION = 'verlassene_taverne'  # Location-ID!

# ⚠️ WICHTIG: Zugriff IMMER über Registry!
current_map = LOCATION_REGISTRY[CURRENT_LOCATION]
```

### LOCATION-ID GENERIERUNG

```python
def generate_location_id(location_name):
    """
    Erstellt eindeutige ID aus Location-Name.
    
    Regeln:
    - Kleinbuchstaben
    - Leerzeichen → Unterstrich
    - Umlaute ersetzen (ä→ae, ö→oe, ü→ue, ß→ss)
    - Nur Buchstaben, Zahlen, Unterstrich
    - Bei Duplikaten: Nummerierung (_2, _3, etc.)
    
    Beispiele:
    "Verlassene Taverne" → "verlassene_taverne"
    "Steinbrücke im Wald" → "steinbruecke_im_wald"
    "Taverne" (zweite) → "taverne_2"
    """
    location_id = location_name.lower()
    
    # Umlaute
    replacements = {
        'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss',
        ' ': '_', '-': '_'
    }
    for old, new in replacements.items():
        location_id = location_id.replace(old, new)
    
    # Nur erlaubte Zeichen
    import re
    location_id = re.sub(r'[^a-z0-9_]', '', location_id)
    
    # Eindeutigkeit sicherstellen
    if location_id in LOCATION_REGISTRY:
        counter = 2
        while f"{location_id}_{counter}" in LOCATION_REGISTRY:
            counter += 1
        location_id = f"{location_id}_{counter}"
    
    return location_id
```

### NEUE LOCATION ERSTELLEN

```python
def create_new_location(location_name, map_state):
    """
    Erstellt neue Location und speichert sie im Registry.
    Setzt sie automatisch als aktuelle Location.
    
    Args:
        location_name (str): Name der Location
        map_state (dict): Kompletter MAP_STATE
    
    Returns:
        str: Location-ID
    """
    global CURRENT_LOCATION
    
    # 1. Eindeutige ID generieren
    location_id = generate_location_id(location_name)
    
    # 2. In Registry speichern
    LOCATION_REGISTRY[location_id] = map_state
    
    # 3. Als aktuelle Location setzen
    CURRENT_LOCATION = location_id
    
    print(f"✅ Neue Location '{location_name}' erstellt")
    print(f"   ID: {location_id}")
    print(f"📍 Jetzt aktiv: {location_name}")
    
    return location_id
```

### ZWISCHEN LOCATIONS WECHSELN

```python
def switch_location(location_identifier):
    """
    Wechselt zur angegebenen Location.
    
    Args:
        location_identifier: Location-ID oder Name
    
    Returns:
        bool: True wenn erfolgreich, False wenn nicht gefunden
    """
    global CURRENT_LOCATION
    
    # Versuche zuerst als ID
    if location_identifier in LOCATION_REGISTRY:
        old_location = get_current_location_name()
        CURRENT_LOCATION = location_identifier
        new_location = get_current_location_name()
        print(f"📍 Wechsel: {old_location} → {new_location}")
        return True
    
    # Versuche als Name
    location_id = generate_location_id(location_identifier)
    if location_id in LOCATION_REGISTRY:
        old_location = get_current_location_name()
        CURRENT_LOCATION = location_id
        new_location = get_current_location_name()
        print(f"📍 Wechsel: {old_location} → {new_location}")
        return True
    
    # Nicht gefunden
    print(f"❌ Location '{location_identifier}' nicht gefunden!")
    print(f"\n📚 Verfügbare Locations:")
    list_all_locations()
    return False
```

### LOCATION-VERWALTUNG

```python
def list_all_locations():
    """Zeigt alle gespeicherten Locations mit Status."""
    if not LOCATION_REGISTRY:
        print("⚠️ Keine Locations gespeichert!")
        return
    
    print("\n📚 GESPEICHERTE LOCATIONS:\n")
    for location_id, map_data in LOCATION_REGISTRY.items():
        name = map_data['meta']['location_name']
        last_update = map_data['meta']['last_updated']
        size = map_data['meta']['size']
        
        is_current = " ← AKTUELL" if location_id == CURRENT_LOCATION else ""
        
        print(f"  • {name}")
        print(f"    ID: {location_id}")
        print(f"    Größe: {size[0]}x{size[1]} | Update: {last_update}{is_current}")
    
    print(f"\n📍 Aktuell aktiv: {get_current_location_name()}\n")

def get_current_location_name():
    """Gibt Namen der aktuellen Location zurück."""
    if CURRENT_LOCATION in LOCATION_REGISTRY:
        return LOCATION_REGISTRY[CURRENT_LOCATION]['meta']['location_name']
    return "KEINE"

def get_current_map():
    """Gibt aktuellen MAP_STATE zurück."""
    return LOCATION_REGISTRY[CURRENT_LOCATION]

def location_exists(location_identifier):
    """Prüft ob Location existiert (ID oder Name)."""
    if location_identifier in LOCATION_REGISTRY:
        return True
    location_id = generate_location_id(location_identifier)
    return location_id in LOCATION_REGISTRY
```

### SICHERE UPDATE-FUNKTION

```python
def update_current_location(parsed_updates):
    """
    Aktualisiert NUR die aktuell aktive Location.
    ⚠️ WICHTIG: Andere Locations bleiben unberührt!
    
    Args:
        parsed_updates (dict): Updates aus parse_game_situation()
    
    Returns:
        dict: Aktualisierter MAP_STATE
    """
    # Hole aktuelle Location
    current_map = LOCATION_REGISTRY[CURRENT_LOCATION]
    
    # Update durchführen (siehe update_state() Funktion)
    updated_map = update_state(parsed_updates, current_map)
    
    # Zurück in Registry speichern
    LOCATION_REGISTRY[CURRENT_LOCATION] = updated_map
    
    location_name = get_current_location_name()
    print(f"✅ '{location_name}' aktualisiert")
    
    return updated_map

# ⚠️ NIEMALS direkt MAP_STATE ändern! Immer update_current_location() nutzen!
```

### LOCATION LÖSCHEN (Optional)

```python
def delete_location(location_id):
    """
    Löscht eine Location aus dem Registry.
    Aktive Location kann nicht gelöscht werden!
    """
    if location_id == CURRENT_LOCATION:
        print(f"❌ Kann aktuell aktive Location nicht löschen!")
        print(f"Wechsle erst zu einer anderen Location.")
        return False
    
    if location_id in LOCATION_REGISTRY:
        name = LOCATION_REGISTRY[location_id]['meta']['location_name']
        del LOCATION_REGISTRY[location_id]
        print(f"🗑️ Location '{name}' (ID: {location_id}) gelöscht")
        return True
    
    print(f"❌ Location '{location_id}' nicht gefunden")
    return False
```

═══════════════════════════════════════════════════════════════════════════════

## 🎯 STATE MANAGEMENT SYSTEM (Pro Location)

### MAP STATE STRUKTUR

Jede Location in LOCATION_REGISTRY hat diese Struktur:

```python
MAP_STATE = {
    'meta': {
        'location_name': str,       # "Verlassene Taverne"
        'location_id': str,          # "verlassene_taverne"
        'created_at': str,           # "Turn 1"
        'last_updated': str,         # "Turn 5"
        'size': (width, height),     # (15, 10)
        'map_type': str,             # 'interior' / 'exterior_simple' / 'exterior_detailed'
        'setting': str               # 'tavern_abandoned' / 'forest' / etc.
    },
    
    'static': {
        'terrain': {
            (x, y): symbol,  # Boden, Wasser, Gras - ÄNDERT SICH NIE!
        },
        'structures': {
            (x, y): symbol,  # Wände, Brücken, Brunnen - ÄNDERT SICH NIE!
        },
        'decoration': {
            (x, y): symbol,  # Bäume, Büsche, Felsen - ÄNDERT SICH NIE!
        }
    },
    
    'semi_static': {
        'doors': {
            (x, y): {
                'symbol': '🚪',
                'state': 'closed',  # 'closed' / 'open' / 'locked'
                'locked': False
            }
        },
        'containers': {
            (x, y): {
                'symbol': '📦',
                'looted': False,
                'contents': str
            }
        },
        'destructibles': {
            (x, y): {
                'symbol': '🔳',
                'destroyed': False
            }
        },
        'mechanisms': {
            (x, y): {
                'symbol': '⚙️',
                'activated': False
            }
        }
    },
    
    'dynamic': {
        'entities': {
            'entity_name': {
                'pos': (x, y),
                'symbol': str,
                'type': 'player' / 'ally' / 'enemy' / 'npc',
                'alive': True
            }
        },
        'effects': {
            (x, y): {
                'symbol': str,
                'type': str,
                'duration': int  # 0 = permanent
            }
        }
    }
}
```

### LAYER-PRIORITÄT (beim Rendern)

```
Ebene 1 (unten):  STATIC TERRAIN     → Grundfläche
Ebene 2:          STATIC STRUCTURES  → Gebäude, Brücken
Ebene 3:          STATIC DECORATION  → Bäume, Felsen
Ebene 4:          SEMI_STATIC        → Türen, Kisten
Ebene 5:          DYNAMIC EFFECTS    → Feuer, Magie
Ebene 6 (oben):   DYNAMIC ENTITIES   → Charaktere (überschreibt ALLES!)
```

═══════════════════════════════════════════════════════════════════════════════

## 📋 PHASE 1: KONTEXT-ANALYSE (Bei neuer Location)

### SCHRITT 1.1: MAP-TYP ERKENNEN

Analysiere die Spielsituation:

**FRAGE 1: Welcher Map-Typ?**

□ **INTERIOR (Innenraum)**
  - Nur Gebäude-Inneres
  - Beispiel: "Die Taverne", "Der Thronsaal"
  
□ **EXTERIOR_SIMPLE (Außenbereich mit vereinfachten Gebäuden)**
  - Dorfansicht, Gebäude als geschlossene Blöcke
  - Beispiel: "Das Dorf", "Der Marktplatz"
  
□ **EXTERIOR_DETAILED (Außenbereich mit detailliertem Innenraum)**
  - Außenbereich + Gebäude aufgeschnitten
  - Beispiel: "Der Gutshof"

**FRAGE 2 (nur bei INTERIOR): Darstellungsart?**

□ **QUADRATISCH**: Wände = Kartenrand
□ **FREIE FORM**: Gebäude schwebt in Void (▪️)

### SCHRITT 1.2: TERRAIN-ANALYSE

**Primäres Terrain (40-60%):**
□ ▪️  Boden/Leer/Void
□ 🔸 Grasland/Feld/Sand
□ 🔹🔷 Wasser
□ 🌲🌳 Wald
□ 🟩 Sumpf
□ ⬛ Gebirge

**Sekundäres Terrain (10-30%):**
□ 🟧 Straßen/Wege
□ 🌿 Büsche
□ 🪨 Felsen

### SCHRITT 1.3: SETTING & ATMOSPHÄRE

**Setting:**
- Taverne/Gasthaus
- Dorf/Stadt
- Wald/Wildnis
- Dungeon/Krypta
- Tempel/Schrein
- Ruine/Verlassen

**Atmosphäre:**
- Belebt (🕯️🔥👤)
- Verlassen (🥀🕸️💀)
- Gefährlich (☠️🔥⚡)
- Magisch (✨💫⭐)
- Natürlich (🌿🍄🌱)

═══════════════════════════════════════════════════════════════════════════════

## 🏗️ PHASE 2: INITIALE MAP-ERSTELLUNG (Nur beim ERSTEN Mal!)

### WORKFLOW-ÜBERSICHT

```python
# 1. Spielsituation analysieren
game_text = "Coru betritt eine verlassene Taverne..."

# 2. Kontext-Fragen beantworten (intern oder explizit)
map_type = 'interior'
terrain_primary = '▪️'  # Holzboden
setting = 'tavern_abandoned'

# 3. Initial Map State erstellen
map_state = create_initial_map_state(
    location_name="Verlassene Taverne",
    map_type=map_type,
    size=(15, 10),
    # ... weitere Parameter
)

# 4. Location im Registry speichern
location_id = create_new_location("Verlassene Taverne", map_state)

# 5. Map rendern und anzeigen
render_current_map()
```

### SCHRITT 2.1: GRID-GRÖSSE FESTLEGEN

**KLEIN** (10x10 - 12x12): Einzelner Raum, 1-3 Charaktere
**MITTEL** (15x10 - 15x15): Taverne/Laden, 3-6 Charaktere
**GROSS** (20x15 - 20x20): Dorf/Gutshof, 6-10 Charaktere
**SEHR GROSS** (25x20+): Schlachtfeld/Festung, 10+ Charaktere

### SCHRITT 2.2: STATIC LAYER ERSTELLEN

**⚠️ BAUREGELN FÜR STATIC LAYER:**
Beim Erstellen des Static Layers müssen ALLE Zugangspunkte und strukturellen Öffnungen von Anfang an eingeplant werden:
- 🚪 **Türen**: Alle Eingänge und Verbindungstüren zwischen Räumen
- ⤴️⤵️ **Treppen**: Auf-/Abgänge zu anderen Ebenen
- 🪜 **Leitern**: Vertikale Zugangspunkte
- ➡️⬅️⬆️⬇️ **Durchgänge**: Übergänge zu separaten Zonen/Bereichen
- 🪟 **Fenster**: Potenzielle Ein-/Ausstiegspunkte

**Grund**: Der Static Layer ist nach Erstellung UNVERÄNDERLICH. Nachträgliches Hinzufügen von Türen/Fenstern ist nicht möglich!

**LAYER STATIC.TERRAIN - Grundfläche**

```python
def create_terrain_layer(size, primary_terrain, terrain_features):
    """
    Erstellt Terrain-Layer.
    
    Args:
        size: (width, height)
        primary_terrain: Haupt-Symbol (z.B. '▪️')
        terrain_features: Liste von (terrain_type, positions)
    """
    width, height = size
    terrain = {}
    
    # 1. Basis: Alles mit primärem Terrain füllen
    for x in range(width):
        for y in range(height):
            terrain[(x, y)] = primary_terrain
    
    # 2. Features hinzufügen
    for feature_type, positions in terrain_features:
        if feature_type == 'river':
            # Fluss (horizontal)
            for x in range(width):
                for y_offset in positions:
                    if y_offset == 0:
                        terrain[(x, positions[0])] = '🔹'  # Flach
                    elif y_offset == 1:
                        terrain[(x, positions[0] + 1)] = '🔷'  # Tief
                    elif y_offset == 2:
                        terrain[(x, positions[0] + 2)] = '🔹'  # Flach
        
        elif feature_type == 'forest_edge':
            # Wald an Rändern
            for x, y in positions:
                terrain[(x, y)] = random.choice(['🌲', '🌳'])
        
        elif feature_type == 'road':
            # Straße
            for x, y in positions:
                terrain[(x, y)] = '🟧'
    
    return terrain

# Beispiel - Waldlichtung mit Fluss:
terrain_features = [
    ('river', [6, 7, 8]),  # Y-Positionen 6-8
    ('forest_edge', [(x, 0) for x in range(20)] + [(x, 14) for x in range(20)])
]
terrain = create_terrain_layer((20, 15), '🔸', terrain_features)
```

**LAYER STATIC.STRUCTURES - Gebäude**

**💡 BAUREGELN: Zugangspunkte beim Gebäudebau einplanen!**
Bevor du ein Gebäude erstellst, überlege:
- Wo sollen die **Haupteingänge** (Türen) sein?
- Gibt es **Nebeneingänge** oder Hintertüren?
- Wo sind **Fenster** als alternative Ein-/Ausstiegspunkte?
- Braucht das Gebäude **Treppen** zu anderen Stockwerken?
- Gibt es **Durchgänge** zu angrenzenden Gebäudeteilen?

→ Diese Positionen in der Wand-Struktur **freilassen** oder markieren!
→ Fenster können als `🪟` im Static Layer platziert werden
→ Türpositionen werden später im Semi-Static Layer mit 🚪 gefüllt

Gebäude-Formen:

```python
def create_building(shape, position, size):
    """
    Erstellt Gebäude-Struktur.

    ⚠️ WICHTIG: Beim Erstellen Positionen für Türen/Fenster freilassen!

    Args:
        shape: 'rectangle' / 'l_shape' / 't_shape' / 'round' / 'irregular'
        position: (start_x, start_y) - Obere linke Ecke
        size: (width, height)
    """
    structures = {}
    start_x, start_y = position
    width, height = size
    
    if shape == 'rectangle':
        # Nord-Wand
        for x in range(start_x, start_x + width):
            structures[(x, start_y)] = '⬜'
        # Süd-Wand
        for x in range(start_x, start_x + width):
            structures[(x, start_y + height - 1)] = '⬜'
        # West-Wand
        for y in range(start_y, start_y + height):
            structures[(start_x, y)] = '⬜'
        # Ost-Wand
        for y in range(start_y, start_y + height):
            structures[(start_x + width - 1, y)] = '⬜'
    
    elif shape == 'round':
        # Approximierte Kreisform
        center_x = start_x + width // 2
        center_y = start_y + height // 2
        radius = min(width, height) // 2
        
        for x in range(start_x, start_x + width):
            for y in range(start_y, start_y + height):
                dist = ((x - center_x) ** 2 + (y - center_y) ** 2) ** 0.5
                if abs(dist - radius) < 1.5:  # Wanddicke
                    structures[(x, y)] = '⬜'
    
    # ... weitere Formen
    
    return structures

# Beispiel - Rechteckige Taverne
taverne = create_building('rectangle', (2, 1), (11, 8))
```

**LAYER STATIC.DECORATION - Atmosphäre**

Setting-basierte Auto-Details:

```python
def add_setting_decoration(setting, size, existing_structures):
    """
    Fügt setting-passende Dekoration hinzu.
    """
    decoration = {}
    width, height = size
    
    if setting == 'tavern_abandoned':
        # Spinnweben an Wänden
        for pos, symbol in existing_structures.items():
            if symbol == '⬜' and random.random() < 0.1:
                # Neben Wand platzieren
                x, y = pos
                if (x+1, y) not in existing_structures:
                    decoration[(x+1, y)] = '🕸️'
        
        # Tote Pflanzen verstreut
        free_positions = get_free_positions(size, existing_structures, decoration)
        for _ in range(3):
            pos = random.choice(free_positions)
            decoration[pos] = '🥀'
    
    elif setting == 'forest':
        # Bäume an Rändern
        for x in range(width):
            for y in [0, 1, height-2, height-1]:
                if random.random() < 0.7:
                    decoration[(x, y)] = random.choice(['🌲', '🌳'])
        
        # Büsche im Inneren
        for _ in range(10):
            x = random.randint(2, width-3)
            y = random.randint(2, height-3)
            decoration[(x, y)] = '🌿'
    
    return decoration
```

### SCHRITT 2.3: SEMI_STATIC LAYER ERSTELLEN

```python
def create_semi_static_layer(building_positions, setting):
    """
    Erstellt interaktive Elemente.
    """
    semi_static = {
        'doors': {},
        'containers': {},
        'destructibles': {},
        'mechanisms': {}
    }
    
    # Türen an Gebäude-Eingängen
    for building_pos in building_positions:
        # Süd-Eingang (Mitte des Gebäudes)
        door_x = building_pos[0] + building_width // 2
        door_y = building_pos[1] + building_height - 1
        
        semi_static['doors'][(door_x, door_y)] = {
            'symbol': '🚪',
            'state': 'closed',
            'locked': False
        }
    
    # Container (Setting-abhängig)
    if setting == 'tavern':
        # Vorratskiste
        semi_static['containers'][(5, 3)] = {
            'symbol': '📦',
            'looted': False,
            'contents': '30 Gold + Proviant'
        }
    
    # Möbel (zerstörbar)
    semi_static['destructibles'][(7, 5)] = {
        'symbol': '🔳',  # Tisch
        'destroyed': False
    }
    
    return semi_static
```

### SCHRITT 2.4: DYNAMIC LAYER (Initial)

```python
def create_initial_dynamic_layer(game_text, grid_size):
    """
    Extrahiert Charaktere aus Spielbeschreibung und platziert sie.
    """
    dynamic = {
        'entities': {},
        'effects': {}
    }
    
    # Parser für Charaktere (Beispiel)
    # "Coru und Pip betreten von Süden"
    if "Coru" in game_text:
        dynamic['entities']['Coru'] = {
            'pos': (6, 8),  # Süd-Position
            'symbol': '🟢',
            'type': 'player',
            'alive': True
        }
    
    if "Pip" in game_text:
        dynamic['entities']['Pip'] = {
            'pos': (7, 8),  # Neben Coru
            'symbol': '🟡',
            'type': 'ally',
            'alive': True
        }
    
    # Feinde aus Text extrahieren
    # "Zwei Orks warten im Norden"
    if "Ork" in game_text or "Orks" in game_text:
        dynamic['entities']['Ork_A'] = {
            'pos': (5, 2),  # Nord-Links
            'symbol': '🔺',
            'type': 'enemy',
            'alive': True
        }
        dynamic['entities']['Ork_B'] = {
            'pos': (10, 2),  # Nord-Rechts
            'symbol': '🔻',
            'type': 'enemy',
            'alive': True
        }
    
    return dynamic
```

### SCHRITT 2.5: KOMPLETTE INITIALISIERUNG

```python
def create_initial_map_state(location_name, game_text, map_type, size, setting):
    """
    Erstellt komplett neuen MAP_STATE.
    """
    width, height = size
    location_id = generate_location_id(location_name)
    
    # Meta-Daten
    meta = {
        'location_name': location_name,
        'location_id': location_id,
        'created_at': 'Turn 1',
        'last_updated': 'Turn 1',
        'size': size,
        'map_type': map_type,
        'setting': setting
    }
    
    # Static Layer erstellen
    static_terrain = create_terrain_layer(size, '🔸', [])
    static_structures = create_building('rectangle', (2, 1), (11, 8))
    static_decoration = add_setting_decoration(setting, size, static_structures)
    
    static = {
        'terrain': static_terrain,
        'structures': static_structures,
        'decoration': static_decoration
    }
    
    # Semi-Static Layer
    semi_static = create_semi_static_layer([(2, 1)], setting)
    
    # Dynamic Layer
    dynamic = create_initial_dynamic_layer(game_text, size)
    
    # Zusammenführen
    map_state = {
        'meta': meta,
        'static': static,
        'semi_static': semi_static,
        'dynamic': dynamic
    }
    
    return map_state
```

═══════════════════════════════════════════════════════════════════════════════

## 🔄 PHASE 3: MAP-UPDATES (Jede weitere Runde)

### SCHRITT 3.1: SPIELSITUATION PARSEN

```python
def parse_game_situation(text, current_state):
    """
    Extrahiert Änderungen aus Spieltext.
    
    Returns:
        dict: {
            'entity_moves': [(entity_name, new_pos)],
            'interactions': [(action_type, position)],
            'new_effects': [(position, effect_data)],
            'removed_entities': [entity_name]
        }
    """
    updates = {
        'entity_moves': [],
        'interactions': [],
        'new_effects': [],
        'removed_entities': []
    }
    
    # BEWEGUNGS-PARSER
    
    # Direkte Bewegung: "Coru bewegt sich 3 Felder nach Norden"
    import re
    move_pattern = r'(\w+)\s+bewegt\s+sich\s+(\d+)\s+Felder?\s+nach\s+(Norden|Süden|Osten|Westen|Nord|Süd|Ost|West)'
    matches = re.finditer(move_pattern, text, re.IGNORECASE)
    
    for match in matches:
        entity_name = match.group(1)
        distance = int(match.group(2))
        direction = match.group(3).lower()
        
        if entity_name in current_state['dynamic']['entities']:
            old_pos = current_state['dynamic']['entities'][entity_name]['pos']
            new_pos = calculate_move(old_pos, direction, distance)
            updates['entity_moves'].append((entity_name, new_pos))
    
    # Relationale Bewegung: "Pip folgt Coru"
    if "folgt" in text.lower():
        follower = None
        leader = None
        
        # Einfacher Parser (kann verbessert werden)
        if "Pip folgt Coru" in text:
            follower, leader = 'Pip', 'Coru'
        
        if follower and leader:
            leader_pos = current_state['dynamic']['entities'][leader]['pos']
            follower_pos = get_adjacent_position(leader_pos, current_state)
            updates['entity_moves'].append((follower, follower_pos))
    
    # Beschreibungs-basiert: "rennt zur Brücke"
    if "zur Brücke" in text or "zur brücke" in text:
        bridge_pos = find_structure_center(current_state['static']['structures'], '🧱')
        if bridge_pos:
            # Entity-Name aus Kontext (vereinfacht)
            entity_name = extract_subject(text)  # z.B. "Coru"
            near_bridge = get_adjacent_position(bridge_pos, current_state)
            updates['entity_moves'].append((entity_name, near_bridge))
    
    # INTERAKTIONEN
    
    # Tür öffnen
    if "öffnet die Tür" in text or "öffnet Tür" in text:
        entity_pos = get_entity_position_from_text(text, current_state)
        door_pos = find_nearest_object(current_state, 'doors', entity_pos)
        if door_pos:
            updates['interactions'].append(('open_door', door_pos))
    
    # Kiste plündern
    if any(word in text.lower() for word in ["plündert", "öffnet die Kiste", "öffnet die Truhe"]):
        entity_pos = get_entity_position_from_text(text, current_state)
        container_pos = find_nearest_object(current_state, 'containers', entity_pos)
        if container_pos:
            updates['interactions'].append(('loot', container_pos))
    
    # Feuer anzünden
    if "zündet" in text.lower() and ("Feuer" in text or "an" in text):
        target_pos = extract_target_position(text, current_state)
        updates['new_effects'].append((target_pos, {
            'symbol': '🔥',
            'type': 'fire',
            'duration': 3  # 3 Runden
        }))
    
    # TOD/BESIEGUNG
    
    # "Ork_A fällt" oder "Ork_A wird besiegt"
    for entity_name in current_state['dynamic']['entities'].keys():
        if entity_name in text and any(word in text.lower() for word in ["fällt", "besiegt", "stirbt", "tot"]):
            updates['removed_entities'].append(entity_name)
    
    return updates
```

### SCHRITT 3.2: POSITIONS-BERECHNUNG

```python
def calculate_move(current_pos, direction, distance):
    """
    Berechnet neue Position.
    
    Koordinatensystem:
    - Nord/Norden: Y nimmt ab (oben = niedrige Y)
    - Süd/Süden: Y nimmt zu (unten = hohe Y)
    - West/Westen: X nimmt ab (links = niedrige X)
    - Ost/Osten: X nimmt zu (rechts = hohe X)
    """
    x, y = current_pos
    
    direction_map = {
        'nord': (0, -distance),
        'norden': (0, -distance),
        'süd': (0, +distance),
        'süden': (0, +distance),
        'west': (-distance, 0),
        'westen': (-distance, 0),
        'ost': (+distance, 0),
        'osten': (+distance, 0),
        'nordwest': (-distance, -distance),
        'nordost': (+distance, -distance),
        'südwest': (-distance, +distance),
        'südost': (+distance, +distance)
    }
    
    dx, dy = direction_map.get(direction, (0, 0))
    new_pos = (x + dx, y + dy)
    
    return new_pos

def get_adjacent_position(center_pos, current_state):
    """
    Gibt freie Position neben center_pos zurück.
    """
    x, y = center_pos
    
    # Alle angrenzenden Positionen
    adjacent = [
        (x-1, y), (x+1, y),    # Links, Rechts
        (x, y-1), (x, y+1),    # Oben, Unten
        (x-1, y-1), (x+1, y-1),  # Diagonal oben
        (x-1, y+1), (x+1, y+1)   # Diagonal unten
    ]
    
    # Prüfe welche begehbar sind
    for pos in adjacent:
        if is_walkable(pos, current_state):
            return pos
    
    # Fallback: Gibt center zurück (sollte nicht passieren)
    return center_pos

def is_walkable(pos, current_state):
    """
    Prüft ob Position begehbar ist.
    """
    x, y = pos
    width, height = current_state['meta']['size']
    
    # In Grid?
    if not (0 <= x < width and 0 <= y < height):
        return False
    
    # Terrain prüfen
    terrain = current_state['static']['terrain'].get(pos, '▪️')
    if terrain in ['⬜', '🔷', '⬛']:  # Wand, Tiefes Wasser, Abgrund
        return False
    
    # Struktur prüfen
    structure = current_state['static']['structures'].get(pos, None)
    if structure == '⬜':  # Wand
        return False
    
    # Entity prüfen (Position besetzt?)
    for entity_data in current_state['dynamic']['entities'].values():
        if entity_data['pos'] == pos and entity_data['alive']:
            return False
    
    return True

def find_structure_center(structures, symbol):
    """
    Findet Zentrum einer Struktur (z.B. Brücke).
    """
    positions = [pos for pos, sym in structures.items() if sym == symbol]
    
    if not positions:
        return None
    
    # Durchschnittliche Position
    avg_x = sum(pos[0] for pos in positions) // len(positions)
    avg_y = sum(pos[1] for pos in positions) // len(positions)
    
    return (avg_x, avg_y)

def find_nearest_object(current_state, object_type, from_pos):
    """
    Findet nächstes Objekt eines Typs.
    
    Args:
        object_type: 'doors', 'containers', 'destructibles', 'mechanisms'
        from_pos: (x, y)
    """
    objects = current_state['semi_static'][object_type]
    
    if not objects:
        return None
    
    min_dist = float('inf')
    nearest_pos = None
    
    for pos in objects.keys():
        dist = manhattan_distance(from_pos, pos)
        if dist < min_dist:
            min_dist = dist
            nearest_pos = pos
    
    return nearest_pos

def manhattan_distance(pos1, pos2):
    """Grid-Distanz."""
    x1, y1 = pos1
    x2, y2 = pos2
    return abs(x2 - x1) + abs(y2 - y1)
```

### SCHRITT 3.3: STATE AKTUALISIEREN

```python
def update_state(parsed_updates, current_state):
    """
    Wendet alle Änderungen auf MAP_STATE an.
    ⚠️ Ändert NUR dynamic und semi_static Layer!
    """
    
    # 1. ENTITY BEWEGUNGEN
    for entity_name, new_pos in parsed_updates['entity_moves']:
        # Validierung
        valid, message = validate_move(entity_name, new_pos, current_state)
        
        if valid:
            current_state['dynamic']['entities'][entity_name]['pos'] = new_pos
        else:
            print(f"⚠️ BEWEGUNG UNGÜLTIG: {message}")
            print(f"Bitte Position für {entity_name} klären!")
    
    # 2. INTERAKTIONEN
    for action, pos in parsed_updates['interactions']:
        
        if action == 'open_door':
            if pos in current_state['semi_static']['doors']:
                door = current_state['semi_static']['doors'][pos]
                door['state'] = 'open'
                door['symbol'] = '🔓'
        
        elif action == 'loot':
            if pos in current_state['semi_static']['containers']:
                container = current_state['semi_static']['containers'][pos]
                container['looted'] = True
                container['symbol'] = '▪️'  # Verschwindet
        
        elif action == 'destroy':
            if pos in current_state['semi_static']['destructibles']:
                obj = current_state['semi_static']['destructibles'][pos]
                obj['destroyed'] = True
                obj['symbol'] = '💥'  # Kurzer Effekt
        
        elif action == 'activate_mechanism':
            if pos in current_state['semi_static']['mechanisms']:
                mech = current_state['semi_static']['mechanisms'][pos]
                mech['activated'] = True
    
    # 3. NEUE EFFEKTE
    for pos, effect_data in parsed_updates['new_effects']:
        current_state['dynamic']['effects'][pos] = effect_data
    
    # 4. ENTITIES ENTFERNEN
    for entity_name in parsed_updates['removed_entities']:
        if entity_name in current_state['dynamic']['entities']:
            entity = current_state['dynamic']['entities'][entity_name]
            entity['alive'] = False
            entity['symbol'] = '⚰️'  # Zeigt gefallenen
            # Alternative: del current_state['dynamic']['entities'][entity_name]
    
    # 5. EFFEKT-COUNTDOWN (automatisch jede Runde)
    effects_to_remove = []
    for pos, effect in current_state['dynamic']['effects'].items():
        if effect['duration'] > 0:
            effect['duration'] -= 1
            if effect['duration'] == 0:
                effects_to_remove.append(pos)
    
    for pos in effects_to_remove:
        del current_state['dynamic']['effects'][pos]
    
    # 6. META UPDATE
    current_turn = int(current_state['meta']['last_updated'].split()[-1]) + 1
    current_state['meta']['last_updated'] = f"Turn {current_turn}"
    
    return current_state

def validate_move(entity_name, new_pos, current_state):
    """
    Validiert Bewegung vor Ausführung.
    
    Returns:
        (bool, str): (gültig?, Fehler-Nachricht)
    """
    x, y = new_pos
    width, height = current_state['meta']['size']
    
    # In Grid?
    if not (0 <= x < width and 0 <= y < height):
        return False, f"Position {new_pos} außerhalb der Map ({width}x{height})"
    
    # Begehbar?
    if not is_walkable(new_pos, current_state):
        terrain = current_state['static']['terrain'].get(new_pos, '▪️')
        return False, f"Position {new_pos} nicht begehbar (Symbol: {terrain})"
    
    return True, "OK"
```

═══════════════════════════════════════════════════════════════════════════════

## 🎨 PHASE 4: MAP RENDERN

### RENDER ENGINE

```python
def render_map(state):
    """
    Kombiniert alle Layer zu finaler Map.
    Layer-Reihenfolge: Static → Semi-Static → Dynamic
    """
    width, height = state['meta']['size']
    
    # 1. Leeres Grid
    grid = [['▪️' for _ in range(width)] for _ in range(height)]
    
    # 2. STATIC TERRAIN (unterste Ebene)
    for (x, y), symbol in state['static']['terrain'].items():
        if 0 <= x < width and 0 <= y < height:
            grid[y][x] = symbol
    
    # 3. STATIC STRUCTURES
    for (x, y), symbol in state['static']['structures'].items():
        if 0 <= x < width and 0 <= y < height:
            grid[y][x] = symbol
    
    # 4. STATIC DECORATION
    for (x, y), symbol in state['static']['decoration'].items():
        if 0 <= x < width and 0 <= y < height:
            grid[y][x] = symbol
    
    # 5. SEMI_STATIC LAYER
    for (x, y), door_data in state['semi_static']['doors'].items():
        if 0 <= x < width and 0 <= y < height:
            grid[y][x] = door_data['symbol']
    
    for (x, y), container_data in state['semi_static']['containers'].items():
        if not container_data['looted'] and 0 <= x < width and 0 <= y < height:
            grid[y][x] = container_data['symbol']
    
    for (x, y), obj_data in state['semi_static']['destructibles'].items():
        if not obj_data['destroyed'] and 0 <= x < width and 0 <= y < height:
            grid[y][x] = obj_data['symbol']
    
    for (x, y), mech_data in state['semi_static']['mechanisms'].items():
        if 0 <= x < width and 0 <= y < height:
            grid[y][x] = mech_data['symbol']
    
    # 6. DYNAMIC EFFECTS
    for (x, y), effect_data in state['dynamic']['effects'].items():
        if 0 <= x < width and 0 <= y < height:
            grid[y][x] = effect_data['symbol']
    
    # 7. DYNAMIC ENTITIES (oberste Ebene!)
    for name, entity_data in state['dynamic']['entities'].items():
        x, y = entity_data['pos']
        if 0 <= x < width and 0 <= y < height:
            grid[y][x] = entity_data['symbol']  # Überschreibt alles!
    
    # 8. Grid zu String
    map_string = '\n'.join([''.join(row) for row in grid])
    
    return map_string

def render_current_map():
    """Rendert und zeigt aktuelle Map."""
    current_map = get_current_map()
    map_output = output_map(current_map)
    print(map_output)
    return map_output
```

### LEGENDE GENERIEREN

```python
def generate_legend(state):
    """Erstellt kategorisierte Legende."""
    
    used_symbols = {
        'Terrain': set(),
        'Strukturen': set(),
        'Vegetation': set(),
        'Wesen': {},
        'Items': set(),
        'Interaktionen': set(),
        'Effekte': set()
    }
    
    # Terrain
    for symbol in state['static']['terrain'].values():
        used_symbols['Terrain'].add(symbol)
    
    # Strukturen
    for symbol in state['static']['structures'].values():
        used_symbols['Strukturen'].add(symbol)
    
    # Vegetation
    vegetation_symbols = ['🌲', '🌳', '🌴', '🌿', '🌱', '🍄', '🌾', '🌹', '🥀', '🌵']
    for symbol in state['static']['decoration'].values():
        if symbol in vegetation_symbols:
            used_symbols['Vegetation'].add(symbol)
        else:
            used_symbols['Strukturen'].add(symbol)
    
    # Semi-Static
    for door_data in state['semi_static']['doors'].values():
        used_symbols['Interaktionen'].add(door_data['symbol'])
    
    for container_data in state['semi_static']['containers'].values():
        if not container_data['looted']:
            used_symbols['Items'].add(container_data['symbol'])
    
    # Dynamic
    for name, entity_data in state['dynamic']['entities'].items():
        if entity_data['alive']:
            used_symbols['Wesen'][entity_data['symbol']] = name
    
    for effect_data in state['dynamic']['effects'].values():
        used_symbols['Effekte'].add(effect_data['symbol'])
    
    # Formatieren
    legend = "\n**LEGENDE**\n"
    
    if used_symbols['Terrain']:
        legend += f"Terrain: {' · '.join(sorted(used_symbols['Terrain']))}\n"
    
    if used_symbols['Strukturen']:
        legend += f"Strukturen: {' · '.join(sorted(used_symbols['Strukturen']))}\n"
    
    if used_symbols['Vegetation']:
        legend += f"Vegetation: {' · '.join(sorted(used_symbols['Vegetation']))}\n"
    
    if used_symbols['Wesen']:
        legend += f"Wesen: "
        for symbol, name in used_symbols['Wesen'].items():
            legend += f"{symbol} {name} · "
        legend = legend[:-3] + "\n"
    
    if used_symbols['Items']:
        legend += f"Items: {' · '.join(sorted(used_symbols['Items']))}\n"
    
    if used_symbols['Interaktionen']:
        legend += f"Interaktionen: {' · '.join(sorted(used_symbols['Interaktionen']))}\n"
    
    if used_symbols['Effekte']:
        legend += f"Effekte: {' · '.join(sorted(used_symbols['Effekte']))}\n"
    
    return legend
```

### INTERAKTIONS-TABELLE

```python
def generate_interaction_table(state):
    """Listet interaktive Elemente auf."""
    
    table = "\n**⚡ INTERAKTIONSMÖGLICHKEITEN**\n\n"
    table += "| Objekt | Position | Interaktionen |\n"
    table += "|--------|----------|---------------|\n"
    
    has_interactions = False
    
    # Türen
    for pos, door_data in state['semi_static']['doors'].items():
        has_interactions = True
        status = door_data['state']
        locked = "🔒 " if door_data.get('locked') else ""
        
        if status == 'closed':
            actions = f"{locked}Öffnen · Eintreten"
        elif status == 'open':
            actions = "Durchgehen · Schließen"
        else:
            actions = "Durchgehen"
        
        table += f"| {door_data['symbol']} Tür | {pos} | {actions} |\n"
    
    # Container
    for pos, container_data in state['semi_static']['containers'].items():
        if not container_data['looted']:
            has_interactions = True
            contents = container_data.get('contents', '???')
            table += f"| {container_data['symbol']} Truhe | {pos} | Öffnen · Plündern → {contents} |\n"
    
    # Destructibles
    for pos, obj_data in state['semi_static']['destructibles'].items():
        if not obj_data['destroyed']:
            has_interactions = True
            table += f"| {obj_data['symbol']} Möbel | {pos} | Zerstören · Als Deckung nutzen |\n"
    
    # Structures
    for pos, symbol in state['static']['structures'].items():
        if symbol == '⛲':
            has_interactions = True
            table += f"| {symbol} Brunnen | {pos} | Deckung · Wasser holen · Untersuchen |\n"
        elif symbol == '⭐':
            has_interactions = True
            table += f"| {symbol} Altar | {pos} | Beten · Opfern · Untersuchen |\n"
    
    if not has_interactions:
        return "\n*(Keine interaktiven Objekte)*\n"
    
    return table
```

### FINALE AUSGABE

```python
def output_map(state):
    """
    Komplette Map-Ausgabe.
    """
    location = state['meta']['location_name']
    turn = state['meta']['last_updated']
    
    output = f"\n## 🗺️ {location.upper()}\n"
    output += f"*(Aktualisiert: {turn})*\n\n"
    
    # Map
    output += "```\n"
    output += render_map(state)
    output += "\n```\n"
    
    # Legende
    output += generate_legend(state)
    
    # Interaktionen
    output += generate_interaction_table(state)
    
    # Positionen
    output += "\n**AKTUELLE POSITIONEN:**\n"
    for name, entity_data in state['dynamic']['entities'].items():
        if entity_data['alive']:
            pos = entity_data['pos']
            symbol = entity_data['symbol']
            output += f"- {symbol} **{name}**: Position {pos}\n"
    
    return output
```

═══════════════════════════════════════════════════════════════════════════════

## 🎮 KOMPLETTER WORKFLOW - BEISPIEL

### MULTI-LOCATION SPIELABLAUF

```python
# ============================================================================
# TURN 1: ERSTE LOCATION - Taverne betreten
# ============================================================================

game_text_1 = """
Coru und Pip betreten eine verlassene Taverne. 
Der Raum ist düster, Spinnweben hängen von der Decke. 
An der Nordwand steht ein Kamin. 
Zwei Orks lauern hinter umgeworfenen Tischen.
"""

# Analyse & Erstellung
map_state_1 = create_initial_map_state(
    location_name="Verlassene Taverne",
    game_text=game_text_1,
    map_type='interior',
    size=(15, 10),
    setting='tavern_abandoned'
)

# Im Registry speichern & aktivieren
location_id_1 = create_new_location("Verlassene Taverne", map_state_1)
# Output: ✅ Neue Location 'Verlassene Taverne' erstellt (ID: verlassene_taverne)
#         📍 Jetzt aktiv: Verlassene Taverne

# Map anzeigen
render_current_map()

# ============================================================================
# TURN 2-5: In der Taverne (Updates)
# ============================================================================

# Turn 2
game_text_2 = "Coru bewegt sich 3 Felder nach Norden. Pip folgt ihm."
updates_2 = parse_game_situation(game_text_2, get_current_map())
update_current_location(updates_2)
render_current_map()

# Turn 3
game_text_3 = "Die Gruppe öffnet die Truhe neben dem Kamin und findet 50 Gold!"
updates_3 = parse_game_situation(game_text_3, get_current_map())
update_current_location(updates_3)
render_current_map()

# Turn 4
game_text_4 = "Coru greift Ork_A an und besiegt ihn!"
updates_4 = parse_game_situation(game_text_4, get_current_map())
update_current_location(updates_4)
render_current_map()

# Turn 5
game_text_5 = "Pip wirft eine Fackel! Das Heu im Kamin fängt Feuer!"
updates_5 = parse_game_situation(game_text_5, get_current_map())
update_current_location(updates_5)
render_current_map()

# ============================================================================
# TURN 6: ZWEITE LOCATION - Verlassen der Taverne
# ============================================================================

game_text_6 = """
Die Gruppe verlässt die brennende Taverne und kommt zu einer 
alten Steinbrücke über einen Fluss. Auf der anderen Seite 
lauern zwei Banditen bei einer Kiste mit Beute.
"""

# Neue Location erstellen
map_state_2 = create_initial_map_state(
    location_name="Steinbrücke im Wald",
    game_text=game_text_6,
    map_type='exterior_simple',
    size=(15, 12),
    setting='forest_bridge'
)

# Im Registry speichern & aktivieren
location_id_2 = create_new_location("Steinbrücke im Wald", map_state_2)
# Output: ✅ Neue Location 'Steinbrücke im Wald' erstellt (ID: steinbruecke_im_wald)
#         📍 Jetzt aktiv: Steinbrücke im Wald

# ⚠️ WICHTIG: Taverne bleibt mit Stand Turn 5 gespeichert!

render_current_map()

# ============================================================================
# TURN 7-10: An der Brücke
# ============================================================================

# Turn 7
game_text_7 = "Coru rennt zur Brücke!"
updates_7 = parse_game_situation(game_text_7, get_current_map())
update_current_location(updates_7)
render_current_map()

# Turn 8-10: Weitere Updates...
# ...

# ============================================================================
# TURN 11: RÜCKKEHR ZUR TAVERNE (z.B. Rückzug)
# ============================================================================

# Zurück zur Taverne wechseln
switch_location("Verlassene Taverne")
# Output: 📍 Wechsel: Steinbrücke im Wald → Verlassene Taverne

render_current_map()
# → Zeigt Taverne mit Stand von Turn 5 (Feuer brennt noch!)

# Feuer-Effekt ist noch aktiv (duration countdown)
# Ork_A ist immer noch besiegt (⚰️)
# Truhe ist immer noch geplündert

# ============================================================================
# LOCATIONS ÜBERSICHT
# ============================================================================

list_all_locations()
# Output:
# 📚 GESPEICHERTE LOCATIONS:
#   • Verlassene Taverne
#     ID: verlassene_taverne
#     Größe: 15x10 | Update: Turn 11 ← AKTUELL
#   • Steinbrücke im Wald
#     ID: steinbruecke_im_wald
#     Größe: 15x12 | Update: Turn 10
# 
# 📍 Aktuell aktiv: Verlassene Taverne

# ============================================================================
# WIEDER ZUR BRÜCKE
# ============================================================================

switch_location("steinbruecke_im_wald")  # Mit ID
# ODER
switch_location("Steinbrücke im Wald")   # Mit Name

render_current_map()
# → Zeigt Brücke mit Stand von Turn 10!

# ✅ Beide Locations bleiben mit ihrem jeweiligen Stand erhalten!
```

═══════════════════════════════════════════════════════════════════════════════

## ✅ CHECKLISTEN

### INITIALE LOCATION-ERSTELLUNG

**KONTEXT:**
☐ Map-Typ bestimmt (Interior/Exterior_Simple/Exterior_Detailed)
☐ Terrain-Typen identifiziert
☐ Setting & Atmosphäre erkannt
☐ Story-Elemente extrahiert

**STATIC LAYER:**
☐ Dominantes Terrain platziert (40-60%)
☐ Sekundäres Terrain hinzugefügt
☐ Natürliche Übergänge geschaffen
☐ Gebäude in passender Form erstellt
☐ **⚠️ BAUREGELN: Alle Zugangspunkte eingeplant (Türen, Treppen, Leitern, Durchgänge, Fenster)**
☐ Positionen für Türen in Wänden freigelassen
☐ Fenster als 🪟 im Static Layer platziert (falls relevant)
☐ Wichtige Strukturen platziert
☐ Atmosphärische Dekoration hinzugefügt (10-20%)

**SEMI_STATIC LAYER:**
☐ Türen an Gebäuden platziert
☐ Container mit Inhalt definiert
☐ Interaktive Objekte hinzugefügt

**DYNAMIC LAYER:**
☐ Alle Charaktere platziert
☐ Positionen korrekt (Links/Rechts/Nord/Süd)
☐ Initiale Effekte gesetzt

**LOCATION REGISTRY:**
☐ Location-ID generiert
☐ Im LOCATION_REGISTRY gespeichert
☐ Als CURRENT_LOCATION gesetzt
☐ Map gerendert und angezeigt

**VALIDATION:**
☐ Alle Symbole aus Symbol-Bibliothek
☐ Keine erfundenen Symbole
☐ 🔸 für Sand/Steinboden, 🟧 nur für Straßen
☐ Grid-Größe korrekt
☐ 40%+ begehbar
☐ Sichtlinien klar
☐ Deckung vorhanden

### UPDATES (Jede Runde)

**LOCATION CHECK:**
☐ Richtige Location aktiv?
☐ Falls Ortswechsel: Neue Location erstellen ODER zu bestehender wechseln?

**PARSING:**
☐ Spieltext analysiert
☐ Bewegungen extrahiert
☐ Interaktionen erkannt
☐ Neue Effekte identifiziert
☐ Entfernte Entities getracked

**POSITIONS-UPDATE:**
☐ Neue Positionen berechnet
☐ Bewegungen validiert (begehbar? in Grid?)
☐ Kollisionen geprüft
☐ Bei Unsicherheit: Nachgefragt!

**STATE-UPDATE:**
☐ update_current_location() verwendet
☐ Nur DYNAMIC Layer geändert (Entities + Effects)
☐ Semi-Static nur bei Interaktionen geändert
☐ STATIC NIEMALS geändert!
☐ Effekt-Countdown durchgeführt
☐ Meta-Daten aktualisiert

**OUTPUT:**
☐ render_current_map() aufgerufen
☐ Richtige Location gerendert
☐ Legende aktualisiert
☐ Interaktionstabelle aktuell
☐ Positionsliste korrekt

### LOCATION-WECHSEL

**VOR WECHSEL:**
☐ Aktuelle Location gespeichert (automatisch via update_current_location)
☐ Ziel-Location existiert im Registry?

**WECHSEL:**
☐ switch_location() verwendet
☐ CURRENT_LOCATION korrekt gesetzt
☐ Bestätigung erhalten

**NACH WECHSEL:**
☐ Richtige Map angezeigt
☐ Stand der Location korrekt (letzter Update-Turn)
☐ Alte Location unverändert im Registry

═══════════════════════════════════════════════════════════════════════════════

## 🚨 HÄUFIGE FEHLER VERMEIDEN

### ❌ FEHLER 1: Static Layer nach Erstellung ändern

**FALSCH:**
```python
# Turn 5: "Ein Baum fällt um!"
MAP_STATE['static']['decoration'][(3,3)] = '🪵'  # ❌ STATIC GEÄNDERT!
```

**RICHTIG:**
```python
# Baum in DYNAMIC als Effekt/Hindernis
MAP_STATE['dynamic']['effects'][(3,3)] = {
    'symbol': '🪵',
    'type': 'obstacle',
    'duration': 0  # Permanent
}
```

### ❌ FEHLER 2: Locations verwechseln

**FALSCH:**
```python
# In Taverne (CURRENT_LOCATION = 'verlassene_taverne')
# User: "Coru geht zur Brücke"

# Direktes Ändern der Taverne-Map:
MAP_STATE['dynamic']['entities']['Coru']['pos'] = (7, 5)  # ❌ Falsche Location!
```

**RICHTIG:**
```python
# Neue Location oder Wechsel
if "geht zur Brücke" in text and location_exists("Steinbrücke"):
    switch_location("Steinbrücke")
    # Jetzt in Brücken-Location
else:
    # Neue Brücken-Location erstellen
    bruecke_map = create_initial_map_state(...)
    create_new_location("Steinbrücke", bruecke_map)
```

### ❌ FEHLER 3: Update ohne Registry-Funktion

**FALSCH:**
```python
# Direktes Ändern:
LOCATION_REGISTRY['verlassene_taverne']['dynamic']['entities']['Coru']['pos'] = (5,5)  # ❌ Unsicher!
```

**RICHTIG:**
```python
# Über sichere Funktion:
updates = parse_game_situation(text, get_current_map())
update_current_location(updates)  # ✅ Sicher & tracked
```

### ❌ FEHLER 4: Location-ID vergessen

**FALSCH:**
```python
# Nur MAP_STATE erstellen, nicht registrieren:
map_state = create_initial_map_state(...)
# ❌ Nicht im Registry! Geht verloren beim Wechsel!
```

**RICHTIG:**
```python
map_state = create_initial_map_state(...)
create_new_location("Location Name", map_state)  # ✅ Im Registry gespeichert
```

### ❌ FEHLER 5: Symbole außerhalb Bank

**FALSCH:**
```python
terrain[(5,5)] = '🟪'  # ❌ Nicht in Symbol-Bibliothek!
```

**RICHTIG:**
```python
# NUR Symbole aus der Bibliothek!
terrain[(5,5)] = '🔸'  # ✅
```

### ❌ FEHLER 6: Zugangspunkte vergessen beim Static Layer

**FALSCH:**
```python
# Gebäude ohne Türöffnungen erstellt
structures = create_building('rectangle', (2, 1), (11, 8))
# ❌ Später: "Oh, ich brauche eine Tür bei (6, 8)!"
# → UNMÖGLICH! Static Layer kann nicht geändert werden!
```

**RICHTIG:**
```python
# 1. Gebäude mit Türöffnung erstellen
structures = create_building('rectangle', (2, 1), (11, 8))

# 2. Türposition in Wand freilassen beim Erstellen
# In create_building(): Position (6, 8) NICHT mit ⬜ füllen!

# 3. Fenster im Static Layer platzieren
structures[(4, 1)] = '🪟'  # Fenster Nord-Wand
structures[(10, 4)] = '🪟'  # Fenster Ost-Wand

# 4. Türen später im Semi-Static Layer einfügen
semi_static['doors'][(6, 8)] = {
    'symbol': '🚪',
    'state': 'closed',
    'locked': False
}
```

**⚠️ MERKE:**
- Zugangspunkte (Türen, Treppen, Leitern, Durchgänge, Fenster) VOR dem Erstellen planen!
- Static Layer = letzte Chance für strukturelle Öffnungen
- Fenster gehören zum Static Layer (🪟)
- Türen können Semi-Static sein (🚪), aber Position muss im Static Layer frei sein!

═══════════════════════════════════════════════════════════════════════════════

## 🎯 QUICK REFERENCE

### Koordinaten-System ( NUR INTERN - NIE IM CHAT ANZEIGEN )
```
  0 1 2 3 4 5 6 7 8 9 ...  ← X-Achse (Breite)
0 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
1 ⬜ [    NORD     ] ⬜
2 ⬜               ⬜
3 ⬜               ⬜
4 ⬜   [  MITTE  ]  ⬜
5 ⬜               ⬜
6 ⬜               ⬜
7 ⬜               ⬜
8 ⬜ [     SÜD     ] ⬜
9 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
↑
Y-Achse (Höhe)

LINKS = niedrige X
RECHTS = hohe X
NORD/HINTEN = niedrige Y (oben)
SÜD/VORNE = hohe Y (unten)
```

### Terrain-Mapping
```
🔸 = Grasland / Feld / Sand  ← WICHTIG!
🟧 = Straße / Weg (NUR Straßen!)
🔹 = Flaches Wasser (begehbar, laut)
🔷 = Tiefes Wasser (NICHT begehbar)
⬜ = Wände (NICHT begehbar)
▪️ = Void / Nichts (begehbar)
```

### Layer-Priorität
```
1. Static Terrain    (unten)
2. Static Structures
3. Static Decoration
4. Semi-Static
5. Dynamic Effects
6. Dynamic Entities  (oben - überschreibt alles!)
```

### Was ändert sich wann?
```
STATIC:      NIE (nur bei Erstellung)
SEMI_STATIC: Bei Interaktionen (Tür öffnen, Kiste plündern)
DYNAMIC:     JEDE RUNDE (Bewegung, Effekte)
```

### Multi-Location Commands
```python
# Neue Location
create_new_location(name, map_state)

# Wechseln
switch_location(name_oder_id)

# Aktuelle Map
get_current_map()

# Update (nur aktuelle!)
update_current_location(updates)

# Rendern
render_current_map()

# Übersicht
list_all_locations()
```

═══════════════════════════════════════════════════════════════════════════════

## 🗺️ MIT DIESEM SKILL ERSTELLST DU PERSISTENTE MULTI-LOCATION MAPS! 🎯

**KRITISCHE REGELN:**

✅ **MAP IM CHAT IMMER IM CODEBLOCK ANZEIGEN**
✅ **MAP-CODEBLOCK = AUSSCHLIESSLICH EMOJIS **
✅ **Eine Map = Eine Location im Registry**
✅ **CURRENT_LOCATION zeigt aktive Map**
✅ **Static Layer = UNVERÄNDERT nach Erstellung**
✅ **Updates nur über update_current_location()**
✅ **Alle Locations bleiben parallel gespeichert**
✅ **Wechsel = kein Datenverlust**
✅ **Nur Symbole aus Symbol-Bank!**

**Bei Unsicherheit:**
❓ Frage nach Klärung!
❓ Validiere Positionen!
❓ Prüfe CURRENT_LOCATION!

═══════════════════════════════════════════════════════════════════════════════
