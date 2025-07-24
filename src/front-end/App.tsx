import { Providers } from "./providers/Providers"
import { DashboardLayout } from "./components/DashboardLayout"
import { Router } from "./routes/Router"
import { ExpenseFormModal } from "./components/ExpenseFormModal"

function App() {
  return (
    <Providers>
      <DashboardLayout>
        <Router />
        <ExpenseFormModal />
      </DashboardLayout>
    </Providers>
  )
}

export default App