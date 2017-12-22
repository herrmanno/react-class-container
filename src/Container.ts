import * as React from "react"
import * as Proptypes from "prop-types"
import {Dispatch, Store} from "redux"
import ContainerClass from "./ContainerClass"
import ContainerComponent from "./ContainerComponent"

/**
 * @param template a (probably presentational) Component to render
 * @returns a new ContainerClass
 *
 * @example
 * ```typescript
 * let Foo = props => <span>{prop.name}</span>
 * class FooContainer extensd Container(Foo) {
 *   @Prop get name() {
 *     return "what ever you like here"
 *   }
 * }
 * ```
 */
function Container<P, S, V>(template: React.ComponentType<V>): ContainerClass<P, S, V> {
    abstract class ContainerImplementation extends ContainerComponent<V, P, S> {

        render() {
            return React.createElement(template, this.getChildProps())
        }
    }

    return ContainerImplementation as any
}


export default Container