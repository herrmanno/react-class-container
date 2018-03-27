import * as React from "react"
import * as Proptypes from "prop-types"
import { Store } from "redux"
import ContainerComponentBase from "../ContainerComponentBase"

/**
 * A Component which renderes a pre-defined template and provides own props and redux state to this template
 *
 *
 * The ReduxContainerComponent my overwrite React's lifecycle methods.
 * If a class extends ContainerComponent and overwrites some lifecycle methods it should call {@code super()}.
 */
abstract class ReduxContainerComponent<
  /** The props this container provides to its child template */
  V,
  /** The shape of the state hold by redux */
  R = any,
  /** The container's props */
  P = {},
  /** The container's state */
  S = {}
> extends ContainerComponentBase<V, P, S> {
  static contextTypes = {
    store: Proptypes.object.isRequired
  }

  private readonly unsubscribe: Function

  private lastReduxState = this.getReduxSubState(this.store.getState())

  constructor(props?: any, context?: any) {
    super(props, context)
    this.unsubscribe = this.store.subscribe(this.updateReduxState.bind(this))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  /**
   * Filters the redux state and returns the parts the container is interested in
   * @param reduxState the redux store's state object
   * @returns an object containing the parts of the reduxState the container is interested in
   * or undefined if the redux state should not be filtered
   */
  public componentWillReceiveReduxState(reduxState: R): any | undefined {
    return reduxState
  }

  /**
   * the redux store, if one is accessiable from the container
   */
  public get store(): Store<R> {
    return this.context.store
  }

  private updateReduxState() {
    const state = this.store.getState()
    const reduxState = this.getReduxSubState(state)
    if (reduxState !== this.lastReduxState) {
      this.forceUpdate()
    } else if (
      Object.keys(this.lastReduxState || {}).some(
        key => (this.lastReduxState || {})[key] !== (reduxState || {})[key]
      )
    ) {
      this.forceUpdate()
    }
    this.lastReduxState = reduxState
  }

  private getReduxSubState(state: R): any {
    const componentReduxSubsate = this.componentWillReceiveReduxState(state)
    return undefined !== componentReduxSubsate ? componentReduxSubsate : state
  }
}

export default ReduxContainerComponent
