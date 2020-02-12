import * as React from "react"
import ContainerClass from "./ContainerClass"
import { ContainerComponent } from "."

/**
 * Creates a container class for a wrapper template component
 *
 * The only purpose of the generated class is to render the wrapped
 * template with the value of `getChildProps`, which shall be implemented
 * by a subclass.
 *
 * @param template a (probably presentational) Component to render
 * @returns a new ContainerClass
 *
 * @example
 * ```javascript
  const Foo = props => <span>{prop.name}</span>

  class FooContainer extends Container(Foo) {
    getChildProps() {
      return { name: "Foo" }
    }

  // <FooContainer/> renders <span>Foo</span>
  ```
 */
function Container<V>(template: React.ComponentType<V>): ContainerClass<V> {
  class ContainerImplementation<P = any, S = any> extends React.Component<P, S> implements ContainerComponent<V, P, S> {
    public lastChildProps?: V

    public shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) {
      const lastChildProps: any = { ...(this.lastChildProps || {}) }
      const newChildProps: any = this.getChildProps(nextProps, nextState)
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

    public render() {
      return React.createElement(template, this.getChildProps(this.props, this.state))
    }

    public get childProps(): V {
      return this.getChildProps(this.props, this.state)
    }

    public getChildProps(props: P, state: S): V {
      return {
        ...((props as any) || {}),
        ...((state as any) || {})
      }
    }
  }

  return ContainerImplementation
}

export default Container
