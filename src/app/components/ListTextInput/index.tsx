import * as React from 'react';
import * as classNames from 'classNames';
import * as style from './style.css';

export namespace ListInputText {
  export interface Props {
    text?: string;
    placeholder?: string;
    newList?: boolean;
    editing?: boolean;
    onSave: (text: string) => void;
  }

  export interface State {
    text: string;
  }
}

export class ListTextInput extends React.Component<ListTextInput.Props, ListTextInput.State> {
  constructor(props: ListTextInput.Props, context?: any) {
    super(props, context);
    this.state = { text: this.props.text || '' };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    const text = event.currentTarget.value.trim();
    if (event.which === 13) {
      this.props.onSave(text);
      if (this.props.newList) {
        this.setState({ text: '' });
      }
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value });
  }

  handleBlur(event: FocusEvent<HTMLInputElement>) {
    const text = event.target.value.trim();
    if (!this.props.newList) {
      this.props.onSave(text);
    }
  }

  render() {
    const classes = classNames(
      {
        [style.edit]: this.props.editing,
        [style.new]: this.props.newList
      },
      style.normal
    );

    return (
      <input
        className={classes}
        type="text"
        autoFocus
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}
