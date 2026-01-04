# 📋 CHARAKTERKARTEN-FORMAT v3.2

**Zweck:** Vorlage für aktualisierte Charakterkarten mit neuem Inventar-System und Party-Gold  
**Hinweis:** Charakterkarten nur auf Spieler-Verlangen am Abenteuer-Ende aktualisieren!

---

## ÄNDERUNGEN in v3.2

| Bereich | v2.0 | v3.2 |
|---------|------|------|
| Gold | `💰 Gold: X` (individuell) | `💰 Gold: *Party-Pool*` (geteilt) |
| Gepäck-Notiz | "Nur zwischen Abenteuern" | "Wird bei Abenteuer-Ende liquidiert" |
| Session-Ende | Gepäck verlieren | Gepäck liquidieren (15% → Party-Gold) |

---

## ⚠️ WICHTIG: WAFFEN & RÜSTUNGEN

**Waffen und Rüstungen müssen im ⚡ Schnellzugriff sein, um im Kampf zu wirken!**

- Rüstung im Schnellzugriff = ANGELEGT und aktiv
- Rüstung im Gepäck = NICHT angelegt, keine Wirkung
- Waffe im Gepäck = Kann im Kampf nicht verwendet werden

**Konsequenz für Inventar-Planung:**  
Wer Rüstung tragen will, "opfert" einen Schnellzugriff-Slot dafür:
```
⚡ Schnellzugriff (3 Slots):
[1] Lederrüstung (angelegt) | [2] Schwert | [3] Heiltrank
```

---

## BEISPIEL: CORU (Format v3.2)

```markdown
# CORU – Charakterkarte v3.2

**Name:** Coru | **Typ:** Besessener (Schurke/Dunkel)

## Attribute
✔ Lockpicking | ✔ Humor/Improvisation | ✖ Schwaches Sozialgespür

## Ressourcen
**HP:** ☑☑☑☑ (4/4) | **MP:** ☑ (1/1) | **💰 Gold:** *Party-Pool*

## ⚡ Schnellzugriff (3 Slots)
[1] Dietriche | [2] Heiltrank (2 HP) | [3] Rauchbombe

## 🎒 Gepäck (10 Slots) — Wird bei Abenteuer-Ende liquidiert
[1] ⬜ | [2] ⬜ | [3] ⬜ | [4] ⬜ | [5] ⬜
[6] ⬜ | [7] ⬜ | [8] ⬜ | [9] ⬜ | [10] ⬜

## Fähigkeiten
• **Ablenkungsmanöver** – Gegner verliert Aktion | Abklingzeit: 2 Runden | ✓
• **Dämonenklaue** – Garantiert 1 Schaden, Würfeln (5, 6) für +1 Schaden | Abklingzeit: 3 Runden | ✓
• **Übernahme** – 2 Runden: +1 Schaden & Zustandsimmun, dann 1 Runde handlungsunfähig | Abklingzeit: 1 Szene | ✓

## Persönlichkeit
Coru ist ein Schurke mit einem dunklen Geheimnis – ein Dämon hat von ihm Besitz ergriffen. Dieser Pakt verleiht ihm übernatürliche Fähigkeiten, aber zu welchem Preis? Seine roten Augen glühen, wenn die Dämonenkräfte aktiv werden.
```

---

## BEISPIEL: PIP (Format v3.2)

```markdown
# PIP – Charakterkarte v3.2

**Name:** Pip | **Typ:** Zwerg-Erfinder (Comic Relief)

## Attribute
✔ Mechanik/Basteln | ✔ Optimismus | ✖ Größe (kann Dinge nicht erreichen)

## Ressourcen
**HP:** ☑☑☑☑ (4/4) | **MP:** ☑ (1/1) | **💰 Gold:** *Party-Pool*

## ⚡ Schnellzugriff (3 Slots)
[1] Werkzeugset | [2] Rauchbombe | [3] ⬜ LEER

## 🎒 Gepäck (10 Slots) — Wird bei Abenteuer-Ende liquidiert
[1] ⬜ | [2] ⬜ | [3] ⬜ | [4] ⬜ | [5] ⬜
[6] ⬜ | [7] ⬜ | [8] ⬜ | [9] ⬜ | [10] ⬜

## Fähigkeiten
• **Provisorische Falle** – Gegner erleidet 1 Schaden + 💫 Betäubt 1 Runde | Abklingzeit: 2 Runden | ✓
• **Ablenkungsgerät** – Wirft mechanisches Spielzeug, alle Gegner würfeln (4+ ignorieren, 1-3 = 😨 Erschrocken) | Abklingzeit: 1 Szene | ✓
• **Notfall-Reparatur** – Repariert Gegenstände oder heilt 1 HP an Verbündeten | Abklingzeit: 2 Runden | ✓

## Persönlichkeit
Pip ist ein quirliger Zwerg mit wildem roten Bart und Schutzbrille, die ständig verrutscht. Er redet ohne Punkt und Komma, erfindet ständig neue (meist explodierende) Gadgets und ist fest davon überzeugt, dass jedes Problem mit "ein bisschen Öl und einem guten Hebel" lösbar ist. Trotz seiner chaotischen Art ist er loyal bis in den Tod.
```

