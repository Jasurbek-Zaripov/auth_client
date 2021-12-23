let exit = document.querySelector('#exit')

exit.addEventListener('click', () => {
  localStorage.removeItem('user_name_for_check')
  location = '/user/login'
})
