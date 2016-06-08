import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { addTodo } from './ducks/todo/add';

class App extends Component {
  static propTypes = {
    onTodoAdd: PropTypes.func,
    todos: PropTypes.array,
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onTodoAdd(this.refs.todoText.value);
    this.refs.todoText.value = '';
  }

  render() {
    return (
      <div>
        <h1>todos</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>
            <div>add a todo</div>
            <input ref="todoText" />
          </label>
        </form>
        <ul>
          {this.props.todos.map(
            (todo) =>
              <li key={todo.id}>{todo.text}</li>
          )}
        </ul>
      </div>
    );
  }
}

const ConnectedApp = connect(
  (state) => ({ todos: state.todos }),
  { onTodoAdd: addTodo }
)(App);

export default ({store}) => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);
