const portfolioService = require('../3_services/portfolioService')
const projectService = require('../3_services/projectService')
const skillService = require('../3_services/skillService')
const socialLinkService = require('../3_services/socialLinkService')
const experienceService = require('../3_services/experienceService')
const educationService = require('../3_services/educationService')
const themeService = require('../3_services/themeService')
const templateService = require('../3_services/templateService')

async function getPortfolios(req, res) {
    const portfolios = await portfolioService.getPortfoliosForUser(req.user.email)
    res.json(portfolios)
}

async function createPortfolio(req, res) {
    const portfolio = await portfolioService.createPortfolio(req.user.email, req.body)
    res.status(201).json(portfolio)
}

async function getPortfolioById(req, res) {
    const portfolio = await portfolioService.getPortfolioById(req.user.email, req.params.id)
    res.json(portfolio)
}

async function getPortfolioFullById(req, res) {
    const portfolio = await portfolioService.getPortfolioFullById(req.user.email, req.params.id)
    res.json(portfolio)
}

async function updatePortfolio(req, res) {
    const portfolio = await portfolioService.updatePortfolio(req.user.email, req.params.id, req.body)
    res.json(portfolio)
}

async function deletePortfolio(req, res) {
    await portfolioService.deletePortfolio(req.user.email, req.params.id)
    res.sendStatus(204)
}

async function listTranslations(req, res) {
    const translations = await portfolioService.listTranslations(req.user.email, req.params.id)
    res.json(translations)
}

async function createTranslation(req, res) {
    const translation = await portfolioService.createTranslation(req.user.email, req.params.id, req.body)
    res.status(201).json(translation)
}

async function updateTranslation(req, res) {
    const translation = await portfolioService.updateTranslation(
        req.user.email,
        req.params.id,
        req.params.translationId,
        req.body
    )

    res.json(translation)
}

async function deleteTranslation(req, res) {
    await portfolioService.deleteTranslation(req.user.email, req.params.id, req.params.translationId)
    res.sendStatus(204)
}

async function listVersions(req, res) {
    const versions = await portfolioService.listVersions(req.user.email, req.params.id)
    res.json(versions)
}

async function createVersion(req, res) {
    const version = await portfolioService.createVersion(req.user.email, req.params.id)
    res.status(201).json(version)
}

async function getVersionById(req, res) {
    const version = await portfolioService.getVersionById(req.user.email, req.params.id, req.params.versionId)
    res.json(version)
}

async function deleteVersion(req, res) {
    await portfolioService.deleteVersion(req.user.email, req.params.id, req.params.versionId)
    res.sendStatus(204)
}

async function activateVersion(req, res) {
    const activation = await portfolioService.activateVersion(req.user.email, req.params.id, req.params.versionId)
    res.json(activation)
}

async function listProjects(req, res) {
    const projects = await projectService.listProjects(req.user.email, req.params.id)
    res.json(projects)
}

async function createProject(req, res) {
    const project = await projectService.createProject(req.user.email, req.params.id, req.body)
    res.status(201).json(project)
}

async function updateProject(req, res) {
    const project = await projectService.updateProject(req.user.email, req.params.id, req.params.projectId, req.body)
    res.json(project)
}

async function deleteProject(req, res) {
    await projectService.deleteProject(req.user.email, req.params.id, req.params.projectId)
    res.sendStatus(204)
}

async function uploadProjectImage(req, res) {
    const project = await projectService.uploadProjectImage(
        req.user.email,
        req.params.id,
        req.params.projectId,
        req.file
    )

    res.status(201).json(project)
}

async function listSkills(req, res) {
    const skills = await skillService.listSkills(req.user.email, req.params.id)
    res.json(skills)
}

async function createSkill(req, res) {
    const skill = await skillService.createSkill(req.user.email, req.params.id, req.body)
    res.status(201).json(skill)
}

async function updateSkill(req, res) {
    const skill = await skillService.updateSkill(req.user.email, req.params.id, req.params.portfolioSkillId, req.body)
    res.json(skill)
}

async function deleteSkill(req, res) {
    await skillService.deleteSkill(req.user.email, req.params.id, req.params.portfolioSkillId)
    res.sendStatus(204)
}

