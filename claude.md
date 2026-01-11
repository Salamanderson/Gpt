# Claude.md - Dungeons & Decisions Projekt-Referenz

## 📋 Projekt-Übersicht

**Dungeons & Decisions** ist ein deutschsprachiges Solo-RPG-System für Claude AI als Dungeon Master.
- **Typ**: Dokumentations-Projekt (kein Code)
- **Version**: v3.2
- **Sprache**: Deutsch (mit englischen Fachbegriffen)
- **Kernmechanik**: 1d6-Würfelsystem, narrativ-fokussiert

---

## 📁 Datei-Zuständigkeiten & Hierarchie

### 🔴 PRIORITÄT 1 - Kernsystem (Änderungen hier = kritisch)

#### **Dungeons_and_Decisions_v3_2.txt**
**Zuständig für**: Vollständiges Regelwerk (§0 - §10)
- Kampfsystem (Würfe, HP, Schaden, Initiative)
- Charaktererstellung (Stärken, Schwächen, Fähigkeiten)
- Bewegungssystem (Kino-Logik)
- Soziale Begegnungen
- Inventarsystem (Grundregeln)
- Tod & Wiederbelebung
- Partiegold & Liquidation

**Abhängigkeiten**:
- ⚠️ **Bei Regeländerungen IMMER aktualisieren**: `DUNGEON_MASTER_PROMPT_v3_2.md`
- ⚠️ **Bei Kampfregeln-Änderungen prüfen**: `CHARAKTERKARTEN_FORMAT_v3_2.md` (Fähigkeiten-Format)
- ⚠️ **Bei Inventar-Änderungen prüfen**: `ITEM_SYSTEM.md`
- ⚠️ **Bei neuen Zuständen prüfen**: `STATE_TRACKING_JSON.md`

**Cross-Reference-System**: `§X.Y` (z.B. §2.1, §5.3)

---

#### **DUNGEON_MASTER_PROMPT_v3_2.md**
**Zuständig für**: System-Prompt für Claude als Dungeon Master
- Format-Vorgaben (FORMAT-KAINE: Text → Würfel → Karte → Status)
- Dokumenten-Hierarchie (welche Datei bei Konflikten gewinnt)
- Rollenspielvorgaben (Erzählstil, Verhalten)
- Emoji-Standards (🟢🟡🔺)
- Tool-Usage (`rpg-dice-roller`)

**Abhängigkeiten**:
- ✅ **Muss referenzieren**: Alle §-Regeln aus `Dungeons_and_Decisions_v3_2.txt`
- ✅ **Muss inkludieren**: Änderungen an `MAP_GENERATOR_SKILL.md` (Map-Format)
- ✅ **Muss inkludieren**: Änderungen an `STATE_TRACKING_JSON.md` (Status-Format)
- ⚠️ **Bei neuen Subsystemen**: Hierarchie-Liste erweitern

**Regel**: Diese Datei ist die **"Verfassung"** - bei Konflikten gewinnt sie immer.

---

### 🟠 PRIORITÄT 2 - Subsysteme (spezifische Mechaniken)

#### **MAP_GENERATOR_SKILL.md**
**Zuständig für**: Karten-Generierung
- Symbol-Bibliothek (Terrain, Objekte, Kreaturen)
- Layer-System (Basis, Deko, Entities)
- Building-Regeln (kein Float, Positionsvalidierung)
- Beispiel-Maps mit Annotationen

**Abhängigkeiten**:
- ⚠️ **Bei Symbol-Änderungen**: `DUNGEON_MASTER_PROMPT_v3_2.md` aktualisieren (Emoji-Liste)
- ⚠️ **Bei neuen Regeln**: §M.X-Referenzen in `Dungeons_and_Decisions_v3_2.txt` hinzufügen
- ⚠️ **Bei Format-Änderungen**: Alle Beispiel-Maps in dieser Datei aktualisieren

**Cross-Reference-System**: `§M.X` (z.B. §M.1 für Layer-Regeln)

---

