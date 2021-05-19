import { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header/Header';
import Graph from './Components/Graph/Graph';
import toVis from './Sorters/Transformer';
import Sorters from './Sorters'
const randomArray = length => Array.from({ length }, () => Math.round(Math.random() * length))

function App() {
  const [settings, setSettings] = useState({ length: 10 })

  const [list, setList] = useState(randomArray(settings.length))
  const [data, setData] = useState([])
  const [sorter, setSorter] = useState("bubble")
  const [running, setRunning] = useState(false);
  const stopRef = useRef(() => undefined)

  useEffect(() => {
    //console.log(list)
    setData(toVis(list, []))
  }, [list])

  const handleReset = () => setData(toVis(list));

  const handleStart = async () => {
    const { start, stop } = Sorters[`${sorter.toLowerCase()}Sort`]();
    start(list, ({ data, activeIndexes }) => {
      const graphData = toVis({ data, activeIndexes })
      setData(graphData)
    })
    stopRef.current = stop;
    setRunning(true);
  }

  const handleCancel = () => {
    stopRef.current();
    setRunning(false);
  }

  const handleChangeSorter = (sorter) => {
    setSorter(sorter)
    stopRef.current = () => undefined
  }

  return (
    <div className="App">
      <Header onSorterChange={handleChangeSorter} onStart={handleStart} onReset={handleReset} onCancel={handleCancel} running={running} />
      <Graph input={data} />
    </div>
  );
}

export default App;
