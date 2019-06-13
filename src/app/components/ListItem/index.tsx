import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { ListModel } from 'app/models';
import { ListActions } from 'app/actions';
import { ListTextInput } from 'app/components';

export namespace ListItem {
  export interface Props {
    list: ListModel;
    editList: typeof ListActions.editList;
    deleteList: typeof ListActions.deleteList;
    completeList: typeof ListActions.completeList;
    selectList: typeof ListActions.selectList;
  }

  export interface State {
    editing: boolean;
    isSelected: boolean;
  }
}

export class ListItem extends React.Component<ListItem.Props, ListItem.State> {
  constructor(props: ListItem.Props, context?: any) {
    super(props, context);
    this.state = { editing: false, isSelected: true };
  }

  handleSingleClick() {
    this.setState({ isSelected: true});
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id: number, name: string) {
    if (name.length === 0) {
      this.props.deleteList(id);
    } else {
      this.props.editList({ id, name });
    }
    this.setState({ editing: false });
  }

  render() {
    const { list, completeList, deleteList } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <ListTextInput
          name={list.name}
          editing={this.state.editing}
          onSave={(name: string) => list.id && this.handleSave(list.id, name)}
        />
      );
    }
    else {
      element = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type="checkbox"
            checked={list.completed}
            onChange={() => list.id && completeList(list.id)}
          />
          <label onDoubleClick={() => this.handleDoubleClick()}>{list.name}</label>
          <button
            className={style.destroy}
            onClick={() => {
              if (list.id) deleteList(list.id);
            }}
          />
        </div>
      );
    }

    // TODO: compose
    const classes = classNames({
      [style.completed]: list.completed,
      [style.editing]: this.state.editing,
      [style.normal]: !this.state.editing
    });

    return <li className={classes}>{element}</li>;
  }
}
