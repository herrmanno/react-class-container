import ReduxContainerComponent from "./ReduxContainerComponent"

/**
 * Represents  the class 'ReduxContainer' itself, as returned by the call to 'ReduxConainer(template)'
 */
interface ReduxContainerClass<P, S, V, R> {
    new(props?: P, context?: any): ReduxContainerComponent<V, R, P, S>
}

export default ReduxContainerClass