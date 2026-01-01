# 🗺️ MAP GENERATOR SKILL v4.1

## ⚡ KRITISCHE REGELN (10 Gebote)

1. ✅ **Map IMMER im Codeblock** – Nur Emojis, keine Beschriftung
2. ✅ **Legende IMMER unter der Map** – Außerhalb des Codeblocks
3. ✅ **Nur Symbole aus Symbol-Bank** – Keine erfundenen Emojis
4. ✅ **Static Template = UNVERÄNDERLICH** – Wird bei Erstellung fixiert
5. ✅ **Template am Ende JEDER Antwort (NUR Intern - nich für User sichtbar)** – Für Persistenz (siehe §TEMPLATE)
6. ✅ **STATE-FIRST Workflow** – JSON vor Karte aktualisieren
7. ✅ **Positionen aus STATE_TRACKING** – JSON ist Wahrheitsquelle
8. ✅ **Bauregeln einhalten** – Siehe Sektion BAUREGELN
9. ✅ **Min. 40% begehbar** – Spieler braucht Bewegungsraum
10. ✅ **Bei Unsicherheit: Fragen** – Positionen klären, nicht raten

---

## 🔄 STATE-FIRST WORKFLOW (NEU in v4.1)

### Das Problem (Warum diese Änderung?)

LLMs haben kein permanentes Gedächtnis. Ohne explizite Persistenz wird die Karte jedes Mal "neu geträumt", wodurch Wände wandern und Layouts inkonsistent werden.

### Die Lösung: Zwei Mechanismen

```
┌─────────────────────────────────────────────────────────────┐
│  1. STATE-FIRST: JSON vor Karte aktualisieren               │
│  2. TEMPLATE-PERSISTENZ: Static Layer am Ende mitführen     │
└─────────────────────────────────────────────────────────────┘
```

### Workflow pro Runde

```
ALTE Reihenfolge (fehlerhaft):
Text → Würfel → Karte → Status → JSON (irgendwann)

NEUE Reihenfolge (korrekt):
Text → Würfel → JSON-UPDATE → Karte (aus Template+JSON) → Status
                    ↑                      ↑
              Positionen            Template kopieren,
              berechnen             Entities einsetzen
```

### Schritt-für-Schritt

```
1. NARRATIVER TEXT
   └─ Geschichte erzählen

2. WÜRFELWURF (falls nötig)
   └─ Ergebnis ermitteln

3. JSON-UPDATE (INTERN)
   ├─ Neue Positionen berechnen
   ├─ HP/Status aktualisieren
   └─ In STATE_TRACKING_JSON eintragen

4. KARTE GENERIEREN
   ├─ Static Template aus vorheriger Antwort KOPIEREN
   ├─ Entity-Positionen aus JSON EINSETZEN
   └─ Fertige Map im Codeblock anzeigen

5. STATUS + TEMPLATE
   ├─ Statusboxen anzeigen
   └─ Static Template am Ende anhängen (NUR Intern - nich für User sichtbar)
```

---

## 📋 TEMPLATE-PERSISTENZ SYSTEM

### Was ist das Static Template?

Das Static Template ist eine **fixierte Kopie** der Karte OHNE dynamische Elemente (Entities).
Es enthält:
- ✅ Terrain (Boden, Wasser, Void)
- ✅ Strukturen (Wände, Säulen)
- ✅ Dekoration (Bäume, Möbel)
- ✅ Semi-Static (Türen, Container) – aktualisiert bei Interaktion
- ❌ KEINE Entities (🟢🟡♦️🛑🟥🔴)

### Template-Format

Am Ende JEDER Antwort (nach Statusboxen) diesen Block einfügen:

```
---
📍 LOCATION-TEMPLATE: [Name]
📐 Größe: [B]x[H]
```
[Static Template hier - NUR kopieren, NIE neu erstellen]
```
🚪 Türen: [Position] = [Zustand]
📦 Container: [Position] = [Zustand]
---
```

### Beispiel Template-Block

```
---
📍 LOCATION-TEMPLATE: Verlassene Taverne
📐 Größe: 12x9
```
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
⬜🔥🔸🔸🔸🔸🔸🔸🔸🔸🕸️⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜🔸🔳🔸🔸🔸🔸🔸🔳🔸🔸⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜🕸️🔸🔸🔳🔸🔸🔳🔸🔸🔸⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸📦⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜⬜⬜⬜⬜🚪⬜⬜⬜⬜⬜⬜
```
🚪 Tür(5,8) = geschlossen
📦 Truhe(10,6) = ungeöffnet
---
```

