import * as React from 'react';
import * as classNames from 'classnames';

import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../constants/ToolFilters';

const FILTER_TITLES: any = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Enabled'
};


interface FooterProps {
  enabledCount: number;
  activeCount: number;
  filter: string;
  onClearEnabled: ()=>void;
  onShow: (filter:string)=>void;
}

class Footer extends React.Component<FooterProps> {
  renderToolCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="tool-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter:string) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <a className={classNames({ selected: filter === selectedFilter })}
         style={{ cursor: 'pointer' }}
         onClick={() => onShow(filter)}>
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { enabledCount, onClearEnabled } = this.props;
    if (enabledCount > 0) {
      return (
        <button className="clear-enabled"
                onClick={() => onClearEnabled()} >
          Clear enabled
        </button>
      );
	}
	return
  }

  render() {
    return (
      <footer className="footer">
        {this.renderToolCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

export default Footer;
