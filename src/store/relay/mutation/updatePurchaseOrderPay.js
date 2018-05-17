import { graphql } from 'react-relay';
import createMutation from '../createMutation';

const mutation = graphql`
  mutation updatePurchaseOrderPay_Mutation($input: updatePurchaseOrderPayInput!) {
    updatePurchaseOrderPay(input: $input) {
      purchaseOrder {
        isPay
      }
    }
  }
`

const updatePurchaseOrderPayMutation = mutationParams => createMutation({ ...mutationParams, mutation });

export default updatePurchaseOrderPayMutation;