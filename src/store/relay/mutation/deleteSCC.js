import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation deleteSCC_Mutation($input: deleteSCCInput!) {
    deleteSCC(input: $input) {
        clientMutationId
    }
  }
`

const deleteSCCMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default deleteSCCMutation;