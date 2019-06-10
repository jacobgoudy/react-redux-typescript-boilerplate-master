import * as React from 'react';
import { ListTextInput } from '../ListTextInput';
import { ListActions } from 'app/acctions/lists';

export namespace Header {
  export interface Props {
    addList: typeof ListActions.addList;
  }
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    if (text.length) {
      this.props.addList({ text });
    }
  }

  render() {
    return (
      <header>
        <h1>Lists</h1>
        <ListTextInput newList onSave={this.handleSave} placeholder="What needs a list?" />
      </header>
    );
  }
}
