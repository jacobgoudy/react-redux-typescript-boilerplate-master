import * as React from 'react';
import * as style from './style.css';
import { ListActions } from 'app/actions';
import { TodoItem } from '../TodoItem';
import { TodoModel } from 'app/models/TodoModel';

export namespace TodoList {
  export interface Props {
    todos: TodoModel[];
    todoActions: ListActions;
  }
}

export class TodoList extends React.Component<TodoList.Props> {
  renderToggleAll(): JSX.Element | void {
    const { todos, todoActions } = this.props;
    if (todos.length > 0) {
      const hasIncompleted = todos.some((todo) => !todo.completed);
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={hasIncompleted}
          onChange={todoActions.completeAll}
        />
      );
    }
  }

  render() {
    const { todos, todoActions } = this.props;
    return (
      <section className={style.main}>
        {this.renderToggleAll()}
        <ul className={style.normal}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={todoActions.completeTodo}
              deleteTodo={todoActions.deleteTodo}
              editTodo={todoActions.editTodo}
              assignTodo={todoActions.assignTodo}
              addNotes={todoActions.addNotes}
              addDate={todoActions.addDate}
            />
          ))}
        </ul>
      </section>
    );
  }
}
