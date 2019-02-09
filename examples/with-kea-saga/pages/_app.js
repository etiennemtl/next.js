import React from 'react'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { configureStore } from '../store'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default compose(
  withRedux(configureStore, { debug: process.env.NODE_ENV === 'development' }),
  withReduxSaga({ async: false })
)(MyApp)