#### **ITEM_SYSTEM.md**
**Zuständig für**: Inventar & Wirtschaft
- Quick-Access (3 Slots, kampftauglich)
- Rucksack (10 Slots)
- Partiegold (geteilte Wirtschaft)
- Liquidation (15% Rückverkaufswert)
- Item-Beispiele (Waffen, Rüstungen, Verbrauchsgegenstände)

**Abhängigkeiten**:
- ⚠️ **Bei Slot-Änderungen**: `CHARAKTERKARTEN_FORMAT_v3_2.md` (Inventar-Sektion)
- ⚠️ **Bei Gold-Mechanik-Änderungen**: `Dungeons_and_Decisions_v3_2.txt` §8 (Wirtschaft)
- ⚠️ **Bei neuen Item-Typen**: Beispiele in `session_skizze_v3_2.md` hinzufügen

**Cross-Reference-System**: `§I.X` (z.B. §I.2 für Quick-Access)

---

#### **STATE_TRACKING_JSON.md**
**Zuständig für**: Spiel-Zustand als JSON
- Charakter-Daten (HP, MP, Cooldowns)
- Inventar-Tracking
- Quest-Fortschritt
- Szenen-Status
- Partiegold

**Abhängigkeiten**:
- ⚠️ **Bei neuen Zuständen**: `Dungeons_and_Decisions_v3_2.txt` §4 (Zustände wie Stunned, Frightened)
- ⚠️ **Bei Charakterbogen-Änderungen**: `CHARAKTERKARTEN_FORMAT_v3_2.md` synchronisieren
- ⚠️ **Bei Inventar-Schema-Änderungen**: `ITEM_SYSTEM.md` prüfen

**Cross-Reference-System**: `§S.X` (z.B. §S.1 für Charakter-Schema)

---

### 🟢 PRIORITÄT 3 - Referenzen & Templates

#### **CHARAKTERKARTEN_FORMAT_v3_2.md**
**Zuständig für**: Charakter-Templates
- Standard-Charakterbogen-Aufbau
- Pflicht-Sektionen (Name, Konzept, HP/MP, Stärken/Schwächen)
- Fähigkeiten-Format (Cooldown, Beschreibung)
- Inventar-Layout

**Abhängigkeiten**:
- ⚠️ **Bei Regel-Änderungen**: Muss mit `Dungeons_and_Decisions_v3_2.txt` §1 (Charaktererstellung) konsistent sein
- ⚠️ **Bei neuen Charakteren**: Template nutzen für `*_charakterkarte.md`
- ⚠️ **Bei Inventar-Änderungen**: Mit `ITEM_SYSTEM.md` synchronisieren

---

#### **WORLD_SETTING.md**
**Zuständig für**: Spielwelt Artapea
- Geografie (Obsedia, Ferrum Ash Wastes, etc.)
- Fraktionen (Purified Order, Thief Barons, Blood Weavers, etc.)
- Technologie-Level (Mittelalter + seltene Tech)
- Magie-System (Tech-mechanisch, Eidolons)
- Tonalität (düster, gritty, low-magic)

**Abhängigkeiten**:
- ⚠️ **Bei neuen Fraktionen**: In `session_skizze_v3_2.md` als mögliche NPCs erwähnen
- ⚠️ **Bei Lore-Änderungen**: `DUNGEON_MASTER_PROMPT_v3_2.md` (Erzählstil-Hinweise) prüfen
- ⚠️ **Bei Eidolon-Änderungen**: Beispiel-Charakter `CORU_Charakterkarte.md` (Dämonenpakt) prüfen

---

#### **session_skizze_v3_2.md**
**Zuständig für**: Abenteuer-Planung
- Session-Template (Quest-Struktur)
- NPC-Liste
- Loot-Verteilung
- Encounter-Design
- Story-Beats

**Abhängigkeiten**:
- ⚠️ **Bei Quest-Erstellung**: `WORLD_SETTING.md` für Fraktionen/Locations nutzen
- ⚠️ **Bei Encounter-Design**: `Dungeons_and_Decisions_v3_2.txt` §2 (Kampfregeln) beachten
- ⚠️ **Bei Loot-Verteilung**: `ITEM_SYSTEM.md` für Item-Beispiele nutzen

