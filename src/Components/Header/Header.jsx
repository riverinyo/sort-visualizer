import { Button } from 'react-bootstrap';

const Header = ({ running = false, onStart = () => undefined, onReset = () => undefined, onCancel = () => undefined, onSorterChange = () => undefined }) => {
  const sort_methods = ["Bubble", "Insertion", "Selection", "Merge", "Quick"]

  const handle_sort_change = sort_index => {
    onSorterChange(sort_methods[sort_index]);
  }
  const handleReset = () => onReset();
  const handleStart = () => onStart();
  const handleCancel = () => onCancel();
  const buildSorterButtons = () =>
    sort_methods.map((s, i) =>
      <Button key={i} onClick={() => handle_sort_change(i)}>{s}</Button>);

  return <header>
    <h1>{running ? "Running" : "Stopped"}</h1>
    <div>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={handleStart}>Start</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
    <div style={{ outline: `1px ${running ? "green" : "black"}` }}>{buildSorterButtons()}</div>
  </header>
}

export default Header;
