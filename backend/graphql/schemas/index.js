const teacherScheme = require('./teacherScheme')
const subjectScheme = require('./subjectScheme')
const classScheme = require('./classScheme')
const pupilScheme = require('./pupilScheme')
const scheduleScheme = require('./scheduleScheme')

const typeDefs = `
    ${teacherScheme}
    ${subjectScheme}
    ${classScheme}
    ${pupilScheme}
    ${scheduleScheme}
`

module.exports = typeDefs