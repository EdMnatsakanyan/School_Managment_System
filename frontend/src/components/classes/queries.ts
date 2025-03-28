import { gql } from "@apollo/client";

export const GET_CLASSES = gql`
    query {
        classes {
            id
            level
            letter
            pupils {
                id
            }
        }
    }
`

export const GET_CLASS_F = (id: number) => {
    return gql `
        query {
            class(id: ${id}){
                id
                level
                letter
                pupils {
                    id
                    name
                    surname
                }
                schedules {
                    day
                    number
                    subject {
                        id
                        title
                        teacher {
                            id
                            name
                            surname
                        }
                    }
                }
            }
        }
    `
}

export const GET_SUBJECTS = gql`
    query {
        subjects {
            id
            title
            teacher {
                id
                name
                surname
            }
        }
    }
`

export const ADD_SCHEDULE = gql`
    mutation addSchedule($number: Int!, $day: String!, $subject_id: Int!, $class_id: Int!) {
        createSchedule(input: { number: $number, day: $day, subject_id: $subject_id, class_id: $class_id }) {
            id
        }
}
`

export const DELETE_CLASS = gql`
    mutation deleteClass($id: ID!) {
        deleteClass(id: $id)
    }
`

export const UPDATE_CLASS = gql`
    mutation updateClass($id: ID!, $input: ClassUpdate!) {
        updateClass(id: $id, input: $input) {
            id
        }
    }
`

export const ADD_CLASS = gql`
    mutation addClass($input: ClassInput!){
        createClass(input: $input) {
            id
        }
    }
`

