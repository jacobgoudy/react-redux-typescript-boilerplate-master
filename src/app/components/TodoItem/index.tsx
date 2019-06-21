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
    addDate: typeof ListActions.addDate;
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
    console.log('frick debug');
    this.props.assignTodo({name, id});
    this.setState({});
  }
  
  //Checks to see the inputed date is valid
  dateValidation(name:string){
    //Looks for anything regarding letters and results in false
    if(name.match(/[a-zA-Z]/)) return false;
    var input = name.trim().toString().split('/');
    var tempString = input[0].toString()+ "/" + input[1].toString() +"/" + input[2].toString();
    //if its not in the correct mm/dd/yyyy format => false
    if(!tempString.match(/(0?[1-9]|1[0-2])[^\w\d\r\n:](0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](\d{4}|\d{2})/)) return false;
    var numInput = input.map(x => +x);
    //if there is mm/dd/yyyy/ddd => false
    if(numInput.length > 3) return false;
    //If its is not a lear year, and the day is larger that 28 => false
    if((!(numInput[2] % 4 === 0 || (numInput[2] % 100 === 0 && numInput[2] % 400 === 0))) && numInput[0] === 2 && numInput[1]>28) return false;
    if(numInput[0] < 1 || numInput[0] > 12)
      return false;
    var months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var accMonth = months[numInput[0]-1];
    //if the day is greater than the month day or less that 0 => false
    if(accMonth < numInput[1] || 0 > numInput[1])
      return false;
    return true;
  }
  //Adds a due date to the todo and sets the state
  handleDate(id: number, name: string) {
    if(!this.dateValidation(name)) return;
    this.props.addDate({name, id});
    this.setState({});
  }

  handleNotes(id: number, notes: string){
    var name = prompt(notes + " \nAdd more notes:",notes);
    if(name != null && name.trim().length != 0 && name.trim() != notes.trim()) {
      this.props.addNotes({name, id});
    }
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
            className={style.date}
            onClick={() => {
              var date = prompt('Enter a due date in the format mm/dd/yyyy: ','Due date...');
              if ( date ) {
                console.log('date: ',date);
                this.handleDate(todo.id, date as string);
              }
            }}
          >{todo.date}</button>
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
              if(todo.id) this.handleNotes(todo.id, todo.notes as any);
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
