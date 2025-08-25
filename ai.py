from __future__ import annotations
from typing import List
from pygame.math import Vector2


class AIController:
    def decide(self, fighter: "Fighter", opponents: List["Fighter"], arena: "Arena") -> None:
        if not opponents:
            return
        target = min(opponents, key=lambda op: (op.position - fighter.position).length())
        direction = (target.position - fighter.position)
        if direction.length() > 0:
            fighter.facing = direction.normalize()
            fighter.velocity = fighter.facing * fighter.speed
        else:
            fighter.velocity = Vector2(0, 0)
        for ab in fighter.abilities:
            if ab.ready:
                fighter.use_ability(ab.name, target, arena)
                break
