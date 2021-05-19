import '../../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries } from 'react-vis';


interface IGrahpProps {
  input: []
  // sorter:
}

const Graph = ({ input }: IGrahpProps) => {
  return <XYPlot className="container" height={300} width={300}>
    <VerticalBarSeries
      barWidth={1}
      colorType='category'
      colorDomain={[0, 1, 2]}
      colorRange={['yellow', 'blue', 'red']}
      data={input} />
  </XYPlot>;
}

export default Graph;