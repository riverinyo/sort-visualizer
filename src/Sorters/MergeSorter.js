import sleep from "../Utilities/utils";

export const mergeSort = () => {
  let running = true;

  const sortGenerator = function* (initalData) {
    let liNumbers = [...initalData];

    yield { data: liNumbers, activeIndexes: [] };

    const mergeSortGen = function* (li, l = 0, r = li.length - 1) {
      if (l < r) {
        let midIdx = l + parseInt((r - l) / 2);

        yield* mergeSortGen(li, l, midIdx);
        yield* mergeSortGen(li, midIdx + 1, r);
        yield* sortGen(li, l, midIdx, r);
      }
    }

    const sortGen = function* (li, l, m, r) {
      let lIdx = l, rIdx = m + 1;
      let newSortedArr = [];
      while (lIdx <= m && rIdx <= r) {
        yield { data: li, activeIndexes: [lIdx, rIdx] };
        if (li[lIdx] < li[rIdx]) {
          newSortedArr.push(li[lIdx]);
          lIdx++;
        } else {
          newSortedArr.push(li[rIdx]);
          rIdx++;
        }
      }

      while (lIdx <= m) {
        yield { data: li, activeIndexes: [lIdx] };
        newSortedArr.push(li[lIdx]);
        lIdx++;
      }

      while (rIdx <= r) {
        yield { data: li, activeIndexes: [rIdx] };
        newSortedArr.push(li[rIdx]);
        rIdx++;
      }

      const num_range = (l, r) => Array.from({ length: r - l + 1 }, (_, i) => l + i)

      li.splice(l, newSortedArr.length, ...newSortedArr);
      let liIndexes = num_range(l, r);

      yield { data: li, activeIndexes: liIndexes };
    }

    yield* mergeSortGen(liNumbers);

    yield { data: liNumbers };
  }

  const start = async (data, intermediate = ({ data, activeIndexes }) => undefined, delay = 250) => {
    let iter = sortGenerator(data);
    let next;
    while (!(next = iter.next()).done && running) {
      let { data = [], activeIndexes = [] } = next.value;
      intermediate({ data, activeIndexes })
      await sleep(delay);
    }
  }
  const stop = () => { running = false; }
  return { start, stop, generator: sortGenerator }
}

export default mergeSort;

