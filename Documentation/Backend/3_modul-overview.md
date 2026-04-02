### Backend-Module

| Modulname        | Beschreibung                          |
|------------------|--------------------------------------|
| Auth             | Login & Registrierung                |
| User             | Benutzerverwaltung                   |
| Portfolio        | Portfolio-Logik                      |
| Editor           | Baukasten-Editor                     |
| Upload           | Medienverwaltung                     |
| Publish          | Veröffentlichung                     |
| Versioning       | Speicherstände / Versionen           |

### Moduldetails

#### Modul: Auth
- Zweck:
    
    Dieses Modul ist für die Authentifizierung und Anmeldung der Benutzer zuständig. Es stellt sicher, dass sich Nutzer registrieren, einloggen, ausloggen und ihre Tokens erneuern können. Zudem schützt es Bereiche der Anwendung, die nur für eingeloggte Benutzer zugänglich sein sollen.
- Hauptfunktionen:
    - Benutzer registrieren
    - Benutzer einloggen
    - Benutzer ausloggen
    - Access Token erstellen
    - Refresh Token erneuern
    - Passwörter hashen und prüfen
    - Authentifizierung per JWT prüfen
- Abhängigkeiten:
    - User-Model
    - bcrypt
    - jsonwebtoken (JWT)
    - Auth-Middleware
    - Error Handling

#### Modul: User
- Zweck:

    Dieses Modul verwaltet die Benutzerdaten. Es ermöglicht, Profildaten eines Benutzers abzurufen und zu bearbeiten. Dazu gehören zum Beispiel Benutzername, E-Mail oder Profilbild. Grundlage dafür ist die User-Entität aus unserem Datenmodell.
- Hauptfunktionen:
    - Eigenes Benutzerprofil abrufen
    - Benutzerprofil bearbeiten
    - Profilbild speichern oder aktualisieren
    - Passwort ändern
    - Optional: Benutzerkonto löschen
- Abhängigkeiten:
    - User Model
    - Auth-Modul
    - Upload-Modul (Profilbild)
    - Validierung von Eingaben (Email, Name, Passwort)

#### Modul: Portfolio
- Zweck:

    Dieses Modul bildet den Kern des Projekts. Es ist für die Erstellung, Bearbeitung, Anzeige und Löschung von Portfolios zuständig. Außerdem verwaltet es wichtige Metadaten wie Titel, Beschreibung, Sichtbarkeit, Slug und Template-Zuweisung.
- Hauptfunktionen:
    - Portfolio erstellen
    - Eigene Portfolios abrufen
    - Einzelnes Portfolio laden
    - Portfolio bearbeiten
    - Portfolio löschen
    - Sichtbarkeit ändern
    - Eindeutigen Slug generieren und prüfen
- Abhängigkeiten:
    - Portfolio Model
    - User-Model
    - Theme- / Template-Modul
    - Publish-Modul
    - Versioning-Modul
    - Middleware für Authentifizierung

#### Modul: Editor
- Zweck:

    Dieses Modul unterstützt den Baukasten-Editor, das Hauptfeature der Website. Es speichert die Inhalte und Struktur eines Portfolios und sorgt dafür, dass Änderungen im Editor übernommen werden können. Ein Teil der Editor-Logik liegt im Frontend, aber das Backend muss die Daten verarbeiten, speichern und validieren.
- Hauptfunktionen:
    - Editor-Daten laden
    - Inhalte speichern
    - einzelne Bereiche aktualisieren
    - Entwurf speichern
    - optional: Autosave
- Abhängigkeiten:
    - Portfolio Model
    - Versioning Modul
    - Upload-Modul
    - Validierung Editor Daten
    - Error Handling bei ungültigem Inhalt

#### Modul: Upload
- Zweck:

    Dieses Modul ist für den Upload und die Verwaltung von Mediendateien zuständig, zum Beispiel Profilbilder oder Bilder innerhalb eines Portfolios. Es überprüft Dateityp, Dateigröße und Speicherort und sorgt dafür, dass nur erlaubte Dateien verarbeitet werden.
- Hauptfunktionen:
    - Bilddateien hochladen
    - Dateityp prüfen
    - Dateigröße prüfen
    - Datei speichern
    - Datei löschen
- Abhängigkeiten:
    - Upload-Middleware
    - User-Modul für Profilbilder
    - Portfolio-/Editor-Modul für Medien im Portfolio
    - Check für erlaubte Dateien


#### Modul: Publish
- Zweck:
    Dieses Modul ist für die Veröffentlichung eines Portfolios zuständig. Es macht ein Portfolio unter einer öffentlichen URL zugänglich und regelt, ob ein Portfolio sichtbar oder verborgen ist.
- Hauptfunktionen:
    - Portfolio veröffentlichen
    - Veröffentlichung zurückziehen
    - öffentliches Portfolio per Slug laden
    - Sichtbarkeit prüfen
- Abhängigkeiten:
    - Portfolio-Model
    - Slug Utils


#### Modul: Versioning
- Zweck:

    Dieses Modul speichert frühere Stände eines Portfolios. So können Benutzer Entwürfe sichern, Änderungen ansehen und bei Bedarf auf ältere Versionen zurückgehen.
- Hauptfunktionen:
    - neue Version speichern
    - frühere Versionen abrufen
    - bestimmte Version laden
    - Version wiederherstellen
- Abhängigkeiten:
    - Portfolio-Model
    - Editor-Modul
    - Datenbanktabelle für Versionen

#### Modul: Template / Theme
- Zweck:
    Dieses Modul verwaltet das Aussehen der Portfolios. Es erlaubt, Templates auszuwählen und Einstellungen wie Farben, Schriftarten oder Layout-Typen zu speichern.
- Hauptfunktionen:
    - verfügbare Templates abrufen
    - Template einem Portfolio zuweisen
    - Farben speichern
    - Schriftarten speichern
    - Theme-Einstellungen aktualisieren
- Abhängigkeiten:
    - Template-Model
    - Portfolio-Model
    - Editor-Modul
    - Frontend-Designsystem

