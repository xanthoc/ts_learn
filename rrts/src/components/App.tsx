import React from "react";
import { connect } from "react-redux";

import { Todo } from "../actions";
import { StoreState } from "../reducers";
import { fetchTodos, deleteTodo } from "../actions";

interface AppProps {
  todos: Todo[];
  fetchTodos(): any;
  deleteTodo: typeof deleteTodo;
}

class _App extends React.Component<AppProps> {
  onFetchHandler = () => {
    this.props.fetchTodos();
  };
  onDeleteHandler = (id: number) => {
    this.props.deleteTodo(id);
  };
  renderList = (): JSX.Element[] => {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id} onClick={() => this.onDeleteHandler(todo.id)}>
          {todo.title}
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.onFetchHandler}>Fetch</button>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return { todos: state.todos };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
