import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    newTodo: PropTypes.bool,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    editing: PropTypes.bool,
  }

  state = {
    text: this.props.text || '',
  }

  render() {
    const {
      editing,
      newTodo,
      placeholder,
    } = this.props

    const {
      text,
    } = this.state

    return (
      <input
        className={classnames({
          edit: editing,
          'new-todo': newTodo,
        })}
        type="text"
        placeholder={placeholder}
        autoFocus
        value={text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    )
  }

  handleKeyDown = (e) => {
    const {
      onSave,
      newTodo,
    } = this.props

    if (e.key === 'Enter') {
      const text = e.target.value.trim()

      onSave(text)
      if (newTodo) this.setState({ text: '' })
    }
  }

  handleChange = e => this.setState({ text: e.target.value })

  handleBlur = (e) => {
    const {
      newTodo,
      onSave,
    } = this.props

    if (!newTodo) onSave(e.target.value)
  }
}

export default TodoTextInput
