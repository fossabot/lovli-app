import * as React from 'react';

import { Tool } from '../model';
import ToolItem from './ToolItem';
import Footer from './Footer';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../constants/ToolFilters';

const TOOL_FILTERS :any = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (tool:Tool) => !tool.enabled,
  [SHOW_COMPLETED]: (tool:Tool) => tool.enabled
};

interface MainSectionProps {
  tools: Tool[];
  clearEnabled: ()=>void;
  completeAll: ()=>void;
  updateToolState: (tool:Tool, newState:number)=>void;
  enableTool: (tool:Tool)=>void;
  deleteTool: (tool:Tool)=>void;
};
interface MainSectionState {
  filter: string;
};

class MainSection extends React.Component<MainSectionProps, MainSectionState> {
  constructor(props:any, context:any) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearEnabled() {
    const atLeastOneEnabled = this.props.tools.some(tool => tool.enabled);
    if (atLeastOneEnabled) {
      this.props.clearEnabled();
    }
  }

  handleShow(filter: any) {
    this.setState({ filter });
  }

  renderToggleAll(enabledCount: number) {
    const { tools, completeAll } = this.props;
    if (tools.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={enabledCount === tools.length}
               onChange={() => completeAll()} />
      );
		}

		return
  }

  renderFooter(enabledCount: number) {
    const { tools } = this.props;
    const { filter } = this.state;
    const activeCount = tools.length - enabledCount;

    if (tools.length) {
      return (
        <Footer enabledCount={enabledCount}
                activeCount={activeCount}
                filter={filter}
                onClearEnabled={this.handleClearEnabled.bind(this)}
                onShow={this.handleShow.bind(this)} />
      );
		}

		return
  }

  render() {
    const { tools, enableTool, deleteTool, updateToolState } = this.props;
    const { filter } = this.state;

    const filteredTools = tools.filter(TOOL_FILTERS[filter]);
    const enabledCount = tools.reduce((count: number, tool): number =>
      tool.enabled ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(enabledCount)}
        <ul className="tool-list">
          {filteredTools.map(tool =>
            <ToolItem
              key={tool.id}
              tool={tool}
              updateToolState={updateToolState}
              enableTool={enableTool}
              deleteTool={deleteTool}/>
          )}
        </ul>
        {this.renderFooter(enabledCount)}
      </section>
    );
  }
}

export default MainSection;
