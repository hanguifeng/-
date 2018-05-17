import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation updateUser_Mutation($input: updateUserInput!) {
    updateUser(input: $input) {
        user {
          id
          sex
          password
          accountImage
          nickName
          birthday
          phoneNumber
        }
    }
  }
`

const updateUserMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default updateUserMutation;