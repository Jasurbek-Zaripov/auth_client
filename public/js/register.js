if (localStorage.getItem('user_name_for_check')) {
  location = '/'
  return
}
const user_input = document.querySelector('#userInp')
const user_error = document.querySelector('#userError')

user_input.onkeyup = () => {
  user_error.innerHTML = null
  let val = user_input.value
  let h5 = document.createElement('h5')

  if (val.length < 3) {
    h5.className = 'qiz'
    user_input.classList.remove('inpYash')
    user_input.classList.add('inpQiz')
    h5.innerHTML = 'Juda qisqa!'
  } else if (val.length > 20) {
    h5.className = 'qiz'
    user_input.classList.remove('inpYash')
    user_input.classList.add('inpQiz')
    h5.innerHTML = 'Juda uzun!'
  }

  if (val.replace(/[a-z]/gi, '').length) {
    h5.className = 'qiz'
    user_input.classList.remove('inpYash')
    user_input.classList.add('inpQiz')
    h5.innerHTML += "\nFaqat harf bo'lishi kerak!"
  }

  if (h5.className == 'qiz') {
    user_error.append(h5)
    return
  } else {
    h5.className = 'yash'
    user_input.classList.remove('inpQiz')
    user_input.classList.add('inpYash')
    h5.innerHTML = 'Successes!'
    user_error.append(h5)
  }
}

//////////////////////// password ///////////////////////
const pass_error = document.querySelector('#passwordError')
const pass_input = document.querySelector('#passwordInp')

pass_input.onkeyup = () => {
  pass_error.innerHTML = null
  let val = pass_input.value
  let h5 = document.createElement('h5')

  if (val.length < 4) {
    h5.className = 'qiz'
    pass_input.classList.remove('inpYash')
    pass_input.classList.add('inpQiz')
    h5.innerHTML = 'Juda sodda!'
  } else if (val.length > 12) {
    h5.className = 'qiz'
    pass_input.classList.remove('inpYash')
    pass_input.classList.add('inpQiz')
    h5.innerHTML = 'Essizdan chiqib ketadi!'
  }

  if (val.search(/[0-9]/g) == -1) {
    h5.className = 'qiz'
    pass_input.classList.remove('inpYash')
    pass_input.classList.add('inpQiz')
    h5.innerHTML += " \nRaqam bo'lishi shart!"
  }
  if (val.search(/[a-z]/g) == -1) {
    h5.className = 'qiz'
    pass_input.classList.remove('inpYash')
    pass_input.classList.add('inpQiz')
    h5.innerHTML += ' \nKichik harf qatnashishi shart!'
  }
  if (val.search(/[A-Z]/g) == -1) {
    h5.className = 'qiz'
    pass_input.classList.remove('inpYash')
    pass_input.classList.add('inpQiz')
    h5.innerHTML += ' \nKatta harf qatnashishi shart!'
  }
  if (val.search(/[!@#$%^&*()_+]/g) == -1) {
    h5.className = 'qiz'
    pass_input.classList.remove('inpYash')
    pass_input.classList.add('inpQiz')
    h5.innerHTML += ' \n!@#$%^&*()_+ shulardan biri qatnashishi shart!'
  }

  if (h5.className == 'qiz') {
    pass_error.append(h5)
    return
  } else {
    h5.className = 'yash'
    pass_input.classList.remove('inpQiz')
    pass_input.classList.add('inpYash')
    h5.innerHTML = 'Successes!'
    pass_error.append(h5)
  }
}

/////////////////////////// from data ///////////////////
const brith_inp = document.querySelector('#dataInp')
const brith_err = document.querySelector('#dataError')

brith_inp.onchange = () => {
  brith_err.innerHTML = null
  let h5 = document.createElement('h5')
  brith_inp.classList.remove('inpYash')
  brith_inp.classList.remove('inpQiz')

  let yil = brith_inp.value.split('-')[0]

  if (+yil > 2021 || +yil < 1900) {
    h5.className = 'qiz'
    h5.innerHTML = "Kritilgan yilingiz yoshingizga to'g'ri kelmaydi!"
    brith_inp.classList.remove('inpYash')
    brith_inp.classList.add('inpQiz')
    brith_err.append(h5)
  } else {
    h5.className = 'yash'
    h5.innerHTML = 'Successes!'
    brith_inp.classList.remove('inpQiz')
    brith_inp.classList.add('inpYash')
    brith_err.append(h5)
  }
}

const button_btn = document.querySelector('#regBtn')

setInterval(() => {
  let us = user_input.classList.contains('inpYash')
  let pass = pass_input.classList.contains('inpYash')
  let dat = brith_inp.classList.contains('inpYash')

  if (us && pass && dat) {
    button_btn.disabled = false
  } else {
    button_btn.disabled = true
  }
}, 1000)

button_btn.onclick = async () => {
  if (button_btn.disabled) return
  let username = user_input.value
  let password = pass_input.value
  let birth = brith_inp.value
  let select = document.querySelector('#gender_select')
  let gender = select.value

  let result = await fetch('http://192.168.0.37:5000/user/new', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(
      {
        username,
        password,
        birth,
        gender,
      },
      null,
      2
    ),
  })

  result = await result.json()
  if (result['ERROR']) {
    return alert(result['ERROR'])
  }
  localStorage.setItem('user_name_for_check', username)
  location = '/'
}
