import * as React from "react"
import test from "ava"
import * as enzyme from "enzyme"
import * as EnzymeAdapter from "enzyme-adapter-react-16"
import * as redux from "redux"
import { ReduxContainer } from "../../src"

enzyme.configure({ adapter: new EnzymeAdapter() })

function createStore(initialState: any = {}) {
  return redux.createStore(
    (state: any, action: any) => {
      return { ...state, ...action.payload }
    },
    initialState as any
  )
}

test("Should pass it's props and state and redux state to wrapped component", t => {
  const reduxState = {
    john: "guitar",
    ringo: "drums",
    paul: "bass"
  }

  const containerProps = {
    foo: "FOO",
    baz: 123
  }

  const containerState = {
    foo: "foo",
    bar: "BAR"
  }

  let childProps = undefined

  function MyComponent(props: any) {
    childProps = props
    return null
  }

  class MyContainer extends ReduxContainer(MyComponent) {
    state = containerState
  }

  enzyme.shallow(<MyContainer {...containerProps} />, { context: { store: createStore(reduxState) } }).dive()

  t.deepEqual(childProps, { ...containerProps, ...containerState, ...reduxState })
})

test("Should pass `getChildProps` to wrapped component", t => {
  const props = {
    foo: "FOO",
    bar: 123,
    baz: /baz/
  }

  let childProps = undefined

  function MyComponent(props: any) {
    childProps = props
    return null
  }

  class MyContainer extends ReduxContainer(MyComponent) {
    getChildProps() {
      return props
    }
  }

  enzyme.shallow(<MyContainer />, { context: { store: createStore() } }).dive()

  t.deepEqual(childProps, props)
})

test("Should pass props, state and redux state to `getChildProps`", t => {
  const reduxState = {
    john: "guitar",
    ringo: "drums",
    paul: "bass"
  }

  const containerProps = {
    foo: "FOO",
    baz: 123
  }

  const containerState = {
    foo: "foo",
    bar: "BAR"
  }

  let passedProps = undefined
  let passedState = undefined
  let passedReduxState = undefined

  class MyContainer extends ReduxContainer(() => null) {
    state = containerState

    getChildProps(props: any, state: any, reduxState: any) {
      passedProps = props
      passedState = state
      passedReduxState = reduxState
      return {}
    }
  }

  enzyme.shallow(<MyContainer {...containerProps} />, { context: { store: createStore(reduxState) } }).dive()

  t.deepEqual(passedProps, containerProps)
  t.deepEqual(passedState, containerState)
  t.deepEqual(passedReduxState, reduxState)
})

test("Shouldn't update if 'unwatched' part of redux state updates", t => {
  const reduxState = {
    john: "guitar",
    ringo: "drums",
    paul: "bass"
  }

  const store = createStore(reduxState)

  let passedProps: any = undefined

  class MyContainer extends ReduxContainer(props => ((passedProps = props), null)) {
    getChildProps(_props: any, _state: any, reduxState: any) {
      return {
        john: reduxState.john
      }
    }
  }

  const wrapper = enzyme.shallow(<MyContainer />, { context: { store } })
  wrapper.dive()

  t.deepEqual(passedProps, { john: reduxState.john })

  let passedPropsAfterFirstRender = passedProps

  store.dispatch({ type: "update", payload: { ringo: "harmonica" } })

  wrapper.update()
  wrapper.dive()

  t.deepEqual(passedProps, passedPropsAfterFirstRender)
})

test("Should update if 'watched' part of redux state updates", t => {
  const reduxState = {
    john: "guitar",
    ringo: "drums",
    paul: "bass"
  }

  const store = createStore(reduxState)

  let passedProps = undefined

  class MyContainer extends ReduxContainer(props => ((passedProps = props), null)) {
    getChildProps(_props: any, _state: any, reduxState: any) {
      return {
        john: reduxState.john
      }
    }
  }

  const wrapper = enzyme.shallow(<MyContainer />, { context: { store } })
  wrapper.dive()

  t.deepEqual(passedProps, { john: reduxState.john })

  let passedPropsAfterFirstRender = passedProps

  store.dispatch({ type: "update", payload: { john: "yoko ono" } })

  wrapper.update()
  wrapper.dive()

  t.true(passedProps !== passedPropsAfterFirstRender)
  t.deepEqual(passedProps, { john: "yoko ono" })
})

test("Should return `getChildProps(this.props, this.state, this.store.getState())` from childProps", t => {
  const reduxState = {
    john: "guitar",
    ringo: "drums",
    paul: "bass"
  }

  const store = createStore(reduxState)

  const containerProps = {
    foo: "FOO",
    baz: 123
  }

  const containerState = {
    foo: "foo",
    bar: "BAR"
  }

  class MyContainer extends ReduxContainer(() => null) {
    state = containerState
  }

  const instance: any = enzyme.shallow(<MyContainer {...containerProps} />, { context: { store } }).instance()

  t.deepEqual(instance.childProps, { ...containerProps, ...containerState, ...reduxState })
})
