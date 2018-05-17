import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation updateAddress_Mutation($input: updateAddressInput!) {
    updateAddress(input: $input) {
        address {
          phoneNumber
          name
          province
          city
          block
          detailAddress
          zipCode
          isDefault
        }
    }
  }
`

const updateAddressMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default updateAddressMutation;