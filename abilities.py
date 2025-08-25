import math
from typing import Optional
import pygame

class Ability:
    """Base ability with simple cooldown management."""
    def __init__(self, name: str, cooldown: float):
        self.name = name
        self.cooldown = cooldown
        self.timer = 0.0

    def update(self, dt: float) -> None:
        if self.timer > 0:
            self.timer = max(0, self.timer - dt)

    @property
    def ready(self) -> bool:
        return self.timer <= 0

    def trigger(self) -> None:
        self.timer = self.cooldown

    def execute(self, user: "Fighter", target: Optional["Fighter"], arena: "Arena") -> None:
        raise NotImplementedError


class Dash(Ability):
    DISTANCE = 80

    def __init__(self):
        super().__init__("dash", 1.0)

    def execute(self, user, target, arena):
        if not self.ready:
            return
        user.position += user.facing * self.DISTANCE
        self.trigger()


class Heal(Ability):
    AMOUNT = 20

    def __init__(self):
        super().__init__("heal", 3.0)

    def execute(self, user, target, arena):
        if not self.ready:
            return
        user.hp = min(user.max_hp, user.hp + self.AMOUNT)
        self.trigger()


class SuperBeam(Ability):
    RANGE = 200
    DAMAGE = 30
    ANGLE = math.radians(20)

    def __init__(self):
        super().__init__("superbeam", 5.0)

    def execute(self, user, target, arena):
        if not self.ready or target is None:
            return
        vec = target.position - user.position
        distance = vec.length()
        if distance > self.RANGE:
            return
        angle = user.facing.angle_to(vec.normalize()) if distance else 0
        if abs(angle) < math.degrees(self.ANGLE):
            target.hp -= self.DAMAGE
            self.trigger()


def ability_factory(name: str) -> Ability:
    lookup = {
        "dash": Dash,
        "heal": Heal,
        "superbeam": SuperBeam,
    }
    if name not in lookup:
        raise ValueError(f"Unknown ability '{name}'")
    return lookup[name]()
