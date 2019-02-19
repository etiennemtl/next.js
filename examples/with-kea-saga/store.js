import { activatePlugin, keaReducer } from 'kea'
import sagaPlugin, { keaSaga } from 'kea-saga'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

const reducers = combineReducers({
  kea: keaReducer('kea'),
  scenes: keaReducer('scenes')
})

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

export const configureStore = (initialState = {}) => {
  activatePlugin(sagaPlugin)

  const finalCreateStore = compose(bindMiddleware([sagaMiddleware]))(
    createStore
  )
  const store = finalCreateStore(reducers, initialState)

  store.sagaTask = sagaMiddleware.run(keaSaga)

  return store
}
