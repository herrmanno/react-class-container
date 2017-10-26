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

import {Container, Prop} from "react-class-container"

/*
* Container(MyComponent) meens 'create a class that will always render MyComponent'
*/
class MyContainer extends Container(MyComponent) {
    
    /*
    * this will be available as `props.foo` inside MyComponent
    */
    @Prop get greeting() {
        return "foo"
    }

    componentWillMount() {
        // do some initialization of your component
    }
}
```


## usage with redux

Every Container component tries to get access to a context variable called `store`, which should be a valid [redux store](http://redux.js.org/docs/basics/Store.html), if provided.
The easiest way to provide this context is to use react-redux's [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store).

```javascript
/*
 * Assume your redux store will be provided
 */

import {Container, Prop} from "react-class-container"

class MyContainer extends Container(MyComponent) {
    
    /*
    * `this.store` is the redux store you provided
    */
    @Prop get greeting() {
        return this.store.greeting
    }

    @Prop fireSomeAction() {
        return this.dispatch(someActionCreator)
    }

}
```

## usage without decorators

```javascript
import {Container, Prop} from "react-class-container"

class MyContainer extends Container(MyComponent) {
    
    constructor(props, context) {
        super(props, context)
        this.propKeys = [
            "greeting",
            "fireSomeAction"
        ]
    }

    /*
    * `this.store` is the redux store you provided
    */
    @Prop get greeting() {
        return this.store.greeting
    }

    @Prop fireSomeAction() {
        return this.dispatch(someActionCreator)
    }

}
```

## fine-tune when to rerender

```javascript
import {Container, Prop} from "react-class-container"

class MyContainer extends Container(MyComponent) {
    
    /*
    * olsState and newState are objects containing all the @Prop fields of your container
    */
    didStateChanged(oldState, newState) {
        if(onlyFooChanged(oldState, newState))
            return false
        if(alsoOtherPropsChanged(oldState, newState))
            return true
    }   

    @Prop get foo() {
        return Math.random()
    }

    /*
     some other props
    */

}
```