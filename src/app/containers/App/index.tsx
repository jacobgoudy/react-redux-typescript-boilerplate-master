import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { TodoActions, ListActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel, ListModel } from 'app/models';
import { omit } from 'app/utils';
import { TodoHeader, ListHeader, TodoList, Footer } from 'app/components';

const TODO_FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
);

const TODO_FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel)=> boolean> = {
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
    selectedValue: number;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, 'todos' | 'todoFilter' | 'lists'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '');
    const todoFilter = TODO_FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
    return { lists: state.lists, todos: state.todos, todoFilter };
  },
  (dispatch: Dispatch): Pick<App.Props, 'todoActions' | 'listActions'> => ({
    todoActions: bindActionCreators(omit(TodoActions, 'Type'), dispatch),
    listActions: bindActionCreators(omit(ListActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    todoFilter: TodoModel.Filter.SHOW_ALL,
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //able to clear all of the lists if there are some todos
  handleClearCompleted(): void {
    const index = this.props.lists.find(x => x.isSelected === true);
    const hasCompletedTodo = (index as ListModel).list.find(x => x.completed === true);
    if (hasCompletedTodo) {
      this.props.listActions.clearCompleted();
    }
  }

  handleFilterChange(todoFilter: TodoModel.Filter): void {
    this.props.history.push(`#${todoFilter}`);
  }
  //Changes todoList dependent on selected list
  handleSelectedChange(lists: ListModel):void{
    this.props.history.push(`#${lists.isSelected}`);
  }

  handleChange(event: React.FormEvent) {
    var selectedID = ((event.target) as any).value;
    this.setState({ selectedValue: selectedID });
    this.setState( { selectedValue: selectedID }, () => {
      this.props.lists.map((list) => {
        var listID = list.id as number;
        if ( +selectedID === listID )
          list.isSelected = true;
        else
          list.isSelected = false;
        this.handleSelectedChange(list);
      })
   });
  }

  handleListEdit(id: number) {
    var name = prompt('Enter a new list name','');
    console.log(name);
    if ( name )
      this.props.history.push(`#${this.props.listActions.editList({ id, name })}`);
  }

  render() {
    var { lists, todos, listActions, todoFilter } = this.props;
    //gets the selected list and updates the view depending on it
    var selectedList = lists.find(x => x.isSelected === true);
    if(selectedList != undefined)
      var selectedTodos = selectedList.list;
    else
      var selectedTodos:TodoModel[] = [];
    todos = selectedTodos;
    const todoCount = todos.length - todos.filter((todo) => todo.completed).length;
    const filteredTodos = todoFilter ? todos.filter(TODO_FILTER_FUNCTIONS[todoFilter]) : todos;
    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
    console.log(todos);
    return (
      <div className={style.normal}>
        <ListHeader addList={listActions.addList} />
        <select
          name="Select a List"
          style={style.select}
          placeholder="Select a list"
          onChange={ e => this.handleChange(e) }
          value={ this.props.selectedValue }>
          <option value="">Select a list</option>
          {lists.map((list) => {
            return <option value={list.id}>{list.name}</option>;
          })}
        </select>
        <button
          name="Edit"
          className={style.edit}
          onClick={() => {
            if (selectedList.id) this.handleListEdit(selectedList.id);
          }}>
          Edit List
        </button>
        <button
          name="Delete"
          className={style.delete}
          onClick={() => {
            //this.props.listActions.deleteList(selectedList.id);
            this.props.history.push(`#${this.props.listActions.deleteList(selectedList.id)}`);
          }}>
          Delete List
        </button>
        <TodoHeader addTodo={listActions.addTodo}/>
        <TodoList todos={filteredTodos} todoActions={listActions} />
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
