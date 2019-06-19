/** TodoMVC model definitions **/

export interface TodoModel {
  id: number;
  name: string;
  completed: boolean;
  assign: string;
  notes: string;
}

export namespace TodoModel {
  export enum Filter {
    SHOW_ALL = 'all',
    SHOW_ACTIVE = 'active',
    SHOW_COMPLETED = 'completed'
  }
}
