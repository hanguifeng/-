import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation createToken_Mutation($input: createTokenInput!) {
    createToken(input: $input) {
      user {
        id
        authority
      }
      error
    }
  }
`;
const createTokenMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default createTokenMutation;
