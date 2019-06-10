import { TodoModel } from ".";

/** TodoMVC model definitions **/


export interface ListModel {
  id: number;
  name: string;
  list: TodoModel[];
  completed: boolean;
}

export namespace ListModel {
  export enum Filter {
    SHOW_ALL = 'all',
    SHOW_ACTIVE = 'active',
    SHOW_COMPLETED = 'completed'
  }
}
