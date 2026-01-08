# FEHLERANALYSE - Dungeons & Decisions v3.2

**Erstellt:** 2026-01-08
**Aktualisiert:** 2026-01-08
**Methode:** Spielverlauf-Simulation mit systematischer Regelprüfung

---

## KRITISCHE FEHLER (Sofort beheben)

### 1. ALLE Beispiel-Charaktere haben keine Waffe im Schnellzugriff

**Problem:** Alle drei Beispiel-Charaktere haben KEINE Waffe im Schnellzugriff:

| Charakter | Schnellzugriff | Waffe? |
|-----------|----------------|--------|
| **Coru** | Dietriche, Heiltrank, Rauchbombe | KEINE |
| **Pip** | Werkzeugset, Rauchbombe, LEER | KEINE |
| **Siles** | Resonanz-Stimmgabel, Kleiner Heiltrank, Kreide | KEINE |

Gemäß ITEM_SYSTEM.md §I.4: "Waffen müssen sich im ⚡ Schnellzugriff befinden, um im Kampf verwendet zu werden."

**Auswirkung:** Alle Charaktere können im Kampf nur ihre Fähigkeiten nutzen oder unbewaffnet kämpfen (kein +1 Waffen-Bonus). Das macht normale Angriffe ohne Fähigkeiten deutlich schwächer.

**Lösung:** Füge mindestens einem Charakter eine Waffe (z.B. Dolch) in den Schnellzugriff hinzu, oder dokumentiere explizit, dass diese Gruppe auf Fähigkeiten-basiertes Kämpfen spezialisiert ist.

---

### 2. Siles hat einen +2 Stärken-Bonus (Regelverstoß?)

**Problem:** `siles_charakterkarte.md:6`:
```
✔ Mentale Barriere (Widerstand gegen Schrecken: +2 Bonus)
```

Aber Regelwerk §1.1 und §2.3 sagen:
- "Stärken ✔ = 2 (je +1 Bonus)"
- "Maximaler Gesamtbonus: +2"

**Frage:** Darf eine einzelne Stärke +2 geben? Das würde bedeuten, dass Siles mit einer passenden Stärke allein schon das Maximum erreicht.

**Mögliche Interpretationen:**
1. **Fehler:** Sollte "+1 Bonus" sein wie bei anderen Stärken
2. **Spezialfall:** "Mentale Barriere" ist eine besondere Stärke mit erhöhtem Bonus
3. **Balancing-Entscheidung:** Ausgleich für "Körperliche Gebrechlichkeit" (-1)

**Lösung:** Klarstellen ob Stärken +2 geben dürfen, oder korrigieren auf +1.

---

## HOHE PRIORITÄT (Sollte behoben werden)

### 3. Widerspruch bei Schadensberechnung für Fähigkeiten

**Problem:** Regelwerk §6.2 sagt:
> "OHNE Schadensangabe → Würfelwurf: 1-2 = 1 Schaden (Minimum)"

Aber Schadens-Tabelle §4.2 sagt:
> "1−2 = kein Schaden verursacht"

**Klarstellung nötig:** Gilt "Minimum 1 Schaden" nur für Fähigkeiten, oder ist §6.2 fehlerhaft?

**Lösung:** Füge eine explizite Anmerkung hinzu:
> "Fähigkeiten mit 'trifft automatisch' garantieren IMMER mindestens 1 Schaden, unabhängig vom Wurf. Dies ist eine Ausnahme zur Standard-Schadens-Tabelle §4.2."

---

### 4. "Einfache Aktionen" nicht definiert

**Problem:** §1.3 ("Doppelt passt"-Regel) sagt:
> "Auto-Erfolg bei einfachen Aktionen"

Aber nirgendwo ist definiert, was "einfach" bedeutet.

**Lösung:** Füge Definition hinzu:
```
Einfache Aktionen: Schwierigkeit ≤ 3 (würde bei Wurf 4+ gelingen)
Normale Aktionen: Schwierigkeit 4-5
Schwere Aktionen: Schwierigkeit 6
```

---

### 5. MP-Regeneration widersprüchlich

**Problem:**
- §7: "1 MP pro Session (regeneriert nicht durch Rast)"
- DM_PROMPT: "MP regenerieren sich NICHT automatisch (nur durch Items/Belohnungen)"

**Frage:** Bekommen Charaktere MP am Session-Start automatisch zurück?

**Lösung:** Klarstellen:
> "MP regenerieren auf 1/1 am START jeder neuen Session. Während einer Session regenerieren sie NICHT durch Rast, nur durch spezielle Items oder Belohnungen."

---

### 6. Maximaler Gesamtbonus (+2) ist unklar

**Problem:** §2.3 sagt "Maximaler Gesamtbonus: +2", aber was zählt dazu?
- Stärke (+1)
- Item (+1)
- Terrain (+1)
- Überraschung (+1)

Bei 4 möglichen +1-Boni wäre +2 Maximum sehr restriktiv.

