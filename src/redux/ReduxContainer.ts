import * as React from "react"
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
 * const Foo = props => <span>{prop.name}</span>
 *
 * class FooContainer extends ReduxContainer(Foo) {
 *   getChildProps() {
 *     return { name: this.store.getState().name }
 *   }
 * }
 *
 * // <FooContainer> renders <span>{/* content of `reduxState.name` *\/}</span>
 * ```
 */
function ReduxContainer<V>(
  template: React.ComponentType<V>
): ReduxContainerClass<V> {
  abstract class ContainerImplementation extends ReduxContainerComponent<V> {
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

export default ReduxContainer
