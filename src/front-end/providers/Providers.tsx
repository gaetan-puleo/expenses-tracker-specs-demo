import { StoreProvider } from './StoreProvider'

export function Providers(props: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {props.children}
    </StoreProvider>
  )
}