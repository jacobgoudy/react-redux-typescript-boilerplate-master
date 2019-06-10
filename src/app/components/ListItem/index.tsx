import * as React from 'react';
import * as classNames from 'classNames';
import * as style from './style.css';
import { ListModel } from 'app/models';
import { ListActions } from 'app/actions';
import { ListTextInput } from '../ListTextInput';

export namespace ListItem {
  export interface Props {
    list: ListModel;
    editList: typeof ListActions.editList;
    deleteList: typeof ListActions.deleteList;
    completeList: typeof ListActions.completeList;
  }

  export interface State {
    editing: boolean;
  }
}

export class ListItem extends React.Component<ListItem.Props, ListItem.State> {
  constructor(props: ListItem.Props, context?: any) {
    super(props, context);
    this.state = { editing: false };
  }

  handleDoubleClick() {
    this.setState({editing: true});
  }

  handleSave(id: number, text: string) {
    if (text.length !== 0) {
      this.props.editList({ id, text });
    }
    this.setState({ editing: false });
  }

  render() {
    const { list, completeList, deleteList } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <ListItemInput
          text={list.text}
          editing={this.state.editing}
          onSave={(text) => list.id && this.handleSave(todo.id, text)}
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
          <label onDoubleClick={() => this.handleDoubleClick()}>{list.text}</label>
          <button
            className={style.destroy}
            onClick={() => {
              if (list.id) deleteList(list.id);
            }}
          />
        </div>
      );
    }

    const classes = classNames({
      [style.completed]: list.completed,
      [style.editing]: this.state.editing,
      [style.normal]: !this.state.editing
    });

    return <li className={classes}>{element}</li>
  }
}
