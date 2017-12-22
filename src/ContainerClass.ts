import ContainerComponent from "./ContainerComponent"

/**
 * Represents  the class 'Container' itself, as returned by the call to 'Conainer(template)'
 */
interface ContainerClass<P, S, V> {
    new(props?: P, context?: any): ContainerComponent<V, P, S>
}

export default ContainerClass