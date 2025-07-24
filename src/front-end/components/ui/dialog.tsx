import { ReactNode } from 'react'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog(props: DialogProps) {
  const { open, onOpenChange, children } = props
  
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

interface DialogContentProps {
  children: ReactNode
}

export function DialogContent(props: DialogContentProps) {
  return <div className="p-6">{props.children}</div>
}

interface DialogHeaderProps {
  children: ReactNode
}

export function DialogHeader(props: DialogHeaderProps) {
  return <div className="mb-4">{props.children}</div>
}

interface DialogTitleProps {
  children: ReactNode
}

export function DialogTitle(props: DialogTitleProps) {
  return <h2 className="text-lg font-semibold">{props.children}</h2>
}

interface DialogDescriptionProps {
  children: ReactNode
}

export function DialogDescription(props: DialogDescriptionProps) {
  return <p className="text-sm text-muted-foreground mt-1">{props.children}</p>
}

interface DialogFooterProps {
  children: ReactNode
}

export function DialogFooter(props: DialogFooterProps) {
  return <div className="flex justify-end space-x-2 mt-6">{props.children}</div>
}