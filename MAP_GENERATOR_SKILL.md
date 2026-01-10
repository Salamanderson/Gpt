# 🗺️ MAP GENERATOR SKILL (Kompakt v3.2)

**Dieses Dokument verwendet §M-Nummern für Zitate: "gemäß MAP §M.X"**

**Cross-References:**
- Bewegung/Kino-Logik: Regelwerk §3.3
- Zustände: Regelwerk §4.4
- State-Tracking Schema: STATE_TRACKING_JSON.md
- DM-Anweisungen: DUNGEON_MASTER_PROMPT_v3_2.md
- **Zonen-Planung: session_skizze_v3_2.md → §ZONEN-PLANUNG (VOR Map-Erstellung konsultieren!)**

---

## §M.1 KRITISCHE REGELN

| # | Regel |
|---|-------|
| 1 | Map IMMER im Chat UND im Codeblock |
| 2 | Legende IMMER unter der Karte, AUßERHALB des Codeblocks |
| 3 | Eine Map = Eine Location |
| 4 | Static Layer = UNVERÄNDERT nach Erstellung |
| 5 | NUR Symbole aus der Symbol-Bibliothek verwenden! |

---

## §M.1.1 KOORDINATEN = NUR VISUALISIERUNG

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

## §M.2 SYMBOL-BIBLIOTHEK

### Terrain (Grundflächen)

**▪️ = STANDARD-BODEN** (für alle normalen begehbaren Flächen)
Andere Symbole sind **Sondervarianten** zur Verdeutlichung von Unterschieden.

| Symbol | Bedeutung | Begehbar? | Verwendung |
|--------|-----------|-----------|------------|
| ▪️ | **Standard-Boden** | ✅ Ja | DEFAULT für alle Böden (Holz, Stein, Erde, etc.) |
| ⬜ | Außenwände | ❌ Nein | Gebäudegrenzen, massive Wände |
| ◽ | Innenwände (Raumtrenner) | ❌ Nein | Trennwände innerhalb von Gebäuden |
| ▫️ | Zäune/niedrige Barrieren | ⚠️ Mit Malus | Überwindbare Hindernisse |
| 🔸 | Sandiger/steiniger Untergrund | ✅ Ja | **Sondervariante:** Wüste, Strand, Geröll |
| 🔶 | Acker/Schlamm | ⚠️ Mit Malus | **Sondervariante:** Felder, schlammiger Boden |
| 📗 | Dichtes Gras/Wiese | ✅ Ja | **Sondervariante:** Grasflächen betonen |
| 🔹 | Flaches Wasser | ⚠️ Mit Malus | Pfützen, seichter Bach, Strand |
| 🔷 | Tiefes Wasser | ❌ Nein | Fluss, See, Meer |
| 🟧 | Straße/Weg | ✅ Ja | **Sondervariante:** Markierte Wege/Straßen |
| 🟩 | Sumpf/Gift | ⚠️ Gefährlich | Gefährliches Terrain |
| ⬛ | Abgrund/Grube | ❌ Nein | Löcher, Klippen |
| 🕳️ | Loch | ❌ Nein | Kleine Öffnungen |

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
| 🚪 | Tür (innerhalb Map) | - |
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

### Interaktive Elemente (Ausgänge zu anderen Maps)

| Symbol | Bedeutung |
|--------|-----------|
| ➡️ | Ausgang Ost (andere Map) |
| ⬅️ | Ausgang West (andere Map) |
| ⬆️ | Ausgang Nord (andere Map) |
| ⬇️ | Ausgang Süd (andere Map) |
| ⏫ | Treppe aufwärts (andere Map) |
| ⏬ | Treppe abwärts (andere Map) |
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

## §M.3 LAYER-SYSTEM (Konzept)

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

## §M.4 MULTI-LOCATION SYSTEM

### Grundprinzip
- Jede Location hat eine eindeutige ID
- Alle Locations bleiben parallel gespeichert
- Wechsel zwischen Locations = kein Datenverlust

### §M.4.1 INTERIOR vs EXTERIOR Definition

| Typ | Definition | Randwände? | Beispiele |
|-----|------------|------------|-----------|
| **INTERIOR** | Hat Dach/Decke, umschlossener Raum | ✅ JA (⬜) | Taverne, Haus, Höhle, Keller, Tempel |
| **EXTERIOR** | Unter freiem Himmel, kein Dach | ❌ NEIN* | Waldlichtung, Marktplatz, Straße, Strand |

*Ausnahme: Umfriedete Exterior-Bereiche (Burghof, Lager mit Palisaden) haben Randwände.

**Grenzfälle:**
| Location | Typ | Begründung |
|----------|-----|------------|
| Höhle | Interior | Umschlossen durch Felsen |
| Überdachter Markt | Interior | Hat Dach, auch wenn offen |
| Ruine ohne Dach | Exterior | Kein Dach mehr vorhanden |
| Schiff Deck | Exterior | Unter freiem Himmel |
| Schiff Unterdeck | Interior | Umschlossener Raum |
| Burghof | Exterior + Wände | Umfriedeter Außenbereich |

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

