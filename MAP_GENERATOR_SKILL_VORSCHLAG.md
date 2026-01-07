# 🗺️ MAP GENERATOR SKILL (Kompakt v3.2)

**Cross-References:**
- Bewegung/Kino-Logik: Regelwerk §3.3
- Zustände: Regelwerk §4.4
- State-Tracking Schema: STATE_TRACKING_JSON.md
- DM-Anweisungen: DUNGEON_MASTER_PROMPT_v3_2.md

---

## ⚡ KRITISCHE REGELN

| # | Regel |
|---|-------|
| 1 | Map IMMER im Chat UND im Codeblock |
| 2 | Legende IMMER unter der Karte, AUßERHALB des Codeblocks |
| 3 | Eine Map = Eine Location |
| 4 | Static Layer = UNVERÄNDERT nach Erstellung |
| 5 | NUR Symbole aus der Symbol-Bibliothek verwenden! |
| 6 | Jede Zeile = exakt N Symbole (N = Map-Breite) |

---

## ⚠️ KOORDINATEN = NUR VISUALISIERUNG

**Siehe Regelwerk §3.3 – Kino-Logik**

| Aspekt | Auf der Karte | Im Spiel |
|--------|---------------|----------|
| Positionen | x,y Koordinaten | Narrativ ("bei der Tür") |
| Bewegung | Symbole verschieben | SL entscheidet Plausibilität |
| Distanzen | Visualisierung | Keine Berechnung |
| Reichweiten | Nicht relevant | Narrativ begründen |

**Koordinaten dienen NUR:**
- Übersichtlichkeit auf der Karte
- Visuelles Tracking wer wo steht
- Sichtlinien verdeutlichen

**Bewegung folgt KINO-LOGIK:**
- Keine Feldzählung, keine Reichweiten
- Karte wird entsprechend der Narration aktualisiert

---

## 📚 SYMBOL-BIBLIOTHEK

### Terrain (Grundflächen)

| Symbol | Bedeutung | Begehbar? |
|--------|-----------|-----------|
| ▪️ | Boden/Leer/Void | ✅ Ja |
| ⬜ | Außenwände | ❌ Nein |
| ◽ | Innenwände (Raumtrenner) | ❌ Nein |
| ▫️ | Zäune/niedrige Barrieren | ⚠️ Mit Malus |
| 🔸 | Grasland/Steinboden/Sand | ✅ Ja |
| 🔶 | Acker | ⚠️ Mit Malus |
| 📗 | Rasen/Gras | ✅ Ja |
| 🔹 | Flaches Wasser | ⚠️ Mit Malus |
| 🔷 | Tiefes Wasser | ❌ Nein |
| 🟧 | Straße/Weg | ✅ Ja |
| 🟩 | Sumpf/Gift | ⚠️ Gefährlich |
| ⬛ | Abgrund/Grube | ❌ Nein |
| 🕳️ | Loch | ❌ Nein |

### Vegetation

| Symbol | Bedeutung | Deckung? |
|--------|-----------|----------|
| 🌲 | Nadelbaum | ✅ Volle Deckung |
| 🌳 | Laubbaum | ✅ Volle Deckung |
| 🌴 | Palme | ✅ Volle Deckung |
| 🌿 | Büsche | ⚠️ Halbe Deckung |
| 🪴 | Topfpflanze | ❌ Keine |
| 🌱 | Gartenpflanzen | ❌ Keine |
| 🍄 | Pilze | ❌ Keine |
| 🌾 | Gras/Getreide | ⚠️ Halbe Deckung |
| 🥀 | Tote Pflanzen | ❌ Keine |
| 🌵 | Kaktus | ⚠️ Gefährlich |

### Strukturen & Möbel

| Symbol | Bedeutung | Deckung? |
|--------|-----------|----------|
| 🔳 | Tisch/Barrikade | ✅ Volle Deckung |
| 🪑 | Stuhl | ❌ Keine |
| 🛏️ | Bett | ⚠️ Halbe Deckung |
| 📁 | Kiste/Box | ✅ Volle Deckung |
| 🗄️ | Schrank | ✅ Volle Deckung |
| 🪜 | Leiter | ❌ Keine |
| 🚪 | Geschlossene Tür | - |
| 🪟 | Fenster | - |
| 🧱 | Säule/Steinstruktur | ✅ Volle Deckung |
| ⛩️ | Tor/Portal | - |
| 🗿 | Statue | ✅ Volle Deckung |
| ⚰️ | Sarg | ⚠️ Halbe Deckung |
| 🪦 | Grabstein | ⚠️ Halbe Deckung |
| ⛲ | Fontäne | ✅ Volle Deckung |
| ⭐ | Heiliger Altar | - |
| 🪨 | Felsen | ✅ Volle Deckung |
| 🪵 | Holz/Baumstamm | ⚠️ Halbe Deckung |
| ⛺️ | Zelt | ⚠️ Halbe Deckung |

