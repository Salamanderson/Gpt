# 🎒 ITEM-SYSTEM v3.2

**Zweck:** Zentrale Referenz für Item-Mechaniken  
**Abruf:** Bei Item-Nutzung oder Inventar-Fragen konsultieren

---

## §I.1 INVENTAR-STRUKTUR

| Bereich | Slots | Zugriff | Persistenz |
|---------|-------|---------|------------|
| ⚡ **Schnellzugriff** | 3 | Jederzeit (auch Kampf) | Bleibt zwischen Abenteuern |
| 🎒 **Gepäck** | 10 | Nur außerhalb Kampf | Wird bei Abenteuer-Ende liquidiert |
| 💰 **Party-Gold** | ∞ | Jederzeit | Bleibt zwischen Abenteuern |

**Kampfregel:** Im Kampf können NUR Items aus Schnellzugriff verwendet werden.  
**Tauschen:** 1 Aktion außerhalb Kampf = Items zwischen Schnellzugriff ↔ Gepäck bewegen.

---

## §I.2 PARTY-GOLD-SYSTEM (NEU in v3.2)

### Grundprinzip

Alle Charaktere teilen einen **gemeinsamen Gold-Pool**. Es gibt kein individuelles Gold mehr.

### Anzeige im State

```
💰 Party-Gold: 25
```

### Transaktionen

| Transaktion | Effekt |
|-------------|--------|
| Item kaufen | Party-Gold −X |
| Item verkaufen | Party-Gold +X |
| Gold finden | Party-Gold +X |
| Bestechung / Kosten | Party-Gold −X |

### Tracking-Format

```markdown
[GOLD-UPDATE]
Aktion: Schwert bei Händler verkauft
Wert: 10 Gold × 50% = 5 Gold
💰 Party-Gold: 20 → 25 (+5)
```

---

## §I.3 HANDEL & VERKAUF (NEU in v3.2)

### Verkaufsraten-Tabelle

| Situation | Verkaufspreis | Beispiel |
|-----------|---------------|----------|
| **Bei Händlern** | 50% des Listenpreises | Schwert (10G) → 5G |
| **Liquidierung (Session-Ende)** | 15% des Listenpreises | Schwert (10G) → 1.5G |
| **Seltene/Einzigartige Items** | Bis 75% (SL-Entscheidung) | Magisches Schwert → verhandelbar |
| **NSC mit besonderem Interesse** | Bis 100% (SL-Entscheidung) | Sammler sucht genau dieses Item |

### Handels-Ablauf

```
1. Spieler möchte Item verkaufen
2. SL prüft: Händler vorhanden? Interesse?
3. Berechnung: Listenpreis × Verkaufsrate
4. Gold-Update durchführen
5. Item aus Inventar entfernen
```

### Feilschen (Optional)

Bei Verkauf an Händler kann der Spieler **feilschen**:
- Würfeln (1W6):
  - **6:** 60% statt 50%
  - **5:** 55% statt 50%
  - **4:** 50% (Standard)
  - **1-3:** 45% (Händler ist verärgert)

---

## §I.4 ITEM-KATEGORIEN

### ⚔️ WAFFEN

| Item | Effekt | Bonus | Listenpreis |
|------|--------|-------|-------------|
| Dolch/Messer | Nahkampf-Standardwaffe | +1 auf Nahkampf wenn passend | 2 Gold |
| Schwert | Nahkampf, mehr Reichweite | +1 auf Nahkampf wenn passend | 10 Gold |
| Bogen/Armbrust | Fernkampf (benötigt Munition) | +1 auf Fernkampf wenn passend | 8 Gold |
| Wurfmesser (3x) | Fernkampf, verbrauchbar | +1 auf Fernkampf, -1 pro Wurf | 3 Gold |
| Improvisierte Waffe | Situationsabhängig | Kein Bonus, aber nutzbar | 0 Gold |

**⚠️ WICHTIG – Waffen-Regel:**  
Waffen müssen sich im **⚡ Schnellzugriff** befinden, um im Kampf verwendet zu werden und ihren +1 Bonus zu geben. Waffen im 🎒 Gepäck können im Kampf NICHT genutzt werden!

---

### 🛡️ RÜSTUNGEN

| Item | Effekt | Einschränkung | Listenpreis |
|------|--------|---------------|-------------|
| Lederrüstung | 1× pro Kampf: 1 Schaden ignorieren | Keine | 15 Gold |
| Kettenhemd | 1× pro Kampf: 1 Schaden ignorieren | -1 auf Schleichen | 40 Gold |
| Schild | +1 auf Verteidigung bei aktivem Block | Blockiert eine Hand | 8 Gold |
| Helm | Einmalig: Kopftreffer-Patzer negieren | Keine | 5 Gold |

