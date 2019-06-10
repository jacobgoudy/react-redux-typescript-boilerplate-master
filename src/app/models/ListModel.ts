import { TodoModel } from ".";

/** TodoMVC model definitions **/


export interface ListModel {
  id: number;
  name: string;
  list: TodoModel[];
  completed: boolean;
}
