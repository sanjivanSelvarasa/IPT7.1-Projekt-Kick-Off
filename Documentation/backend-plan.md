# Create Yourself – Backend Projektplan

**Autor:** Gian
**Startdatum:** 12. März 2026
**Abgabedatum:** 8. April 2026

---

## 1. Projektübersicht

**Projektbeschreibung:**
Das Backend wird eine webbasierte Anwendung zur Erstellung von persönlichen Portfolios unterstützen. Es verwaltet Benutzerkonten, Authentifizierung, Portfolio-Daten, Versionierung und Mediendateien. Die Umsetzung erfolgt in **Node.js**, **MS SQL** wird als Datenbank verwendet, und das Backend wird in **Docker**-Containern gehostet.

**Backend-Verantwortlichkeiten:**

* Benutzer-Authentifizierung und -Autorisierung
* Portfolio CRUD-Funktionen
* Versionierungssystem
* Mediendatei-Uploads
* Simple API-Endpunkte für das Frontend
* Grundlegende Sicherheitsfeatures

## 2. Funktionale Anforderungen (Backend-spezifisch)

| Feature                       | Beschreibung                                                      | Priorität | Hinweise                                                                 |
| ----------------------------- | ----------------------------------------------------------------- | --------- | ------------------------------------------------------------------------ |
| Benutzerregistrierung & Login | Sicheres Registrieren mit E-Mail/Passwort, Login mit Session/JWT  | Muss      | Passwörter mit bcrypt hashen, JWT für Tokens                             |
| Portfolio CRUD                | Portfolios erstellen, lesen, aktualisieren, löschen               | Muss      | CRUD = Create, Read, Update, Delete. grundlegende Operationen auf Daten |
| Portfolio Versionierung       | Frühere Versionen eines Portfolios speichern                      | Muss      | Zeitstempel oder Versionsnummern verwenden                               |
| Medien-Upload                 | Bilder oder andere Medien hochladen                               | Sollte    | Speicherung lokal oder in der Cloud                                      |
| Rollenverwaltung              | Admin-/User-Rollen (optional)                                     | Könnte    | Minimale Berechtigungen implementieren                                   |
| Sicherheit                    | Unbefugter Zugriff verhindern, Eingaben validieren, Rate-Limiting | Muss      | Middleware für Sicherheitschecks nutzen                                  |
| Mehrsprachigkeit              | Backend-Fehlermeldungen in mehreren Sprachen                      | Sollte    | JSON oder i18n-Ansatz                                                    |

## 3. Nichtfunktionale Anforderungen

* **Skalierbarkeit:** Mehrere gleichzeitige Benutzer ohne Konflikte
* **Wartbarkeit:** Modularer Code, klare Trennung von Verantwortlichkeiten
* **Sicherheit:** Gespeicherte Passwörter werden gehashed.
* **Zuverlässigkeit:** Stabile Datenbankverbindung, robuste Fehlerbehandlung
* **Deployment:** Vollständig containerisiert mit Docker für einfache Bereitstellung

## 4. Schritt-für-Schritt Umsetzungsplan

**Zeitraum:** 12. März → 8. April (4 Wochen)

### Woche 1: 12. – 18. März

**Ziele:** Projekt einrichten, Docker-Setup, Datenbank planen, grundlegende Authentifizierung

1. Node.js-Projekt initialisieren (`npm init`)
2. Dockerfile und `docker-compose.yml` erstellen, um Backend und MS SQL zu hosten
3. Abhängigkeiten installieren: `express`, `mssql`, `bcrypt`, `jsonwebtoken`, `dotenv`, `multer`
4. `.env`-Datei für Umgebungsvariablen anlegen
5. MS SQL-Datenbank in Docker-Container einrichten
6. Datenbank-Schemas durchlesen und verstehen
7. Benutzerregistrierung implementieren (Passwort-Hashing)
8. Login-Endpoint mit JWT-Authentifizierung implementieren
9. Erste Unit-Tests für Authentifizierungs-Routen schreiben

