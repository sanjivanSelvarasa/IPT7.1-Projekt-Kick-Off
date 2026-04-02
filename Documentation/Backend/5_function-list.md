# Funktionsliste

**Ziel:** Alle Backend-Funktionen beschreiben.

## Auth-Modul

```
registerUser()
loginUser()
logoutUser()
refreshAccessToken()
hashPassword()
comparePassword()
generateAccessToken()
generateRefreshToken()
```

### registerUser()
**Beschreibung:**  

**Parameter:**

**Rückgabe:**

usw.

## User-Modul

```
getCurrentUser()
updateUserProfile()
updatePassword()
deleteUserAccount()
```


### getCurrentUser()
**Beschreibung:**  

**Parameter:**

**Rückgabe:**

usw.

## Portfolio-Modul

```
createPortfolio()
getPortfolioById()
getPortfoliosByUser()
updatePortfolio()
deletePortfolio()
updatePortfolioVisibility()
generateSlug()
ensureUniqueSlug()
```

### createPortfolio()
**Beschreibung:**  

**Parameter:**

**Rückgabe:**

usw.

## Portfolio Inhalte (Portfolio Modul)
```
addProjectToPortfolio()
updateProject()
deleteProject()
addSkillToPortfolio()
updatePortfolioSkillLevel()
removeSkillFromPortfolio()
addSocialLink()
updateSocialLink()
deleteSocialLink()
addExperience()
updateExperience()
deleteExperience()
addEducation()
updateEducation()
deleteEducation()
```

### addProjectToPortfolio()
**Beschreibung:**  

**Parameter:**

**Rückgabe:**

usw.

## Editor-Modul
```
saveDraft()
loadEditorData()
updatePortfolioSection()
autosavePortfolio()
```

### saveDraft()
**Beschreibung:**  

**Parameter:**

**Rückgabe:**

usw.

## Versioning-Modul
```
createPortfolioVersion()
getPortfolioVersions()
getPortfolioVersionById()
restorePortfolioVersion()
```

### createPortfolioVersion()
**Beschreibung:**  

**Parameter:**

**Rückgabe:**

usw.

## Theme-/Template-Modul
```
getAvailableTemplates()
assignTemplateToPortfolio()
updatePortfolioTheme()
```

### getAvailableTemplates()
**Beschreibung:**  

**Parameter:**

**Rückgabe:**

usw.

## Publish-Modul
```
publishPortfolio()
unpublishPortfolio()
getPublicPortfolioBySlug()
isPortfolioPublic()
```

### publishPortfolio()
**Beschreibung:**  

**Parameter:**

**Rückgabe:**

usw.

## Upload-Modul
```
uploadImage()
validateUploadedFile()
deleteUploadedFile()
```

### uploadImage()
**Beschreibung:**  

**Parameter:**

**Rückgabe:**

usw.