import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  }

  render() {
    return (
      <header className="header">
        <h1>
          Todos
        </h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What will you get done?"
        />
      </header>
    )
  }

  handleSave = text => text && this.props.addTodo(text)
}

export default Header
