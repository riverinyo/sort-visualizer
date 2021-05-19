import { VerticalBarSeriesPoint } from "react-vis";
import { transform } from "typescript";
import sleep from "../Utilities/utils";
import toVis from "./Transformer";

// export const bubbleSorter = (data: number[], setData: (d: VerticalBarSeriesPoint[]) => void, delay: number) => {
//   let should_run = true;
//   // const intermediate_return = (d) => toVis(d);
//   const start = async () => {
//     for (let j = 0; j < data.length; j++) {
//       for (let i = 0; should_run && i < data.length; i++) {
//         if (data[i] > data[i + 1]) {
//           const aux = data[i];
//           data[i] = data[i + 1];
//           data[i + 1] = aux;
//           setData(toVis({ data, activeIndexes: [i, i + 1] }));
//           await sleep(delay);
//         }
//       }
//     }
//   }
//   const stop = () => should_run = false;
//   return { start, stop }
// }

export const bubbleSort = () => {
  let running: boolean = true;

  const generator = function* (data: number[], transformer = ({ data, active_indexes }: { data: number[], active_indexes: number[] }): any => undefined) {
    const liNumbers: number[] = [...data];

    // yield initial state.
    yield ({ data: liNumbers, activeIndexes: [] });

    for (let j = 0; running && j < liNumbers.length; j++) {
      for (let i = 0; running && i < liNumbers.length; i++) {
        if (liNumbers[i] > liNumbers[i + 1]) {
          const aux = liNumbers[i];
          liNumbers[i] = liNumbers[i + 1];
          liNumbers[i + 1] = aux;
          yield ({ data: liNumbers, activeIndexes: [i, i + 1] });
        }
      }
    }
  }

  interface Iintermediate { data: number[], activeIndexes: number[] }

  const start = async (data: number[], intermediate = ({ data, activeIndexes }: Iintermediate): any => undefined) => {
    let iter = generator(data);
    let next;
    while (!(next = iter.next()).done && running) {
      // transformer(...res.value)
      let { data = [], activeIndexes = [] } = next.value;
      intermediate({ data, activeIndexes })
      await sleep(250);
    }
  }
  const stop = () => { running = false; }
  return { start, stop, generator }
}

export default bubbleSort;