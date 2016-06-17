import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { addTodo } from './ducks/todo/add';

class App extends Component {
  static propTypes = {
    onTodoAdd: PropTypes.func,
    items: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
  }

  handleSubmit(event) {
    event.preventDefault();
    const text = this.refs.todoText.value.trim();
    if (text.length) {
      this.props.onTodoAdd(this.refs.todoText.value);
      this.refs.todoText.value = '';
    }
  }

  render() {
    const {
      items,
      loading,
      error,
    } = this.props;

    return (
      <div>
        <h1>todos</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>
            <div>add a todo</div>
            <input ref="todoText" styles={{ borderColor: error ? 'red' : '' }} />
          </label>
          {loading ? <div><strong>saving todo</strong></div> : null}
          {error ? <div><em>{error.message}</em></div> : null}
        </form>
        <ul>
          {items.map(
            (todo) =>
              <li key={todo.id}>{todo.text}</li>
          )}
        </ul>
      </div>
    );
  }
}

const AppContainer = connect(
  (state) => ({ ...state.todos }),
  { onTodoAdd: addTodo }
)(App);

export default ({ store }) => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
