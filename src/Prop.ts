import ContainerComponent from "./ContainerComponent"

/**
 * Marks a property (field, getter or method) as container property
 *
 * @param target the container - will be provided automatically if applied as decorator
 * @param key the field or method name - will be provided automatically if applied as decorator
 */
function Prop(target: ContainerComponent<any, any>, key: string) {
    (target as any).addProp(key)
}

export default Prop