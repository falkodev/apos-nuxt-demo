export default function ({ app }) {
  const oldLogout = app.$auth.logout.bind(app.$auth)
  const oldLogin = app.$auth.login.bind(app.$auth)

  app.$auth.logout = (...args) => oldLogout(...args).then(() => app.$auth.redirect('logout'))
  app.$auth.login = (...args) => {
    const _ = oldLogin(...args)
    _.then(() => {
      app.$auth.redirect('home')
    })
    return _
  }
}
