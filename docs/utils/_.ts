export function _separatedCase(name: string, separator: string = '-') {
  return name.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase()
}
export function _kebabCaseToDisplayName(name: string) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replaceAll('Gpu', 'GPU')
}
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
