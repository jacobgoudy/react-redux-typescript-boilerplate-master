import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { TodoModel } from 'app/models';
import { ListActions } from 'app/actions/lists';
import { TodoTextInput } from '../TodoTextInput';

export namespace TodoItem {
  export interface Props {
    todo: TodoModel;
    editTodo: typeof ListActions.editTodo;
    deleteTodo: typeof ListActions.deleteTodo;
    completeTodo: typeof ListActions.completeTodo;
    assignTodo: typeof ListActions.assignTodo;
    addNotes: typeof ListActions.addNotes;
  }

  export interface State {
    editing: boolean;
  }
}

export class TodoItem extends React.Component<TodoItem.Props, TodoItem.State> {
  constructor(props: TodoItem.Props, context?: any) {
    super(props, context);
    this.state = { editing: false };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id: number, name: string) {
    if (name.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo({ id, name });
    }
    this.setState({ editing: false });
  }

  //assignes the task and resets the state
  handleAssign(id: number, name: string){
    console.log('fuck debug');
    this.props.assignTodo({name, id});
    this.setState({});
  }

  handleNotes(id: number, notes: string){
    var name = prompt(notes + " \nAdd more notes:",'');
    if(name) name = notes.concat("\n", name);
    console.log(name);
    this.props.addNotes({name, id});
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;
    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.name}
          editing={this.state.editing}
          onSave={(name) => todo.id && this.handleSave(todo.id, name)}
        />
      );
    } else {
      element = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type="checkbox"
            checked={todo.completed}
            onChange={() => todo.id && completeTodo(todo.id)}
          />
          <label onDoubleClick={() => this.handleDoubleClick()}>{todo.name}</label>
          <button 
            className={style.assign}
            onClick={() => {
              var assign = prompt('Enter a person to assign it to','');
              if(assign){
                console.log('name:',assign, ' id:', todo.id);
                this.handleAssign(todo.id, assign as string);
              }
            }}
          >{todo.assign}</button>
          <button
            className={style.assigned}
            onClick={() => {
              if(todo.id) this.handleNotes(todo.id, todo.notes);
            }}
          />
          <button
            className={style.destroy}
            onClick={() => {
              if (todo.id) deleteTodo(todo.id);
            }}
          />
        </div>
      );
    }

    // TODO: compose
    const classes = classNames({
      [style.completed]: todo.completed,
      [style.editing]: this.state.editing,
      [style.normal]: !this.state.editing
    });

    return <li className={classes}>{element}</li>;
  }
}