---

## FORMAT-CHECKLISTE

Jede Charakterkarte MUSS folgende Elemente haben:

```
☐ Titel: # [NAME] – Charakterkarte v3.2
☐ Kopfzeile: **Name:** [Name] | **Typ:** [Klasse/Archetyp]

☐ ## Attribute
  ☐ ✔ [Stärke 1] | ✔ [Stärke 2] | ✖ [Schwäche]

☐ ## Ressourcen
  ☐ **HP:** ☑☑☑☑ (4/4) | **MP:** ☑ (1/1) | **💰 Gold:** *Party-Pool*

☐ ## ⚡ Schnellzugriff (3 Slots)
  ☐ [1] Item | [2] Item | [3] Item oder ⬜ LEER

☐ ## 🎒 Gepäck (10 Slots) — Wird bei Abenteuer-Ende liquidiert
  ☐ [1] ⬜ | [2] ⬜ | ... | [10] ⬜

☐ ## Fähigkeiten
  ☐ • **[Name]** – [Effekt] | Abklingzeit: X Runden | ✓
  ☐ (Max. 3 Fähigkeiten)

☐ ## Persönlichkeit (empfohlen)
  ☐ Kurze Beschreibung
```

---

## PARTY-GOLD TRACKING

Das **Party-Gold** wird NICHT in den Charakterkarten gespeichert, sondern:

1. **Während Session:** Im JSON-State (`STATE_TRACKING_JSON.md`)
2. **Zwischen Sessions:** Im `CAMPAIGN_CHRONICLE.md`
3. **In Statusboxen:** `💰 Party-Gold: X`

### Warum Party-Gold?

- Einfachere Verwaltung (ein Pool statt mehrere)
- Realistische Gruppen-Ökonomie
- Liquidierungs-System funktioniert besser
- Keine "wer zahlt?"-Diskussionen

---

## WANN CHARAKTERKARTE AKTUALISIEREN?

```
✓ Am Ende eines Abenteuers (auf Spieler-Verlangen)
✓ Nach permanenten Änderungen (neue Fähigkeit, +1 HP)
✓ Bei Charakter-Tod/Ersatz

✗ NICHT während Session
✗ NICHT nach jedem Item-Tausch
✗ NICHT automatisch
✗ NICHT für Gold-Änderungen (Party-Pool!)
```

**Während Session:** Nutze STATE_TRACKING_JSON für temporäre Änderungen!

---

## LEERE VORLAGE (v3.2)

```markdown
# [NAME] – Charakterkarte v3.2

**Name:** [Name] | **Typ:** [Klasse/Archetyp]

## Attribute
✔ [Stärke 1] | ✔ [Stärke 2] | ✖ [Schwäche]

## Ressourcen
**HP:** ☑☑☑☑ (4/4) | **MP:** ☑ (1/1) | **💰 Gold:** *Party-Pool*

## ⚡ Schnellzugriff (3 Slots)
[1] ⬜ | [2] ⬜ | [3] ⬜

## 🎒 Gepäck (10 Slots) — Wird bei Abenteuer-Ende liquidiert
[1] ⬜ | [2] ⬜ | [3] ⬜ | [4] ⬜ | [5] ⬜
[6] ⬜ | [7] ⬜ | [8] ⬜ | [9] ⬜ | [10] ⬜

## Fähigkeiten
• **[Fähigkeit 1]** – [Effekt] | Abklingzeit: X Runden | ✓
• **[Fähigkeit 2]** – [Effekt] | Abklingzeit: X Runden | ✓
• **[Fähigkeit 3]** – [Effekt] | Abklingzeit: X Runden | ✓

## Persönlichkeit (Optional)
[Kurze Beschreibung]
```

---

## SESSION-ÜBERGANG CHECKLISTE

Am Ende eines Abenteuers:

```
☐ Schnellzugriff-Items festlegen (3 behalten)
☐ Gepäck liquidieren (15% → Party-Gold)
☐ Party-Gold in Campaign Chronicle eintragen
☐ Charakterkarte aktualisieren? (nur auf Verlangen!)
```

---

## VERSION HISTORY

| Version | Änderungen |
|---------|------------|
| **2.0** | Schnellzugriff/Gepäck-System, individuelles Gold |
| **3.2** | Party-Gold-System, Liquidierungs-Hinweis, Rüstungs-Klarstellung, aktualisierte Vorlagen |
