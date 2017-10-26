import * as React from "react"
import * as Proptypes from "prop-types"
import {Dispatch} from "redux"
import ContainerClass from "./ContainerClass"

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
function Container<S = any, P = any>(template: React.ComponentType<any>): ContainerClass<P, S> {
    return class extends React.Component<P> {

        static contextTypes = {
            store: Proptypes.any
        }

        private unsubscribe?: Function

        private lastProps?: any = null

        propKeys: Array<keyof this> = this.propKeys || []

        constructor(props?: any, context?: any) {
            super(props, context)
            if (context.store) {
                this.unsubscribe = context.store.subscribe(this.mayUpdate.bind(this))
            }
        }

        componentWillUnmount() {
            if (typeof this.unsubscribe === "function") this.unsubscribe()
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
            return p1 !== p2
        }

        get store(): S {
            return this.context.store.getState()
        }

        get dispatch(): Dispatch<S> {
            return this.context.store.dispatch
        }

        private addProp(key: keyof this) {
            if (!this.propKeys) {
                this.propKeys = []
            }
            this.propKeys.push(key)
        }

        private getProps() {
            const props = this.propKeys.reduce((acc: any, key) => (acc[key] = this[key], acc), {})
            this.lastProps = props
            return props
        }

        render() {
            return React.createElement(template, this.getProps())
        }
    }
}


export default Container