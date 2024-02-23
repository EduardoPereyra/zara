// a little function to help us with reordering the result
export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function reorderProductMapProducts(productMap, source, destination) {
  const newProductMapList = [...productMap];
  const sourceGroup = newProductMapList.find(
    (group) => group.id === source.droppableId
  );
  const destinationGroup = newProductMapList.find(
    (group) => group.id === destination.droppableId
  );
  if (destinationGroup.products.length >= 3) {
    return newProductMapList;
  }
  const [movedProduct] = sourceGroup.products.splice(source.index, 1);
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
