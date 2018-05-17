import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation addAddress_Mutation($input: addAddressInput!) {
    addAddress(input: $input) {
        addresses {
            edges {
                node {
                    id
                }
            }
        }
    }
  }
`

const addAddressMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default addAddressMutation;