# 📊 STATE-TRACKING JSON v3.2

## Verwendungszweck

Dieses Template definiert das **JSON-Schema** für maschinenlesbares State-Tracking.  
Der DM generiert und aktualisiert diesen JSON-Block **intern** zwischen den Runden.  
Für den **Spieler** wird nur die visuelle "Statusbox" gerendert.

---

## 🔧 JSON-SCHEMA (Vollständig)

```json
{
  "meta": {
    "version": "3.2",
    "session_id": "string",
    "location": "string",
    "scene_goal": "string",
    "time_pressure": {
      "active": false,
      "rounds_remaining": null,
      "consequence": null
    },
    "environment": {
      "lighting": "normal|dim|dark",
      "terrain_notes": []
    },
    "round_counter": 0,
    "combat_active": false,
    "initiative_order": "standard|player_surprise|enemy_surprise"
  },
  
  "party": {
    "gold": 0,
    "characters": [
      {
        "id": "coru",
        "name": "Coru",
        "type": "player",
        "hp": {
          "current": 4,
          "max": 4
        },
        "mp": {
          "current": 1,
          "max": 1
        },
        "position": {
          "x": 0,
          "y": 0
        },
        "status": [],
        "slots_quick": [
          {"slot": 1, "item": "Dietriche", "uses": null},
          {"slot": 2, "item": "Heiltrank", "uses": 1},
          {"slot": 3, "item": "Rauchbombe", "uses": 1}
        ],
        "slots_bag": [
          {"slot": 1, "item": null},
          {"slot": 2, "item": null},
          {"slot": 3, "item": null},
          {"slot": 4, "item": null},
          {"slot": 5, "item": null},
          {"slot": 6, "item": null},
          {"slot": 7, "item": null},
          {"slot": 8, "item": null},
          {"slot": 9, "item": null},
          {"slot": 10, "item": null}
        ],
        "armor_equipped": null,
        "abilities": [
          {
            "name": "Ablenkungsmanöver",
            "cooldown_current": 0,
            "cooldown_max": 2,
            "ready": true
          },
          {
            "name": "Dämonenklaue",
            "cooldown_current": 0,
            "cooldown_max": 3,
            "ready": true
          },
          {
            "name": "Übernahme",
            "cooldown_current": 0,
            "cooldown_max": "scene",
            "ready": true
          }
        ],
        "active_effects": [],
        "strengths": ["Lockpicking", "Humor/Improvisation"],
        "weakness": "Schwaches Sozialgespür"
      },
      {
        "id": "pip",
        "name": "Pip",
        "type": "companion",
        "hp": {
          "current": 4,
          "max": 4
        },
        "mp": {
          "current": 1,
          "max": 1
        },
        "position": {
          "x": 0,
          "y": 0
        },
        "status": [],
        "slots_quick": [
          {"slot": 1, "item": "Werkzeugset", "uses": null},
          {"slot": 2, "item": "Rauchbombe", "uses": 1},
          {"slot": 3, "item": null}
        ],
        "slots_bag": [
          {"slot": 1, "item": null},
          {"slot": 2, "item": null},
          {"slot": 3, "item": null},
          {"slot": 4, "item": null},
          {"slot": 5, "item": null},
          {"slot": 6, "item": null},
          {"slot": 7, "item": null},
          {"slot": 8, "item": null},
          {"slot": 9, "item": null},
          {"slot": 10, "item": null}
        ],
        "armor_equipped": null,
        "abilities": [
          {
            "name": "Provisorische Falle",
            "cooldown_current": 0,
            "cooldown_max": 2,
            "ready": true
          },
          {
            "name": "Ablenkungsgerät",
            "cooldown_current": 0,
            "cooldown_max": "scene",
            "ready": true
          },
          {
            "name": "Notfall-Reparatur",
            "cooldown_current": 0,
            "cooldown_max": 2,
            "ready": true
          }
        ],
        "active_effects": [],
        "strengths": ["Mechanik/Basteln", "Optimismus"],
        "weakness": "Größe"
      }
    ]
  },
  
  "enemies": [
    {
      "id": "enemy_1",
      "name": "Ork A",
      "symbol": "🔺",
      "hp": {
        "current": 3,
        "max": 3
      },
      "position": {
        "x": 0,
        "y": 0
      },
      "status": [],
      "tactic": "aggressive",
      "special": null,
      "loot": []
    }
  ],
  
  "npcs": [
    {
      "id": "npc_1",
      "name": "Händler",
      "symbol": "⚪",
      "position": {
        "x": 0,
        "y": 0
      },
      "disposition": "neutral",
      "notes": ""
    }
  ],
  
  "objects": [
    {
      "id": "obj_1",
      "name": "Truhe",
      "symbol": "📦",
      "position": {
        "x": 0,
        "y": 0
      },
      "interactable": true,
      "locked": true,
      "contents": []
    }
  ],
  
  "narrative": {
    "events_this_session": [],
    "discovered_secrets": [],
    "open_threads": [],
    "consequences_pending": []
  }
}
```

---

## 📋 DATENTYPEN-REFERENZ

### Status-Werte (für `status` Arrays)

