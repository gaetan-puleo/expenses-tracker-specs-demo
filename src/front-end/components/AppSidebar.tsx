import { Home, Receipt, TrendingUp, Settings, User, PlusCircle } from "lucide-react"
import { useDispatch } from "react-redux"
import { Link, useLocation } from "wouter"
import { AppDispatch } from "../../store/init-store"
import { openExpenseModal } from "../../features/expenses/expenseForm/expenseForm.events"
import { HOME_ROUTE, ANALYTICS_ROUTE } from "../routes/constants"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/front-end/components/ui/sidebar"
import { Button } from "@/front-end/components/ui/button"

const menuItems = [
  {
    title: "Dashboard",
    url: HOME_ROUTE,
    icon: Home,
  },
  {
    title: "Analytics",
    url: ANALYTICS_ROUTE,
    icon: TrendingUp,
  },
]

const settingsItems = [
  {
    title: "Settings",
    url: "#settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "#profile",
    icon: User,
  },
]

export function AppSidebar() {
  const dispatch = useDispatch<AppDispatch>()
  const [location] = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Receipt className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold">Expense Tracker</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2">
              <Button 
                onClick={() => dispatch(openExpenseModal())}
                className="w-full justify-start" 
                size="sm"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>John Doe</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}