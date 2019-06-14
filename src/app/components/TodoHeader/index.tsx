import * as React from 'react';
import { TodoTextInput } from '../TodoTextInput';
//import { TodoActions } from 'app/actions/todos';
import { ListModel } from 'app/models';
import { ListActions } from 'app/actions';

export namespace TodoHeader {
  export interface Props {
    addTodo: typeof ListActions.addTodo;
    currentList: ListModel;
  }
}

export class TodoHeader extends React.Component<TodoHeader.Props> {
  constructor(props: TodoHeader.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    if (text.length) {
      this.props.addTodo(+text);
    }
  }

  // addToList(todo: TodoModel) {
      
  // }

  render() {
    return (
      <header>
        <h1>Todos</h1>
        <TodoTextInput newTodo onSave={this.handleSave} placeholder="What needs to be done?" />
      </header>
    );
  }
}
