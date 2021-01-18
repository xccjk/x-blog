export default () => {
  const ele = document.createElement('h2')
  ele.textContent = 'xcc'
  ele.addEventListener('click', () => {
    alert('hello xcc')
  })
  return ele
}