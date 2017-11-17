import ReduxContainerComponent from "./ReduxContainerComponent"

/**
 * Represents  the class 'ReduxContainer' itself, as returned by the call to 'ReduxConainer(template)'
 */
interface ReduxContainerClass<R, P, S> {
    new(props?: P, context?: any): ReduxContainerComponent<R, P, S>
}

export default ReduxContainerClass