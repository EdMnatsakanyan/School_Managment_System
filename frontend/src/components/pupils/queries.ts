import { gql } from "@apollo/client";

export const GET_PUPILS = gql`
    query {
        pupils {
            id
            name
            surname
            class {
                id
                level
                letter
            }
        }
    }
`

export const GET_PUPIL_F = (id: number) => {
    return gql`
        query {
            pupil(id: ${id}){
                id
                name
                surname
                class{
                    id
                    level
                    letter
                }
            }
        }
    `
}

export const ADD_PUPIL = gql`
    mutation getPupil($input: PupilInput!){
        createPupil(input: $input){
            id
        }
    }
`

export const UPDATE_PUPIL = gql`
    mutation changePupil($id: ID!, $input: PupilUpdate!){
        updatePupil(id: $id, input: $input){
            id
            name
            surname
            class {
                id
                level
                letter
            }
        }
    }
`

export const DELETE_PUPIL = gql`
    mutation($id: ID!){
        deletePupil(id: $id)
    }
`

export const SEARCH_PUPILS = gql `
    query searchPupils($string: String!) {
        searchPupil(string: $string) {
            id
            name
            surname
            class {
                id
                level
                letter
            }
        }
    }
`