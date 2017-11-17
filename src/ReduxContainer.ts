import * as React from "react"
import * as Proptypes from "prop-types"
import {Dispatch, Store} from "redux"
import Container from "./Container"
import ReduxContainerClass from "./ReduxContainerClass"

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
function ReduxContainer<R = any, P = any, S = any>(template: React.ComponentType<any>): ReduxContainerClass<R, P, S> {
    return class extends Container<P, S>(template) {

        static contextTypes = {
            store: Proptypes.any
        }

        private unsubscribe?: Function

        private lastProps?: any = null

        public context: {
            store: Store<R>
        }

        constructor(props?: any, context?: any) {
            super(props, context)
            if (context.store) {
                this.unsubscribe = context.store.subscribe(this.mayUpdate.bind(this))
            }
        }

        componentWillUnmount() {
            if (typeof this.unsubscribe === "function") this.unsubscribe()
        }

        get store(): Store<R> {
            return this.context.store
        }

        get getState(): () => R {
            return this.context.store.getState
        }

        get dispatch(): Dispatch<R> {
            return this.context.store.dispatch
        }

        public getProps() {
            const props = super.getProps()
            this.lastProps = props
            return props
        }

        private mayUpdate(): void {
            const lastProps = this.lastProps
            const newProps = this.getProps()
            if (this.didStateChanged(lastProps, newProps)) {
                this.forceUpdate()
            }

        }

        didStateChanged(p1: any, p2: any): boolean {
            return Object.keys(p1).some(key => this.didPropChange(p1[key], p2[key]))
        }

        didPropChange(p1: any, p2: any): boolean {
            if (typeof p1 === "function" && typeof p2 === "function") {
                return false
            } else {
                return p1 !== p2
            }
        }
    }
}


export default ReduxContainer