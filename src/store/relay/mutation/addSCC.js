import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation addSCC_Mutation($input: addSCCInput!) {
    addSCC(input: $input) {
        clientMutationId
    }
  }
`

const addSCCMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default addSCCMutation;