## §M.5 MAP ERSTELLEN (Workflow)

### Schritt 0: Session-Skizze konsultieren (PFLICHT!)

> **⚠️ VOR dem Erstellen einer Map:**
> 1. Session-Skizze → Zonen-Planung öffnen
> 2. Die passende Zone finden
> 3. Folgende Informationen übernehmen:
>    - Typ (Interior/Exterior)
>    - Größe
>    - Symbole (bereits aus §M.2 gewählt!)
>    - Verbindungen (Türen, Treppen, Fenster)
>    - NPC/Feind Start-Positionen
>
> **Die Zonen-Planung IST der Bauplan für die Map!**

### Schritt 1: Kontext analysieren
- Session-Skizze Zonen-Planung prüfen (dort steht alles!)
- Was für ein Ort? (Taverne, Wald, Dungeon...)
- Interior oder Exterior?
- Welche Atmosphäre? (Belebt, verlassen, gefährlich...)

### Schritt 2: Größe festlegen

| Größe | Grid | Anwendung |
|-------|------|-----------|
| Klein | 10x10 | Einzelner Raum, 1-3 Charaktere |
| Mittel | 15x15 | Taverne/Laden, 3-6 Charaktere |
| Groß | 20x20 | Dorf/Gutshof, 6-10 Charaktere |

### Schritt 2.5: Symbole aus §M.2 wählen
**VOR dem Zeichnen:** Liste alle benötigten Symbole aus der Bibliothek!
- ❌ **NIEMALS** Symbole erfinden
- ✅ Nur Symbole aus §M.2 verwenden
- Beispiel: "Ich brauche: ▪️ Boden, ⬜ Wände, 🔳 Tische, 🪑 Stühle, 🌲 Bäume..."

### Schritt 3: Static Layer erstellen
1. **Terrain:** Grundfläche füllen (40-60%)
2. **Structures:** Wände, Gebäude platzieren
3. **Decoration:** Atmosphäre hinzufügen (10-20%)

**⚠️ §M.5.1 BAUREGELN FÜR STATIC LAYER:**

> **Regel 1: Zugangspunkte frühzeitig planen**
> - Alle Zugangspunkte (🚪 Türen, ⏫⏬ Treppen, 🪜 Leitern, ➡️⬅️⬆️⬇️ Durchgänge zwischen Zonen) und 🪟 Fenster **müssen bereits im Static Layer eingeplant werden**
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

> **Regel 3: Fehlerkorrektur im Static Layer**
> - Bei **offensichtlichen Fehlern** (vergessene Tür, falsche Wand) darf der Static Layer **einmalig** korrigiert werden
> - **Voraussetzung:** Transparenz gegenüber dem Spieler ("Ich korrigiere die Karte: Die Tür im Süden fehlte")
> - **Keine Korrektur:** Nachträgliches Hinzufügen von Elementen aus taktischen Gründen
> - Nach Korrektur gilt der Static Layer wieder als **unveränderlich**

> **Regel 4: Positionen = Narration**
> - Elemente MÜSSEN dort platziert werden, wo sie **laut Text/Beschreibung** sind
> - Vor Platzierung fragen: "Wo ist X laut der Narration?"
> - Beispiel: "Kutsche fährt gerade ein" = Kutsche am **Eingang**, NICHT am Ausgang
> - Beispiel: "Wachen stehen vor der Tür" = Wachen **direkt an der Tür**, nicht irgendwo

### Schritt 4: Semi-Static platzieren
- Türen an Eingängen
- Container mit Inhalt
- Interaktive Objekte

### Schritt 5: Dynamic initialisieren
- Spieler-Position (narrativ sinnvoll)
- Begleiter neben Spieler
- Feinde laut Beschreibung
- Initiale Effekte (Feuer, etc.)

### Schritt 6: Rendern & Validieren
- Map im Codeblock ausgeben
- Legende darunter (außerhalb Codeblock)
- Checkliste durchgehen

---

## §M.6 MAP AKTUALISIEREN (Jede Runde)

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

## §M.7 AUSGABE-FORMAT

### Beispiel A: Interior (Schenke)

```
⬜🪟⬜⬜⬜🪟🪟⬜⬜⬜🪟⬜
⬜🪴▪️▪️🔳🪑▪️▪️🔳🪑🪴⬜
⬜▪️▪️▪️🪑▪️▪️▪️🪑▪️▪️⬜
⬜🕯️▪️▪️▪️▪️▪️▪️▪️▪️🕯️⬜
⬜🧱▪️▪️▪️▪️▪️▪️▪️▪️▪️⬜
⬜▪️▪️🔳🪑▪️▪️🟡🟢▪️▪️⬜
⬜▪️▪️🪑▪️▪️▪️🔳🔳🔳🔳⬜
⬜🪴▪️▪️▪️🕯️▪️▪️⚪▪️🪵⬜
⬜⬜⬜⬜⬇️⬜⬜⬜⬜⬜⬜⬜
```

