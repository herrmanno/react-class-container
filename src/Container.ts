import * as React from "react"
import ContainerClass from "./ContainerClass"
import ContainerComponentBase from "./ContainerComponentBase"

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
 * const Foo = props => <span>{prop.name}</span>
 *
 * class FooContainer extends Container(Foo) {
 *   getChildProps() {
 *     return { name: "Foo" }
 *   }
 *
 * // <FooContainer/> renders <span>Foo</span>
 * ```
 */
function Container<V>(template: React.ComponentType<V>): ContainerClass<V> {
  abstract class ContainerImplementation extends ContainerComponentBase<V> {
    render() {
      const props =
        typeof this.getChildProps === "function"
          ? this.getChildProps()
          : undefined
      return React.createElement(template, props)
    }
  }

  return ContainerImplementation as any
}

export default Container
