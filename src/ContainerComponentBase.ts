import * as React from "react"
import ContainerComponent from "./ContainerComponent"

/**
 * @private
 * @hidden
 */
abstract class ContainerComponentBase<V, P = any, S = any>
  extends React.PureComponent<P, S>
  implements ContainerComponent<V, P, S> {
  public abstract getChildProps(): V
}

export default ContainerComponentBase
