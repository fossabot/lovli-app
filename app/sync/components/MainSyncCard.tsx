
import * as React from 'react';

import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';


import Card from 'material-ui/Card';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';
import SyncHistorySection from './SyncHistorySection';
import { Sync } from '../model';
import SyncChangesSection from './SyncChangesSection';
import SyncIncomingSection from './SyncIncomingSection';
//import SyncHistory from './SyncHistory';

type withStyleProps = 'root' | 'view' | 'tab';


interface MainSyncCardProps {
	sync: Sync;
};

interface MainSectionState {
  value: number;
};

const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
		width: '100%',
		} as React.CSSProperties,
	view: {
		height: 'calc(100vh - 210px)',
	} as React.CSSProperties,
	tab: {
		maxWidth: 'initial'
	} as React.CSSProperties,
});


class MainSyncCard extends React.Component<MainSyncCardProps & WithStyles<withStyleProps>, MainSectionState> {

	constructor(props:any, context:any) {
    super(props, context);
    this.state = { value: 0 };
  }

  handleChange = (event:any, value:any) => {
    this.setState({ value });
  };

  handleChangeIndex = (index:any) => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;

    return (
		<div>
        <Card>
          <div>
            <div>
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="Status" className={classes.tab} />
								<Tab label="Incoming" className={classes.tab} />
                <Tab label="Log"  className={classes.tab}/>
              </Tabs>
              <SwipeableViews
								className={classes.view}
                axis='x'
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer>
									<SyncChangesSection sync={this.props.sync} />
                </TabContainer>
                <TabContainer>
									<SyncIncomingSection sync={this.props.sync} />
								</TabContainer>
                <TabContainer>
									<SyncHistorySection sync={this.props.sync} />
								</TabContainer>
              </SwipeableViews>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    padding: spacing.unit,
    backgroundColor: palette.background,
    color: palette.primary,
  },
}));
interface TabContainerProps {
	dir?: string;
	children: any
}

const TabContainer = decorate<TabContainerProps>(({  children, classes }) => (
  <div className={classes.root}>
    {children}
  </div>
));


const rootComponent = withStyles(styles)<{}>(MainSyncCard);
export default rootComponent as any as React.StatelessComponent<MainSyncCardProps>;
