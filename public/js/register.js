const user_input = document.querySelector('#userInp')
const user_error = document.querySelector('#userError')

user_input.onkeyup = () => {
  user_error.innerHTML = null
  let val = user_input.value
  let h5 = document.createElement('h5')
  if (val.length < 3) {
    h5.className = 'qiz'
    user_input.classList.add('inpQiz')
    h5.innerHTML = 'Juda qisqa!'
  } else if (val.length > 20) {
    h5.className = 'qiz'
    user_input.classList.add('inpQiz')
    h5.innerHTML = 'Juda uzun!'
  }

  if (val.replace(/[\s?[a-z]+\s?]/gi, '').length) {
    h5.className = 'qiz'
    user_input.classList.add('inpQiz')
    h5.innerHTML += "\nFaqat harf bo'lishi keark!"
  }

  if (h5.className) {
    user_error.append(h5)
    return
  }

  h5.className = 'yash'
  user_input.classList.remove('inpQiz')
  user_input.classList.add('inpYash')
  h5.innerHTML = 'Successes!'
  user_error.append(h5)
}