### Template-Regeln

| Regel | Beschreibung |
|-------|--------------|
| **Kopieren, nie neu erstellen** | Template wird 1:1 aus vorheriger Antwort übernommen |
| **Nur Semi-Static ändert sich** | Tür geöffnet? → 🚪 wird 🔓 im Template |
| **Entities NIE im Template** | 🟢🟡♦️⚪ werden bei Render eingefügt |
| **Bei Location-Wechsel** | Neues Template für neue Location |
| **Bei Rückkehr** | Altes Template aus Chat-Historie suchen |

### Karte aus Template rendern

```
SCHRITT 1: Template kopieren (Zeile für Zeile)

SCHRITT 2: Entity-Positionen aus STATE_TRACKING_JSON lesen
           Coru: {x: 4, y: 7} → Position (4,7)
           Pip:  {x: 6, y: 7} → Position (6,7)
           Ork:  {x: 3, y: 2} → Position (3,2)

SCHRITT 3: Entities in Template einsetzen
           Template[7][4] = 🟢  (überschreibt 🔸)
           Template[7][6] = 🟡  (überschreibt 🔸)
           Template[2][3] = ♦️  (überschreibt 🔸)

SCHRITT 4: Fertiges Grid als Codeblock ausgeben
```

---

## 📚 SYMBOL-BIBLIOTHEK

### ⚠️ NUR DIESE SYMBOLE VERWENDEN!

**TERRAIN (Grundflächen)**
| Symbol | Bedeutung | Begehbar |
|--------|-----------|----------|
| ▪️ | Leer/Void | ✅ |
| ⬜ | Außenwände | ❌ |
| ◽ | Innenwände | ❌ |
| ▫️ | Zäune/niedrige Barrieren | ⚠️ Klettern |
| 🔸 | Grasland/Steinboden/Sand | ✅ |
| 🔶 | Acker | ⚠️ Malus |
| 📗 | Rasen/Gras | ✅ |
| 🔹 | Flaches Wasser | ⚠️ Malus |
| 🔷 | Tiefes Wasser | ❌ |
| 🟫 | (Reserviert) | - |
| 🟧 | Straße/Weg | ✅ |
| 🟩 | Sumpf/Gift | ⚠️ Malus |
| ⬛ | Abgrund/Grube | ❌ |
| 🕳️ | Loch | ❌ |

**VEGETATION**
| Symbol | Bedeutung | Eigenschaft |
|--------|-----------|-------------|
| 🌲 | Nadelbaum | Deckung |
| 🌳 | Laubbaum | Deckung |
| 🌴 | Palme | Deckung |
| 🌿 | Büsche | Halbe Deckung |
| 🪴 | Topfpflanze | Innenraum |
| 🌱 | Gartenpflanzen | Außen |
| 🍄 | Pilze | Deko |
| 🌾 | Gras/Getreide | Deko |
| 🌹 | Blume | Deko |
| 🥀 | Tote Pflanzen | Atmosphäre |
| 🌵 | Kaktus | Schaden bei Kontakt |

**STRUKTUREN & MÖBEL**
| Symbol | Bedeutung | Eigenschaft |
|--------|-----------|-------------|
| 🔳 | Tisch/Barrikade | Deckung |
| 🪑 | Stuhl | Kein Hindernis |
| 🛏️ | Bett | Hindernis |
| 📁 | Kiste/Box | Deckung |
| 🗄️ | Schrank | Deckung |
| 🪜 | Leiter | Interaktiv |
| 🚪 | Geschlossene Tür | Interaktiv |
| 🪟 | Fenster | In Wand |
| 🧱 | Säule/Stein | Deckung |
| ⛩️ | Tor/Portal | Durchgang |
| 🗿 | Statue | Deckung |
| ⚰️ | Sarg | Deckung |
| 🪦 | Grabstein | Deckung |
| ⛲ | Fontäne | Interaktiv |
| ⚖️ | Waage | Deko |
| 🛁 | Wanne | Hindernis |
| ⭐ | Heiliger Altar | Interaktiv |
| 🔔 | Alarm/Glocke | Interaktiv |
| 🪨 | Felsen | Deckung |
| 🪵 | Holz/Baumstamm | Deckung |
| ⛺️ | Zelt | Struktur |

