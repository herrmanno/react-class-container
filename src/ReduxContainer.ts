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
function ReduxContainer<P, S, V, R>(template: React.ComponentType<any>): ReduxContainerClass<P, S, V, R> {
    abstract class ContainerImplementation extends ReduxContainerComponent<V, R, P, S> {

        private readonly unsubscribe: Function

        constructor(props?: P, context?: any) {
            super(props, context)
            this.unsubscribe = this.store.subscribe(this.forceUpdate.bind(this))
        }

        componentWillUnmount() {
            this.unsubscribe()
        }

        render() {
            return React.createElement(template, this.getChildProps())
        }
    }

    return ContainerImplementation as any
}


export default ReduxContainer