import PropTypes from 'prop-types'
import { kea } from 'kea'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'

const exampleInitialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
}

export default kea({
  path: () => ['scenes'],
  actions: () => ({
    increment: amount => ({ amount }),
    decrement: amount => ({ amount }),
    loadData: () => ({}),
    loadDataSuccess: data => ({ data }),
    loadDataFail: error => ({ error })
  }),
  reducers: ({ actions }) => ({
    counter: [
      exampleInitialState,
      PropTypes.object,
      {
        [actions.increment]: (state, payload) => {
          return {
            ...state,
            ...{ count: state.count + payload.amount }
          }
        },
        [actions.decrement]: (state, payload) => {
          return {
            ...state,
            ...{ count: state.count - payload.amount }
          }
        },
        [actions.loadDataSuccess]: (state, payload) => {
          return {
            ...state,
            ...{ placeholderData: payload.data }
          }
        }
      }
    ]
  }),
  selectors: ({ selectors }) => ({
    doubleCounter: [
      () => [selectors.counter],
      counter => counter.count * 2,
      PropTypes.number
    ]
  }),
  takeEvery: ({ actions, workers }) => ({
    [actions.loadData]: workers.loadDataSaga
  }),
  workers: {
    loadDataSaga: function * (action) {
      console.log('Saga fired')
      const { loadDataSuccess, loadDataFail } = this.actions
      try {
        const { data } = yield call(
          axios.get('https://jsonplaceholder.typicode.com/users')
        )
        yield put(loadDataSuccess(data))
      } catch (error) {
        yield put(loadDataFail(error))
      }
    }
  }
})
