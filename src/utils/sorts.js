export const mapOrder = (originalArray, itemOrderIds, key) => {
  if (!originalArray || !itemOrderIds || !key) return []
  return [...originalArray].sort((a, b) => itemOrderIds.indexOf(a[key]) - itemOrderIds.indexOf(b[key]))
}

// function arrayMove(array, from, to) {
//   const newArray = array.slice();
//   newArray.splice(
//     to < 0 ? newArray.length + to : to,
//     0,
//     newArray.splice(from, 1)[0]
//   );
//   return newArray;
// }
