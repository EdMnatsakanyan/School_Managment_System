const subjectScheme = `
    type Subject {
        id: ID!
        title: String!
        teacher: Teacher!
    }

    type Query {
        subjects: [Subject]
        subject(id: ID!): Subject
    }

    type Mutation {
        createSubject(input: SubjectInput!): Subject!
        updateSubject(input: SubjectUpdate!, id: ID!): Subject!
        deleteSubject(id: ID!): String
    }

    input SubjectInput {
        title: String!
        teacher_id: Int!
    }

    input SubjectUpdate {
        title: String
        teacher_id: Int
    }
`

module.exports = subjectScheme