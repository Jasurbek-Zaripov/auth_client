let exit = document.querySelector('#exit')

if (!localStorage.getItem('user_name_for_check')) {
  location = '/user/login'
}

const div_welcome = document.querySelector('#welcome')
div_welcome.classList.add('modal-inner')
const salom = document.querySelector('#salom')
salom.innerHTML = `Welcome ${localStorage.getItem('user_name_for_check')}!`
div_welcome.onclick = () => {
  div_welcome.classList.remove('modal-inner')
}

exit.addEventListener('click', async () => {
  let result_online = await fetch(
    `https://auth0-server.herokuapp.com/user/exit?username=${localStorage.getItem(
      'user_name_for_check'
    )}`,
    {
      method: 'PUT',
    }
  )
  result_online = await result_online.json()
  console.log(result_online)
  if (result_online['ERROR']) {
    return alert(result_online['ERROR'])
  } else {
    console.log(result_online['message'])
    localStorage.removeItem('user_name_for_check')
    location = '/user/login'
  }
})

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
