import * as Proptypes from "prop-types"
import * as React from "react"
import { Store } from "redux"
import ReduxContainerClass from "./ReduxContainerClass"
import ReduxContainerComponent from "./ReduxContainerComponent"

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
  class ReduxContainerImplementation<R = any, P = any, S = any> extends React.PureComponent<P, S>
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
      this.lastChildProps = this.callGetChildProps()
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    /**
     * the redux store, if one is accessiable from the container
     */
    public get store(): Store<R> {
      return this.context.store
    }

    public getChildProps(props: P, state: S, reduxState: R): V {
      return <any>{
        ...((props as any) || {}),
        ...((state as any) || {}),
        ...((reduxState as any) || {})
      }
    }

    public render() {
      return React.createElement(template, this.callGetChildProps())
    }

    private callGetChildProps(): V {
      return this.getChildProps(this.props, this.state, this.store.getState())
    }

    private onUpdate() {
      const lastChildProps: any = { ...(this.lastChildProps || {}) }
      const newChildProps: any = this.callGetChildProps()
      const lastKeys = Object.keys(lastChildProps)
      const newKeys = Object.keys(newChildProps)

      this.lastChildProps = newChildProps

      if (lastKeys.some(k => lastChildProps[k] !== newChildProps[k])) {
        console.log("Updating redux container due to: value changed")
        return this.forceUpdate()
      } else if (newKeys.some(k => lastChildProps[k] !== newChildProps[k])) {
        console.log("Updating redux container due to: value changed")
        return this.forceUpdate()
      }
    }
  }

  return ReduxContainerImplementation
}

export default ReduxContainer
