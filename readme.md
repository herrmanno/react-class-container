# react-class-container

If you want or have to seperate your components presentation and logic (for example when spliting work between designers and programmers)
or if you want your redux-connected container to implement some lifecycle methods without struggle.

## install

`npm i react-class-container`

## usage

```javascript
// mycomponent.js

const MyComponent = (props) => 
    <span>{props.greeting}</span>
```

```javascript
// mycontainer.js

import {Container} from "react-class-container"

/*
* Container(MyComponent) meens 'create a class that will always render MyComponent'
*/
class MyContainer extends Container(MyComponent) {
    
    componentWillMount() {
        // do some initialization of your component
    }
    
    /*
    * this will be available as `props.foo` inside MyComponent
    */
    getChildProps() {
        return { greeting: "foo" }
    }

}
```


## usage with redux

Every ReduxContainer component tries to get access to a context variable called `store`, which should be a valid [redux store](http://redux.js.org/docs/basics/Store.html), if provided.
The easiest way to provide this context is to the build-in Provider component or react-redux's [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store).

```javascript
import {ReduxContainer} from "react-class-container"

class MyContainer extends ReduxContainer(MyComponent) {
    
    @Prop get greeting() {
        return this.store.greeting
    }

    getChildProps() {
        return {
            greeting: this.store.getState().greeting,
            onFireSomeAction: this.store.dispatch({/*...*/})
        }
    }

}
```


## fine-tune when to rerender

```javascript
import {Container} from "react-class-container"

class MyContainer extends ReduxContainer(MyComponent) {
    
    /*
    * olsState and newState are objects containing all the @Prop fields of your container
    */
    componentWillReceiveReduxState(state) {
        // this will be cached and compared the next time the redux store changes
        // if you return the same value (flatly compared) as last time 'MyComponent' wont rerender
        return state.greeting
    }   
}
```