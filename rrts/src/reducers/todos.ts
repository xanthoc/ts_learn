import {
  Todo,
  FetchTodosAction,
  ActionTypes,
  DeleteTodoAction,
} from "../actions";

export const todosReducer = (
  state: Todo[] = [],
  action: FetchTodosAction | DeleteTodoAction
) => {
  switch (action.type) {
    case ActionTypes.fetchDodos:
      return action.payload;
    case ActionTypes.deleteTodo:
      return state.filter((todo: Todo) => todo.id !== action.payload);
    default:
      return state;
  }
};
