/* istanbul ignore next */
export const getAllParents = (element: HTMLElement): readonly Node[] => {
  const mutableParents: Node[] = []
  let currentNode: Node | null = element

  while (currentNode) {
    currentNode !== element && mutableParents.push(currentNode)
    currentNode = currentNode.parentNode
  }

  return mutableParents
}
