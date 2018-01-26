import * as React from "react"
import ReduxContainerClass from "./ReduxContainerClass"
import ReduxContainerComponent from "./ReduxContainerComponent"

/**
 * @param template a (probably presentational) Component to render
 * @returns a new ContainerClass
 *
 * @example
 * ```javascript
 * let Foo = props => <span>{prop.name}</span>
 * class FooContainer extensd ReduxContainer(Foo) {
 *   getChildProps() {
 *     return { name: this.store.getState().name }
 *   }
 * }
 * ```
 */
function ReduxContainer<V>(template: React.ComponentType<V>): ReduxContainerClass<V> {
    abstract class ContainerImplementation extends ReduxContainerComponent<V> {

        render() {
            return React.createElement(template, this.getChildProps())
        }
    }

    return ContainerImplementation as any
}


export default ReduxContainer