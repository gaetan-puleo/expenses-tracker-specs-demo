import { ComponentType } from 'react'
import { HOME_ROUTE, ANALYTICS_ROUTE } from './constants'
import { Dashboard } from '../pages/Dashboard'
import { Analytics } from '../pages/Analytics'

export interface RouteConfig {
  path: string
  component: ComponentType
}

export const routesConfig: RouteConfig[] = [
  {
    path: HOME_ROUTE,
    component: Dashboard,
  },
  {
    path: ANALYTICS_ROUTE,
    component: Analytics,
  },
]