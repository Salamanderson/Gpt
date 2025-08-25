import json
from pathlib import Path
from typing import List
from fighter import Fighter


def load_fighters(path: Path) -> List[Fighter]:
    fighters = []
    for file in path.glob("*.json"):
        with open(file) as fh:
            config = json.load(fh)
        fighters.append(Fighter.from_config(config))
    return fighters
