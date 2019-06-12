import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { TodoActions, ListActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
import { TodoHeader, ListHeader, TodoList, Footer } from 'app/components';
import { ListList } from 'app/components/ListList';

const TODO_FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
);

const TODO_FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
  [TodoModel.Filter.SHOW_ALL]: () => true,
  [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
  [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
};



export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: RootState.TodoState;
    lists: RootState.ListState;
    todoActions: TodoActions;
    listActions: ListActions;
    todoFilter: TodoModel.Filter;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, 'todos' | 'todoFilter' | 'lists'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '');
    const todoFilter = TODO_FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
    return { todos: state.todos, lists: state.lists, todoFilter };
  },
  (dispatch: Dispatch): Pick<App.Props, 'todoActions' | 'listActions'> => ({
    todoActions: bindActionCreators(omit(TodoActions, 'Type'), dispatch),
    listActions: bindActionCreators(omit(ListActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    todoFilter: TodoModel.Filter.SHOW_ALL
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleClearCompleted(): void {
    const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
    if (hasCompletedTodo) {
      this.props.todoActions.clearCompleted();
    }
  }

  handleFilterChange(todoFilter: TodoModel.Filter): void {
    this.props.history.push(`#${todoFilter}`);
  }

  render() {
    const { lists, todos, todoActions, listActions, todoFilter } = this.props;
    const todoCount = todos.length - todos.filter((todo) => todo.completed).length;
    const filteredTodos = todoFilter ? todos.filter(TODO_FILTER_FUNCTIONS[todoFilter]) : todos;
    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

    //const listCount = lists.length - lists.filter((list) => list.completed).length;

    return (
      <div className={style.normal}>
        <ListHeader addList={listActions.addList} />
        <select name="Lists">
          {lists.map((list) => {
            return <option value={list.name}>{list.name}</option>;
          })}
        </select>
        <TodoHeader addTodo={todoActions.addTodo} />
        <TodoList todos={filteredTodos} todoActions={todoActions} />
        <Footer
          todoFilter={todoFilter}
          todoCount={todoCount}
          completedCount={completedCount}
          onClickClearCompleted={this.handleClearCompleted}
          onClickFilter={this.handleFilterChange}
        />
      </div>
    );
  }
}
