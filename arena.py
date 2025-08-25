from pygame.math import Vector2
import pygame


class Arena:
    def __init__(self, width: int, height: int):
        self.rect = pygame.Rect(0, 0, width, height)

    def clamp(self, fighter: "Fighter") -> None:
        fighter.rect.clamp_ip(self.rect)
        fighter.position = Vector2(fighter.rect.center)

    def draw(self, surface: pygame.Surface) -> None:
        surface.fill((30, 30, 30))
