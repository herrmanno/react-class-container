import * as React from "react"
import {Dispatch} from "redux"

/**
 * A Component which renderes a pre-defined template and provides props to this template
 *
 *
 * The ContainerComponent my overwrite some of React's lifecycle methods.
 * If your class extends ContainerComponent and overwrites some lifecycle methods remember to call {@code super()}
 */
abstract class ContainerComponent<V, P = any, S = any> extends React.PureComponent<P, S> {
    /**
     * @returns an object containig all fields marked as Prop
     */
    public abstract getChildProps(): V
}

export default ContainerComponent