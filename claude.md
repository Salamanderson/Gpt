# Dungeons & Decisions v3.2 - Projektkontext für Claude

## Projekttyp
Dokumentbasiertes Solo-Tabletop-RPG-System auf Deutsch, designed für AI-gestütztes Gameplay (Claude als Dungeon Master).

## Dokumenthierarchie (bei Regelkonflikten)
1. **16 Kritische Regeln** (in DUNGEON_MASTER_PROMPT_v3_2.md)
2. **Dungeons_and_Decisions_v3_2.txt** - Kernregelwerk
3. **MAP_GENERATOR_SKILL.md** - Kartenregeln
4. **ITEM_SYSTEM.md** - Gegenstände & Handel
5. **STATE_TRACKING_JSON.md** - Zustandsmanagement
6. **WORLD_SETTING.md** - Weltlore
7. **Charakterkarten** - Spielerdaten
8. **session_skizze_v3_2.md** - Session-Planung

## WICHTIGSTE REGELN (für alle LLMs!)

### Session-Skizze ist VERBINDLICH
- **ALLE Felder MÜSSEN ausgefüllt werden** - keine Lücken!
- **KEINE Improvisation** - alles VOR dem Spiel vorbereiten
- **Das Spiel folgt der Skizze** - nicht umgekehrt

### Verbotene Ausreden
Diese Begründungen sind UNGÜLTIG:
- ❌ "Für mehr Spielfreiheit offen gelassen"
- ❌ "Wird während des Spiels improvisiert"
- ❌ "Details nicht wichtig für die Geschichte"
- ❌ "Die Map improvisiere ich"

### MAP-DATEN Pflicht
- **Jede Location braucht MAP-DATEN** in der Session-Skizze
- **Karten werden aus MAP-DATEN generiert** - nicht improvisiert
- **Bei neuer Location:** Erst MAP-DATEN definieren, dann Karte erstellen

## Zitationssystem
- **§X.X** - Regelwerk-Zitate (z.B. §2.1 für Würfelsystem)
- **MAP §M.X** - Kartenregeln (z.B. MAP §M.2 für Symbole)
- **ITEM §I.X** - Item-System (z.B. ITEM §I.3 für Handel)
- **STATE §S.X** - State-Tracking (z.B. STATE §S.1 für JSON-Schema)

## Dateiübersicht

### Kernregeln
| Datei | Inhalt |
|-------|--------|
| `Dungeons_and_Decisions_v3_2.txt` | Komplettes Regelwerk (Würfel, Kampf, Status) |
| `DUNGEON_MASTER_PROMPT_v3_2.md` | DM-Anweisungen, kritische Regeln |

### Welt & Setting
| Datei | Inhalt |
|-------|--------|
| `WORLD_SETTING.md` | Welt "Artapea", 5 Fraktionen, Lore |

### Charaktere
| Datei | Charakter |
|-------|-----------|
| `CHARAKTERKARTEN_FORMAT_v3_2.md` | Template-Spezifikation |
| `CORU_Charakterkarte.md` | Dämon-Schurke (Spieler) |
| `pip_charakterkarte.md` | Zwerg-Erfinder (Spieler) |
| `siles_charakterkarte.md` | Wahrheitssänger (Support) |

### Systeme
| Datei | System |
|-------|--------|
| `ITEM_SYSTEM.md` | Inventar, Handel, Preise |
| `STATE_TRACKING_JSON.md` | JSON-Schema für Spielzustand |
| `MAP_GENERATOR_SKILL.md` | Kartengeneration & Symbole |

### Session-Management
| Datei | Inhalt |
|-------|--------|
| `session_skizze_v3_2.md` | Session-Planungsvorlage |

## Wichtige Spielmechaniken

### Charakterwerte
- **HP:** 4 pro Charakter
- **MP (Mut):** 1 pro Session
- **Inventar:** 3 Quick-Access + 10 Rucksack Slots
- **Gold:** Geteilter Party-Pool

### Würfelsystem (1d6)
| Wurf | Ergebnis |
|------|----------|
| 6 | Kritischer Erfolg |
| 5 | Voller Erfolg |
| 4 | Teilerfolg |
| 3 | Knapper Misserfolg |
| 2 | Misserfolg |
| 1 | Kritischer Fehlschlag + Strafe |

### Modifikatoren
- **+1:** Passende Stärke oder passendes Item
- **-1:** Passende Schwäche oder schwieriges Terrain

## Kartengeneration (MAP_GENERATOR_SKILL.md)

### Layer-System (Render-Priorität)
1. **Statisch:** Terrain, Strukturen (ändert sich nie)
2. **Semi-Statisch:** Türen, Behälter (nur bei Interaktion)
3. **Dynamisch:** Charaktere, Effekte (jede Runde)

### Wichtige Symbole
- 🟢 Spieler | 🟡 Verbündeter | 🔴 Boss | ♦️ Feind
- ▪️ Boden | ⬜ Wand | 🚪 Tür | 🔥 Feuer
- 🌲 Baum | 🔷 Wasser | 📁 Kiste

### Interior vs Exterior
- **Interior:** Umschlossen (Taverne, Höhle) → Hat Wandrahmen ⬜
- **Exterior:** Offen (Markt, Strand) → Keine Wände

## Transparenz-Anforderungen
- Alle Zustandsänderungen explizit zeigen
- Format: `vorher → nachher (+/-X)`
- Würfelwürfe mit Symbolen ankündigen: 🟢🟡🔺

## Entwicklungshinweise

### Branch-Konvention
Feature-Branches: `claude/*`

### Sprache
- Dokumentation: Deutsch
- Technische Begriffe: Englisch erlaubt

### Bei Regeländerungen
1. Hauptregel in `Dungeons_and_Decisions_v3_2.txt` aktualisieren
2. Betroffene Systeme (MAP, ITEM, STATE) synchronisieren
3. Charakterkarten prüfen ob kompatibel
4. Session-Skizze aktualisieren falls nötig

## Häufige Aufgaben

### Neuen Charakter erstellen
1. `CHARAKTERKARTEN_FORMAT_v3_2.md` als Template verwenden
2. 4 HP, 1 MP, 2 Stärken, 1 Schwäche, max 3 Fähigkeiten
3. Fähigkeiten mit Cooldowns definieren

### Neue Session planen
1. `session_skizze_v3_2.md` als Template
2. **ALLE Felder ausfüllen** - keine Lücken!
3. **MAP-DATEN für JEDE Location** definieren (Pflichtbereich!)
4. Encounters mit HP, Taktiken, Schwächen definieren
5. Loot und Gold-Balance planen
6. **Keine Improvisation erlaubt** - alles VOR dem Spiel vorbereiten

### Kartenprobleme debuggen
1. **MAP-DATEN in Session-Skizze prüfen** - sind sie vollständig?
2. Symbole gegen `MAP_GENERATOR_SKILL.md` prüfen
3. Layer-Priorität beachten (Dynamisch > Semi-Statisch > Statisch)
4. Interior/Exterior-Regeln prüfen
5. Karte muss MAP-DATEN 1:1 umsetzen
