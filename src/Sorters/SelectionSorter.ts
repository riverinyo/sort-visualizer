


const selectionSort = function* (data: number[], transformer = ({ data, active_indexes }: { data: number[], active_indexes: number[] }): any => undefined) {
  const liNumbers: number[] = [...data];

  // yield initial state.
  yield ({ data: liNumbers, activeIndexes: [] });

  for (let i = 0; i < liNumbers.length; i++) {
    let idx_min = liNumbers.length - 1;
    for (let j = i; j < liNumbers.length; j++) {
      yield ({ data: liNumbers, activeIndexes: [i, j] }) // current iteration indexes
      if (liNumbers[idx_min] > liNumbers[j]) {
        idx_min = j;
      }
    }
    if (liNumbers[i] > liNumbers[idx_min]) {
      const aux = liNumbers[i]
      liNumbers[i] = liNumbers[idx_min];
      liNumbers[idx_min] = aux;
      // yield({data: liNumbers, active_indexes: [i, ]})
    }
  }
}


export default selectionSort;