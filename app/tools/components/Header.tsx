import * as React from 'react';

import ToolTextInput from './ToolTextInput';

interface HeaderProps {
  addTool: (text:string)=> any;
};

class Header extends React.Component<HeaderProps> {
  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTool(text);
    }
  }

  render() {
    return (
      <header className="header">
          <h1>tools</h1>
          <ToolTextInput
            newTool
            onSave={this.handleSave.bind(this)}
            placeholder="What needs to be done?" />
      </header>
    );
  }
}

export default Header;
