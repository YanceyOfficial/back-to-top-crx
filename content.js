const scrollToTop = () => {
  let timer = 0
  cancelAnimationFrame(timer)
  const startTime = +new Date()
  const b = document.body.scrollTop || document.documentElement.scrollTop
  const d = 500
  const c = b
  timer = requestAnimationFrame(function func() {
    const t = d - Math.max(0, startTime - +new Date() + d)
    document.documentElement.scrollTop = document.body.scrollTop =
      (t * -c) / d + b
    timer = requestAnimationFrame(func)
    if (t === d) {
      cancelAnimationFrame(timer)
    }
  })
}

const initialBackToTopBtn = () => {
  const $el = document.createElement('div')
  $el.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 455.111 455.111" xml:space="preserve"><path d="M406.756 455.111h-358.4C21.333 455.111 0 433.778 0 406.756v-358.4C0 21.333 21.333 0 48.356 0h358.4c27.022 0 48.356 21.333 48.356 48.356v358.4c-.001 27.022-21.334 48.355-48.356 48.355z" fill="#d34178"/><path d="M366.933 0c-17.067 73.956-61.156 153.6-129.422 221.867C164.978 294.4 78.222 339.911 0 354.133V48.356C0 21.333 21.333 0 48.356 0h318.577z" fill="#e84e89"/><g fill="#fff"><path d="M287.289 174.933H268.8v71.111c0 7.111-5.689 12.8-12.8 12.8h-56.889c-7.111 0-12.8-5.689-12.8-12.8v-71.111h-18.489c-9.956 0-15.644-11.378-9.956-19.911L217.6 75.378c5.689-7.111 15.644-7.111 19.911 0l59.733 79.644c5.689 8.534 0 19.911-9.955 19.911zM136.533 304.356v78.222h-22.756v-78.222H86.756v-18.489h76.8v18.489h-27.023zM258.844 369.778C248.889 379.733 237.511 384 221.867 384c-14.222 0-27.022-4.267-36.978-14.222-9.956-9.956-14.222-21.333-14.222-35.556s4.267-25.6 14.222-35.556 21.333-14.222 36.978-14.222c14.222 0 27.022 4.267 36.978 14.222s14.222 21.333 14.222 35.556-4.267 25.6-14.223 35.556zm-8.533-35.556c0-8.533-2.844-15.644-8.533-22.756-5.689-5.689-12.8-8.533-19.911-8.533-8.533 0-15.644 2.844-19.911 8.533-5.689 5.689-8.533 12.8-8.533 22.756 0 8.533 2.844 15.644 8.533 22.756 5.689 5.689 12.8 8.533 19.911 8.533 8.533 0 15.644-2.844 19.911-8.533 5.689-7.111 8.533-14.222 8.533-22.756zM358.4 294.4c7.111 5.689 9.956 14.222 9.956 27.022 0 11.378-2.844 21.333-9.956 27.022-7.111 5.689-17.067 8.533-32.711 8.533h-12.8V384h-21.333v-96.711h34.133c15.644-1.422 25.6 1.422 32.711 7.111zm-15.644 38.4c2.844-2.844 4.267-7.111 4.267-12.8s-1.422-9.956-5.689-11.378c-2.844-2.844-8.533-2.844-15.644-2.844h-12.8v32.711h14.222c7.11-1.422 12.799-2.845 15.644-5.689z"/></g></svg>`
  $el.classList.add('crx-back-to-top')
  const top = document.body.scrollTop || document.documentElement.scrollTop
  if (top < 800) $el.classList.add('crx-back-to-top-hidden')
  document.body.appendChild($el)

  const scrollHandler = () => {
    const top = document.body.scrollTop || document.documentElement.scrollTop
    if (top < 800) {
      $el.classList.add('crx-back-to-top-hidden')
    } else {
      $el.classList.remove('crx-back-to-top-hidden')
    }
  }

  window.addEventListener('scroll', scrollHandler, false)

  $el.addEventListener('click', () => {
    scrollToTop()
  })
}

const needShowBtn = (allowList) => {
  const url = window.location.href
  const needShow = allowList.some((rule) => {
    if (/^\*\./.test(rule)) {
      return url.includes(rule.replace('*.', ''))
    }
    return url.includes(rule)
  })

  return needShow
}

chrome.runtime.sendMessage('preflight', (response) => {
  if (!response) return

  const needShow = needShowBtn(response)
  if (needShow) {
    initialBackToTopBtn()
  }
})
