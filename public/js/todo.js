let search_username = localStorage.getItem('user_name_for_search')
let my_name_local = localStorage.getItem('user_name_for_check')

if (!my_name_local) {
  location = '/user/login'
}

if (search_username) {
  localStorage.removeItem('user_name_for_search')
} else {
  search_username = my_name_local
}

let exit = document.querySelector('#exit')

exit.addEventListener('click', () => {
  localStorage.removeItem('user_name_for_check')
  location = '/user/login'
})

const h1_username = document.querySelector('.username')
h1_username.innerHTML = null
h1_username.innerHTML = search_username

let openn = document.querySelector('#open')
setInterval(() => {
  if (my_name_local != search_username) {
    openn.disabled = true
  } else {
    openn.disabled = false
  }
}, 1000)

let result
main_start()
async function main_start() {
  result = await fetch(
    `https://auth0-server.herokuapp.com/todo?username=${search_username}`
  )
  result = await result.json()
  if (result['ERROR']) {
    return alert(result['ERROR'])
  } else {
    render_todo()
  }
}

function render_todo() {
  let clear = document.querySelector('#close')
  let none = document.querySelector('.modal')

  clear.addEventListener('click', e => {
    main_start()
    none.classList.remove('block')
  })

  openn.addEventListener('click', e => {
    none.classList.add('block')
  })

  const todo_red = document.querySelector('#todoRed')
  const todo_yel = document.querySelector('#todoYel')
  const todo_gre = document.querySelector('#todoGre')
  todo_red.innerHTML = null
  todo_yel.innerHTML = null
  todo_gre.innerHTML = null
  let i = []
  for (const obj of result) {
    let div = document.createElement('div')
    let h4 = document.createElement('h4')
    let p = document.createElement('p')
    let select = document.createElement('select')
    let option1 = document.createElement('option')
    let option2 = document.createElement('option')
    let option3 = document.createElement('option')

    select.onchange = async eve => {
      console.log({
        username: my_name_local,
        todoID: div.id,
        holat: select.value,
      })
      let res_put = await fetch('https://auth0-server.herokuapp.com/todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: my_name_local,
          todoID: div.id,
          holat: select.value,
        }),
      })

      res_put = await res_put.json()
      if (res_put['ERROR']) {
        return alert(res_put['ERROR'])
      } else {
        main_start()
        return
      }
    }

    option1.setAttribute('value', 'qizil')
    option2.setAttribute('value', 'sariq')
    option3.setAttribute('value', 'yashil')

    option1.innerHTML = 'TODO'
    option2.innerHTML = 'DOING'
    option3.innerHTML = 'DONE'

    select.className = 'select'
    select.append(option1, option2, option3)

    p.innerHTML = obj['todo']
    h4.innerHTML = obj['title'] + ' [' + obj['time'] + ']'

    div.append(h4, p, select)
    div.classList.add('apend')

    if (obj['holat'] == 'qizil') {
      option1.setAttribute('selected', 'selected')
      div.classList.add('todo-qizil')
      todo_red.append(div)
    } else if (obj['holat'] == 'sariq') {
      option2.setAttribute('selected', 'selected')
      div.classList.add('todo-sariq')
      todo_yel.append(div)
    } else if (obj['holat'] == 'yashil') {
      option3.setAttribute('selected', 'selected')
      div.classList.add('todo-yashil')
      todo_gre.append(div)
    }
    i.push(div)
    div.id = i.length - 1
  }
  get_new_todo()
}

function get_new_todo() {
  const new_error = document.querySelector('#newTodoError')
  const new_inp = document.querySelector('input')
  const new_text = document.querySelector('textarea')
  const new_btn = document.querySelector('#save')

  new_inp.onkeyup = () => {
    let val = new_inp.value
    new_error.innerHTML = ''
    if (val.length < 5) {
      new_error.innerHTML += ' Title juda qisqa! '
      new_error.style.color = 'red'
    } else if (val.length > 25) {
      new_error.innerHTML += ' Title juda uzun! '
      new_error.style.color = 'red'
    }
  }

  new_text.onkeyup = () => {
    let val = new_text.value
    new_error.innerHTML = ''
    if (val.length < 5) {
      new_error.innerHTML += ' Text juda qisqa! '
      new_error.style.color = 'red'
    } else if (val.length > 80) {
      new_error.innerHTML += ' Text juda uzun! '
      new_error.style.color = 'red'
    }
  }
  setInterval(() => {
    if (!new_error.innerHTML) {
      new_btn.disabled = false
    } else {
      new_btn.disabled = true
    }
  }, 1000)

  new_btn.onclick = async () => {
    let res_ult = await fetch('https://auth0-server.herokuapp.com/todo/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: my_name_local,
        title: new_inp.value,
        todo: new_text.value,
      }),
    })

    if (res_ult['ERROR']) {
      return alert(res_ult['ERROR'])
    } else {
      new_inp.value = ''
      new_text.value = ''
    }
  }
}
