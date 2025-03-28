import { gql } from "@apollo/client";

export const GET_SUBJECTS = gql`
    query {
        subjects {
            id title teacher {
                id name surname
            }
        }
    }
`

export const DELETE_SUBJECT = gql`
    mutation delete($id: ID!){
        deleteSubject(id: $id)
    }
`