```json
["betäubt", "erschrocken", "verwirrt", "tot", "vergiftet", "blutend"]
```

### Taktik-Werte (für Feinde)

```json
["aggressive", "defensive", "ranged", "support", "flee_when_hurt", "guard_position"]
```

### Disposition-Werte (für NPCs)

```json
["hostile", "unfriendly", "neutral", "friendly", "allied"]
```

### Initiative-Order

```json
["standard", "player_surprise", "enemy_surprise"]
```

---

## 🔄 UPDATE-OPERATIONEN

### HP-Änderung

```json
// VORHER
"hp": {"current": 4, "max": 4}

// NACH SCHADEN (1 HP)
"hp": {"current": 3, "max": 4}

// Log-Entry für narrative.events_this_session
{"type": "damage", "target": "coru", "amount": 1, "source": "Ork A"}
```

### Cooldown-Update (Rundenende)

```javascript
// Pseudo-Code für Cooldown-Reduktion
for (ability in character.abilities) {
  if (ability.cooldown_current > 0) {
    ability.cooldown_current -= 1;
  }
  ability.ready = (ability.cooldown_current === 0);
}
```

### Fähigkeit nutzen

```json
// VORHER
{"name": "Dämonenklaue", "cooldown_current": 0, "cooldown_max": 3, "ready": true}

// NACHHER
{"name": "Dämonenklaue", "cooldown_current": 3, "cooldown_max": 3, "ready": false}
```

### Item verbrauchen

```json
// VORHER
{"slot": 2, "item": "Heiltrank", "uses": 1}

// NACHHER
{"slot": 2, "item": null, "uses": null}
```

### Gold-Änderung

```json
// VORHER
"gold": 15

// NACH KAUF (5 Gold ausgegeben)
"gold": 10

// Log-Entry
{"type": "gold_change", "amount": -5, "reason": "Heiltrank gekauft"}
```

---

## 📊 RENDERING: JSON → Visuelle Statusbox

Der DM konvertiert den JSON-State in die visuelle Darstellung für den Spieler:

### Konvertierungs-Algorithmus (Pseudo-Code)

```javascript
function renderStatusBox(state) {
  let output = "";
  
  // Party-Charaktere
  for (char of state.party.characters) {
    const symbol = char.type === "player" ? "🟢" : "🟡";
    const hpBar = renderHP(char.hp.current, char.hp.max);
    const items = char.slots_quick.map(s => s.item || "⬜").join(", ");
    const status = char.status.length > 0 ? char.status.join(" ") : "";
    
    output += `${symbol} ${char.name} | ❤️ ${hpBar} | 💎 ${char.mp.current} MP | ⚡ ${items} ${status}\n`;
    
    // Fähigkeiten
    const abilities = char.abilities.map(a => 
      a.ready ? `${a.name} ✓` : `${a.name} 🔄(${a.cooldown_current})`
    ).join(" | ");
    output += `• ${abilities}\n\n`;
  }
  
  // Party-Gold
  output += `💰 Party-Gold: ${state.party.gold}\n\n`;
  
  // Feinde
  for (enemy of state.enemies) {
    if (enemy.hp.current > 0) {
      const hpBar = renderEnemyHP(enemy.hp.current, enemy.hp.max);
      const status = enemy.status.length > 0 ? enemy.status.join(" ") : "";
      output += `${enemy.symbol} ${enemy.name} | ❤️ ${hpBar} | ${status}\n`;
    }
  }
  
  return output;
}

function renderHP(current, max) {
  return "🟩".repeat(current) + "⬜".repeat(max - current);
}

function renderEnemyHP(current, max) {
  return "🟥".repeat(current) + "⬜".repeat(max - current);
}
```

### Beispiel-Output

```
🟢 Coru | ❤️ 🟩🟩🟩⬜ | 💎 1 MP | ⚡ Dietriche, Heiltrank, Rauchbombe
• Ablenkungsmanöver ✓ | Dämonenklaue 🔄(2) | Übernahme ✓

🟡 Pip | ❤️ 🟩🟩🟩🟩 | 💎 1 MP | ⚡ Werkzeugset, Rauchbombe, ⬜
• Provisorische Falle ✓ | Ablenkungsgerät ✓ | Notfall-Reparatur 🔄(1)

💰 Party-Gold: 25

🔺 Ork A | ❤️ 🟥🟥⬜ | Aggressiv
🔻 Ork B | ❤️ 🟥⬜⬜ | 💫 Betäubt
```

---

## ✅ VALIDIERUNGS-REGELN

### Pflichtfelder

```javascript
// Diese Felder müssen IMMER existieren
required_fields = [
  "meta.version",
  "meta.location",
  "meta.combat_active",
  "party.gold",
  "party.characters[].hp.current",
  "party.characters[].hp.max",
  "party.characters[].slots_quick"
]
```

### Wertebereiche

