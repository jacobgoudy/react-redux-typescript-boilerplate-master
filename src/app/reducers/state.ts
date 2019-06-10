import { TodoModel } from 'app/models';
import { ListModel } from 'app/models/ListModel';

export interface RootState {
  todos: RootState.TodoState;
  lists: RootState.ListState;
  router?: any;
}

export namespace RootState {
  export type TodoState = TodoModel[];
  export type ListState = ListModel[];
}
