import { Plus } from "lucide-react"
import { Button } from "@/front-end/components/ui/button"

interface FloatingAddButtonProps {
  onClick: () => void
}

export function FloatingAddButton(props: FloatingAddButtonProps) {
  const { onClick } = props

  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
      onClick={onClick}
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}