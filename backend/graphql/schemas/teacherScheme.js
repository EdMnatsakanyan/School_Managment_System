const teacherScheme = `
  type Teacher {
    id: ID!
    name: String!
    surname: String!
    subjects: [Subject]!
  }

  type Query {
    teachers: [Teacher]
    teacher(id: ID!): Teacher
    searchTeacher(string: String!): [Teacher]!
  }

  type Mutation {
    createTeacher(input: TeacherInput!): Teacher!
    updateTeacher(input: TeacherUpdate!, id: ID!): Teacher!
    deleteTeacher(id: ID!): String
  }

  input TeacherInput {
    name: String!
    surname: String!
  }

  input TeacherUpdate {
    name: String
    surname: String
  }


`;

module.exports = teacherScheme;