**LEGENDE**
- Terrain: ⬜ Wände | ▪️ Boden
- Möbel: 🔳 Tische | 🪑 Stühle
- Dekoration: 🪴 Topfpflanzen | 🕯️ Kerze | 🧱 Säule | 🪵 Holzfass
- Charaktere: 🟢 Spieler | 🟡 Begleiter | ⚪ Wirt
- Interaktion: ⬇️ Tür/Ausgang | 🪟 Fenster

### Beispiel B: Exterior (Waldlichtung)

```
🌲🌲🌿🌲🌲🌲🌿🌲🌲🌲
🌲🌿▪️▪️▪️▪️▪️▪️🌿🌲
🌿▪️▪️▪️▪️▪️▪️🪨▪️🌲
🌲▪️▪️▪️▪️▪️▪️▪️🪨🌿
🌲▪️🍄▪️▪️▪️🟢🔺▪️🌲
🌿🍄🪵▪️🟡▪️▪️▪️🪨🌲
🌲▪️🍄▪️▪️▪️▪️🔻▪️🌿
🌲▪️▪️▪️▪️▪️🪨▪️▪️🌲
🌲🌿▪️▪️▪️▪️▪️▪️🌿🌲
🌲🌲🌿🌲⬇️🌲🌿🌲🌲🌲
```

**LEGENDE**
- Terrain: ▪️ Waldboden | 🌲 Nadelbäume | 🌿 Büsche
- Dekoration: 🪨 Felsen | 🪵 Baumstamm | 🍄 Pilze
- Charaktere: 🟢 Spieler | 🟡 Begleiter | 🔺🔻 Wölfe
- Interaktion: ⬇️ Pfad nach Süden

---

## §M.8 CHECKLISTEN

### Neue Map erstellen

```
SESSION-SKIZZE (ZUERST!):
☐ Session-Skizze → Zonen-Planung konsultiert?
☐ Passende Zone gefunden?
☐ Symbole aus Zonen-Planung übernommen?
☐ Verbindungen aus Zonen-Planung übernommen?
☐ NPC/Feind Start-Positionen übernommen?

MAP-ERSTELLUNG:
☐ Map-Typ bestimmt? (Interior = Dach/Decke, Exterior = freier Himmel)
☐ Größe passend gewählt? (Klein 10x10, Mittel 15x15, Groß 20x20)
☐ Standard-Boden (▪️) für Grundfläche verwendet?
☐ Sondervarianten nur bei Bedarf? (🔸📗🟧 für spezielle Bereiche)
☐ Strukturen/Wände korrekt? (⬜ Außenwände, ◽ Innenwände)
☐ Atmosphärische Dekoration (10-20%)?
☐ BAUREGELN: Alle Zugangspunkte (🚪 Türen, ⏫⏬ Treppen, 🪟 Fenster) im Static Layer geplant?
☐ BAUREGELN: Randwände (⬜) nur bei Interior oder umfriedeten Exterior-Bereichen?
☐ Türen an Eingängen?
☐ Container mit Inhalt definiert?
☐ Alle Charaktere platziert?
☐ ⚠️ POSITIONEN: Stimmen mit Narration überein? (Regel 4)
☐ ⚠️ SYMBOLE: Alle aus §M.2? (KEINE erfundenen!)
☐ Map im Codeblock?
☐ Legende AUSSERHALB Codeblock?
```

### Map aktualisieren (jede Runde)

```
☐ Bewegungen aus Narration extrahiert?
☐ ⚠️ Positionen = Narration? (Wo ist X laut Text?)
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

## §M.9 QUICK REFERENCE

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
▪️ = STANDARD-BODEN (DEFAULT für alle begehbaren Flächen!)
⬜ = Wände (NICHT begehbar)

SONDERVARIANTEN (nur bei Bedarf):
🔸 = Sand/Geröll/Stein (Wüste, Strand)
📗 = Dichtes Gras/Wiese (Grasflächen betonen)
🟧 = Straße/Weg (markierte Wege)
🔹 = Flaches Wasser (begehbar mit Malus)
🔷 = Tiefes Wasser (NICHT begehbar)
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

## §M.10 HÄUFIGE FEHLER

| Fehler | Korrektur |
|--------|-----------|
| Static Layer nach Erstellung ändern | Dynamic Layer für Änderungen nutzen (oder einmalige Fehlerkorrektur mit Transparenz) |
| Falsches Boden-Symbol | ▪️ = Standard-Boden! Andere (🔸📗🟧) nur als Sondervarianten |
| Randwände bei Exterior-Maps | Nur bei Interior oder umfriedeten Bereichen (Burghof, Lager) |
| Koordinaten im Chat anzeigen | Nur narrativ beschreiben |
| Symbole erfinden | NUR Symbole aus Bibliothek! |
| Legende im Codeblock | Legende AUßERHALB des Codeblocks |
| Feldzählung für Bewegung | Kino-Logik: SL entscheidet |
| Treppen mit ⤴️⤵️ | Korrekt: ⏫⏬ für Treppen |
| Interior/Exterior unklar | Faustregel: Hat Dach = Interior, kein Dach = Exterior |

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
