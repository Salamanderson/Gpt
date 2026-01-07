# 🔍 ANALYSE: Potenzielle Ursachen für LLM-Probleme bei Map-Generierung

**Datum:** 2026-01-07
**Branch:** claude/analyze-map-generation-OGoL5
**Zweck:** Identifikation von Hindernissen, die ein LLM daran hindern könnten, Maps nach MAP_GENERATOR_SKILL.md korrekt zu erstellen

---

## 📊 EXECUTIVE SUMMARY

Diese Analyse identifiziert **35 potenzielle Problemquellen** in 7 Kategorien, die ein LLM bei der Map-Generierung behindern können. Die Hauptprobleme sind:

1. **Komplexität des Layer-Systems** (3-schichtiges System mit strikten Unveränderlichkeits-Regeln)
2. **Strenge Symbol-Bibliothek-Anforderungen** (nur erlaubte Symbole, keine Eigenkreationen)
3. **Subtile Bauregeln** (Zugangspunkte, Randwände-Logik)
4. **Dokumenten-Koordination** (6+ verknüpfte Dokumente)
5. **Format-Präzision** (Codeblock vs. Legende-Trennung)

---

## 🎯 KATEGORIE 1: LAYER-SYSTEM KOMPLEXITÄT

### Problem 1.1: Dreiteiliges Layer-Konzept
**Beschreibung:**
Das System verlangt mentale Trennung von STATIC, SEMI-STATIC und DYNAMIC Layern.

**Potenzielle LLM-Fehler:**
- ❌ Bäume (Static) werden entfernt wenn Spieler sie „fällt"
- ❌ Wände (Static) werden verschoben um Raum zu schaffen
- ❌ Terrain (Static) wird „aktualisiert" statt nur Dynamic Layer zu ändern

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §211-243

**Schweregrad:** 🔴 HOCH
**Grund:** Verletzt fundamentales Konzept, führt zu inkonsistenten Maps

---

### Problem 1.2: Static Layer = NIEMALS ändern
**Beschreibung:**
Die absolute Regel „Static Layer NIEMALS ändern" wird in verschiedenen Kontexten wiederholt, aber LLMs könnten plausibel klingende Ausnahmen erfinden.

**Potenzielle LLM-Fehler:**
- ❌ „Der Spieler hat die Wand zerstört, also ändere ich Static Layer"
- ❌ „Die Tür wurde aufgesprengt, ich entferne sie aus Static"
- ❌ „Ein Baum ist umgefallen, ich passe die Karte an"

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §4, §216, §269, §406

**Schweregrad:** 🔴 HOCH
**Grund:** Zerstört Map-Konsistenz bei Location-Rückkehr

---

### Problem 1.3: Layer-Render-Priorität
**Beschreibung:**
Charaktere (Dynamic) überschreiben ALLES darunter. LLM könnte beide Symbole gleichzeitig zeigen wollen.

**Potenzielle LLM-Fehler:**
- ❌ Zeigt „🟢🔳" um anzuzeigen „Spieler bei Tisch"
- ❌ Zeigt „🟡🌲" für „Begleiter hinter Baum"
- ❌ Lässt Static-Objekt wo Charakter steht sichtbar

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §242, §456-463

**Schweregrad:** 🟡 MITTEL
**Grund:** Visuell verwirrend, aber funktional weniger kritisch

---

## 🎯 KATEGORIE 2: SYMBOL-BIBLIOTHEK-ENFORCEMENT

### Problem 2.1: „Nur Symbole aus Bibliothek"-Regel
**Beschreibung:**
Das LLM muss sich strikte an die Symbol-Bibliothek (§45-208) halten, aber kreative LLMs erfinden gerne neue Symbole für „bessere" Darstellung.

**Potenzielle LLM-Fehler:**
- ❌ Erfindet 🏛️ für „Tempel" (nicht in Bibliothek)
- ❌ Nutzt 🏰 für „Burg" (nicht in Bibliothek)
- ❌ Verwendet 🌉 für „Brücke" (nicht in Bibliothek)
- ❌ Kreiert 🪤 für „Falle" (nicht in Bibliothek)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §5, §19, §482

