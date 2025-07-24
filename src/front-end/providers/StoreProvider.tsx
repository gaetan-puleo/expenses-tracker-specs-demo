import { Provider } from 'react-redux'
import { initStore } from '../../store/init-store'
import { createGateways } from '../../di/setup'

const store = initStore({
  gateways: createGateways()
})

export function StoreProvider(props: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}