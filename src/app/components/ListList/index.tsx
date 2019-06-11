import * as React from 'react';
import * as style from './style.css';
import { ListActions } from 'app/actions/lists';
import { ListItem } from '../ListItem';
import { ListModel } from 'app/models/ListModel';

export namespace ListList {
  export interface Props {
    lists: ListModel[];
    listActions: ListActions;
  }
}

export class ListList extends React.Component<ListList.Props> {
  renderToggleAll(): JSX.Element | void {
    const { lists } = this.props;
    if (lists.length > 0) {
      const hasIncompleted = lists.some((list) => !list.completed);
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={hasIncompleted}
        />
      );
    }
  }

  render() {
    const { lists, listActions } = this.props;
    return (
      <section className={style.main}>
        {this.renderToggleAll()}
        <ul className={style.normal}>
          {lists.map((list) => (
            <ListItem
              key={list.id}
              list={list}
              completeList={listActions.completeList}
              deleteList={listActions.deleteList}
              editList={listActions.editList}
            />
          ))}
        </ul>
      </section>
    );
  }
}
