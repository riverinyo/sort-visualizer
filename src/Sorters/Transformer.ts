
const colors = {
  active: 0,
  inactive: 1,
}

const toVis = ({ data = [], activeIndexes = [] }: { data: number[], activeIndexes: number[] }) => {
  return data.map((el, i) => {
    return {
      x: i,
      y: el,
      color: (activeIndexes.includes(i)
        ? colors.active
        : colors.inactive)
    }
  })
}

export default toVis;