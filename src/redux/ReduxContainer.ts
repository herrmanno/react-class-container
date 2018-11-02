import * as Proptypes from "prop-types"
import * as React from "react"
import { Store } from "redux"
import ReduxContainerClass from "./ReduxContainerClass"
import ReduxContainerComponent from "./ReduxContainerComponent"

declare const process: any

const dummyStore: Store<any> = {
  dispatch(a) {
    return a
  },
  getState() {
    return {}
  },
  subscribe() {
    return () => null
  },
  replaceReducer() {}
}

/**
 * Creates a container class for a wrapper template component
 *
 * The only purpose of the generated class is to render the wrapped
 * template with the value of `getChildProps`, which shall be implemented
 * by a subclass.
 * Also instances of the returned class have access to a redux store
 * passed via context.
 *
 * @param template a (probably presentational) Component to render
 * @returns a new ContainerClass
 *
 * @example
 * ```javascript
 const Foo = props => <span>{prop.name}</span>

  class FooContainer extends ReduxContainer(Foo) {
    getChildProps() {
      return { name: this.store.getState().name }
    }
  }

  // <FooContainer> renders <span>{/* content of `reduxState.name` *\/}</span>
  ```
 */
function ReduxContainer<V>(template: React.ComponentType<V>): ReduxContainerClass<V> {
  class ReduxContainerImplementation<R = any, P = any, S = any> extends React.Component<P, S>
    implements ReduxContainerComponent<V, R, P, S> {
    static contextTypes = {
      store: Proptypes.object.isRequired
    }

    private readonly unsubscribe: Function

    private lastChildProps?: V

    constructor(props?: any, context?: any) {
      super(props, context)
      this.unsubscribe = this.store.subscribe(this.onUpdate.bind(this))
    }

    componentDidMount() {
      this.lastChildProps = this.getChildProps(this.props, this.state, this.store.getState())
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) {
      const lastChildProps: any = { ...(this.lastChildProps || {}) }
      const newChildProps: any = this.getChildProps(nextProps, nextState, nextContext.store.getState())
      const lastKeys = Object.keys(lastChildProps)
      const newKeys = Object.keys(newChildProps)

      this.lastChildProps = newChildProps

      if (lastKeys.some(k => lastChildProps[k] !== newChildProps[k])) {
        return true
      } else if (newKeys.some(k => lastChildProps[k] !== newChildProps[k])) {
        return true
      } else {
        return false
      }
    }

    /**
     * the redux store, if one is accessiable from the container
     */
    public get store(): Store<R> {
      if (this.context.store) {
        return this.context.store
      } else {
        if (process && process.env && process.env.NODE_ENV !== "production") {
          console.error(
            "ReduxContainer could not access redux store. You may forgot to provide your store via '<Provide store={store}>...</Provider>'"
          )
        }
        return dummyStore
      }
    }

    public get childProps(): V {
      return this.getChildProps(this.props, this.state, this.store.getState())
    }

    public getChildProps(props: P, state: S, reduxState: R): V {
      return <any>{
        ...((props as any) || {}),
        ...((state as any) || {}),
        ...((reduxState as any) || {})
      }
    }

    public render() {
      return React.createElement(template, this.getChildProps(this.props, this.state, this.store.getState()))
    }

    private onUpdate() {
      if (this.shouldComponentUpdate(this.props, this.state, this.context)) {
        return this.forceUpdate()
      }
    }
  }

  return ReduxContainerImplementation
}

export default ReduxContainer
