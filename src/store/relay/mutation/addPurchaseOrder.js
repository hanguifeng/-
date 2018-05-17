import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation addPurchaseOrder_Mutation($input: addPurchaseOrderInput!) {
    addPurchaseOrder(input: $input) {
      clientMutationId
    }
  }
`

const addPurchaseOrderMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default addPurchaseOrderMutation;