**INTERAKTIVE ELEMENTE**
| Symbol | Bedeutung |
|--------|-----------|
| ➡️ | Durchgang Ost (Wechsel in eine neue Map) |
| ⬅️ | Durchgang West (Wechsel in eine neue Map) |
| ⬆️ | Durchgang Nord (Wechsel in eine neue Map) |
| ⬇️ | Durchgang Süd (Wechsel in eine neue Map) |
| ⤴️ | Treppe aufwärts (Wechsel in eine neue Map) |
| ⤵️ | Treppe abwärts (Wechsel in eine neue Map) |
| 🚫 | Blockiert |
| 🔒 | Verschlossen |
| 🔓 | Geöffnet |
| ⚙️ | Mechanismus/Hebel |
| ⭕ | Ziel/Markierung |

**GEFAHREN & EFFEKTE**
| Symbol | Bedeutung |
|--------|-----------|
| 🔥 | Feuer |
| 💥 | Explosion |
| ⚡ | Elektrizität |
| ❄️ | Eis/Kälte |
| ☠️ | Gift/Gefahr |
| 🕸️ | Spinnweben |
| 💨 | Wind/Luftzug |
| 🌊 | Wellen/Strömung |
| 🕯️ | Kerze/Fackel |
| 💡 | Laterne |
| 🔆 | Helles Licht |

**CHARAKTERE & KREATUREN**
| Symbol | Bedeutung |
|--------|-----------|
| 🟢 | Spieler (Hauptcharakter) |
| 🟡 | Begleiter A |
| 🔵 | Begleiter B |
| ⚪ | Neutraler NPC |
| 🔴 | Boss/Elite |
| ♦️ | Feind A (schwach) | 
| 🛑 | Feind B (schwach) |
| 🟥 | Feind (mittel/stark) |
| 🐺 | Wolf/Hund |
| 🐈 | Katze |
| 🐍 | Schlange |
| 🐖 | Schwein |
| 🐑 | Schaf |
| 🐴 | Pferd |
| 🦜 | Papagei |
| 🦆 | Ente |
| 🐙 | Oktopus |
| 🐉 | Drache |
| 🕷️ | Spinne |
| 👤 | Humanoid |
| 💀 | Skelett/Untot |
| 👻 | Geist |
| 👹 | Dämon/Monster |
| 🤖 | Konstrukt/Golem |

**ITEMS & SCHÄTZE**
| Symbol | Bedeutung |
|--------|-----------|
| 💰 | Gold/Schatz |
| 💎 | Edelstein |
| 🗝️ | Schlüssel |
| 📜 | Schriftrolle |
| 📖 | Buch |
| 🗡️ | Schwert |
| ⚔️ | Gekreuzte Waffen |
| 🛡️ | Schild |
| 🏹 | Bogen |
| 🔪 | Dolch |
| 🪓 | Axt |
| 🔨 | Hammer |
| ⚗️ | Trank |
| 🧪 | Gift/Chemikalien |
| 🥩 | Fleisch |
| 🍞 | Brot |
| 🍺 | Bier |
| 💊 | Heilung |
| 🎒 | Rucksack |
| 🧰 | Werkzeugkiste |

**MAGISCH & MYSTISCH**
| Symbol | Bedeutung |
|--------|-----------|
| ✨ | Magie/Glitzer |
| 🔮 | Kristallkugel |
| 💫 | Magischer Effekt |
| 🌟 | Leuchtender Stern |
| 🔯 | Magisches Symbol |
| ㊗️ | Rune |
| 🎴 | Karte/Tarot |
| ⚱️ | Magische Urne |

**SONSTIGES**
| Symbol | Bedeutung |
|--------|-----------|
| ❓ | Unbekannt |
| ❗ | Wichtig |
| ⁉️ | Besonders wichtig |
| 📍 | Markierung |
| 🎲 | Zufall/Event |
| 🕐 | Zeit/Timer |
| 📢 | Laut/Geräusch |
| 👁️ | Beobachtung |

---

## 🏛️ BAUREGELN

### 📍 PLATZIERUNGS-REGELN (Höchste Priorität)

| ID | Regel | Beschreibung |
|----|-------|--------------|
| P1 | **Spieler-Sicherheit** | 🟢 Spieler NIE in Ecke, NIE direkt neben Feind bei Start |
| P2 | **Begleiter-Nähe** | 🟡🔵 Max. 2 Felder vom Spieler entfernt |
| P3 | **Schatz-Versteck** | 💰 Schätze in Ecken, hinter Hindernissen, nicht im Eingang |
| P4 | **Boss-Raum** | 🔴 Boss hat eigenen Bereich, nicht im Startbereich |


