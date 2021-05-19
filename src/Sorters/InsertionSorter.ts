import { VerticalBarSeriesPoint } from "react-vis";
import sleep from "../Utilities/utils";
import toVis from "./Transformer";

const insertionSorter = async (data: number[], setData: (d: VerticalBarSeriesPoint[]) => void, delay: number) => {

  for (let j = 0; j < data.length; j++) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] > data[i + 1]) {
        const aux = data[i];
        data[i] = data[i + 1];
        data[i + 1] = aux;
        setData(toVis({ data, activeIndexes: [i, i + 1] }));
        await sleep(delay);
      }
    }
  }
}

export default insertionSorter;