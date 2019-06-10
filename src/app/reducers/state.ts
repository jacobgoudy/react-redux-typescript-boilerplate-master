import { TodoModel, ListModel } from 'app/models';

export interface RootState {
  todos: RootState.TodoState;
  lists: RootState.ListState;
  router?: any;
}

export namespace RootState {
  export type TodoState = TodoModel[];
  export type ListState = ListModel[];
}
