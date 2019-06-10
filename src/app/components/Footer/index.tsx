import * as React from 'react';
import * as style from './style.css';
import * as classNames from 'classnames';
import { TodoModel } from 'app/models';

export const FILTER_TITLES = {
  [TodoModel.Filter.SHOW_ALL]: 'All',
  [TodoModel.Filter.SHOW_ACTIVE]: 'Active',
  [TodoModel.Filter.SHOW_COMPLETED]: 'Completed'
};

export namespace Footer {
  export interface Props {
    todoFilter: TodoModel.Filter;
    todoCount?: number;
    completedCount?: number;
    onClickFilter: (filter: TodoModel.Filter) => any;
    onClickClearCompleted: () => any;
  }
}

export class Footer extends React.Component<Footer.Props> {
  static defaultProps: Partial<Footer.Props> = {
    todoCount: 0,
    completedCount: 0
  };

  renderTodoCount(): JSX.Element {
    const { todoCount } = this.props;
    const itemWord = todoCount === 1 ? 'item' : 'items';

    return (
      <span className={style.count}>
        <strong>{todoCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: TodoModel.Filter): JSX.Element {
    const { todoFilter: selectedFilter, onClickFilter } = this.props;

    return (
      <a
        className={classNames({ [style.selected]: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onClickFilter(filter)}
        children={FILTER_TITLES[filter]}
      />
    );
  }

  renderClearButton(): JSX.Element | void {
    const { completedCount, onClickClearCompleted } = this.props;
    if (completedCount! > 0) {
      return (
        <button
          className={style.clearCompleted}
          onClick={onClickClearCompleted}
          children={'Clear completed'}
        />
      );
    }
  }

  render() {
    return (
      <footer className={style.normal}>
        {this.renderTodoCount()}
        <ul className={style.filters}>
          {(Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map((key) => (
            <li key={key} children={this.renderFilterLink(TodoModel.Filter[key])} />
          ))}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
