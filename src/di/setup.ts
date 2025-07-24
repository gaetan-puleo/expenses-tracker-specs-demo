import { Gateways } from './Gateways'
import { FakeExpensesGateway } from '../features/shared/gateways/implementations/FakeExpenses.gateway'

export const createGateways = (): Gateways => {
  return {
    expensesGateway: new FakeExpensesGateway(),
  }
}