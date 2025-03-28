const {mergeResolvers} = require('@graphql-tools/merge')
const teacherResolver = require('./teacherResolver')
const subjectResolver = require('./subjectResolver')
const classResolver = require('./classResolver')
const pupilResolver = require('./pupilResolver')
const scheduleResolver = require('./scheduleResolver')


module.exports = mergeResolvers([teacherResolver, subjectResolver, classResolver, pupilResolver, scheduleResolver])