**⚠️ WICHTIG – Rüstungs-Regel:**  
Rüstung muss sich im **⚡ Schnellzugriff** befinden, um zu wirken!
- Rüstung im Schnellzugriff = ANGELEGT und aktiv
- Rüstung im Gepäck = NICHT angelegt, keine Wirkung
- Im Kampf kann Rüstung NICHT aus dem Gepäck angelegt werden

**Konsequenz für Inventar-Planung:**  
Wer Rüstung tragen will, "opfert" einen Schnellzugriff-Slot dafür. Bei 3 Slots bedeutet das:
- Slot 1: Rüstung (z.B. Lederrüstung)
- Slot 2: Waffe oder Item
- Slot 3: Waffe oder Item

---

### 🧪 VERBRAUCHSGÜTER

| Item | Effekt | Verbrauch | Listenpreis |
|------|--------|-----------|-------------|
| Heiltrank | +2 HP (max. 4) | 1× | 5 Gold |
| Kleiner Heiltrank | +1 HP (max. 4) | 1× | 2 Gold |
| Rauchbombe | Feinde -2 auf alle Würfe für 2 Runden | 1× | 3 Gold |
| Blendpulver | 1 Feind 💫 Betäubt für 1 Runde | 1× | 4 Gold |
| Gift (Phiole) | Waffe vergiften: nächster Treffer +1 Schaden | 1× | 6 Gold |
| Wurfnetz | Ziel 🌀 Bewegungsunfähig für 1 Runde | 1× | 4 Gold |
| Fackel | Licht für 1 Szene, improvisierte Waffe | 1 Szene | 0.5 Gold |
| Seil (10m) | Klettern, Fesseln, Fallen | Wiederverwendbar | 1 Gold |

**Regel:** Nach Verbrauch → Slot wird ⬜ LEER.

---

### 🍖 NAHRUNG & GETRÄNKE

| Item | Effekt | Verbrauch | Listenpreis |
|------|--------|-----------|-------------|
| Proviant | Bei Rast: Garantiert HP-Regeneration | 1× | 0.3 Gold |
| Wasser/Wasserschlauch | Verhindert Erschöpfung auf langen Reisen | 1× pro Tag | 0.2 Gold |
| Bier/Wein | Sozial: +1 auf Verhandeln mit Trinkern | 1× | 0.5 Gold |
| Edler Wein | Sozial: +1 auf Verhandeln mit Adligen | 1× | 5 Gold |

**Regel:** Nahrung kann NICHT im Kampf konsumiert werden.

---

### 🔧 WERKZEUGE

| Item | Effekt | Verbrauch | Listenpreis |
|------|--------|-----------|-------------|
| Dietriche | +1 auf Schlösser knacken | Wiederverwendbar | 5 Gold |
| Werkzeugset | +1 auf Reparaturen/Basteln | Wiederverwendbar | 8 Gold |
| Brecheisen | +1 auf Aufbrechen, improvisierte Waffe | Wiederverwendbar | 2 Gold |
| Laterne | Licht ohne Zeitlimit (braucht Öl) | Wiederverwendbar | 3 Gold |
| Öl (Flasche) | Laterne füllen ODER Feuer legen | 1× | 0.5 Gold |
| Fernglas | Weitsicht, Aufklärung | Wiederverwendbar | 10 Gold |
| Schreibzeug | Notizen, Karten, Nachrichten | Wiederverwendbar | 1 Gold |

---

### 💎 WERTGEGENSTÄNDE

| Item | Wert | Effekt |
|------|------|--------|
| Goldmünzen | 1 Gold/Stück | Handelsware |
| Silbermünzen | 0.1 Gold/Stück | Handelsware |
| Edelstein | 5-50 Gold | Handelsware, kompakt |
| Schmuck | 2-20 Gold | Handelsware, soziales Signal |

**Regel:** Wertgegenstände können bei Händlern getauscht werden. Preise = SL-Entscheidung.

---

## §I.5 ITEM-NUTZUNG

### Im Kampf (Schnellzugriff)

```
Item nutzen = 1 Aktion
→ Effekt tritt sofort ein
→ Bei Verbrauchsgut: Slot wird ⬜ LEER
→ NUR Items aus ⚡ Schnellzugriff verfügbar!
```

### Außerhalb Kampf

```
Item nutzen = Narrativ beschreiben
→ Kein Aktions-Limit
→ Gepäck ist zugänglich
→ Tauschen zwischen Schnellzugriff ↔ Gepäck möglich
```

### Item aufheben/ablegen

```
Aufheben: Muss freien Slot haben (Schnellzugriff ODER Gepäck)
Ablegen: Item wird an Ort zurückgelassen
Tauschen: 1 Aktion außerhalb Kampf
```

---

## §I.6 SPEZIALREGELN

### Munition
- Pfeile/Bolzen: 10er-Bündel = 1 Slot
- Nach Kampf: 50% Munition wiedergewonnen (aufrunden)

### Stapelbare Items
- Wurfmesser: Max. 3 pro Slot
- Heiltränke: Nicht stapelbar (1 pro Slot)
- Proviant: Max. 3 Rationen pro Slot

