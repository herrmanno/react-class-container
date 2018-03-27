import * as React from "react"

/**
 * A Component which renderes a pre-defined template and provides props to this template
 *
 * The ContainerComponent my overwrite some of React's lifecycle methods.
 */
interface ContainerComponent<
  /** The props this container provides to its child template */
  V,
  /** The container's props */
  P = any,
  /** The container's state */
  S = any
> extends React.PureComponent<P, S> {
  /**
   * @returns an object containig all fields marked as Prop
   */
  getChildProps(): V
}

export default ContainerComponent
