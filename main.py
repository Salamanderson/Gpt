import argparse
import os
from pathlib import Path

import pygame

from arena import Arena
from fighter_creator import load_fighters
from ai import AIController


def main() -> None:
    parser = argparse.ArgumentParser(description="Simple 2D combat simulator")
    parser.add_argument("--steps", type=int, default=300, help="simulation steps to run")
    parser.add_argument("--headless", action="store_true", help="run without opening a window")
    args = parser.parse_args()

    if args.headless:
        os.environ["SDL_VIDEODRIVER"] = "dummy"

    pygame.init()
    size = (640, 480)
    screen = pygame.display.set_mode(size) if not args.headless else pygame.Surface(size)
    clock = pygame.time.Clock()
    arena = Arena(*size)
    fighters = load_fighters(Path("fighters"))
    ai = AIController()
    step = 0
    running = True
    while running and step < args.steps:
        dt = clock.tick(60) / 1000.0
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        for f in fighters:
            opponents = [o for o in fighters if o is not f and o.hp > 0]
            ai.decide(f, opponents, arena)
            f.update(dt, arena)
        arena.draw(screen)
        for f in fighters:
            screen.blit(f.sprite, f.rect)
        if not args.headless:
            pygame.display.flip()
        step += 1
    pygame.quit()


if __name__ == "__main__":
    main()
