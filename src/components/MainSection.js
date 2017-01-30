import React, { PropTypes, Component } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: todo => !todo.completed,
  SHOW_COMPLETED: todo => todo.completed,
}

const renderToggleAll = (completedCount, todos, actions) => {
  if (todos.length) {
    return (
      <input
        className="toggle-all"
        type="checkbox"
        checked={completedCount === todos.length}
        onChange={actions.completeAll}
      />
    )
  }
}

const renderFooter = (completedCount, todos, filter, handleClearCompleted, handleShow) => {
  const activeCount = todos.length - completedCount

  if (todos.length) {
    return (
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filter={filter}
        onClearCompleted={handleClearCompleted}
        onShow={handleShow}
      />
    )
  }
}

class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    filter: 'SHOW_ALL',
  }

  render() {
    const {
      todos,
      actions,
    } = this.props

    const {
      filter,
    } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])

    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : 0), 0)

    const filteredTodoComponents = filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} {...actions} />)

    return (
      <section className="main">
        {renderToggleAll(completedCount, todos, actions)}
        <ul className="todo-list">
          {filteredTodoComponents}
        </ul>
        {renderFooter(completedCount, todos, filter, actions.clearCompleted, this.handleShow.bind(this))}
      </section>
    )
  }

  handleShow = filter => this.setState({ filter })
}

export default MainSection