### Interaktive Elemente

| Symbol | Bedeutung |
|--------|-----------|
| ➡️ | Durchgang/Tür Ost |
| ⬅️ | Durchgang/Tür West |
| ⬆️ | Durchgang/Tür Nord |
| ⬇️ | Durchgang/Tür Süd |
| ⤴️ | Treppe aufwärts |
| ⤵️ | Treppe abwärts |
| 🚫 | Blockiert/Versperrt |
| 🔒 | Verschlossen |
| 🔓 | Geöffnet |
| ⚙️ | Mechanismus/Hebel |
| ⭕ | Ziel/Markierung |

### Gefahren & Effekte

| Symbol | Bedeutung | Effekt |
|--------|-----------|--------|
| 🔥 | Feuer | Schaden |
| 💥 | Explosion | Schaden |
| ⚡ | Blitz/Elektrizität | Schaden |
| ❄️ | Eis/Kälte | Malus |
| ☠️ | Gift/Gefahr | Schaden |
| 🕸️ | Spinnweben | Schwieriges Terrain |
| 💨 | Wind/Luftzug | - |
| 🌊 | Wellen/Strömung | Malus |
| 🕯️ | Kerze/Fackel | Licht |
| 💡 | Laterne | Licht |
| 🔆 | Helles Licht | Licht |

### Charaktere & Kreaturen

| Symbol | Bedeutung |
|--------|-----------|
| 🟢 | Spieler (Hauptcharakter) |
| 🟡 | Begleiter/Verbündeter |
| 🔵 | Begleiter/Verbündeter (alternativ) |
| ⚪ | Neutraler NPC |
| 🔴 | Boss/Elite-Gegner |
| ♦️ | Feind A (schwach) |
| 🛑 | Feind B (schwach) |
| 🟥 | Feind (mittel/stark) |
| 🔺 | Feind (aktiv) |
| 🔻 | Feind (geschwächt/Status) |
| 👤 | Humanoid/Person |
| 💀 | Skelett/Untot |
| 👻 | Geist/Phantom |
| 👹 | Dämon/Monster |
| 🤖 | Konstrukt/Golem |

### Tiere

| Symbol | Tier |
|--------|------|
| 🐺 | Wolf, Hund |
| 🐈 | Katze |
| 🐍 | Schlange |
| 🐖 | Schwein |
| 🐑 | Schaf |
| 🐴 | Pferd |
| 🦜 | Papagei |
| 🦆 | Ente |
| 🐙 | Oktopus |
| 🐉 | Drache/große Kreatur |
| 🕷️ | Spinne/Insekt |

### Items & Schätze

| Symbol | Bedeutung |
|--------|-----------|
| 💰 | Goldmünzen/Schatz |
| 💎 | Edelstein/wertvoll |
| 🗝️ | Schlüssel |
| 📜 | Schriftrolle/Dokument |
| 📖 | Buch |
| 🗡️ | Schwert/Waffe |
| ⚔️ | Gekreuzte Waffen |
| 🛡️ | Schild |
| 🏹 | Bogen/Fernwaffe |
| 🔪 | Dolch |
| 🪓 | Axt |
| 🔨 | Hammer/Werkzeug |
| ⚗️ | Trank/Flasche |
| 🧪 | Gift/Chemikalien |
| 💊 | Heilung/Medizin |
| 🎒 | Rucksack/Tasche |
| 🧰 | Werkzeugkiste |

### Magisch & Sonstiges

| Symbol | Bedeutung |
|--------|-----------|
| ✨ | Magie/Glitzer |
| 🔮 | Kristallkugel |
| 💫 | Magischer Effekt |
| 🌟 | Leuchtender Stern |
| 🔯 | Magisches Symbol |
| ㊗️ | Rune |
| ❓ | Unbekannt/Geheimnis |
| ❗ | Wichtig/Achtung |
| 📍 | Markierung/Position |
| 🎲 | Zufall/Event |
| 👁️ | Beobachtung/Sicht |