### Kaputte Items
- Bei Patzer (1): SL kann Item-Beschädigung als Konsequenz wählen
- Reparatur: Werkzeugset + passende Stärke + Wurf 4+

---

## §I.7 SESSION-ÜBERGANG & LIQUIDIERUNG (NEU in v3.2)

### Ende des Abenteuers - 3-Phasen-System

#### Phase 1: Behalten

```
✔ BEHALTEN:
  - ⚡ 3 Schnellzugriff-Items (Spieler wählt)
  - 💰 Party-Gold (kompletter Pool)
```

#### Phase 2: Liquidierung

```
🎒 GEPÄCK WIRD LIQUIDIERT:
  - Alle Items werden automatisch verkauft
  - Verkaufspreis: 15% des Listenpreises
  - Einzigartige Items: SL-Entscheidung (0-50%)
  - Erlös fließt in Party-Gold
```

**Liquidierungs-Berechnung:**

| Item | Listenpreis | × 15% | Erlös |
|------|-------------|-------|-------|
| Schwert | 10 Gold | 0.15 | 1.5 Gold |
| Heiltrank | 5 Gold | 0.15 | 0.75 Gold |
| Seil | 1 Gold | 0.15 | 0.15 Gold |
| **Summe** | | | **2.4 Gold** |

→ Aufrunden auf ganze Zahlen: **3 Gold → Party-Gold**

#### Phase 3: Reset

```
✗ VERLIEREN:
  - Alle Items im Gepäck (nach Liquidierung)
  - Gepäck wird komplett geleert (alle Slots → ⬜)
```

### Vor neuem Abenteuer

```
Spieler wählt:
1. Welche 3 Items in Schnellzugriff
2. Ob Party-Gold für neue Items ausgegeben wird
3. Charakterkarte aktualisieren? (auf Verlangen)
```

---

## §I.8 PREISLISTE (REFERENZ)

| Item | Kaufpreis | Verkauf (50%) | Liquidierung (15%) |
|------|-----------|---------------|-------------------|
| Dolch | 2 Gold | 1 Gold | 0.3 Gold |
| Schwert | 10 Gold | 5 Gold | 1.5 Gold |
| Bogen | 8 Gold | 4 Gold | 1.2 Gold |
| Pfeile (10) | 1 Gold | 0.5 Gold | 0.15 Gold |
| Lederrüstung | 15 Gold | 7.5 Gold | 2.25 Gold |
| Kettenhemd | 40 Gold | 20 Gold | 6 Gold |
| Schild | 8 Gold | 4 Gold | 1.2 Gold |
| Heiltrank | 5 Gold | 2.5 Gold | 0.75 Gold |
| Kleiner Heiltrank | 2 Gold | 1 Gold | 0.3 Gold |
| Rauchbombe | 3 Gold | 1.5 Gold | 0.45 Gold |
| Proviant (3) | 1 Gold | 0.5 Gold | 0.15 Gold |
| Dietriche | 5 Gold | 2.5 Gold | 0.75 Gold |
| Werkzeugset | 8 Gold | 4 Gold | 1.2 Gold |
| Seil (10m) | 1 Gold | 0.5 Gold | 0.15 Gold |
| Fackel | 0.5 Gold | 0.25 Gold | 0.08 Gold |
| Laterne | 3 Gold | 1.5 Gold | 0.45 Gold |
| Öl | 0.5 Gold | 0.25 Gold | 0.08 Gold |

**Hinweis:** Preise sind Richtwerte. SL passt an Situation an.

---

## §I.9 TRACKING-FORMATE

### Inventar-Update

```markdown
## 📦 INVENTAR-UPDATE [Charakter]

### AKTION: [Aufheben/Nutzen/Tauschen/Ablegen/Kaufen/Verkaufen]
- **Item:** [Name]
- **Von:** [Schnellzugriff Slot X / Gepäck Slot X / Händler / Boden]
- **Nach:** [Schnellzugriff Slot X / Gepäck Slot X / Verbraucht / Verkauft]
- **Gold-Änderung:** [+X / -X / keine]

### ERGEBNIS
⚡ Schnellzugriff: [1] Item | [2] Item | [3] Item
🎒 Gepäck: [aktueller Stand]
💰 Party-Gold: X (vorher) → Y (nachher)
```

### Liquidierungs-Protokoll

```markdown
## 💸 LIQUIDIERUNG [Session-Ende]

### Gepäck-Inhalt vor Liquidierung:

| Slot | Item | Listenpreis | ×15% | Erlös |
|------|------|-------------|------|-------|
| [1] | | | | |
| [2] | | | | |
| ... | | | | |

**Summe:** ___ Gold (aufgerundet: ___ Gold)

### Ergebnis:
💰 Party-Gold: ___ → ___ (+___)
🎒 Gepäck: Komplett geleert
```

---

**📦 Bei Item-Fragen: Dieses Modul konsultieren!**
