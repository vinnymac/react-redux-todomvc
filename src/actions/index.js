import { createAction } from 'redux-actions'

export default {
  addTodo: createAction('ADD_TODO'),
  deleteTodo: createAction('DELETE_TODO'),
  editTodo: createAction('EDIT_TODO'),
  completeTodo: createAction('COMPLETE_TODO'),
  completeAll: createAction('COMPLETE_ALL'),
  clearCompleted: createAction('CLEAR_COMPLETED'),
}
