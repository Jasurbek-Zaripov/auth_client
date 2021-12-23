if (
  localStorage.getItem('user_name_for_check') ||
  localStorage.getItem('user_id_for_check')
) {
  location = '/'
}

const login_btn = document.querySelector('#submit-btn')
const login_user = document.querySelector('#userInp')
const login_user_err = document.querySelector('#userError')
const login_pass = document.querySelector('#passwordInp')
const login_pass_err = document.querySelector('#passwordError')

login_btn.onclick = async () => {
  let user_bool = false,
    pass_bool = false

  login_user_err.innerHTML = null
  login_pass_err.innerHTML = null

  login_user.classList.remove('inpQiz')
  login_user.classList.remove('inpYash')
  login_pass.classList.remove('inpQiz')
  login_pass.classList.remove('inpYash')

  let user_val = login_user.value
  let pass_val = login_pass.value

  let h51 = document.createElement('h5')
  let h5 = document.createElement('h5')

  if (!user_val.length) {
    h51.className = 'qiz'
    h51.innerHTML = 'Ismingizni kriting!'
    login_user.classList.add('inpQiz')
    login_user_err.append(h51)
  }
  if (!pass_val.length) {
    h5.className = 'qiz'
    h5.innerHTML = 'passwordni kriting!'
    login_pass.classList.add('inpQiz')
    login_pass_err.append(h5)
  }
  if (h51.className != 'qiz') {
    login_user.classList.add('inpYash')
    login_user.classList.remove('inpQiz')
    h51.className = 'yash'
    h51.innerHTML = 'soccesses!'
    login_user_err.append(h51)
    user_bool = true
  }
  if (h5.className != 'qiz') {
    login_pass.classList.add('inpYash')
    login_pass.classList.remove('inpQiz')
    h5.className = 'yash'
    h5.innerHTML = 'soccesses!'
    login_pass_err.append(h5)
    pass_bool = true
  }

  if (user_bool && pass_bool) {
    let result = await fetch('http://localhost:3000/user/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user_val,
        password: pass_val,
      }),
    })

    result = await result.json()

    if (result['ERROR']) {
      return alert(result['ERROR'])
    } else if (result['message']) {
      localStorage.setItem('user_name_for_check', user_val)
      localStorage.setItem('user_id_for_check', result['message'])
      location = '/'
    }
  }
}
