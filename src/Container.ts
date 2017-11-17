import * as React from "react"
import * as Proptypes from "prop-types"
import {Dispatch, Store} from "redux"
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
function Container<P = any, S = any>(template: React.ComponentType<any>): ContainerClass<P, S> {
    return class extends React.Component<P> {

        public propKeys: Array<keyof this> = this.propKeys || []

        protected addProp(key: keyof this) {
            if (!this.propKeys) {
                this.propKeys = []
            }
            this.propKeys.push(key)
        }

        getProps() {
            return this.propKeys.reduce((acc: any, key) => (acc[key] = this[key], acc), {})
        }

        getPropValue(key: keyof this) {
            if (typeof this[key] === "function") {
                return (<Function>this[key]).bind(this)
            } else {
                return this[key]
            }
        }

        render() {
            return React.createElement(template, this.getProps())
        }
    }
}


export default Container