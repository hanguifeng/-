import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation deleteAddress_Mutation($input: deleteAddressInput!) {
    deleteAddress(input: $input) {
        clientMutationId
    }
  }
`

const deleteAddressMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default deleteAddressMutation;