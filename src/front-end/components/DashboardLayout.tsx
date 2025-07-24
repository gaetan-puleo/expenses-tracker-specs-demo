import { ReactNode } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/front-end/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Separator } from "@/front-end/components/ui/separator"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Welcome back!</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
