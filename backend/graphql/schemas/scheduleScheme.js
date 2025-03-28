const scheduleScheme = `
    type Schedule {
        id: ID!
        day: String!
        number: Int!
        class: Class!
        subject: Subject!
    }

    type Query {
        schedules: [Schedule]
        schedule(id: ID!): Schedule
        teachersSchedules(teacher_id: ID!): [Schedule]
    }

    type Mutation {
        createSchedule(input: ScheduleInput!): Schedule!
        updateSchedule(input: ScheduleUpdate!, id: ID!): Schedule!
        deleteSchedule(id: ID!): String!
    }

    input ScheduleInput {
        day: String!
        number: Int!
        class_id: Int!
        subject_id: Int!
    }

    input ScheduleUpdate {
        day: String
        number: Int
        class_id: Int
        subject_id: Int
    }

`

module.exports = scheduleScheme