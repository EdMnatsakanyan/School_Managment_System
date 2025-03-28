const pupilScheme = `
    type Pupil {
        id: ID!
        name: String!
        surname: String!
        class: Class!
    }

    type Query {
        pupils: [Pupil]
        pupil(id: ID!): Pupil
        searchPupil(string: String!): [Pupil]
    }

    type Mutation {
        createPupil(input: PupilInput!): Pupil!
        updatePupil(input: PupilUpdate!, id: ID!): Pupil!
        deletePupil(id: ID!): String
    }

    input PupilInput {
        name: String!
        surname: String!
        class_id: Int!
    }

    input PupilUpdate {
        name: String
        surname: String
        class_id: Int
    }
`

module.exports = pupilScheme