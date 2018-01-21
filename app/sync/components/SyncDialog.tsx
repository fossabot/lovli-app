



import * as React from 'react';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../model';
import SyncStepper from './SyncStepper';
import Slide from 'material-ui/transitions/Slide';
import Paper from 'material-ui/Paper/Paper';
import Typography from 'material-ui/Typography/Typography';

type withStyleProps = 'root' | 'table' | 'dialogBtn' | 'content' | 'button'| 'backButton' | 'completed';



function getSteps() {
  return ['Commit', 'Pull', 'Push'];
}

interface SyncDialogState {
	open: boolean;
	completed: any;
	skipped: any;
	activeStep: number;
};
interface SyncDialogProps {
	sync: Sync;
	outgoing: (out:any)=>void;
	commit: (msg:string)=>void;
	pull: ()=>void;
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({

	root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
	}),

  table: {
    minWidth: 700,
	} as React.CSSProperties,

	dialogBtn: {
		width: '100%',
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
		color: "#e5e5e5"
	} as React.CSSProperties,
	content: {
	} as React.CSSProperties,
  button: {
    marginRight: theme.spacing.unit,
  } as React.CSSProperties,
  backButton: {
    marginRight: theme.spacing.unit,
  } as React.CSSProperties,
  completed: {
    display: 'inline-block',
  } as React.CSSProperties,
});


function Transition(props:any) {
  return <Slide direction="up" {...props} />;
}

class SyncDialog extends React.Component<SyncDialogProps & WithStyles<withStyleProps>, SyncDialogState> {
	state = {
		open: false,
    completed: new Set(),
    skipped: new Set(),
		activeStep: 0
	};

		totalSteps = () => {
			return getSteps().length;
		};

		isStepComplete(step:any) {
			return this.state.completed.has(step);
		}

		completedSteps() {
			return this.state.completed.size;
		}

		allStepsCompleted() {
			return this.completedSteps() === this.totalSteps() - this.skippedSteps();
		}

		isLastStep() {
			return this.state.activeStep === this.totalSteps() - 1;
		}

		isStepOptional = (step:any) => {
			return step === 1;
		};

		isStepSkipped(step:any) {
			return this.state.skipped.has(step);
		}

		skippedSteps() {
			return this.state.skipped.size;
		}

	  handleClickOpen = () => {
		this.setState({ ...this.state,open: true });
	  };

	  handleClose = () => {
			this.setState({ ...this.state,open: false });
	  };


	  handleStep = (step:number) => {
			this.setState({ ...this.state,activeStep: step });
		};
	  handleSync = () => {
		this.props.commit('Whooop')
		};


		handleBack = () => {
			this.setState({
				...this.state,
				activeStep: this.state.activeStep - 1,
			});
		};

		handleNext = () => {
			let activeStep;

			if (this.isLastStep() && !this.allStepsCompleted()) {
				// It's the last step, but not all steps have been completed
				// find the first step that has been completed
				const steps = getSteps();
				activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
			} else {
				activeStep = this.state.activeStep + 1;
			}
			this.setState({
				activeStep,
			});
		};

		handleComplete = () => {
			const completed = new Set(this.state.completed);
			completed.add(this.state.activeStep);
			this.setState({
				completed,
			});
			/**
			 * Sigh... it would be much nicer to replace the following if conditional with
			 * `if (!this.allStepsComplete())` however state is not set when we do this,
			 * thus we have to resort to not being very DRY.
			 */
			if (completed.size !== this.totalSteps() - this.skippedSteps()) {
				this.handleNext();
			}
		};

		handleSkip = () => {
			const { activeStep } = this.state;
			if (!this.isStepOptional(activeStep)) {
				// You probably want to guard against something like this
				// it should never occur unless someone's actively trying to break something.
				throw new Error("You can't skip a step that isn't optional.");
			}
			const skipped = new Set(this.state.skipped);
			skipped.add(activeStep);
			this.setState({
				activeStep: this.state.activeStep + 1,
				skipped,
			});
		};




		resetAndClose = () => {
			this.setState({
				open: false,
				completed: new Set(),
				skipped: new Set(),
				activeStep: 0
			});

		};

  render() {
		const { classes, sync } = this.props;
		const { outgoing,incoming, status } = sync;
		const {  activeStep, skipped, completed } = this.state;

		return (
			<div>

			{ ((outgoing && outgoing.total > 0) || (incoming && incoming.total > 0) || (status && status.files && status.files.length > 0))  &&

				<Paper className={classes.root} elevation={4}>
						<Typography type="title" className="center-text">
							Es git Änderige!
						</Typography>

					<Button raised color="primary" className={classes.dialogBtn} onClick={this.handleClickOpen}>Jetzt en Lovli Sünc mache!</Button>
				</Paper>
			}

			<Dialog
						fullScreen
						open={this.state.open}
						onClose={this.handleClose}
						transition={Transition}
						aria-labelledby="form-dialog-title"
					>
						<DialogContent className={classes.content}>
							<SyncStepper sync={this.props.sync}
								commit={this.props.commit}
								outgoing={this.props.outgoing}
								pull={this.props.pull}
								next={this.handleNext}
								back={this.handleBack}
								complete={this.handleComplete}
								step={(step:number)=> this.handleStep(step)}
								activeStep={activeStep}
								completed={completed}
								skipped={skipped}
								steps={getSteps()} />
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Abbrächä
							</Button>

							<div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
								{(this.state.activeStep !== 2 && this.isStepComplete(activeStep)) &&
									<Button raised color="primary" onClick={this.handleNext} className={classes.button}>
										Next
									</Button>
								}
                {this.isStepOptional(activeStep) &&
                  !this.state.completed.has(this.state.activeStep) && (
                    <Button
                      raised
                      color="primary"
                      onClick={this.handleSkip}
                      className={classes.button}
                    >
                      Skip
                    </Button>
                  )}
                {(this.completedSteps() === this.totalSteps() - 2) &&
									<Button raised={(this.state.activeStep == 2)} color="primary" onClick={this.resetAndClose}>
										Finish
									</Button>
                }
              </div>
						</DialogActions>
					</Dialog>
			</div>
		);
  }
}


const rootComponent = withStyles(styles)<{}>(SyncDialog);
export default rootComponent as any as React.StatelessComponent<SyncDialogProps>;
