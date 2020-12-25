let timeoutId

export const notify = (message, timeout = 5) => (
  async dispatch => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => dispatch(clearMessage()), timeout * 1000)
    dispatch(setMessage(message))
  }
)

const setMessage = (message) => ({
  type: 'SETMESSAGE',
  data: message
})

const clearMessage = () => ({
  type: 'CLEAR'
})

const reducer = (state = '', action) => {
  switch (action.type) {

    case 'SETMESSAGE':
      return action.data

    case 'CLEAR':
      return ''

    default:
      return state
  }
}

export default reducer