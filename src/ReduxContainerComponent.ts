import * as React from "react"
import {Dispatch, Store} from "redux"
import ContainerComponent from "./ContainerComponent"

/**
 * A Component which renderes a pre-defined template and provides own props and redux state to this template
 *
 *
 * The ReduxContainerComponent my overwrite some of React's lifecycle methods.
 * If your class extends ContainerComponent and overwrites some lifecycle methods remember to call {@code super()}
 */
interface ReduxContainerComponent<R = any, P = any, S = any> extends ContainerComponent<P, S> {
    /**
     * the redux store, if one is accessiable from the container
     */
    store: Store<R>

    /**
     * the redux store's dispatch method, if one is accessiable from the container
     */
    dispatch: Dispatch<R>

    /**
     * @returns the state of the redux store, if one is accessiable from the container
     */
    getState(): R

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

export default ReduxContainerComponent