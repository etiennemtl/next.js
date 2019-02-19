import React from 'react'
import { connect } from 'kea'

import logic from '../logic'

class Homepage extends React.Component {
  static async getInitialProps ({ store, isServer }) {
    store.dispatch(logic.actions.loadData())
    return { isServer }
  }

  render () {
    return (
      <div>
        <p>Double Counter: {this.props.doubleCounter}</p>
        <button type='button' onClick={() => this.actions.increment(1)}>
          Increment
        </button>
        <button type='button' onClick={() => this.actions.decrement(1)}>
          Decrement
        </button>
      </div>
    )
  }
}

export default connect({
  actions: [logic, ['increment', 'decrement']],
  props: [logic, ['doubleCounter']]
})(Homepage)
