import ContainerComponent from "./ContainerComponent"

/**
 * Represents the class 'Container' itself, as returned by the call to 'Conainer(template)'
 */
interface ContainerClass<V> {
  new <P = {}, S = {}>(props?: P, context?: any): ContainerComponent<V, P, S>
}

export default ContainerClass
