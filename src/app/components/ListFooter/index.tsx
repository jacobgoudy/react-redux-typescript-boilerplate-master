import * as React from 'react';
import * as style from './style.css';
import { ListModel } from 'app/models';
import { ListActions } from 'app/actions';

export namespace ListFooter {
  export interface Props {
    lists: ListModel[];
    listActions: ListActions;
    listCount?: number;
    completedCount?: number;
    onClickClearCompleted: () => any;
  }
}

export class Footer extends React.Component<ListFooter.Props> {
  static defaultProps: Partial<ListFooter.Props> = {
    listCount: 0,
    completedCount: 0
  };

  renderListCount(): JSX.Element {
    const { listCount } = this.props;
    const itemWord = listCount === 1 ? 'item' : 'items';

    return (
      <span className={style.count}>
        <strong>{listCount || 'No'}</strong> {itemWord} left
      </span>
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
        {this.renderListCount()}
        {this.renderClearButton()}
      </footer>
    );
  }
}
