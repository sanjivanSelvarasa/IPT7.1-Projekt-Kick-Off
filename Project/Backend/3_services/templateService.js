const ApiError = require('../5_utils/ApiError')
const { parseId } = require('../5_utils/validators')
const templateModel = require('../4_models/templateModel')

async function listTemplates() {
    return templateModel.getTemplates()
}

async function getTemplateById(rawTemplateId) {
    const templateId = parseId(rawTemplateId, 'Template-ID')
    const template = await templateModel.getTemplateById(templateId)

    if (!template) {
        throw new ApiError(404, 'Template nicht gefunden.')
    }

    return template
}

module.exports = {
    listTemplates,
    getTemplateById
}
