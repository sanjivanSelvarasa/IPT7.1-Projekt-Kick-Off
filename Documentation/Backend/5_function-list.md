# Funktionsliste

**Ziel:** Alle Backend-Funktionen beschreiben.

## Auth-Modul

```
registerUser()
loginUser()
logoutUser()
refreshAccessToken()
generateAccessToken()
generateAvailableUsername()
```

### registerUser()
**Beschreibung:** Registriert einen Benutzer, hashed Passwort und speichert User in der DB.
**Parameter:** `submittedEmail`, `submittedPassword`
**Rückgabe:** Keine Nutzdaten, Controller gibt Erfolgsmeldung zurück.

### loginUser()
**Beschreibung:** Prüft E-Mail/Passwort und erstellt Access-/Refresh-Token.
**Parameter:** `submittedEmail`, `submittedPassword`
**Rückgabe:** `{ accessToken, refreshToken }`

### refreshAccessToken()
**Beschreibung:** Prüft Refresh-Token und gibt neuen Access-Token aus.
**Parameter:** `refreshToken`
**Rückgabe:** `accessToken`

## Portfolio-Modul

```
getPortfoliosForUser()
createPortfolio()
getPortfolioById()
getPortfolioFullById()
updatePortfolio()
deletePortfolio()
listTranslations()
createTranslation()
updateTranslation()
deleteTranslation()
listVersions()
createVersion()
getVersionById()
deleteVersion()
activateVersion()
```

### createPortfolio()
**Beschreibung:** Erstellt ein Portfolio mit Slug/Sichtbarkeit-Validierung.
**Parameter:** `email`, `data`
**Rückgabe:** Portfolio-Objekt aus DB.

### updatePortfolio()
**Beschreibung:** Aktualisiert eigenes Portfolio inkl. Slug-Konfliktbehandlung.
**Parameter:** `email`, `portfolioId`, `data`
**Rückgabe:** Aktualisiertes Portfolio.

### getPortfolioFullById()
**Beschreibung:** Lädt ein eigenes Portfolio mit allen aktuell implementierten Untermodulen inklusive Übersetzungen und Versionen.
**Parameter:** `email`, `portfolioId`
**Rückgabe:** Objekt mit `portfolio`, `translations`, `versions` und weiteren Modullisten.

### createTranslation()
**Beschreibung:** Legt eine zusätzliche Sprachvariante für ein Portfolio an und verhindert doppelte Sprachcodes.
**Parameter:** `email`, `portfolioId`, `data`
**Rückgabe:** Angelegte Übersetzung.

### createVersion()
**Beschreibung:** Erstellt eine neue Portfolio-Version mit der nächsten fortlaufenden Versionsnummer.
**Parameter:** `email`, `portfolioId`
**Rückgabe:** Angelegte Version.

### activateVersion()
**Beschreibung:** Setzt eine vorhandene Portfolio-Version als aktuelle Version im Portfolio.
**Parameter:** `email`, `portfolioId`, `versionId`
**Rückgabe:** `{ portfolioId, currentVersionId }`

## Project-Modul

```
listProjects()
createProject()
updateProject()
deleteProject()
uploadProjectImage()
```

### uploadProjectImage()
**Beschreibung:** Speichert hochgeladene Bilddatei lokal und setzt `img_url` im Projekt.
**Parameter:** `email`, `portfolioId`, `projectId`, `file`
**Rückgabe:** `{ id, portfolioId, imageUrl, updatedAt }`

## Skill-Modul

```
listSkills()
createSkill()
updateSkill()
deleteSkill()
```

## SocialLink-Modul

```
listSocialLinks()
createSocialLink()
updateSocialLink()
deleteSocialLink()
```

## Experience-Modul

```
listExperiences()
createExperience()
updateExperience()
deleteExperience()
```

## Education-Modul

```
listEducations()
createEducation()
updateEducation()
deleteEducation()
```

## Gemeinsame Helper/Utility-Funktionen

```
parseId()
parseRequiredText()
parseOptionalText()
parseOptionalDate()
validateDateRange()
parseRequiredUrl()
parseOptionalUrl()
parseSkillLevel()
parseSlug()
validateVisibility()
getOwnedPortfolio()
findUserOrThrow()
```

### getOwnedPortfolio()
**Beschreibung:** Lädt Portfolio und prüft Besitzrechte des eingeloggten Benutzers.
**Parameter:** `email`, `rawPortfolioId`
**Rückgabe:** Portfolio-Objekt oder Fehler (`403` / `404`).

### parseId()
**Beschreibung:** Validiert IDs aus URL-Parametern.
**Parameter:** `rawId`, `label`
**Rückgabe:** Integer-ID oder Fehler (`400`).

### validateDateRange()
**Beschreibung:** Prüft, dass Startdatum nicht nach Enddatum liegt.
**Parameter:** `startDate`, `endDate`
**Rückgabe:** Kein Wert, wirft ggf. Fehler (`400`).

## Hinweis

Nicht implementierte Zukunftsmodule (z. B. Editor und Publish) bleiben bewusst außerhalb dieser Liste,
damit die Dokumentation nur den aktuellen Stand des Codes zeigt.