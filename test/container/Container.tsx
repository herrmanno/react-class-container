import * as React from "react"
import test from "ava"
import * as enzyme from "enzyme"
import * as EnzymeAdapter from "enzyme-adapter-react-16"
import { Container } from "../../src"

enzyme.configure({ adapter: new EnzymeAdapter() })

test("Should pass it's props and state to wrapped component", t => {
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

  class MyContainer extends Container(MyComponent) {
    state = containerState
  }

  enzyme.render(<MyContainer {...containerProps} />)

  t.deepEqual(childProps, { ...containerProps, ...containerState })
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

  class MyContainer extends Container(MyComponent) {
    getChildProps() {
      return props
    }
  }

  enzyme.render(<MyContainer />)

  t.deepEqual(childProps, props)
})

test("Should pass props and state to `getChildProps`", t => {
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

  class MyContainer extends Container(() => null) {
    state = containerState

    getChildProps(props: any, state: any) {
      passedProps = props
      passedState = state
      return {}
    }
  }

  enzyme.render(<MyContainer {...containerProps} />)

  t.deepEqual(passedProps, containerProps)
  t.deepEqual(passedState, containerState)
})
