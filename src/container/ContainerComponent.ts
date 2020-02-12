import * as React from "react"

/**
 * A Component which renderes a pre-defined template and provides props to this template
 *
 * The ContainerComponent my overwrite React's lifecycle methods.
 */
interface ContainerComponent<
  /** The props this container provides to its child template */
  V,
  /** The container's props */
  P = any,
  /** The container's state */
  S = any
  > extends React.Component<P, S> {
  readonly childProps: V

  readonly lastChildProps?: V

  /**
   * @returns an object containig all fields marked as Prop
   */
  getChildProps(props: P, state: S): V
}
export default ContainerComponent
