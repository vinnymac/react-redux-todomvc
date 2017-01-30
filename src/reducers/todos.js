import { handleActions } from 'redux-actions'

const initialState = [
  {
    text: 'Use React and Redux',
    completed: false,
    id: 0,
  },
]

export default handleActions({
  ADD_TODO(state, { payload }) {
    return [
      {
        text: payload,
        completed: false,
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      },
      ...state,
    ]
  },
  DELETE_TODO(state, { payload }) {
    return state.filter(todo => todo.id !== payload)
  },
  EDIT_TODO(state, { payload }) {
    return state.map(todo => (
      todo.id === payload.id ? { ...todo, text: payload.text } : todo
    ))
  },
  COMPLETE_TODO(state, { payload }) {
    return state.map(todo => (
      todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
    ))
  },
  COMPLETE_ALL(state) {
    const areAllComplete = state.every(todo => todo.completed)
    return state.map(todo => ({ ...todo, completed: !areAllComplete }))
  },
  CLEAR_COMPLETED(state) {
    return state.filter(todo => todo.completed === false)
  },
}, initialState)
