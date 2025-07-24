import { ExpensesGateway } from '../features/shared/gateways/interfaces/expenses.gateway'

export interface Gateways {
  expensesGateway: ExpensesGateway
}

export type PartialGateways = Partial<Gateways>;