---

## 🏗️ LAYER-SYSTEM (Konzept)

Maps bestehen aus 3 Schichten, die übereinander gerendert werden:

### Layer 1: STATIC (Unterste Ebene)
**Wird bei Erstellung festgelegt und NIEMALS geändert!**

| Sublayer | Inhalt | Beispiele |
|----------|--------|-----------|
| Terrain | Grundfläche | ▪️ 🔸 🔹 🔷 |
| Structures | Gebäude, Brücken | ⬜ 🧱 |
| Decoration | Atmosphäre | 🌲 🌿 🪨 |

### Layer 2: SEMI-STATIC (Mittlere Ebene)
**Ändert sich nur bei Interaktion!**

| Element | Mögliche Zustände |
|---------|-------------------|
| Türen | 🚪 geschlossen → 🔓 offen |
| Container | 📁 voll → ▪️ geplündert |
| Zerstörbares | 🔳 intakt → 💥 zerstört |
| Mechanismen | ⚙️ inaktiv → ⚙️ aktiviert |

### Layer 3: DYNAMIC (Oberste Ebene)
**Ändert sich JEDE Runde!**

| Element | Tracking |
|---------|----------|
| Charaktere | 🟢🟡🔺 Position |
| Effekte | 🔥⚡ Dauer (Runden) |

**Render-Priorität:** Static → Semi-Static → Dynamic
*Charaktere überschreiben ALLES darunter!*

---

## 📍 MULTI-LOCATION SYSTEM

### Grundprinzip
- Jede Location hat eine eindeutige ID
- Alle Locations bleiben parallel gespeichert
- Wechsel zwischen Locations = kein Datenverlust

### Location erstellen
1. Name festlegen → ID generieren (z.B. "Verlassene Taverne" → `verlassene_taverne`)
2. Map-Typ bestimmen (Interior / Exterior)
3. Größe festlegen (Klein 10x10, Mittel 15x15, Groß 20x20)
4. Static Layer einmalig erstellen
5. Charaktere platzieren

### Location wechseln
1. Aktuelle Location bleibt gespeichert
2. Zur neuen Location wechseln (oder neue erstellen)
3. Bei Rückkehr: Alter Stand wird geladen

### Location aktualisieren
- NUR Dynamic Layer ändern (Bewegung)
- Semi-Static nur bei Interaktion ändern
- Static NIEMALS ändern!

---

## 🎨 MAP ERSTELLEN (Workflow)

### Schritt 1: Kontext analysieren
- Was für ein Ort? (Taverne, Wald, Dungeon...)
- Interior oder Exterior?
- Welche Atmosphäre? (Belebt, verlassen, gefährlich...)

### Schritt 2: Größe festlegen

| Größe | Grid | Anwendung |
|-------|------|-----------|
| Klein | 10x10 | Einzelner Raum, 1-3 Charaktere |
| Mittel | 15x15 | Taverne/Laden, 3-6 Charaktere |
| Groß | 20x20 | Dorf/Gutshof, 6-10 Charaktere |

### Schritt 3: Grid-Template erstellen ⚡

**WICHTIG: Erstelle zuerst ein LEERES rechteckiges Grid!**

1. **Leeres Grid generieren** mit gewählter Größe (z.B. 10x10)
2. **Alle Felder mit ▪️** füllen (neutraler Boden)
3. **Zeilen zählen:** 10x10 = 10 Zeilen | 15x15 = 15 Zeilen | 20x20 = 20 Zeilen
4. **Symbole pro Zeile zählen:** Jede Zeile muss exakt N Symbole haben!

**Template-Beispiel (10x10):**
```
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️
```

**⚠️ Ab jetzt NUR noch Symbole ERSETZEN, NICHT hinzufügen oder löschen!**

### Schritt 4: Static Layer befüllen
1. **Terrain:** Grundfläche füllen (40-60%)
2. **Structures:** Wände, Gebäude platzieren
3. **Decoration:** Atmosphäre hinzufügen (10-20%)

**⚠️ BAUREGELN FÜR STATIC LAYER:**

> **Regel 1: Zugangspunkte frühzeitig planen**
> - Alle Zugangspunkte (🚪 Türen, ⤴️⤵️ Treppen, 🪜 Leitern, ➡️⬅️⬆️⬇️ Durchgänge zwischen Zonen) und 🪟 Fenster **müssen bereits im Static Layer eingeplant werden**
> - Ihre Position darf nach Erstellung **nicht mehr geändert werden**
> - Grund: Verhindert spätere Inkonsistenzen in der Raumstruktur
> - Beispiel: Bei einer Taverne müssen Haupteingang, Hintertür, Treppe zum Obergeschoss und alle Fenster von Anfang an feststehen

