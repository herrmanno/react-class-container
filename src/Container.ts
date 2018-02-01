import * as React from "react"
import ContainerClass from "./ContainerClass"
import ContainerComponent from "./ContainerComponent"

/**
 * @param template a (probably presentational) Component to render
 * @returns a new ContainerClass
 *
 * @example
 * ```javascript
 * let Foo = props => <span>{prop.name}</span>
 * class FooContainer extensd Container(Foo) {
 *   getChildProps() {
 *     return { name: "Foo" }
 *   }
 * }
 * ```
 */
function Container<V>(template: React.ComponentType<V>): ContainerClass<V> {
    abstract class ContainerImplementation extends ContainerComponent<V> {

        render() {
            const props = typeof this.getChildProps === "function" ? this.getChildProps() : undefined
            return React.createElement(template, props)
        }
    }

    return ContainerImplementation as any
}


export default Container