### 🏗️ STRUKTUR-REGELN

| ID | Regel | Beschreibung |
|----|-------|--------------|
| S1 | **Tür-Wand-Regel** | 🚪 Türen ersetzen IMMER eine ⬜ Wand-Position |
| S2 | **Eingangs-Pflicht** | Jedes geschlossene Gebäude min. 1 Eingangstür oder ⬆️⬇️ wenn Innenbereich als neue Karte konzipiert |
| S3 | **Wand-Kontinuität** | Wände bilden zusammenhängende Linien |
| S4 | **Fenster-In-Wand** | 🪟 Fenster ersetzen IMMER eine ⬜ Wand-Position |
| S5 | **Innenraum-Minimum** | Gebäude-Inneres min. 3x3 begehbar |
| S6 | **Säulen-Freistehend** | 🧱 Säulen nicht an Wänden klebend |
| S7 | **Treppen-Zugänglich** | ⤴️⤵️ Treppen beidseitig erreichbar |
| S8 | **Möbel-Logik** | 🛏️ Betten, 🔳 Tische und andere Möbel immer passend für die Art des Räumes platziert.


### 🌍 TERRAIN-REGELN

| ID | Regel | Beschreibung |
|----|-------|--------------|
| T1 | **Wasser-Gradient** | 🔸 Land → 🔹 Flach → 🔷 Tief (nie direkt Land→Tief) |
| T2 | **Wald-Dichte** | Max. 50% Bäume, Lichtungen für Bewegung |
| T3 | **Weg-Kontinuität** | 🟧 Straßen zusammenhängend, führen irgendwo hin |
| T4 | **Abgrund-Warnung** | ⬛ Abgrund min. 2 Felder von Start/Eingang |
| T5 | **Sumpf-Cluster** | 🟩 Sumpf in Gruppen (3+), nicht einzeln verstreut |
| T6 | **Terrain-Übergänge** | Natürliche Übergänge, keine harten Schnitte |
| T7 | **Boden-Konsistenz** | Ein Raum = Ein Hauptboden-Typ |


### 🎲 LOGIK-REGELN

| ID | Regel | Beschreibung |
|----|-------|--------------|
| L1 | **Deckung-Balance** | Min. 1 Deckung pro 5x5 Bereich |
| L4 | **Interaktion-Frei** | Interaktive Objekte nicht durch unbegehbare Hindernisse blockiert |
| L8 | **Beleuchtung-Logik** | 🕯️💡 Lichtquellen in dunklen Bereichen |


---

## 📐 LAYER-SYSTEM

### Drei Layer (Priorität beim Rendern)

```
LAYER 1: STATIC (Im Template gespeichert) ───────────────────
         │
         ├─ Terrain:     Boden, Wasser, Void
         ├─ Structures:  Wände, Brücken, Säulen
         └─ Decoration:  Bäume, Büsche, Felsen, Möbel
         
         ⚠️ WIRD 1:1 AUS TEMPLATE KOPIERT!

LAYER 2: SEMI-STATIC (Im Template, ändert bei Interaktion) ──
         │
         ├─ Türen:       🚪 → 🔓 wenn geöffnet
         ├─ Container:   📦 → ▪️ wenn geplündert
         └─ Mechanismen: ⚙️ Zustand ändert sich
         
         ⚠️ Template aktualisieren bei Interaktion!

LAYER 3: DYNAMIC (Bei Render aus JSON eingefügt) ────────────
         │
         ├─ Entities:    🟢🟡♦️🛑🟥⚪🔴 (Positionen aus JSON)
         └─ Effekte:     🔥💥 (temporär)
         
         ✅ Wird bei jedem Render neu aus JSON gelesen!
```

### Render-Prozess

```
1. Template aus vorheriger Antwort KOPIEREN
2. Falls Semi-Static geändert: Im Template aktualisieren
3. Entity-Positionen aus STATE_TRACKING_JSON lesen
4. Entities ins kopierte Template EINSETZEN
5. Fertiges Grid als Map-Codeblock ausgeben
```

---

## 🗺️ MAP-ERSTELLUNG (Nur bei NEUER Location!)

### Schritt 1: Map-Typ bestimmen

| Typ | Beschreibung | Beispiel |
|-----|--------------|----------|
| **INTERIOR** | Nur Innenraum, Wände = Rand | Taverne, Thronsaal |
| **EXTERIOR_SIMPLE** | Außen, Gebäude als Blöcke | Dorf, Marktplatz |
| **EXTERIOR_DETAILED** | Außen + aufgeschnittene Gebäude (Gebäude NIE nur teilweise/abgeschnitten) | Gutshof |