**Lösung:** Klarstellen:
> "Maximaler Bonus aus Stärke + Item = +2. Terrain- und Situationsmodifikatoren (Deckung, Überraschung) werden ZUSÄTZLICH angewendet, bis zu einem absoluten Maximum von +3."

---

## MITTLERE PRIORITÄT (Sollte geklärt werden)

### 7. Feind-Symbol 🔺 vs 🔻 nicht eindeutig

**Problem:** MAP §M.2:
- 🔺 = Feind (aktiv)
- 🔻 = Feind (geschwächt/Status)

Aber ab wann ist ein Feind "geschwächt"?
- Bei < 50% HP?
- Nur bei Status-Effekten?
- Beides?

**Lösung:** Klarstellen:
> "🔻 wird verwendet wenn: (a) Feind hat einen negativen Status-Effekt (💫😨🌀), ODER (b) Feind hat ≤ 1 HP übrig."

---

### 8. Container-Symbol inkonsistent

**Problem:**
- MAP_GENERATOR_SKILL.md §M.2: `📁 = Kiste/Box`
- STATE_TRACKING_JSON.md: `"symbol": "📦"` für Truhe

**Lösung:** Füge 📦 zur Symbol-Bibliothek hinzu oder ändere STATE_TRACKING auf 📁.

---

### 9. Liquidierungs-Rundung bei kleinen Werten

**Problem:** Eine Fackel (0.5 Gold) ergibt bei 15% = 0.075 Gold. Wird das zu 0 oder 1 aufgerundet?

**Lösung:** Klarstellen:
> "Einzelne Items werden nicht gerundet. Erst die SUMME aller Liquidierungserlöse wird auf ganze Zahlen aufgerundet. Minimum: 0 Gold (nicht 1)."

---

### 10. Verwirrt-Status ohne Verbündete

**Problem:** §4.4 sagt bei Verwirrt und KEINEN Verbündeten: "1-2 = 1 Selbstschaden"
Aber normale Angriffe bei 1-2 machen 0 Schaden.

**Lösung:** Explizit als Ausnahme dokumentieren:
> "Der Selbstschaden bei Verwirrt ohne Verbündete ist GARANTIERT 1 HP - der Charakter verletzt sich selbst durch unkontrollierte Bewegungen, unabhängig von der Schadens-Tabelle."

---

### 11. Feind-Taktiken nicht im Regelwerk

**Problem:** STATE_TRACKING_JSON definiert Taktiken wie "flee_when_hurt", aber das Regelwerk erklärt nicht, wann diese aktiviert werden.

**Lösung:** Füge zum Regelwerk hinzu:
```
§4.5 Feind-Taktiken (SL-Referenz)

| Taktik | Verhalten |
|--------|-----------|
| aggressive | Greift immer das nächste Ziel an |
| defensive | Bleibt in Deckung, greift nur bei Vorteil an |
| flee_when_hurt | Flieht bei ≤ 1 HP |
| guard_position | Verlässt Position nicht, verteidigt Bereich |
```

---

## NIEDRIGE PRIORITÄT (Nice-to-have)

### 12. Heiltrank-Beschreibung verkürzt

**Problem:** CORU_Charakterkarte.md: "Heiltrank (2 HP)" statt "Heiltrank (+2 HP, max 4)"

**Lösung:** Standardisiere alle Item-Beschreibungen in Charakterkarten.

---

### 13. "Doppelt passt"-Regel Balance

**Problem:** Coru + Dietriche + Lockpicking = Auto-Erfolg bei ALLEN Schlössern macht Rätsel trivial.

**Lösung (optional):** Füge Schwierigkeitsgrade für Schlösser hinzu:
> "Doppelt passt gilt nur für EINFACHE Schlösser. Komplexe oder magische Schlösser erfordern trotzdem einen Wurf (mit +2 Bonus)."

---

## ZUSAMMENFASSUNG

| Priorität | Anzahl | Status |
|-----------|--------|--------|
| Kritisch | 2 | Offen |
| Hoch | 4 | Offen |
| Mittel | 5 | Offen |
| Niedrig | 2 | Optional |
| **Gesamt** | **13** | - |

---

## EMPFOHLENE NÄCHSTE SCHRITTE

1. **Sofort:** Füge mindestens einem Charakter eine Waffe in den Schnellzugriff hinzu
2. **Sofort:** Kläre ob Siles' "+2 Bonus" für Mentale Barriere korrekt ist
3. **Bald:** Kläre die Widersprüche in §6.2 vs §4.2
4. **Bald:** Definiere "einfache Aktionen" für §1.3
5. **Später:** Kleinere Inkonsistenzen bereinigen

---

## HINWEIS ZUR ANALYSE

Die Charakterkarten `pip_charakterkarte.md` und `siles_charakterkarte.md` existieren (kleingeschrieben).
Der ursprüngliche Fehler war ein Suchfehler nach großgeschriebenen Dateinamen.
