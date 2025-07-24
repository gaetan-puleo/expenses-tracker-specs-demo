import { ReactNode } from 'react'

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: ReactNode
}

export function Select(props: SelectProps) {
  const { value, onValueChange, children } = props
  
  return (
    <select 
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </select>
  )
}

interface SelectContentProps {
  children: ReactNode
}

export function SelectContent(props: SelectContentProps) {
  return <>{props.children}</>
}

interface SelectItemProps {
  value: string
  children: ReactNode
}

export function SelectItem(props: SelectItemProps) {
  return <option value={props.value}>{props.children}</option>
}

interface SelectTriggerProps {
  children: ReactNode
}

export function SelectTrigger(props: SelectTriggerProps) {
  return <>{props.children}</>
}

interface SelectValueProps {
  placeholder?: string
}

export function SelectValue(props: SelectValueProps) {
  return <option value="" disabled>{props.placeholder || 'Select...'}</option>
}