```javascript
// HP kann nicht unter 0 oder über max fallen
assert(character.hp.current >= 0);
assert(character.hp.current <= character.hp.max);

// Gold kann nicht negativ sein
assert(state.party.gold >= 0);

// Cooldowns sind 0 oder positiv
assert(ability.cooldown_current >= 0);

// Schnellzugriff hat genau 3 Slots
assert(character.slots_quick.length === 3);

// Gepäck hat genau 10 Slots
assert(character.slots_bag.length === 10);
```

---

## 🔄 STATE-UPDATE PROTOKOLL

### Nach jeder Spieler-Aktion checken:

```
☑ HP geändert?        → hp.current updaten
☑ Fähigkeit genutzt?  → cooldown_current setzen, ready = false
☑ Item genutzt?       → Slot auf null setzen
☑ Item erhalten?      → Freien Slot finden, Item eintragen
☑ Gold geändert?      → party.gold updaten
☑ Position geändert?  → position.x/y updaten
☑ Status geändert?    → status Array updaten
☑ Runde vorbei?       → Alle Cooldowns -1, round_counter +1
```

### Nach Kampfende:

```
☑ combat_active = false
☑ Alle temporären Status entfernen
☑ Besiegte Feinde aus enemies Array entfernen (oder hp.current = 0)
☑ Beute zu objects oder party.gold hinzufügen
```

---

## 📥 IMPORT/EXPORT

### Session speichern (für Campaign Chronicle)

```json
{
  "session_summary": {
    "date": "2025-01-15",
    "final_state": { /* kompletter JSON-State */ },
    "key_events": [
      "Taverne betreten",
      "Orks besiegt",
      "Schlüssel gefunden"
    ],
    "gold_change": "+15",
    "hp_changes": {
      "coru": {"start": 4, "end": 3},
      "pip": {"start": 4, "end": 4}
    }
  }
}
```

### Session laden (für Fortsetzung)

```javascript
function loadSession(savedState) {
  // Validierung
  if (savedState.meta.version !== "3.2") {
    throw new Error("Version mismatch");
  }
  
  // State wiederherstellen
  currentState = savedState;
  
  // Rast-Reset falls neue Session
  if (isNewSession) {
    resetAllCooldowns(currentState);
    currentState.meta.round_counter = 0;
  }
}
```

---

## 💡 TIPPS FÜR KONSISTENZ

1. **JSON vor Antwort prüfen** - State intern validieren
2. **Änderungen atomar** - Alle Updates einer Aktion zusammen durchführen
3. **Log-Einträge schreiben** - Für narrative.events_this_session
4. **Bei Unsicherheit: State lesen** - Nicht raten, nachschauen
5. **Backup bei kritischen Momenten** - Vor Boss-Kampf State merken

---

## 📋 BEISPIEL: Vollständiger State nach Kampfrunde

```json
{
  "meta": {
    "version": "3.2",
    "session_id": "session_001",
    "location": "Verlassene Taverne",
    "scene_goal": "Orks besiegen, Schlüssel holen",
    "time_pressure": {"active": false},
    "environment": {"lighting": "dim", "terrain_notes": ["Tische als Deckung"]},
    "round_counter": 3,
    "combat_active": true,
    "initiative_order": "standard"
  },
  "party": {
    "gold": 25,
    "characters": [
      {
        "id": "coru",
        "name": "Coru",
        "type": "player",
        "hp": {"current": 3, "max": 4},
        "mp": {"current": 1, "max": 1},
        "position": {"x": 6, "y": 5},
        "status": [],
        "slots_quick": [
          {"slot": 1, "item": "Dietriche", "uses": null},
          {"slot": 2, "item": "Heiltrank", "uses": 1},
          {"slot": 3, "item": null}
        ],
        "slots_bag": [],
        "abilities": [
          {"name": "Ablenkungsmanöver", "cooldown_current": 0, "cooldown_max": 2, "ready": true},
          {"name": "Dämonenklaue", "cooldown_current": 2, "cooldown_max": 3, "ready": false},
          {"name": "Übernahme", "cooldown_current": 0, "cooldown_max": "scene", "ready": true}
        ]
      }
    ]
  },
  "enemies": [
    {
      "id": "ork_a",
      "name": "Ork A",
      "symbol": "🔺",
      "hp": {"current": 1, "max": 3},
      "position": {"x": 8, "y": 3},
      "status": [],
      "tactic": "aggressive",
      "loot": ["🗝️ Kellerschlüssel"]
    },
    {
      "id": "ork_b",
      "name": "Ork B",
      "symbol": "🔻",
      "hp": {"current": 0, "max": 3},
      "position": {"x": 10, "y": 3},
      "status": ["tot"],
      "tactic": "defensive",
      "loot": []
    }
  ],
  "narrative": {
    "events_this_session": [
      {"type": "combat_start", "enemies": ["Ork A", "Ork B"]},
      {"type": "ability_used", "character": "coru", "ability": "Dämonenklaue"},
      {"type": "damage", "target": "ork_a", "amount": 2, "source": "Dämonenklaue"},
      {"type": "item_used", "character": "coru", "item": "Rauchbombe"},
      {"type": "enemy_defeated", "enemy": "Ork B"}
    ]
  }
}
```

---

**🔧 Mit diesem JSON-Schema bleibt der State konsistent und maschinenlesbar! 📊**
