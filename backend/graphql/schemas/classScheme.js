const classScheme = `
  type Class {
    id: ID!
    level: Int!
    letter: String!
    room_number: Int!
    pupils: [Pupil]!
    schedules: [Schedule]!
  }

  type Query {
    classes: [Class]
    class(id: ID!): Class
  }

  type Mutation {
    createClass(input: ClassInput!): Class!
    updateClass(input: ClassUpdate!, id: ID!): Class!
    deleteClass(id: ID!): String
  }

  input ClassInput {
    level: Int!
    letter: String!
    room_number: Int!
  }

  input ClassUpdate {
    level: Int
    letter: String
    room_number: Int
  }
`;

module.exports = classScheme;