---

#### **Beispiel-Charaktere** (CORU_Charakterkarte.md, pip_charakterkarte.md, siles_charakterkarte.md)
**Zuständig für**: Spielbare Referenz-Charaktere
- Zeigen korrektes Charakterbogen-Format
- Beispiel-Fähigkeiten mit Cooldowns
- Inventar-Beispiele
- Persönlichkeits-Beschreibungen

**Abhängigkeiten**:
- ⚠️ **Bei Format-Änderungen**: `CHARAKTERKARTEN_FORMAT_v3_2.md` als Master-Template nutzen
- ⚠️ **Bei Regel-Updates**: Fähigkeiten auf §-Konsistenz prüfen
- ⚠️ **Bei neuen Charakteren**: Template kopieren und anpassen

---

## 🔄 Änderungs-Workflows

### Szenario 1: Neue Kampfregel hinzufügen
```
1. Dungeons_and_Decisions_v3_2.txt → §X.Y-Nummer vergeben
2. DUNGEON_MASTER_PROMPT_v3_2.md → Regel in Hierarchie erwähnen
3. CHARAKTERKARTEN_FORMAT_v3_2.md → Falls betroffen (z.B. neue Fähigkeit)
4. Beispiel-Charaktere → Optional: Beispiel-Fähigkeit hinzufügen
```

### Szenario 2: Map-System erweitern
```
1. MAP_GENERATOR_SKILL.md → Neue Symbole/Regeln (§M.X)
2. MAP_GENERATOR_SKILL.md → Beispiel-Maps aktualisieren
3. DUNGEON_MASTER_PROMPT_v3_2.md → Emoji-Liste erweitern
4. Dungeons_and_Decisions_v3_2.txt → §3 (Karten) Cross-Reference hinzufügen
```

### Szenario 3: Inventarsystem ändern
```
1. ITEM_SYSTEM.md → Regeln anpassen (§I.X)
2. Dungeons_and_Decisions_v3_2.txt → §8 (Wirtschaft) synchronisieren
3. CHARAKTERKARTEN_FORMAT_v3_2.md → Inventar-Layout prüfen
4. STATE_TRACKING_JSON.md → JSON-Schema anpassen
5. Beispiel-Charaktere → Inventar-Beispiele aktualisieren
```

### Szenario 4: Neuen Charakter erstellen
```
1. CHARAKTERKARTEN_FORMAT_v3_2.md → Template kopieren
2. Neue Datei: NAME_charakterkarte.md
3. Dungeons_and_Decisions_v3_2.txt → §1 Regeln befolgen (4 HP, 1 MP, 2 Stärken, etc.)
4. WORLD_SETTING.md → Falls Fraktion/Background relevant
5. session_skizze_v3_2.md → Optional: Charakter in Party-Liste
```

### Szenario 5: Welt-Lore erweitern
```
1. WORLD_SETTING.md → Neue Fraktion/Location hinzufügen
2. session_skizze_v3_2.md → In NPC/Encounter-Beispiele integrieren
3. DUNGEON_MASTER_PROMPT_v3_2.md → Falls neuer Erzähl-Stil benötigt
```

### Szenario 6: Version-Update (z.B. v3.2 → v3.3)
```
1. Alle v3_2-Dateien umbenennen → v3_3
2. Dungeons_and_Decisions_v3_3.txt → Changelog am Anfang ergänzen
3. DUNGEON_MASTER_PROMPT_v3_3.md → Neue Version-Nummer überall
4. CHARAKTERKARTEN_FORMAT_v3_3.md → Template aktualisieren
5. session_skizze_v3_3.md → Template aktualisieren
6. README → Falls vorhanden, Version-Info aktualisieren
```

---

## 🚫 Kritische Regeln