---

### Woche 2: 19. – 25. März

**Ziele:** Portfolio-CRUD implementieren

1. API-Endpunkte definieren:

   * `POST /portfolio` – erstellen
   * `GET /portfolio/:id` – lesen
   * `PUT /portfolio/:id` – aktualisieren
   * `DELETE /portfolio/:id` – löschen
2. Portfolio-Versionierung implementieren
3. Middleware für Authentifizierung/Autorisierung einfügen
4. Unit-Tests für Portfolio-Endpunkte schreiben

---

### Woche 3: 26. März – 1. April

**Ziele:** Medien-Upload & erweiterte Features

1. Medien-Upload-Endpoint implementieren (lokal oder Cloud, z.B. Azure Blob Storage)
2. Fehlerbehandlungs-Middleware implementieren
3. Logging einfügen
4. Eingabevalidierung implementieren (`Joi` oder eigene Validatoren)
5. Versionierung auch für Mediendateien erweitern
6. Integrationstests Auth + Portfolio + Media durchführen

---

### Woche 4: 2. – 8. April

**Ziele:** Sicherheit, Optimierung, Docker-Deployment und abschliessende Tests

1. Rate-Limiting und grundlegende Sicherheitsfeatures implementieren
2. Datenbank-Abfragen optimieren
3. Belastungstest (Stress Test) durchführen
4. Docker-Container für Backend finalisieren
5. End-to-End-Test mit Frontend-Mock
6. API-Dokumentation fertigstellen
7. Codebereinigung, Refactoring und letzte Commits

---

## 5. Aufgabenübersicht Tabelle

| Aufgabe                               | Deadline | Hinweise                                     |
| ------------------------------------- | -------- | -------------------------------------------- |
| Projektinitialisierung + Docker Setup | 13. März | Node.js + MS SQL + Docker Compose            |
| Auth-System                           | 15. März | Registrierung/Login + JWT                    |
| Datenbank-Schemas                     | 14. März | Users, Portfolios, Versions                  |
| Portfolio CRUD                        | 22. März | Create, Read, Update, Delete + Versionierung |
| Medien-Upload                         | 29. März | Lokale/Cloud Speicherung                     |
| Fehlerbehandlung & Validierung        | 31. März | Middleware-Setup                             |
| Tests & Optimierung                   | 5. April | Unit + Integration + Stress Tests            |
| Docker-Deployment & Dokumentation     | 7. April | API-Dokumentation + finale Struktur          |
| Finale Tests & Abgabe                 | 8. April | Voll funktionsfähiges Backend in Docker      |

---

## 6. Risiken & Kontingenzen

* **Baukasten-System Integration:** API muss kompatibel mit Frontend-Editor sein
* **Speicher von Mediendateien:** Grosse Dateien evtl. Cloud-Speicher notwendig
* **Sicherheitsrisiken:** Test auf gängige Angriffe (Injection, XSS, etc.)
* **Versionierungskonflikte:** Gleichzeitige Änderungen am selben Portfolio
* **Docker-Probleme:** Container müssen stabil laufen, Ports richtig konfiguriert

---

## 7. Referenzen

* Node.js Dokumentation: [https://nodejs.org/de/docs/](https://nodejs.org/de/docs/)
* Express.js: [https://expressjs.com/de/](https://expressjs.com/de/)
* JWT Auth Guide: [https://jwt.io/introduction/](https://jwt.io/introduction/)
* MS SQL Node.js Dokumentation: [https://www.npmjs.com/package/mssql](https://www.npmjs.com/package/mssql)
* Multer für Datei-Uploads: [https://www.npmjs.com/package/multer](https://www.npmjs.com/package/multer)
* Docker Dokumentation: [https://docs.docker.com/](https://docs.docker.com/)