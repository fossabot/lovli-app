import * as React from 'react';
//import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import PolymerIcon from 'material-ui-icons/Polymer';

import { Tool } from '../../tools/model';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

interface ToolTableProps {
	tools: Tool[];
	enable: (t:Tool)=>void;
};


type withStyleProps = 'root';


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	} as React.CSSProperties,
});

class ToolTable extends React.Component<ToolTableProps & WithStyles<withStyleProps>> {


handleToggle(tool: Tool) {

      this.props.enable(tool);


  }

  render() {
	const { classes } = this.props;
    return (
		<div className={classes.root}>
        <List subheader={<ListSubheader>Apps zum Soundä und uflege</ListSubheader>}>

          { this.props.tools.map((tool: Tool, id: number) => {

            return (
              <ListItem key={tool.id}>
                <ListItemIcon>
                  <PolymerIcon />
                </ListItemIcon>
                <ListItemText primary={ tool.text } secondary={this._stateLabel(tool.state)} />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={() => this.props.enable(tool)}
                    checked={tool.enabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
        })}
        </List>
      </div>
    );
  }

  _stateLabel(state: number) {
    let label = "Unknown";
    if (state === 1) {
      label = "Installed";
    } else if (state === 2) {
      label = "Running";
    }

    return label;
  }
}

const rootComponent = withStyles(styles)<{}>(ToolTable);
export default rootComponent as any as React.StatelessComponent<ToolTableProps>;
