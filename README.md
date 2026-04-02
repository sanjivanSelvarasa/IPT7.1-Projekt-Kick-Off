# IPT7.1-Projekt-Kick-Off

**Autoren:** Gian, Egor, Sanjivan, Kenan

## Projektbeschreibung

Webseite zur einfachen Erstellung und Anzeige von benutzerdefinierten Portfolios.

## Docker Hinweis (SQL Datenordner)

Bei Docker-Start wird der Ordner `Project/Database/mssql-data` automatisch durch den Compose-Service `database-permissions` vorbereitet.
Der Service setzt Besitzrechte und Schreibrechte, damit der SQL-Container unter Linux nicht mit "Access denied" auf dem gemounteten Host-Ordner fehlschlaegt.