### Schritt 2: Größe wählen

| Größe | Dimensionen | Verwendung |
|-------|-------------|------------|
| Klein | 8x8 bis 10x10 | Einzelraum, 1-3 Charaktere |
| Mittel | 12x10 bis 15x12 | Taverne, 3-6 Charaktere |
| Groß | 15x15 bis 20x15 | Dorf, 6-10 Charaktere |

### Schritt 3: Template erstellen

```
1. STATIC LAYER ZEICHNEN
   ├─ Terrain: Hauptboden wählen (▪️ am häufigsten)
   ├─ Structures: Wände/Gebäude platzieren
   └─ Decoration: Atmosphäre hinzufügen (10-30%)

2. SEMI-STATIC HINZUFÜGEN
   ├─ Türen als Gebäude-Eingängen (Regel S1!)
   └─ Container für Loot

3. BAUREGELN PRÜFEN
   └─ Alle P/S/T/L Regeln eingehalten?

4. TEMPLATE-BLOCK ERSTELLEN
   └─ Am Ende der Antwort einfügen (Nur Intern)!
```

### Schritt 4: Entities platzieren (aus JSON)

```
1. STATE_TRACKING_JSON mit Positionen füllen
2. Entities ins Template einsetzen
3. Fertige Map anzeigen
```

---

## ✅ VALIDIERUNG

### Schnell-Checkliste (vor jedem Render)

```
□ Template aus vorheriger Antwort kopiert?
□ Entities aus STATE_TRACKING_JSON gelesen?
□ Alle Symbole aus Symbol-Bank?
□ Begleiter nah am Spieler? (P2)
□ Türen in Wänden? (S1)
□ Jedes Gebäude hat Eingang? (S2)
□ Min. 30% begehbar?
□ Template-Block am Ende der Antwort (Intern)?
```

### Häufige Fehler

| Fehler | Problem | Lösung |
|--------|---------|--------|
| Template neu gezeichnet | Layout driftet | IMMER kopieren, nie neu erstellen |
| Entities im Template | Spieler "klebt" fest | Entities nur bei Render einfügen |
| Positionen geraten | Inkonsistent | IMMER aus STATE_TRACKING_JSON |
| Template vergessen | Nächste Runde ohne Basis | Template-Block PFLICHT am Ende (INTERN) |
| Tür ohne Wand | 🚪 schwebt im Raum | Tür platziert strategisch in Wand-Position |

---

## 📋 QUICK REFERENCE

### Koordinaten-System (NUR INTERN! NIE IM CHAT ANZEIGEN!)

```
  0 1 2 3 4 5 6 7 8 9    ← X-Achse (Breite)
0 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
1 ⬜      NORD      ⬜
2 ⬜                ⬜
3 ⬜ WEST   ✦  OST  ⬜   ✦ = Mitte
4 ⬜                ⬜
5 ⬜      SÜD       ⬜
6 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
↑
Y-Achse (Höhe)

LINKS  = niedrige X    |  NORD = niedrige Y (oben)
RECHTS = hohe X        |  SÜD  = hohe Y (unten)
```

### Terrain-Schnellübersicht

```
🔸 = Standard-Boden (Stein, Sand, Holz)
🟧 = Straße/Weg (NUR für Wege!)
🔹 = Flaches Wasser (begehbar, laut)
🔷 = Tiefes Wasser (NICHT begehbar)
⬜ = Wände (NICHT begehbar)
▪️ = Void/Leer/Normal (begehbar)
⬛ = Abgrund (NICHT begehbar, tödlich)
🟩 = Sumpf (begehbar, Schaden)
```

### Entity-Typen

```
SPIELER:   🟢 (immer nur einer)
BEGLEITER: 🟡 🔵 (Party-Mitglieder)
NEUTRAL:   ⚪ (NPCs, Händler)
FEINDE:    ♦️ 🛑 (schwach) | 🟥 (mittel) | 🔴 (Boss)
```

---

## 📝 VOLLSTÄNDIGES BEISPIEL

### Spieltext

> "Coru und Pip betreten eine verlassene Taverne von Süden. 
> Der Raum ist düster, Spinnweben hängen von der Decke. 
> Ein Kamin an der Nordwand, umgeworfene Tische. 
> Zwei Orks lauern im nördlichen Bereich."

### 1. STATE_TRACKING_JSON aktualisieren (ZUERST!)

