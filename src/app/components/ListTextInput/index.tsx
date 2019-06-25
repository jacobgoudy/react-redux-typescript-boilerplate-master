import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';

export namespace ListTextInput {
  export interface Props {
    name?: string;
    placeholder?: string;
    newList?: boolean;
    editing?: boolean;
    onSave: (name: string) => void;
  }

  export interface State {
    name: string;
  }
}

export class ListTextInput extends React.Component<ListTextInput.Props, ListTextInput.State> {
  constructor(props: ListTextInput.Props, context?: any) {
    super(props, context);
    this.state = { name: this.props.name || ''};
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log("----------ListTextInput: handleSubmit----------");
    const text = event.currentTarget.value.trim();
    if (event.which === 13) {
      this.props.onSave(text);
      if (this.props.newList) {
        this.setState({ name: ''});
      }
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("----------ListTextInput: handleChange----------");
    this.setState({ name: event.target.value });
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    console.log("----------ListTextInput: handleBlur----------");
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
        value={this.state.name}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}