> **Regel 2: Randwände bei Außenkarten**
> - **Exterior-Karten** (Außenbereiche) ohne geschlossene Innenräume benötigen **keine Randwände (⬜)**
> - **Ausnahme:** Umfriedete Bereiche wie:
>   - Ummauerte Lager oder Vorratshöfe
>   - Burganlagen oder befestigte Gutshöfe
>   - Eingezäunte Tiergehege
>   - Andere architektonisch begründete Umfriedungen
> - Beispiel: Waldlichtung = keine Randwände | Militärlager = Palisaden als Randwände

### Schritt 5: Semi-Static platzieren
- Türen an Eingängen
- Container mit Inhalt
- Interaktive Objekte

### Schritt 6: Dynamic initialisieren
- Spieler-Position (narrativ sinnvoll)
- Begleiter neben Spieler
- Feinde laut Beschreibung
- Initiale Effekte (Feuer, etc.)

### Schritt 7: Rendern & Validieren
- Map im Codeblock ausgeben
- Legende darunter (außerhalb Codeblock)
- Checkliste durchgehen

---

## 🔄 MAP AKTUALISIEREN (Jede Runde)

### Was sich ändert

| Aktion | Layer | Änderung |
|--------|-------|----------|
| Bewegung | Dynamic | Position aktualisieren |
| Tür öffnen | Semi-Static | 🚪 → 🔓 |
| Kiste plündern | Semi-Static | 📁 → ▪️ |
| Feind besiegt | Dynamic | 🔺 entfernen oder → ⚰️ |
| Effekt endet | Dynamic | Symbol entfernen |

### Was sich NICHT ändert
- Static Layer (Terrain, Wände, Bäume)
- Grundstruktur der Map

### Ablauf
1. Narration lesen → Was hat sich geändert?
2. Positionen aktualisieren (narrativ, nicht mechanisch)
3. Interaktionen anwenden
4. Neue Map rendern
5. Legende aktualisieren

---

## 📋 AUSGABE-FORMAT

### Map im Codeblock

```
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
⬜▪️▪️▪️▪️▪️▪️▪️▪️⬜
⬜▪️🔳▪️▪️▪️📁▪️▪️⬜
⬜▪️▪️▪️🟢▪️▪️▪️▪️⬜
⬜▪️▪️▪️▪️▪️🔺▪️▪️⬜
⬜▪️🪑▪️🟡▪️▪️🔻▪️⬜
⬜▪️▪️▪️▪️▪️▪️▪️▪️⬜
⬜▪️▪️▪️▪️▪️▪️▪️▪️⬜
⬜⬜⬜🚪⬜⬜⬜⬜⬜⬜
```

### Legende (außerhalb Codeblock)

**LEGENDE**
- Terrain: ⬜ Wände | ▪️ Boden
- Möbel: 🔳 Tisch | 🪑 Stuhl | 📁 Kiste
- Charaktere: 🟢 Coru | 🟡 Pip | 🔺🔻 Orks
- Interaktion: 🚪 Tür (geschlossen)

---

## ✅ CHECKLISTEN

### Neue Map erstellen

```
☐ Map-Typ bestimmt? (Interior/Exterior)
☐ Größe passend gewählt?
☐ GRID-TEMPLATE: Leeres rechteckiges Grid erstellt?
☐ GRID-VALIDIERUNG: Alle Zeilen haben exakt N Symbole? (N = Map-Breite)
☐ GRID-VALIDIERUNG: Anzahl Zeilen korrekt? (10x10=10 Zeilen, 15x15=15, 20x20=20)
☐ Dominantes Terrain platziert (40-60%)?
☐ Strukturen/Wände korrekt?
☐ Atmosphärische Dekoration (10-20%)?
☐ BAUREGELN: Alle Zugangspunkte (Türen, Treppen, Fenster) im Static Layer geplant?
☐ BAUREGELN: Randwände nur bei Interior oder umfriedeten Bereichen?
☐ Türen an Eingängen?
☐ Container mit Inhalt definiert?
☐ Alle Charaktere platziert?
☐ Positionen narrativ sinnvoll?
☐ NUR Symbole aus Bibliothek?
☐ Map im Codeblock?
☐ Legende außerhalb Codeblock?
```

