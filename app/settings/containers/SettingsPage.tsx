import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';


import {

  model,

  updateToolState,
  clearEnabled,
  completeAll,
  enableTool,
  deleteTool
} from '../../tools';
import {
  model as usermodel,
} from '../../users';
import SettingsSection from '../components/SettingsSection';

interface AppProps {
  tools: model.Tool[];
	users: usermodel.Users;
	dispatch: Dispatch<{}>;
}

class SettingsPage extends React.Component<AppProps> {
  render() {
		const { users, tools, dispatch } = this.props;

    return (
      <div className="toolapp">


				<SettingsSection tools={tools}
						users={users}
            updateToolState={(t,s) => dispatch(updateToolState(t, s))}
            deleteTool={(t: model.Tool) => dispatch(deleteTool(t))}
            enableTool={(t: model.Tool) => dispatch(enableTool(t))}
            clearEnabled={() => dispatch(clearEnabled())}
            completeAll={() => dispatch(completeAll())}/>

      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
	tools: state.tools,
	users: state.users
});

export default connect(mapStateToProps)(SettingsPage);
