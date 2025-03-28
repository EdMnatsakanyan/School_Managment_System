import { gql } from "@apollo/client";

export const GET_TEACHERS = gql`
    query {
        teachers {
            id
            name
            surname
            subjects {
                id
                title
            }
        }
    }
`

export const GET_TEACHER_F = (id: number) => {
    return gql`
        query {
            teacher(id: ${id}){
                id
                name
                surname
                subjects {
                    id
                    title
                }
            }
        }
    `
}

export const TEACHERS_SCHEDULES_F = (id: number) => {
    return gql `
        query {
            teachersSchedules(teacher_id: ${id}){
                id
                day
                number
                subject {
                    id title
                }
                class {
                    id level letter
                }
            }
        }
    `
}

export const ADD_TEACHER = gql`
  mutation AddTeacher($name: String!, $surname: String!) {
    createTeacher(input:{name: $name, surname: $surname}) {
      id
      name
      surname
    }
  }
`;

export const DELETE_TEACHER = gql`
    mutation deleteTeacher($id: ID!){
        deleteTeacher(id: $id)
    }
`

export const ADD_SUBJECT = gql`
    mutation addSubject(, $input: SubjectInput!){
        createSubject(input: $input){
            id
            title
        }
    }
`

export const SEARCH_TEACHERS = gql `
    query searchTeahcers($string: String!) {
        searchTeacher(string: $string) {
            id
            name
            surname
            subjects {
                id
                title
            }
        }
    }
`