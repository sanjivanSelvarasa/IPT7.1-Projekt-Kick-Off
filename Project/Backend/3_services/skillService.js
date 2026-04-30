const ApiError = require('../5_utils/ApiError')
const {
    ensurePayloadObject,
    parseId,
    parseRequiredText,
    parseOptionalText,
    parseSkillLevel,
    parseOptionalSortOrder
} = require('../5_utils/validators')
const { getOwnedPortfolio } = require('./helpers/portfolioAccess')
const skillModel = require('../4_models/skillModel')

async function listSkills(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    return skillModel.getPortfolioSkillsByPortfolioId(portfolio.id)
}

async function createSkill(email, rawPortfolioId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    ensurePayloadObject(data)

    const name = parseRequiredText(data.name, 'Skill-Name', 50)
    const description = parseOptionalText(data.description, 'Skill-Beschreibung', 4000)
    const level = parseSkillLevel(data.level)
    const sortOrder = parseOptionalSortOrder(data.sortOrder)

    let skill = await skillModel.findSkillByName(name)
    if (!skill) {
        try {
            skill = await skillModel.createSkill({ name, description })
        } catch (error) {
            if (error.number === 2627 || error.number === 2601) {
                skill = await skillModel.findSkillByName(name)
            } else {
                throw error
            }
        }
    }

    const existingRelation = await skillModel.getPortfolioSkillByPortfolioAndSkillId(portfolio.id, skill.id)
    if (existingRelation) {
        throw new ApiError(409, 'Dieser Skill ist im Portfolio bereits vorhanden.')
    }

    const relation = await skillModel.addSkillToPortfolio(portfolio.id, skill.id, level, sortOrder)

    return {
        id: relation.id,
        portfolioId: relation.portfolioId,
        skillId: relation.skillId,
        name: skill.name,
        description: skill.description,
        level: relation.level,
        sortOrder: relation.sortOrder,
        createdAt: relation.createdAt
    }
}

async function updateSkill(email, rawPortfolioId, rawPortfolioSkillId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const portfolioSkillId = parseId(rawPortfolioSkillId, 'PortfolioSkill-ID')
    ensurePayloadObject(data)

    const existing = await skillModel.getPortfolioSkillById(portfolioSkillId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Skill-Zuordnung nicht gefunden.')
    }

    const level = data.level !== undefined ? parseSkillLevel(data.level) : existing.level
    const sortOrder = data.sortOrder !== undefined
        ? parseOptionalSortOrder(data.sortOrder)
        : existing.sortOrder
    const updated = await skillModel.updatePortfolioSkillLevel(portfolioSkillId, level, sortOrder)

    return {
        id: updated.id,
        portfolioId: updated.portfolioId,
        skillId: updated.skillId,
        name: existing.name,
        description: existing.description,
        level: updated.level,
        sortOrder: updated.sortOrder,
        createdAt: updated.createdAt
    }
}

async function deleteSkill(email, rawPortfolioId, rawPortfolioSkillId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const portfolioSkillId = parseId(rawPortfolioSkillId, 'PortfolioSkill-ID')

    const existing = await skillModel.getPortfolioSkillById(portfolioSkillId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Skill-Zuordnung nicht gefunden.')
    }

    await skillModel.deletePortfolioSkillById(portfolioSkillId)
}

module.exports = {
    listSkills,
    createSkill,
    updateSkill,
    deleteSkill
}
