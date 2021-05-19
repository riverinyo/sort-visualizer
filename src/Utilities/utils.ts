const sleep = (delay: number) => new Promise((resolve, _) => {
  setTimeout(() => { resolve(true) }, delay)
})

export default sleep;