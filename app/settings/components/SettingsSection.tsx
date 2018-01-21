import * as React from 'react';

import { Tool } from '../../tools/model';
import { Users } from '../../users/model';

import ExpansionPanel from 'material-ui/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from 'material-ui/ExpansionPanel/ExpansionPanelSummary';
import Typography from 'material-ui/Typography/Typography';
import ExpansionPanelDetails from 'material-ui/ExpansionPanel/ExpansionPanelDetails';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import ToolTable from './ToolTable'
import UserList from './UserList';


interface SettingsSectionProps {
	tools: Tool[];
	users: Users;
  clearEnabled: ()=>void;
  completeAll: ()=>void;
  updateToolState: (tool:Tool, state:number)=>void;
  enableTool: (tool:Tool)=>void;
  deleteTool: (tool:Tool)=>void;
};


interface SettingsState {
  expanded?: string
};

type withStyleProps = 'root' | 'heading'| 'secondaryHeading';

const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
    width: '100%',
  } as React.CSSProperties,
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  } as React.CSSProperties,
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  } as React.CSSProperties,
});
class SettingsSection extends React.Component<SettingsSectionProps & WithStyles<withStyleProps>, SettingsState> {

  constructor(props:any, context:any) {
    super(props, context);
    this.state = {expanded: 'panel2'};
  }
  handleChange(panel:string) {
    this.setState({
      expanded: this.state.expanded !== panel ? panel : undefined,
    });
  };

  handleClearEnabled() {
    const atLeastOneEnabled = this.props.tools.some(tool => tool.enabled);
    if (atLeastOneEnabled) {
      this.props.clearEnabled();
    }
  }

  render() {
		const { users,tools, classes, enableTool } = this.props;
    const { expanded } = this.state;
    return (
      <section className={classes.root}>

				<ExpansionPanel expanded={expanded === 'panel1'} onChange={() => this.handleChange('panel1')}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>Generell</Typography>
						<Typography className={classes.secondaryHeading}>App, Library und Disks</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
							maximus est, id dignissim quam.
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel expanded={expanded === 'panel2'} onChange={() => this.handleChange('panel2')}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>Tools</Typography>
					<Typography className={classes.secondaryHeading}>
						Software für din <i>Lövli Workflow™</i>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<ToolTable tools={tools}
					enable={enableTool}
					/>
				</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel expanded={expanded === 'panel3'} onChange={() => this.handleChange('panel3')}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>Users</Typography>
					<Typography className={classes.secondaryHeading}>
						Lövli People!
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<UserList users={users}
					/>
				</ExpansionPanelDetails>
				</ExpansionPanel>
      </section>
    );
  }
}




const rootComponent = withStyles(styles)<{}>(SettingsSection);
export default rootComponent as any as React.StatelessComponent<SettingsSectionProps>;