**Schweregrad:** 🔴 HOCH
**Grund:** Bricht Konsistenz und Verständlichkeit

---

### Problem 2.2: Symbol-Bedeutungs-Verwechslung
**Beschreibung:**
Ähnliche Symbole mit unterschiedlichen Bedeutungen werden verwechselt.

**Potenzielle LLM-Fehler:**
- ❌ Verwechselt 🔸 (Grasland) mit 🟧 (Straße) → Alles wird zur Straße
- ❌ Verwechselt ◽ (Innenwände) mit ⬜ (Außenwände)
- ❌ Verwechselt 🔹 (Flaches Wasser) mit 🔷 (Tiefes Wasser) → Begehbarkeit falsch
- ❌ Verwechselt ⚪ (NPC) mit 🟢 (Spieler)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §48-64, §445-452

**Schweregrad:** 🟡 MITTEL
**Grund:** Führt zu mechanischen Fehlern (z.B. falsches Begehbarkeit)

---

### Problem 2.3: Terrain-Dominanz-Regel
**Beschreibung:**
Static Layer soll 40-60% dominantes Terrain haben, aber LLM könnte zu viel Variation wollen.

**Potenzielle LLM-Fehler:**
- ❌ Nutzt 15 verschiedene Terrain-Typen auf 10x10 Map
- ❌ Füllt nur 10% mit dominantem Terrain
- ❌ Erstellt „interessantes Patchwork" statt kohärenter Flächen

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §289, §386

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Ästhetisch suboptimal, aber funktional nicht kritisch

---

## 🎯 KATEGORIE 3: BAUREGELN-VERSTÄNDNIS

### Problem 3.1: Bauregeln-Timing (Zugangspunkte)
**Beschreibung:**
Regel 1 (§295-299): Alle Zugangspunkte (🚪⤴️⤵️🪜🪟) MÜSSEN im Static Layer geplant werden. LLM könnte denken „ich füge später hinzu".

**Potenzielle LLM-Fehler:**
- ❌ Erstellt Map ohne Türen, denkt „füge ich hinzu wenn Spieler öffnet"
- ❌ Plant Treppen nicht ein, denkt „kommt später wenn nötig"
- ❌ Vergisst Fenster komplett
- ❌ Lässt Raum ohne Zugangspunkt (eingeschlossen)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §295-299, §389

**Schweregrad:** 🔴 HOCH
**Grund:** Macht Location unspielbar oder inkonsistent

---

### Problem 3.2: Bauregeln-Kontext (Randwände)
**Beschreibung:**
Regel 2 (§301-308): Exterior-Karten brauchen KEINE Randwände, AUSSER bei umfriedeten Bereichen. LLM könnte Regel falsch anwenden.

**Potenzielle LLM-Fehler:**
- ❌ Setzt immer Randwände, auch bei offener Waldlichtung
- ❌ Setzt niemals Randwände, auch bei ummauertem Lager
- ❌ Versteht „Exterior" als „immer offen"
- ❌ Vergisst Ausnahme-Logik (Palisaden, Mauern)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §301-308, §390

**Schweregrad:** 🟡 MITTEL
**Grund:** Visuell inkorrekt, aber spielbar

---

### Problem 3.3: Map-Typ-Bestimmung (Interior vs Exterior)
**Beschreibung:**
LLM muss korrekt zwischen Interior/Exterior unterscheiden für Bauregeln.

**Potenzielle LLM-Fehler:**
- ❌ Klassifiziert überdachten Marktplatz als „Exterior" (keine Wände)
- ❌ Klassifiziert offene Ruine als „Interior" (hat Wände)
- ❌ Unklar bei Mischformen (Innenhof, Höhle mit offenem Dach)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §276, §301-308, §384

**Schweregrad:** 🟡 MITTEL
**Grund:** Beeinflusst Bauregeln-Anwendung

---

## 🎯 KATEGORIE 4: FORMAT & PRÄSENTATION

### Problem 4.1: Codeblock vs Legende-Trennung
**Beschreibung:**
Kritische Regel #2: Legende IMMER außerhalb des Codeblocks.

