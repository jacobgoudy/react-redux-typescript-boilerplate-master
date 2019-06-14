import * as React from 'react';
import { TodoTextInput } from '../TodoTextInput';
import { ListModel } from 'app/models';
import { ListActions } from 'app/actions';

export namespace TodoHeader {
  export interface Props {
    addTodo: typeof ListActions.addTodo;
  }
}

export class TodoHeader extends React.Component<TodoHeader.Props> {
  constructor(props: TodoHeader.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    var name: string = text as string;
    if (name.length) {
      this.props.addTodo({name});
    }
  }

  render() {
    return (
      <header>
        <h1>Todos</h1>
        <TodoTextInput newTodo onSave={this.handleSave} placeholder="What needs to be done?" />
      </header>
    );
  }
}
