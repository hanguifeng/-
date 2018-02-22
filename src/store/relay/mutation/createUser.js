import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation createUser_Mutation($input: createUserInput!) {
    createUser(input: $input) {
      user {
        id
      }
      error
    }
  }
`

const createUserMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default createUserMutation;