### Map aktualisieren (jede Runde)

```
☐ Bewegungen aus Narration extrahiert?
☐ Positionen aktualisiert (Dynamic Layer)?
☐ Interaktionen angewendet (Semi-Static)?
☐ Static Layer UNVERÄNDERT?
☐ Neue Map gerendert?
☐ Legende aktualisiert?
```

### Bei Location-Wechsel

```
☐ Aktuelle Location gespeichert?
☐ Neue Location existiert ODER erstellen?
☐ Korrekte Location aktiv?
☐ Map der neuen Location angezeigt?
```

---

## 🎯 QUICK REFERENCE

### Koordinaten-System (NUR INTERN)

```
  0 1 2 3 4 5 ...  ← X-Achse (Breite)
0 ⬜⬜⬜⬜⬜⬜
1 ⬜ [NORD]  ⬜
2 ⬜         ⬜
3 ⬜ [MITTE] ⬜
4 ⬜         ⬜
5 ⬜ [SÜD]   ⬜
↑
Y-Achse (Höhe)

LINKS = niedrige X | RECHTS = hohe X
NORD = niedrige Y  | SÜD = hohe Y
```

**WICHTIG:** Koordinaten NIE im Chat anzeigen! Nur narrativ beschreiben.

### Terrain-Schnellübersicht

```
🔸 = Gras/Stein/Sand (Standard-Boden)
🟧 = Straße/Weg (NUR für Wege!)
🔹 = Flaches Wasser (begehbar mit Malus)
🔷 = Tiefes Wasser (NICHT begehbar)
⬜ = Wände (NICHT begehbar)
▪️ = Void/Leerer Boden (begehbar)
```

### Layer-Priorität

```
1. Static Terrain    (unten)
2. Static Structures
3. Static Decoration
4. Semi-Static
5. Dynamic Effects
6. Dynamic Entities  (oben - überschreibt alles!)
```

### Was ändert sich wann?

```
STATIC:      NIEMALS (nur bei Erstellung)
SEMI-STATIC: Bei Interaktionen (Tür öffnen, Kiste plündern)
DYNAMIC:     JEDE RUNDE (Bewegung, Effekte)
```

---

## 🚨 HÄUFIGE FEHLER

| Fehler | Korrektur |
|--------|-----------|
| Static Layer nach Erstellung ändern | Dynamic Layer für Änderungen nutzen |
| 🟧 für normalen Boden | 🔸 für Boden, 🟧 NUR für Straßen |
| Koordinaten im Chat anzeigen | Nur narrativ beschreiben |
| Symbole erfinden | NUR Symbole aus Bibliothek! |
| Legende im Codeblock | Legende AUßERHALB des Codeblocks |
| Feldzählung für Bewegung | Kino-Logik: SL entscheidet |
| **Ungleiche Zeilenlängen** | **Jede Zeile einzeln zählen! Grid-Template verwenden** |
| Symbole hinzufügen statt ersetzen | Template erstellen, dann NUR ersetzen |

### 🔍 Visuelles Beispiel: RICHTIG vs. FALSCH

**❌ FALSCH - Ungleiche Zeilen:**
```
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
⬜▪️▪️▪️▪️▪️▪️▪️⬜        ← NUR 9 Symbole!
⬜▪️🟢▪️▪️▪️▪️▪️▪️⬜
⬜⬜⬜⬜⬜⬜⬜           ← NUR 7 Symbole!
```
**Problem:** Map ist schief, funktioniert nicht!

**✅ RICHTIG - Alle Zeilen gleich lang:**
```
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
⬜▪️▪️▪️▪️▪️▪️▪️▪️⬜      ← 10 Symbole ✓
⬜▪️🟢▪️▪️▪️▪️▪️▪️⬜      ← 10 Symbole ✓
⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜      ← 10 Symbole ✓
```
**Lösung:** Jede Zeile exakt 10 Symbole!

---

## 🗺️ BEREIT FÜR KARTEN-ERSTELLUNG!

**Bei Unsicherheit:**
- ❓ Frage nach Klärung
- ❓ Prüfe Symbol-Bibliothek
- ❓ Konsultiere Regelwerk §3.3 (Kino-Logik)

**Denke daran:**
- Karten visualisieren die Situation
- Bewegung ist narrativ, nicht mechanisch
- Static Layer = heilig, niemals ändern!