### NIEMALS:
- ❌ Maps ohne `MAP_GENERATOR_SKILL.md`-Validierung erstellen
- ❌ Regeln ohne §-Referenz hinzufügen
- ❌ Charakterbogen-Format brechen (4 HP, 1 MP, max 3 Fähigkeiten)
- ❌ Cross-References entfernen (§X → §Y Verknüpfungen)
- ❌ Emoji-Standards ignorieren (🟢🟡🔺)
- ❌ Sprachkonsistenz brechen (Deutsch außer Fachbegriffe)

### IMMER:
- ✅ Bei Regel-Änderungen: Alle §-Referenzen in anderen Dateien prüfen
- ✅ Bei Map-Änderungen: Symbol-Validierung durchführen
- ✅ Bei Charakter-Änderungen: Template-Konsistenz prüfen
- ✅ Bei Subsystem-Änderungen: `DUNGEON_MASTER_PROMPT_v3_2.md` aktualisieren
- ✅ Beispiele für neue Mechaniken hinzufügen
- ✅ Dokumenten-Hierarchie respektieren (Prompt > Regelwerk > Subsysteme)

---

## 🔍 Cross-Reference-System

| Präfix | Datei | Beispiel | Bedeutung |
|--------|-------|----------|-----------|
| `§X.Y` | Dungeons_and_Decisions_v3_2.txt | `§2.1` | Kampfregeln |
| `§M.X` | MAP_GENERATOR_SKILL.md | `§M.3` | Map-Layer-System |
| `§I.X` | ITEM_SYSTEM.md | `§I.2` | Quick-Access-Regeln |
| `§S.X` | STATE_TRACKING_JSON.md | `§S.1` | Charakter-Schema |

**Verwendung**: Beim Hinzufügen von Regeln IMMER §-Nummer vergeben und in anderen Dateien referenzieren.

---

## 📊 Dokumenten-Hierarchie (bei Konflikten)

```
1. DUNGEON_MASTER_PROMPT_v3_2.md (höchste Priorität)
   ↓
2. Dungeons_and_Decisions_v3_2.txt
   ↓
3. Subsysteme (MAP, ITEM, STATE)
   ↓
4. Templates (CHARAKTERKARTEN_FORMAT)
   ↓
5. Referenzen (WORLD_SETTING, Beispiel-Charaktere)
```

**Regel**: Bei widersprüchlichen Informationen gewinnt immer die höhere Ebene.

---

## 🎯 Qualitätssicherung vor Commits

### Checklist:
- [ ] Alle §-Referenzen aktualisiert?
- [ ] `DUNGEON_MASTER_PROMPT_v3_2.md` synchron mit Regeländerungen?
- [ ] Sprachkonsistenz gewahrt (Deutsch, klare Fachbegriffe)?
- [ ] Bei Map-Änderungen: Symbol-Validierung durchgeführt?
- [ ] Bei Charakter-Änderungen: Template-Format befolgt?
- [ ] Cross-References vollständig (§X → §Y)?
- [ ] Beispiele für neue Mechaniken hinzugefügt?

---

## 🔧 Technische Besonderheiten

- **Kein Code**: Reines Dokumentations-Projekt
- **Tools**: Nur `rpg-dice-roller` (für DM-Sessions)
- **Versionierung**: Git-basiert mit Feature-Branches
- **Branch-Konvention**: `claude/beschreibung-XXXXX`
- **Sprache**: Deutsch (Commits, Docs, Regeln)

---

## 🌍 Welt-Kontext (Quick-Reference)

**Artapea** - Sterbendes Imperium
- **Ton**: Düster, gritty, korrupt
- **Magie**: Tech-mechanisch, selten
- **Fraktionen**: Purified Order, Thief Barons, Blood Weavers, The Levelers
- **Key Locations**: Obsedia (Piraten), Ferrum Ash Wastes (Industrie-Hölle)
- **Besonderheit**: Eidolons (Dämonen-Götter, die Sterbliche besitzen)

---

**Version**: v3.2 | **Letzte Aktualisierung**: 2026-01-11