async function listSocialLinks(req, res) {
    const links = await socialLinkService.listSocialLinks(req.user.email, req.params.id)
    res.json(links)
}

async function createSocialLink(req, res) {
    const link = await socialLinkService.createSocialLink(req.user.email, req.params.id, req.body)
    res.status(201).json(link)
}

async function updateSocialLink(req, res) {
    const link = await socialLinkService.updateSocialLink(req.user.email, req.params.id, req.params.linkId, req.body)
    res.json(link)
}

async function deleteSocialLink(req, res) {
    await socialLinkService.deleteSocialLink(req.user.email, req.params.id, req.params.linkId)
    res.sendStatus(204)
}

async function listExperiences(req, res) {
    const experiences = await experienceService.listExperiences(req.user.email, req.params.id)
    res.json(experiences)
}

async function createExperience(req, res) {
    const experience = await experienceService.createExperience(req.user.email, req.params.id, req.body)
    res.status(201).json(experience)
}

async function updateExperience(req, res) {
    const experience = await experienceService.updateExperience(req.user.email, req.params.id, req.params.experienceId, req.body)
    res.json(experience)
}

async function deleteExperience(req, res) {
    await experienceService.deleteExperience(req.user.email, req.params.id, req.params.experienceId)
    res.sendStatus(204)
}

async function listEducations(req, res) {
    const educations = await educationService.listEducations(req.user.email, req.params.id)
    res.json(educations)
}

async function createEducation(req, res) {
    const education = await educationService.createEducation(req.user.email, req.params.id, req.body)
    res.status(201).json(education)
}

async function updateEducation(req, res) {
    const education = await educationService.updateEducation(req.user.email, req.params.id, req.params.educationId, req.body)
    res.json(education)
}

async function deleteEducation(req, res) {
    await educationService.deleteEducation(req.user.email, req.params.id, req.params.educationId)
    res.sendStatus(204)
}

async function listThemes(req, res) {
    const themes = await themeService.listThemes(req.user.email, req.params.id)
    res.json(themes)
}

async function createTheme(req, res) {
    const theme = await themeService.createTheme(req.user.email, req.params.id, req.body)
    res.status(201).json(theme)
}

async function updateTheme(req, res) {
    const theme = await themeService.updateTheme(req.user.email, req.params.id, req.params.themeId, req.body)
    res.json(theme)
}

async function deleteTheme(req, res) {
    await themeService.deleteTheme(req.user.email, req.params.id, req.params.themeId)
    res.sendStatus(204)
}

async function activateTheme(req, res) {
    const activation = await themeService.activateTheme(req.user.email, req.params.id, req.params.themeId)
    res.json(activation)
}

async function listTemplates(req, res) {
    const templates = await templateService.listTemplates()
    res.json(templates)
}

async function getTemplateById(req, res) {
    const template = await templateService.getTemplateById(req.params.templateId)
    res.json(template)
}

async function getPublicPortfolioBySlug(req, res) {
    const portfolio = await portfolioService.getPublicPortfolioBySlug(req.params.slug)
    res.json(portfolio)
}

async function getPublicPortfolioFullBySlug(req, res) {
    const portfolio = await portfolioService.getPublicPortfolioFullBySlug(req.params.slug)
    res.json(portfolio)
}

module.exports = {
    getPortfolios,
    createPortfolio,
    getPortfolioById,
    getPortfolioFullById,
    updatePortfolio,
    deletePortfolio,
    listTranslations,
    createTranslation,
    updateTranslation,
    deleteTranslation,
    listVersions,
    createVersion,
    getVersionById,
    deleteVersion,
    activateVersion,
    listProjects,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage,
    listSkills,
    createSkill,
    updateSkill,
    deleteSkill,
    listSocialLinks,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
    listExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
    listEducations,
    createEducation,
    updateEducation,
    deleteEducation,
    listThemes,
    createTheme,
    updateTheme,
    deleteTheme,
    activateTheme,
    listTemplates,
    getTemplateById,
    getPublicPortfolioBySlug,
    getPublicPortfolioFullBySlug
}
