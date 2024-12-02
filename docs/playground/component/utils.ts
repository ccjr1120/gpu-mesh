export const _throttle = (func: () => void, wait: number) => {
  let timeout: null | NodeJS.Timeout = null
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func()
      timeout = null
    }, wait)
  }
}
