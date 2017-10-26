import ContainerComponent from "./ContainerComponent"

/**
 * Represents  the class 'Container' itself, as returned by the call to 'Conainer(template)'
 */
interface ContainerClass<P, S> {
    new(props?: P, context?: any): ContainerComponent<P, S>
}

export default ContainerClass