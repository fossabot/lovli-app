



import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../../model';
import Typography from 'material-ui/Typography/Typography';
import Button from 'material-ui/Button/Button';
import PullButton from '../PullButton';
import Divider from 'material-ui/Divider/Divider';
import IncomingChanges from '../IncomingChanges';

type withStyleProps = 'root' | 'pullBtn' | 'divider' | 'primaryBtn';


interface PullStepState {
	message: string;
	hasMessage: boolean;
	isPulling: boolean;
};
interface PullStepProps {
	sync: Sync,
	pull: ()=>void;
	complete: ()=>void;
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
    	width: '100%',
    	marginTop: theme.spacing.unit * 3,
    	overflowX: 'auto',
	} as React.CSSProperties,
	primaryBtn: {
		margin: theme.spacing.unit * 3,
	} as React.CSSProperties,
	divider: {
		marginTop: 28,
		marginBottom: 28,
  	} as React.CSSProperties,
  	pullBtn: {
	  textAlign: 'center',
		maxWidth: 299,
		margin: '0 auto'
  	} as React.CSSProperties,
});


class PullStep extends React.Component<PullStepProps & WithStyles<withStyleProps>, PullStepState> {
	state = {
		message: '',
		hasMessage: false,
		isPulling: false
	};

	handlePull = () => {
		this.setState({...this.state,isPulling:true});
		this.props.pull();
	}

  render() {
    const { sync, classes} = this.props;
		//const {isPulling} = this.state;
  return (
		<div>


			<section>
			{(sync && sync.incoming && sync.incoming.all &&  sync.incoming.all.length > 0) ? (
					<div>
						<Typography type="title" gutterBottom className="center-text">
							Änderige us de Cloud abhole
						</Typography>


						<div className={classes.pullBtn}>
							<PullButton incoming={sync.incoming.all} pull={()=> this.handlePull()} />
						</div>

						<Divider className={classes.divider} />

						<IncomingChanges sync={sync} />

					</div>
			): (
				<div className="center-text">

					<Typography type="subheading" gutterBottom >
							OK, au alli änderige us de cloud sind scho da.
					</Typography>

					<Button raised className={classes.primaryBtn} color="primary" onClick={()=> this.props.complete()}>chillig, denn push eifach mini!</Button>
				</div>

			)}

			</section>

		</div>
	  );
	}
}


const rootComponent = withStyles(styles)<{}>(PullStep);
export default rootComponent as any as React.StatelessComponent<PullStepProps>;
