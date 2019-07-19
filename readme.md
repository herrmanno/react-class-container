# react-class-container

For when you want to seperate your components presentation and logic (for example when spliting work between designers and programmers)
or you want your redux-connected container to implement some lifecycle methods without struggle.

## Install

`npm i react-class-container`

## Usage

A class container is created by defining a class that inherits from `Container(...)`.
Your class then may provide a custom implementation of `getChildProps`, whose return value
will be passed to the wrapped component.
If you dont provide a custom method implementation your container's props and state will
be spread and passed to the wrapped component.

### Basic example

```javascript
// mycomponent.js

const MyComponent = props => <span>{props.greeting}</span>
```

```javascript
// mycontainer.js

import { Container } from "react-class-container"

/*
* Container(MyComponent) meens 'create a class that will always render MyComponent'
*
* As it is an ordinary React Component you can implement any of it's lifecycle methods
* or assign additional methods and properties to it.
*/
class MyContainer extends Container(MyComponent) {
  /*
  * this will be available as `props.foo` inside MyComponent
  */
  getChildProps(props, state) {
    return { greeting: "foo" }
  }
}
```

### Using state

```javascript
const MyInput = props => <input {...props} />
```

```javascript
import { Container } from "react-class-container"

/*
* Like any other class based React Component a class container
* may hold and manage it's own state (and pass is to the wrapped template component).
* 
*/
class MyInputContainer extends Container(MyComponent) {
  state = {
    value: ""
  }

  /*
  * `onChange` is implemented as arrow function property
  * so `this` is bound properly to the function
  * and its value stays the same on each call of
  * `getChildProps`.
  */
  onChange = e => this.setState({ value: e.target.value })

  getChildProps(props, state) {
    return {
      ...state,
      /*
      * Try to return a static value.
      * If you return `this.onChange.bind(this)` shallow comparison of
      * of your child props will fail because `this.method.bind(this) !== this.method.bind(this)`.
      */
      onChange: onChange
    }
  }
}
```

## Usage with redux

Every ReduxContainer component tries to get access to a context variable called `store`, which should be a valid [redux store](http://redux.js.org/docs/basics/Store.html), if provided.
The easiest way to provide this context is to the build-in [Provider component](./src/redux/Provider.ts) or react-redux's [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store).

The access to the store is provided through the (readonly) `store` property on any instance of ReduxContainer.
Also, one can access the store's state directly as the third parameter (aside props and state) inside the `getChildProps` method.

```javascript
import { ReduxContainer } from "react-class-container"

class MyContainer extends ReduxContainer(MyComponent) {
  onFireSomeAction = () => {
    /*
    * `this.store` accesses the redux store you provided via `<Provider/>` or similiar.
    */
    this.store.dispatch({ type: "some_action" })
  }

  /*
  * Here, reduxState is the same as `this.store.getState()`.
  */
  getChildProps(props, state, reduxState) {
    return {
      greeting: reduxState.greeting,
      onFireSomeAction: this.onFireSomeAction
    }
  }
}
```

### Fine-tune when to rerender

You dont have to define when to rerender after a redux state update as an additional function.
react-class-container will call `getChildProps` on a redux store update and compares its return value
shallowly to the previously (cached) return value. Therefore your container class will only update
after a redux store change if it passes a changed property to its wrapped component.
