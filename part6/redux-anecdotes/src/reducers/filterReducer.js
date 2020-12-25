export const createFilter = (string) => ({
  type: 'NEWFILTER',
  data: string
})

const reducer = (state = '', action) => {
  switch (action.type) {

    case 'NEWFILTER':
      return action.data
      
    default:
      return state
  }
}

export default reducer