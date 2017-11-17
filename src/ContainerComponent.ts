import * as React from "react"
import {Dispatch} from "redux"

/**
 * A Component which renderes a pre-defined template and provides props to this template
 *
 *
 * The ContainerComponent my overwrite some of React's lifecycle methods.
 * If your class extends ContainerComponent and overwrites some lifecycle methods remember to call {@code super()}
 */
interface ContainerComponent<P = any, S = any> extends React.Component<P> {
    /**
     * Keys of the container's fields and methods which should by provided to its template
     *
     * One can omit to provide this field manually if using {@see Prop}
     */
    propKeys?: Array<string|symbol>

    /**
     * Called to get the value of an field marked as Prop
     */
    getPropValue?(key: keyof this): any

    /**
     * @returns an object containig all fields marked as Prop
     */
    getProps(): any
}

export default ContainerComponent