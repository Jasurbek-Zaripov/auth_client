let exit = document.querySelector('#exit')
let user_name_for = localStorage.getItem('user_name_for_check')
setInterval(() => {
  if (!localStorage.getItem('user_id_for_check')) {
    location = '/user/login'
  }
}, 1000)

setInterval(() => {
  localStorage.setItem('user_name_for_check', user_name_for)
}, 1500)

const div_welcome = document.querySelector('#welcome')
const salom = document.querySelector('#salom')

div_welcome.classList.add('modal-inner')

salom.innerHTML = `Welcome ${user_name_for}!`

div_welcome.onclick = () => {
  div_welcome.classList.remove('modal-inner')
}

exit.onclick = async () => {
  let result_online = await fetch(
    `https://auth0-server.herokuapp.com/user/exit`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: localStorage.getItem('user_name_for_check'),
        user_id: localStorage.getItem('user_id_for_check'),
      }),
    }
  )

  result_online = await result_online.json()

  if (result_online['ERROR']) {
    return alert(result_online['ERROR'])
  } else if (result_online['message']) {
    localStorage.removeItem('user_name_for_check')
    localStorage.removeItem('user_id_for_check')
    location = '/user/login'
  }
}

main_start()
async function main_start() {
  let users = await fetch('https://auth0-server.herokuapp.com/users')
  users = await users.json()

  if (users['ERROR']) {
    return alert(users['ERROR'])
  }

  const main_div_user = document.querySelector('#user-render')
  for (const userName in users) {
    let div = document.createElement('div')
    let a = document.createElement('a')
    div.className = 'anker'
    a.className = 'link'
    a.setAttribute('href', '#')
    a.innerHTML = userName

    a.onclick = () => {
      localStorage.setItem('user_name_for_search', userName)
      location = '/user/todo'
    }

    div.append(a)
    main_div_user.append(div)
  }
}
