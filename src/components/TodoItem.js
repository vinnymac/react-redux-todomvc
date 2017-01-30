import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
  }

  render() {
    const {
      todo,
      completeTodo,
      deleteTodo,
    } = this.props

    const {
      editing,
    } = this.state

    let element

    if (editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={text => this.handleSave(todo.id, text)}
        />
      )
    } else {
      const id = `completed${todo.id}`

      element = (
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo({ id: todo.id })}
          />
          <label
            htmlFor={id}
            onDoubleClick={this.handleDoubleClick}
          >
            {todo.text}
          </label>
          <button
            className="destroy"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      )
    }

    return (
      <li
        className={classnames({
          editing,
          completed: todo.completed,
        })}
      >
        {element}
      </li>
    )
  }

  handleDoubleClick = () => this.setState({ editing: true })

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo({ id, text })
    }

    this.setState({ editing: false })
  }
}

export default TodoItem
