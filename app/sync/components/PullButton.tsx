



import * as React from 'react';

import Button from 'material-ui/Button';
import CheckIcon from 'material-ui-icons/Check'
import CloudCircleIcon from 'material-ui-icons/CloudCircle';


import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { LovliGreen } from '../../utils/colors';
import CircularProgress from 'material-ui/Progress/CircularProgress';

type withStyleProps = 'root' | 'wrapper' | 'buttonSuccess' | 'fabProgress' | 'buttonProgress';



interface PullButtonState {
	loading: boolean;
	success: boolean;
};
interface PullButtonProps {
	incoming: any[],

	pull: ()=>void;
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
	root: {
		margin: theme.spacing.unit,
    display: 'inline-flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: LovliGreen['500'],
    '&:hover': {
      backgroundColor: LovliGreen['700'],
    },
  },
  fabProgress: {
    color: LovliGreen['500'],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: LovliGreen['500'],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});


class PullButton extends React.Component<PullButtonProps & WithStyles<withStyleProps>, PullButtonState> {
	state = {
    loading: false,
    success: false,
  };


  timer:any = undefined;
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
			this.props.pull();
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            });
          }, 5000);
        },
      );
    }
  };


		render() {
			const { loading, success } = this.state;
			const { classes } = this.props;

			return (
				<div className={classes.root}>
					<div className={classes.wrapper}>
						<Button fab color="primary" onClick={this.handleButtonClick}>
							{success ? <CheckIcon /> : <CloudCircleIcon />}
						</Button>
						{loading &&
							<CircularProgress size={68} className={classes.fabProgress} />
						}
					</div>
					<div className={classes.wrapper}>
						<Button
							raised
							color="primary"
							disabled={loading}
							onClick={this.handleButtonClick}
						>
							OK, PULL!
						</Button>
						{loading &&
							<CircularProgress size={24} className={classes.buttonProgress} />
						}
					</div>
				</div>
			);
		}
}


const rootComponent = withStyles(styles)<{}>(PullButton);
export default rootComponent as any as React.StatelessComponent<PullButtonProps>;
