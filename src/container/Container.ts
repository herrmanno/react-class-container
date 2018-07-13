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
  class ContainerImplementation<P = any, S = any> extends React.PureComponent<P, S>
    implements ContainerComponent<V, P, S> {
    public render() {
      return React.createElement(template, this.getChildProps(this.props, this.state))
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
