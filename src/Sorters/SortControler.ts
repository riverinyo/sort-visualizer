import sleep from "../Utilities/utils";

export const SortController = (generator: any) => {
  let running: boolean = true;

  interface Iintermediate { data: number[], activeIndexes: number[] }

  const start = async (data: number[], intermediate = ({ data, activeIndexes }: Iintermediate): any => undefined, delay: number = 250) => {
    let iter = generator(data);
    let next;
    while (!(next = iter.next()).done && running) {
      // transformer(...res.value)
      let { data = [], activeIndexes = [] } = next.value;
      intermediate({ data, activeIndexes })
      await sleep(delay);
    }
  }

  const stop = () => { running = false; }

  return { start, stop, generator }
}

export default SortController;