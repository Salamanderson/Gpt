from __future__ import annotations
from dataclasses import dataclass, field
from typing import List
import pygame
from pygame.math import Vector2
from abilities import ability_factory, Ability


@dataclass
class Fighter:
    name: str
    max_hp: int
    speed: float
    abilities: List[Ability]
    sprite: pygame.Surface = field(default_factory=lambda: pygame.Surface((32, 32)))
    position: Vector2 = field(default_factory=lambda: Vector2(0, 0))
    facing: Vector2 = field(default_factory=lambda: Vector2(1, 0))
    hp: int = field(init=False)
    rect: pygame.Rect = field(init=False)
    velocity: Vector2 = field(default_factory=lambda: Vector2(0, 0))

    def __post_init__(self):
        self.hp = self.max_hp
        self.rect = self.sprite.get_rect(center=self.position)

    @classmethod
    def from_config(cls, config: dict) -> "Fighter":
        abilities = [ability_factory(name) for name in config.get("abilities", [])]
        stats = config.get("stats", {})
        surf = pygame.Surface((32, 32))
        surf.fill(config.get("color", [255, 255, 255]))
        return cls(
            name=config.get("name", "fighter"),
            max_hp=stats.get("hp", 100),
            speed=stats.get("speed", 100),
            abilities=abilities,
            sprite=surf,
            position=Vector2(config.get("position", [0, 0])),
        )

    def update(self, dt: float, arena: "Arena") -> None:
        self.position += self.velocity * dt
        self.rect.center = self.position
        arena.clamp(self)
        for ab in self.abilities:
            ab.update(dt)

    def use_ability(self, ability_name: str, target: "Fighter", arena: "Arena") -> None:
        for ab in self.abilities:
            if ab.name == ability_name:
                ab.execute(self, target, arena)
                break
