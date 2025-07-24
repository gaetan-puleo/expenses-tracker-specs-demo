import { Route, Switch } from "wouter"
import { routesConfig } from './config'

export function Router() {
  return (
    <Switch>
      {routesConfig.map((route) => {
        const Component = route.component
        return (
          <Route 
            key={route.path} 
            path={route.path}
          >
            <Component />
          </Route>
        )
      })}
      <Route>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
          <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        </div>
      </Route>
    </Switch>
  )
}