**Potenzielle LLM-Fehler:**
- ❌ Schreibt Legende IN den Codeblock
- ❌ Vergisst Legende komplett
- ❌ Schreibt Map ohne Codeblock (nur als Text)
- ❌ Erstellt zwei Codeblocks (einer für Map, einer für Legende)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §2, §16, §369-375, §483

**Schweregrad:** 🟡 MITTEL
**Grund:** Bricht Darstellungskonvention, aber Map bleibt verständlich

---

### Problem 4.2: Doppelte Map-Ausgabe
**Beschreibung:**
Kritische Regel #1: Map IMMER im Chat UND im Codeblock (nicht NUR Codeblock).

**Potenzielle LLM-Fehler:**
- ❌ Zeigt Map nur im Codeblock, kein zusätzlicher Kontext
- ❌ Zeigt Map nur als Text, ohne Codeblock
- ❌ Missversteht „UND" als „ODER"

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §1, §15

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Interpretation-Unterschied, wenig funktionaler Schaden

---

### Problem 4.3: Legende-Vollständigkeit
**Beschreibung:**
Legende muss alle verwendeten Symbole erklären.

**Potenzielle LLM-Fehler:**
- ❌ Erklärt nur „interessante" Symbole, nicht Basis-Terrain
- ❌ Vergisst Feinde in Legende
- ❌ Erklärt Symbole die nicht auf der Map sind
- ❌ Unvollständige Kategorisierung (z.B. nur „Charaktere" ohne Einzelne)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §369-375, §397

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Verständlichkeit leidet, aber Map bleibt nutzbar

---

## 🎯 KATEGORIE 5: KOORDINATEN & KINO-LOGIK

### Problem 5.1: Koordinaten-Anzeige-Verbot
**Beschreibung:**
§23-42: Koordinaten dienen NUR Visualisierung, NIEMALS im Chat zeigen.

**Potenzielle LLM-Fehler:**
- ❌ Schreibt „Coru steht bei (5,3)"
- ❌ Beschreibt Distanzen in Feldern: „5 Felder entfernt"
- ❌ Gibt X/Y-Koordinaten in Statusbox an
- ❌ Nutzt Grid-Referenzen statt narrativer Beschreibung

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §23-42, §441, §484

**Schweregrad:** 🟡 MITTEL
**Grund:** Bricht Kino-Logik-Prinzip

---

### Problem 5.2: Bewegungs-Mechanik-Verwechslung
**Beschreibung:**
Bewegung ist NARRATIV (Kino-Logik), nicht mechanisch (Feldzählung).

**Potenzielle LLM-Fehler:**
- ❌ „Du kannst nur 3 Felder bewegen"
- ❌ „Der Gegner ist 8 Felder entfernt, zu weit"
- ❌ Berechnet Reichweiten basierend auf Koordinaten
- ❌ Verbietet plausible Aktionen wegen „Distanz"

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §23-42, §14 (Regelwerk §3.3), DUNGEON_MASTER_PROMPT §489-507

**Schweregrad:** 🔴 HOCH
**Grund:** Zerstört Spielfluss und Kino-Logik-Prinzip

---

### Problem 5.3: Distanz-Beschreibungs-Inkonsistenz
**Beschreibung:**
LLM muss narrativ beschreiben („nah", „weit", „unerreichbar"), aber konsistent bleiben.

**Potenzielle LLM-Fehler:**
- ❌ Erst „weit entfernt" beschrieben, dann „erreichbar in einem Zug"
- ❌ Inkonsistente Maßstäbe zwischen Runden
- ❌ Wechselt zwischen numerisch und narrativ

**Regelwerk-Referenz:** Regelwerk §3.3, MAP_GENERATOR_SKILL.md §27-33

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Verwirrend, aber durch SL-Entscheidung korrigierbar

---

## 🎯 KATEGORIE 6: MULTI-LOCATION SYSTEM

### Problem 6.1: Location-ID-Generierung
**Beschreibung:**
§248-271: Jede Location braucht eindeutige ID, bleibt parallel gespeichert.

**Potenzielle LLM-Fehler:**
- ❌ Nutzt gleiche ID für verschiedene Locations
- ❌ Überschreibt alte Location statt neue zu erstellen
- ❌ Vergisst ID-Generierung komplett
- ❌ Inkonsistente ID-Formate (mal Deutsch, mal Englisch)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §248-271, §414-418

**Schweregrad:** 🟡 MITTEL
**Grund:** Führt zu Datenverlust bei Location-Wechsel

---

### Problem 6.2: Location-Zustand-Persistenz
**Beschreibung:**
Bei Rückkehr zu Location muss alter Zustand geladen werden (außer Static Layer).

**Potenzielle LLM-Fehler:**
- ❌ Generiert Location neu statt zu laden
- ❌ Vergisst Dynamic-Änderungen (besiegte Feinde, geöffnete Türen)
- ❌ Lädt auch Static Layer neu (sollte identisch sein)
- ❌ Merkt sich Location nicht (nur aktuelle existiert)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §261-265, §415

**Schweregrad:** 🔴 HOCH
**Grund:** Zerstört Spiel-Kontinuität

---

### Problem 6.3: Eine Map = Eine Location
**Beschreibung:**
Kritische Regel #3: Eine Map = Eine Location (nicht mehrere Räume in einer Map).

**Potenzielle LLM-Fehler:**
- ❌ Zeigt Taverne + Straße + Markt in einer Map
- ❌ Kombiniert Erdgeschoss + Obergeschoss in einer Map
- ❌ Erstellt „offene Welt" statt diskrete Locations
- ❌ Missversteht Location-Granularität

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §3, §17

**Schweregrad:** 🟡 MITTEL
**Grund:** Verletzt Konzept, aber Maps bleiben nutzbar

---

## 🎯 KATEGORIE 7: DOKUMENTEN-KOORDINATION

### Problem 7.1: Cross-Reference Verfolgung
**Beschreibung:**
MAP_GENERATOR_SKILL.md referenziert:
- Regelwerk §3.3 (Kino-Logik)
- Regelwerk §4.4 (Zustände)
- STATE_TRACKING_JSON.md
- DUNGEON_MASTER_PROMPT_v3_2.md

**Potenzielle LLM-Fehler:**
- ❌ Liest nur MAP_GENERATOR_SKILL.md, ignoriert Cross-References
- ❌ Versteht Kino-Logik nicht ohne Regelwerk-Kontext
- ❌ Missversteht Statusbox-Format ohne STATE_TRACKING
- ❌ Kennt Kritische Regeln aus DM_PROMPT nicht

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §3-7

**Schweregrad:** 🔴 HOCH
**Grund:** Fundamentales Verständnis fehlt

---

### Problem 7.2: Hierarchie-Konflikt-Auflösung
**Beschreibung:**
Dokumenten-Hierarchie (DUNGEON_MASTER_PROMPT §38-51):
1. Kritische Regeln
2. Regelwerk
3. Item-System
4. State-Tracking
5. World Setting
6. Charakterkarten
7. Session-Skizze
8. MAP_GENERATOR_SKILL
9. Sonstiges

**Potenzielle LLM-Fehler:**
- ❌ Bei Konflikt falsche Priorität wählen
- ❌ MAP_GENERATOR_SKILL über Kritische Regeln stellen
- ❌ Charakterkarte ignorieren zugunsten Map-Logik
- ❌ Session-Skizze über Regelwerk stellen

**Regelwerk-Referenz:** DUNGEON_MASTER_PROMPT §38-51

**Schweregrad:** 🟡 MITTEL
**Grund:** Führt zu Regel-Inkonsistenzen

---

### Problem 7.3: DM_PROMPT Integration
**Beschreibung:**
DUNGEON_MASTER_PROMPT enthält kritische Map-Regeln (§462-507):
- KARTEN-PFLICHT (#5)
- MAP-STANDARD (#9)
- KINO-LOGIK (#14)

**Potenzielle LLM-Fehler:**
- ❌ Liest nur MAP_GENERATOR_SKILL, kennt kritische Regeln nicht
- ❌ Zeigt Karte nicht bei Kampfbeginn (KARTEN-PFLICHT)
- ❌ Missachtet Bewegungs-Beschreibungs-Regel (KINO-LOGIK)
- ❌ Folgt nicht Antwortformat (FORMAT-KETTE)

**Regelwerk-Referenz:** DUNGEON_MASTER_PROMPT §20-35, §462-507

**Schweregrad:** 🔴 HOCH
**Grund:** Kritische Regeln haben absolute Priorität

---

## 🎯 KATEGORIE 8: STATE-TRACKING INTEGRATION

### Problem 8.1: JSON-State vs Visuelle Karte
**Beschreibung:**
Positionen werden intern als JSON (STATE_TRACKING_JSON §40-58) UND visuell auf Karte getrackt.

**Potenzielle LLM-Fehler:**
- ❌ JSON-Position und Karten-Position divergieren
- ❌ Updated Karte, aber nicht JSON (oder umgekehrt)
- ❌ Koordinaten-System-Mismatch (welche ist Quelle der Wahrheit?)
- ❌ Vergisst Position-Update bei Bewegung

**Regelwerk-Referenz:** STATE_TRACKING_JSON.md §40-58, §438

**Schweregrad:** 🟡 MITTEL
**Grund:** Interne Inkonsistenz, aber visuell ggf. korrekt

---

### Problem 8.2: Semi-Static Status-Tracking
**Beschreibung:**
Semi-Static Layer (Türen, Container) ändert sich nur bei Interaktion, muss getrackt werden.

**Potenzielle LLM-Fehler:**
- ❌ Vergisst dass Tür geöffnet wurde (zeigt wieder 🚪 statt 🔓)
- ❌ Zeigt geplünderte Kiste wieder voll (📁 statt ▪️)
- ❌ Setzt Semi-Static bei Location-Rückkehr zurück
- ❌ Ändert Semi-Static ohne Interaktion

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §224-233, §336

**Schweregrad:** 🟡 MITTEL
**Grund:** Kontinuitätsfehler, aber korrigierbar

---

### Problem 8.3: Effekt-Dauer-Tracking
**Beschreibung:**
Dynamic Layer Effekte (🔥⚡) haben Rundenanzahl, müssen entfernt werden.

**Potenzielle LLM-Fehler:**
- ❌ Feuer bleibt ewig auf der Karte
- ❌ Vergisst Effekte zu entfernen nach Dauer-Ende
- ❌ Entfernt Effekte zu früh
- ❌ Tracked Dauer nicht mit JSON-State

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §235-243, §339

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Ästhetisch/narrativ inkorrekt, aber unkritisch

---

## 🎯 KATEGORIE 9: CHECKLISTEN-EINHALTUNG

### Problem 9.1: Neue Map Checkliste
**Beschreibung:**
§381-398: 14-Punkte-Checkliste für neue Maps.

**Potenzielle LLM-Fehler:**
- ❌ Überspringt Checkliste komplett
- ❌ Checked nur erste 3-4 Punkte, vergisst Rest
- ❌ Folgt Checkliste nicht sequenziell
- ❌ Ignoriert Bauregeln-Checks (§389-390)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §381-398

**Schweregrad:** 🟡 MITTEL
**Grund:** Führt zu unvollständigen Maps

---

### Problem 9.2: Update-Checkliste
**Beschreibung:**
§400-409: 6-Punkte-Checkliste für Map-Updates.

**Potenzielle LLM-Fehler:**
- ❌ Updated Map ohne Checkliste zu prüfen
- ❌ Vergisst Static Layer Unveränderlichkeit zu prüfen
- ❌ Aktualisiert Legende nicht
- ❌ Rendert neue Map nicht

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §400-409

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Quality-Check, aber nicht spielkritisch

---

### Problem 9.3: Location-Wechsel-Checkliste
**Beschreibung:**
§412-418: 4-Punkte-Checkliste für Location-Wechsel.

**Potenzielle LLM-Fehler:**
- ❌ Wechselt Location ohne aktuelle zu speichern
- ❌ Prüft nicht ob neue Location existiert
- ❌ Zeigt alte Map statt neue
- ❌ Verwechselt Locations

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §412-418

**Schweregrad:** 🟡 MITTEL
**Grund:** Datenverlust-Risiko

---

## 🎯 KATEGORIE 10: HÄUFIGE FEHLER (aus §475-485)

### Problem 10.1: Static Layer Änderung (Top-Fehler)
**Beschreibung:**
Explizit gelistet als häufiger Fehler: „Static Layer nach Erstellung ändern".

**Potenzielle LLM-Fehler:**
- ❌ Alle bereits genannten Static-Layer-Fehler

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §479

**Schweregrad:** 🔴 HOCH
**Grund:** Explizit als Hauptproblem identifiziert

---

### Problem 10.2: 🟧-Missbrauch
**Beschreibung:**
Häufiger Fehler: 🟧 für normalen Boden nutzen (sollte 🔸 sein). 🟧 NUR für Straßen.

**Potenzielle LLM-Fehler:**
- ❌ Nutzt 🟧 für alle Böden weil „sieht besser aus"
- ❌ Verwechselt 🔸 und 🟧
- ❌ Übertreibt Straßen-Dichte

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §480, §445-452

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Visuell inkorrekt, aber funktional egal

---

### Problem 10.3: Symbol-Erfindung
**Beschreibung:**
Häufiger Fehler: „Symbole erfinden" statt Bibliothek nutzen.

**Potenzielle LLM-Fehler:**
- ❌ Alle bereits genannten Symbol-Erfindungs-Fehler (2.1)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §482

**Schweregrad:** 🔴 HOCH
**Grund:** Explizit als Hauptproblem identifiziert

---

### Problem 10.4: Feldzählung
**Beschreibung:**
Häufiger Fehler: „Feldzählung für Bewegung" statt Kino-Logik.

**Potenzielle LLM-Fehler:**
- ❌ Alle bereits genannten Kino-Logik-Fehler (5.2)

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §485

**Schweregrad:** 🔴 HOCH
**Grund:** Explizit als Hauptproblem identifiziert

---

## 🎯 KATEGORIE 11: ATMOSPHÄRE & DEKORATION

### Problem 11.1: Dekoration-Verhältnis
**Beschreibung:**
§289: Atmosphärische Dekoration sollte 10-20% ausmachen.

**Potenzielle LLM-Fehler:**
- ❌ Null Dekoration (sterile Maps)
- ❌ 50%+ Dekoration (überladen)
- ❌ Falsche Dekoration für Setting (Palmen in Schneelandschaft)
- ❌ Mechanisch relevante Objekte als „Dekoration"

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §289, §292, §387

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Ästhetik, nicht Funktionalität

---

### Problem 11.2: Kontext-Angemessenheit
**Beschreibung:**
§275-278: Map-Erstellung muss Kontext analysieren (Taverne vs Wald vs Dungeon).

**Potenzielle LLM-Fehler:**
- ❌ Generic Maps ohne Atmosphäre
- ❌ Unpassende Objekte (Betten in Höhle, Felsen in Taverne)
- ❌ Ignoriert Narrativ-Kontext
- ❌ Verwendet immer gleiche Map-Template

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §275-278

**Schweregrad:** 🟡 MITTEL
**Grund:** Immersions-Bruch

---

## 🎯 KATEGORIE 12: GRÖSSEN-MANAGEMENT

### Problem 12.1: Unpassende Map-Größe
**Beschreibung:**
§282-287: Klein 10x10, Mittel 15x15, Groß 20x20 basierend auf Situation.

**Potenzielle LLM-Fehler:**
- ❌ 20x20 für einzelnen Raum (zu groß)
- ❌ 10x10 für ganzes Dorf (zu klein)
- ❌ Nicht-Standard-Größen (13x17, etc.)
- ❌ Rechteckige statt quadratische Maps

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §282-287

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Funktional egal, aber konvention-widrig

---

### Problem 12.2: Charakter-Dichte
**Beschreibung:**
Größe-Tabelle §282-287 gibt Charakteranzahl-Empfehlung.

**Potenzielle LLM-Fehler:**
- ❌ 10 Charaktere auf 10x10 Map (zu eng)
- ❌ 2 Charaktere auf 20x20 Map (zu leer)
- ❌ Platziert alle in einer Ecke
- ❌ Verteilt unrealistisch gleichmäßig

**Regelwerk-Referenz:** MAP_GENERATOR_SKILL.md §282-287

**Schweregrad:** 🟢 NIEDRIG
**Grund:** Unbequem, aber spielbar

---

## 📊 PROBLEM-ZUSAMMENFASSUNG

### Nach Schweregrad

| Schweregrad | Anzahl | Probleme |
|-------------|--------|----------|
| 🔴 **HOCH** | 11 | 1.1, 1.2, 2.1, 3.1, 5.2, 6.2, 7.1, 7.3, 10.1, 10.3, 10.4 |
| 🟡 **MITTEL** | 14 | 1.3, 2.2, 3.2, 3.3, 4.1, 5.1, 6.1, 6.3, 7.2, 8.1, 8.2, 9.1, 9.3, 11.2 |
| 🟢 **NIEDRIG** | 10 | 2.3, 4.2, 4.3, 5.3, 8.3, 9.2, 10.2, 11.1, 12.1, 12.2 |

### Nach Kategorie

| Kategorie | Probleme | Höchster Schweregrad |
|-----------|----------|---------------------|
| 1. Layer-System | 3 | 🔴 HOCH |
| 2. Symbol-Bibliothek | 3 | 🔴 HOCH |
| 3. Bauregeln | 3 | 🔴 HOCH |
| 4. Format | 3 | 🟡 MITTEL |
| 5. Koordinaten & Kino-Logik | 3 | 🔴 HOCH |
| 6. Multi-Location | 3 | 🔴 HOCH |
| 7. Dokumenten-Koordination | 3 | 🔴 HOCH |
| 8. State-Tracking | 3 | 🟡 MITTEL |
| 9. Checklisten | 3 | 🟡 MITTEL |
| 10. Häufige Fehler | 4 | 🔴 HOCH |
| 11. Atmosphäre | 2 | 🟡 MITTEL |
| 12. Größen | 2 | 🟢 NIEDRIG |

---

## 🎯 TOP 10 KRITISCHE PROBLEME

**Geordnet nach Wahrscheinlichkeit × Schweregrad:**

1. **Static Layer ändern** (1.2, 10.1)
   - Fundamentalste Regel, wird in 4+ Stellen betont

2. **Symbol-Erfindung** (2.1, 10.3)
   - Explizit als häufiger Fehler gelistet

3. **Kino-Logik missachten** (5.2, 10.4)
   - Explizit als häufiger Fehler gelistet

4. **Dokumenten-Koordination fehlt** (7.1, 7.3)
   - Ohne Cross-References fehlt Kontext

5. **Zugangspunkte vergessen** (3.1)
   - Macht Locations unspielbar

6. **Location-Persistenz fehlt** (6.2)
   - Zerstört Spiel-Kontinuität

7. **Layer-System nicht verstanden** (1.1)
   - Fundamentales Konzept

8. **Kritische Regeln unbekannt** (7.3)
   - DM_PROMPT hat absolute Priorität

9. **Symbol-Verwechslung** (2.2)
   - Führt zu mechanischen Fehlern

10. **Bauregeln-Timing falsch** (3.1)
    - Türen/Treppen nicht von Anfang an

---

## 💡 EMPFEHLUNGEN

### Für LLM-Prompting
1. **Explizit alle Cross-References nennen** in System-Prompt
2. **Layer-System-Konzept wiederholen** bei jeder Map-Anfrage
3. **Checklisten erzwingen** durch strukturierte Ausgabe
4. **Symbol-Bibliothek inline bereitstellen** statt Referenz
5. **„NIEMALS"-Regeln fett hervorheben** (Static Layer, Symbol-Erfindung)

### Für Dokumentation
1. **Inline-Beispiele** für jede Regel (gut ✅ vs schlecht ❌)
2. **Quick-Reference Card** mit Top 10 Regeln
3. **Troubleshooting-Sektion** mit häufigen Fehlern
4. **Regel-Zusammenfassung** am Dokumenten-Anfang
5. **Visuelles Diagramm** des Layer-Systems

### Für Testing
1. **Test-Cases** für alle 35 Probleme erstellen
2. **Regression-Tests** für Top 10 kritische Probleme
3. **Map-Validator** Tool (prüft Symbol-Bibliothek, Format, etc.)
4. **LLM-Output-Audit** auf häufige Fehler

---

**Ende der Analyse**
