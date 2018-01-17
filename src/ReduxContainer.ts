import * as React from "react"
import * as Proptypes from "prop-types"
import {Dispatch, Store} from "redux"
import Container from "./Container"
import ReduxContainerClass from "./ReduxContainerClass"
import ReduxContainerComponent from "./ReduxContainerComponent"

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
function ReduxContainer<V>(template: React.ComponentType<V>): ReduxContainerClass<V> {
    abstract class ContainerImplementation extends ReduxContainerComponent<V> {

        render() {
            return React.createElement(template, this.getChildProps())
        }
    }

    return ContainerImplementation as any
}


export default ReduxContainer