import * as React from "react"
import { Store } from "redux"

/**
 * A Component which renderes a pre-defined template and provides own props and redux state to this template
 *
 *
 * The ReduxContainerComponent my overwrite React's lifecycle methods.
 * If a class extends ContainerComponent and overwrites some lifecycle methods it should call {@code super()}.
 */
interface ReduxContainerComponent<
  /** The props this container provides to its child template */
  V,
  R = any,
  /** The container's props */
  P = any,
  /** The container's state */
  S = any
  > extends React.Component<P, S> {
  readonly store: Store<R, any>

  readonly childProps: V

  readonly lastChildProps?: V

  /**
   * @returns an object containig all fields marked as Prop
   */
  getChildProps(props: P, state: S, reduxState: R): V
}

export default ReduxContainerComponent
