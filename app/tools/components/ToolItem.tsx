import * as React from 'react';
import * as classNames from 'classnames';

import { Tool } from '../model';
import ToolTextInput from './ToolTextInput';

interface ToolItemProps {
  tool: Tool;
  updateToolState: (tool:Tool, text:number)=>void;
  deleteTool: (tool:Tool)=>void;
  enableTool: (tool:Tool)=>void;
  key?: any;
}
interface ToolItemState {
  editing: boolean;
};

class ToolItem extends React.Component<ToolItemProps, ToolItemState> {
  constructor(props:any, context:any) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(tool:Tool, state:number) {
    if (state < 0) {
      this.props.deleteTool(tool);
    } else {
      this.props.updateToolState(tool, state);
    }
    this.setState({ editing: false });
  }

  render() {
    const {tool, enableTool, deleteTool} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <ToolTextInput text={tool.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(tool, 0)}/>
      );
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={tool.enabled}
                 onChange={() => enableTool(tool)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {tool.text}
          </label>
          <button className="destroy"
                  onClick={() => deleteTool(tool)} />
        </div>
      );
    }

    return (
      <li className={classNames({
        enabled: tool.enabled,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
}

export default ToolItem;
