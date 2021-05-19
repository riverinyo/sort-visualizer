import { VerticalBarSeriesPoint } from "react-vis";
import sleep from "../Utilities/utils";
import toVis from "./Transformer";


function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

export const quickSort = () => {
  let running = true;

  const generator = function* (initialData) {
    let liNumbers = [...initialData]

    yield { data: liNumbers, activeIndexes: [] };

    function* partition(items, left, right) {
      var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
      while (i <= j) {
        yield ({ data: items, activeIndexes: [i, j] })
        while (items[i] < pivot) {
          i++;
          yield ({ data: items, activeIndexes: [i, j] })
        }
        while (items[j] > pivot) {
          j--;
          yield ({ data: items, activeIndexes: [i, j] })
        }
        if (i <= j) {
          yield ({ data: items, activeIndexes: [i, j] })
          swap(items, i, j); //sawpping two elements
          yield ({ data: items, activeIndexes: [i, j] })
          i++;
          j--;
        }
      }
      return i;
    }

    function* quickSortGenerator(items, left, right) {
      //let index;
      console.log("qsg", items, left, right)
      if (items.length > 1) {
        const index = yield* partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
          yield* quickSortGenerator(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
          yield* quickSortGenerator(items, index, right);
        }
      }
      return items;
    }

    yield* quickSortGenerator(liNumbers, 0, liNumbers.length - 1);

    yield { data: liNumbers };
  }

  const start = async (data, intermediate = ({ data, activeIndexes }) => undefined, delay = 250) => {
    let iter = generator(data);
    let next;
    while (!(next = iter.next()).done && running) {
      let { data = [], activeIndexes = [] } = next.value;
      intermediate({ data, activeIndexes })
      await sleep(delay);
    }
  }
  const stop = () => { running = false; }
  return { start, stop, generator }
}

export default quickSort;
