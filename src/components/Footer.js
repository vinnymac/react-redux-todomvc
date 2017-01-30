import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

const FILTER_TITLES = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed',
}

const filters = Object.keys(FILTER_TITLES)

const renderTodoCount = (activeCount) => {
  const itemWord = activeCount === 1 ? 'item' : 'items'

  return (
    <span className="todo-count">
      <strong>{activeCount || 'No'}</strong> {itemWord} left
    </span>
  )
}

const renderClearButton = (completedCount, onClearCompleted) => {
  if (completedCount < 1) return null

  return (
    <button
      className="clear-completed"
      onClick={onClearCompleted}
    >
      Clear Completed
    </button>
  )
}

const renderFilterLink = (filter, selectedFilter, onShow) => {
  const title = FILTER_TITLES[filter]

  return (
    <a
      className={classnames({ selected: filter === selectedFilter })}
      style={{ cursor: 'pointer' }}
      onClick={() => onShow(filter)}
    >
      {title}
    </a>
  )
}

class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
  }

  render() {
    const {
      completedCount,
      activeCount,
      onClearCompleted,
      onShow,
      filter: selectedFilter,
    } = this.props

    const filterComponents = filters.map(filter =>
      <li key={filter}>
        {renderFilterLink(filter, selectedFilter, onShow)}
      </li>
    )

    return (
      <footer className="footer">
        {renderTodoCount(activeCount)}
        <ul className="filters">
          {filterComponents}
        </ul>
        {renderClearButton(completedCount, onClearCompleted)}
      </footer>
    )
  }
}

export default Footer
