import * as React from 'react';
import { ListTextInput } from '../ListTextInput';
import { ListActions } from 'app/actions/lists';

export namespace ListHeader {
  export interface Props {
    addList: typeof ListActions.addList;
  }
}

export class ListHeader extends React.Component<ListHeader.Props> {
  constructor(props: ListHeader.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(name: string) {
    if (name.length) {
      this.props.addList({ name });
    }
  }

  render() {
    return (
      <header>
        <ListTextInput newList onSave={this.handleSave} placeholder="What needs a list?" />
      </header>
    );
  }
}
