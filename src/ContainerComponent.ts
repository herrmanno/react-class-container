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
     * the state of the redux store, if one is accessiable from the container
     */
    store?: S

    /**
     * the redux store's dispatch method, if one is accessiable from the container
     */
    dispatch?: Dispatch<S>

    /**
     * didStateChanged will be called by the container to decide if the props it provides have been changed
     *
     * @param oldStateProps the last rendered childProps of the container
     * @param newStateProps the newly available childProps of the container
     * @returns true if the arguments are in a way different, that indicates that the container should rerender, otherwise false
     */
    didStateChanged?<T>(oldStateProps: T, newStateProps: T): boolean

    /**
     * will be called by {@see didStateChanged}
     *
     * @param oldStateProps a single prop at the time of last rendering
     * @param newStateProps the same prop at current time
     * @returns true if the two arguments differ in a way, that indicates that the container should rerender, otherwise false
     */
    didPropChange?(oldProp: any, newProp: any): boolean
}

export default ContainerComponent