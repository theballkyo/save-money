const getItem = (key, defaultValue = undefined) => {
  const value = window.localStorage.getItem(key)
  try {
    return value && value !== 'undefined' ? JSON.parse(value) : defaultValue
  } catch (err) {
    return value
  }
}

export default {
  getItem
}
