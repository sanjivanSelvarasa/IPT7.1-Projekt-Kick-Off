# Funktionsliste

**Ziel:** Alle Backend-Funktionen beschreiben.

**Template:**

### Funktion: parse*Object*()

**Beschreibung:**  
Parsed das gegebene *Object* auf inkorrekte Angaben.

**Parameter:**
- value

**Rückgabewert:**
- *Object*

**Fehler:**
- Ungültige Formatierung

---

### Funktion: generateAccessToken()

**Beschreibung:**  
Generiert einen AccessToken von einem gegbenen Refreshtoken. (falls der jetztige abgelaufen ist)
**Parameter:**
- user: object

**Rückgabe:**
- AccessToken

**Verwendet:**
- JwT