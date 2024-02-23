// a little function to help us with reordering the result
export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default reorder;

export function reorderProductMap(productMap, source, destination) {
  const newProductMapList = [...productMap];
  // Find the source and destination groups
  const sourceGroup = newProductMapList.find(
    (group) => group.id === source.droppableId
  );
  const destinationGroup = newProductMapList.find(
    (group) => group.id === destination.droppableId
  );
  // Check if the destination group already has the maximum allowed items (in this case, 3)
  if (destinationGroup.products.length >= 3) {
    return newProductMapList; // Return the original list without making any changes
  }
  // Remove the product from the source group
  const [movedProduct] = sourceGroup.products.splice(source.index, 1);

  // Insert the product into the destination group at the specified index
  destinationGroup.products.splice(destination.index, 0, movedProduct);

  return newProductMapList;
}

export function reorderProductMapList(
  productMap,
  sourceIndex,
  destinationIndex
) {
  const newList = [...productMap];
  const [movedList] = newList.splice(sourceIndex, 1);
  newList.splice(destinationIndex, 0, movedList);
  return newList;
}

export function moveBetween({ list1, list2, source, destination }) {
  const newFirst = Array.from(list1.values);
  const newSecond = Array.from(list2.values);

  const moveFrom = source.droppableId === list1.id ? newFirst : newSecond;
  const moveTo = moveFrom === newFirst ? newSecond : newFirst;

  const [moved] = moveFrom.splice(source.index, 1);
  moveTo.splice(destination.index, 0, moved);

  return {
    list1: {
      ...list1,
      values: newFirst,
    },
    list2: {
      ...list2,
      values: newSecond,
    },
  };
}
