import * as Proptypes from "prop-types"
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
abstract class ReduxContainerComponent<V, R = any, P = any, S = any> extends ContainerComponent<V, P, S> {

    static contextTypes = {
        store: Proptypes.object.isRequired
    }

    /**
     * the redux store, if one is accessiable from the container
     */
    public get store(): Store<R> {
        return this.context.store
    }

}

export default ReduxContainerComponent