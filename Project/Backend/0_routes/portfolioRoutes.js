const express = require('express')

const portfolioController = require('../2_controllers/portfolioController')
const authenticateToken = require('../1_middleware/authenticateToken')
const uploadProjectImage = require('../1_middleware/uploadProjectImage')
const asyncHandler = require('../5_utils/asyncHandler')

const router = express.Router()

// Öffentliche Portfolio-Ansicht (ohne Authentifizierung mit slug_link)
router.get('/p/:slug', asyncHandler(portfolioController.getPublicPortfolioBySlug))
router.get('/p/:slug/full', asyncHandler(portfolioController.getPublicPortfolioFullBySlug))

// Alle Portfolios des angemeldeten Benutzers abrufen
router.get('/portfolios', authenticateToken, asyncHandler(portfolioController.getPortfolios))

// Portfolio erstellen
router.post('/portfolio', authenticateToken, asyncHandler(portfolioController.createPortfolio))

// Einzelnes Portfolio lesen
router.get('/portfolio/:id', authenticateToken, asyncHandler(portfolioController.getPortfolioById))

// Einzelnes Portfolio inkl. aller Module lesen
router.get('/portfolio/:id/full', authenticateToken, asyncHandler(portfolioController.getPortfolioFullById))

// Portfolio aktualisieren
router.put('/portfolio/:id', authenticateToken, asyncHandler(portfolioController.updatePortfolio))

// Portfolio löschen
router.delete('/portfolio/:id', authenticateToken, asyncHandler(portfolioController.deletePortfolio))

// Übersetzungen im Portfolio verwalten
router.get('/portfolio/:id/translations', authenticateToken, asyncHandler(portfolioController.listTranslations))
router.post('/portfolio/:id/translations', authenticateToken, asyncHandler(portfolioController.createTranslation))
router.put('/portfolio/:id/translations/:translationId', authenticateToken, asyncHandler(portfolioController.updateTranslation))
router.delete('/portfolio/:id/translations/:translationId', authenticateToken, asyncHandler(portfolioController.deleteTranslation))

// Versionen im Portfolio verwalten
router.get('/portfolio/:id/versions', authenticateToken, asyncHandler(portfolioController.listVersions))
router.post('/portfolio/:id/versions', authenticateToken, asyncHandler(portfolioController.createVersion))
router.get('/portfolio/:id/versions/:versionId', authenticateToken, asyncHandler(portfolioController.getVersionById))
router.delete('/portfolio/:id/versions/:versionId', authenticateToken, asyncHandler(portfolioController.deleteVersion))
router.post('/portfolio/:id/versions/:versionId/activate', authenticateToken, asyncHandler(portfolioController.activateVersion))

// Projekte im Portfolio verwalten
router.get('/portfolio/:id/projects', authenticateToken, asyncHandler(portfolioController.listProjects))
router.post('/portfolio/:id/projects', authenticateToken, asyncHandler(portfolioController.createProject))
router.put('/portfolio/:id/projects/:projectId', authenticateToken, asyncHandler(portfolioController.updateProject))
router.delete('/portfolio/:id/projects/:projectId', authenticateToken, asyncHandler(portfolioController.deleteProject))
router.post('/portfolio/:id/projects/:projectId/image', authenticateToken, uploadProjectImage.single('image'), asyncHandler(portfolioController.uploadProjectImage))

// Skills im Portfolio verwalten
router.get('/portfolio/:id/skills', authenticateToken, asyncHandler(portfolioController.listSkills))
router.post('/portfolio/:id/skills', authenticateToken, asyncHandler(portfolioController.createSkill))
router.put('/portfolio/:id/skills/:portfolioSkillId', authenticateToken, asyncHandler(portfolioController.updateSkill))
router.delete('/portfolio/:id/skills/:portfolioSkillId', authenticateToken, asyncHandler(portfolioController.deleteSkill))

// Social Links im Portfolio verwalten
router.get('/portfolio/:id/links', authenticateToken, asyncHandler(portfolioController.listSocialLinks))
router.post('/portfolio/:id/links', authenticateToken, asyncHandler(portfolioController.createSocialLink))
router.put('/portfolio/:id/links/:linkId', authenticateToken, asyncHandler(portfolioController.updateSocialLink))
router.delete('/portfolio/:id/links/:linkId', authenticateToken, asyncHandler(portfolioController.deleteSocialLink))

// Erfahrungen im Portfolio verwalten
router.get('/portfolio/:id/experiences', authenticateToken, asyncHandler(portfolioController.listExperiences))
router.post('/portfolio/:id/experiences', authenticateToken, asyncHandler(portfolioController.createExperience))
router.put('/portfolio/:id/experiences/:experienceId', authenticateToken, asyncHandler(portfolioController.updateExperience))
router.delete('/portfolio/:id/experiences/:experienceId', authenticateToken, asyncHandler(portfolioController.deleteExperience))

// Education-Einträge im Portfolio verwalten
router.get('/portfolio/:id/educations', authenticateToken, asyncHandler(portfolioController.listEducations))
router.post('/portfolio/:id/educations', authenticateToken, asyncHandler(portfolioController.createEducation))
router.put('/portfolio/:id/educations/:educationId', authenticateToken, asyncHandler(portfolioController.updateEducation))
router.delete('/portfolio/:id/educations/:educationId', authenticateToken, asyncHandler(portfolioController.deleteEducation))

// Themes im Portfolio verwalten
router.get('/portfolio/:id/themes', authenticateToken, asyncHandler(portfolioController.listThemes))
router.post('/portfolio/:id/themes', authenticateToken, asyncHandler(portfolioController.createTheme))
router.put('/portfolio/:id/themes/:themeId', authenticateToken, asyncHandler(portfolioController.updateTheme))
router.delete('/portfolio/:id/themes/:themeId', authenticateToken, asyncHandler(portfolioController.deleteTheme))
router.post('/portfolio/:id/themes/:themeId/activate', authenticateToken, asyncHandler(portfolioController.activateTheme))

// Verfügbare Templates abrufen
router.get('/templates', asyncHandler(portfolioController.listTemplates))
router.get('/templates/:templateId', asyncHandler(portfolioController.getTemplateById))

module.exports = router