```json
{
  "party": {
    "characters": [
      {"id": "coru", "name": "Coru", "position": {"x": 4, "y": 7}},
      {"id": "pip", "name": "Pip", "position": {"x": 6, "y": 7}}
    ]
  },
  "enemies": [
    {"id": "ork_a", "name": "Ork A", "symbol": "♦️", "position": {"x": 3, "y": 2}},
    {"id": "ork_b", "name": "Ork B", "symbol": "🛑", "position": {"x": 7, "y": 2}}
  ]
}
```

### 2. Static Template erstellen (nur bei neuer Location)

```
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
⬜🔥🔸🔸🔸🔸🔸🔸🔸🔸🕸️⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜🔸🔳🔸🔸🔸🔸🔸🔳🔸🔸⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜🕸️🔸🔸🔳🔸🔸🔳🔸🔸🔸⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸📦⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜⬜⬜⬜⬜🚪⬜⬜⬜⬜⬜⬜
```

### 3. Entities aus JSON einsetzen → Fertige Map

```
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
⬜🔥🔸🔸🔸🔸🔸🔸🔸🔸🕸️⬜
⬜🔸🔸♦️🔸🔸🔸🛑🔸🔸🔸⬜
⬜🔸🔳🔸🔸🔸🔸🔸🔳🔸🔸⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜🕸️🔸🔸🔳🔸🔸🔳🔸🔸🔸⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸📦⬜
⬜🔸🔸🔸🟢🔸🟡🔸🔸🔸🔸⬜
⬜⬜⬜⬜⬜🚪⬜⬜⬜⬜⬜⬜
```

**LEGENDE**
Terrain: ⬜ Wände | 🔸 Holzboden
Wesen: 🟢 Coru | 🟡 Pip | ♦️ Ork A | 🛑 Ork B
Objekte: 🔳 Tisch | 🚪 Eingangstür | 📦 Truhe | 🔥 Kamin
Atmosphäre: 🕸️ Spinnweben

### 4. Template-Block am Ende (Intern! Nich sichtbar für User)

```
---
📍 LOCATION-TEMPLATE: Verlassene Taverne
📐 Größe: 12x9
```
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
⬜🔥🔸🔸🔸🔸🔸🔸🔸🔸🕸️⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜🔸🔳🔸🔸🔸🔸🔸🔳🔸🔸⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜🕸️🔸🔸🔳🔸🔸🔳🔸🔸🔸⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸📦⬜
⬜🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸⬜
⬜⬜⬜⬜⬜🚪⬜⬜⬜⬜⬜⬜
```
🚪 Tür(5,8) = geschlossen
📦 Truhe(10,6) = ungeöffnet
---
```

### Bauregeln-Check

- ✅ P1: Spieler (4,7) nicht in Ecke, Orks bei (3,2) und (7,2) = 5+ Felder entfernt
- ✅ P2: Pip (6,7) ist 2 Felder von Coru (4,7)
- ✅ P3: Orks 4 Felder voneinander
- ✅ S1: Tür bei (5,8) ersetzt Wand
- ✅ S2: Gebäude hat Eingang
- ✅ L1: Tische als Deckung verteilt

---

## 📝 PLATZ FÜR WEITERE BEISPIELE

### Beispiel 2: _______________

```
[TEMPLATE HIER]
```

**Kontext:** _______________

---

## ⚡ ZUSAMMENFASSUNG

**Bei NEUER Location:**
1. Template erstellen (Static + Semi-Static)
2. JSON mit Positionen füllen
3. Entities ins Template einsetzen
4. Map anzeigen
5. **Template-Block INTERN am Ende!**

**Bei UPDATE (jede Runde):**
1. Template aus vorheriger Antwort KOPIEREN
2. JSON-Positionen aktualisieren
3. Entities ins kopierte Template einsetzen
4. Map anzeigen
5. **Template-Block INTERN am Ende!**

**Bei RÜCKKEHR zu Location:**
1. Altes Template aus Chat-Historie suchen
2. Template KOPIEREN (identisches Layout!)
3. Aktuelle Positionen aus JSON einsetzen
4. Map anzeigen
5. **Template-Block INTERN am Ende!**

**IMMER beachten:**
- Template KOPIEREN, nie neu zeichnen
- Positionen aus STATE_TRACKING_JSON
- Template-Block INTERN am Ende JEDER Antwort
- Bei Unsicherheit: FRAGEN!

---

**🗺️ MIT DIESEM SKILL BLEIBEN MAPS KONSISTENT! 🎲**
