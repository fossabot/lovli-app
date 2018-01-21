



import * as React from 'react';

import Stepper, { Step, StepButton } from 'material-ui/Stepper';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../model';
import Typography from 'material-ui/Typography/Typography';
import CommitStep from './steps/CommitStep';
import PullStep from './steps/PullStep';
import PushStep from './steps/PushStep';
import { LovliGreen } from '../../utils/colors';


type withStyleProps = 'root' | 'instructions' | 'check' | 'checked';



function getStepContent(step:any, sync: Sync,outgoing: (out:any) => void, commit: (msg:string) => void, pull: () => void, next: () => void,  back: () => void,  complete: () => void) {
  switch (step) {
    case 0:
      return (<CommitStep sync={sync} commit={commit} complete={complete} outgoing={outgoing}  />);
    case 1:
			return (<PullStep sync={sync} pull={pull} complete={complete}  />);
    case 2:
		return (<PushStep sync={sync} commit={commit} complete={complete}  />);
    default:
      return 'Unknown step';
  }
}


interface SyncStepperProps {
	activeStep: number;
	completed: any;
	skipped: any;
	sync: Sync;
	steps: string[],
	commit: (msg:string)=>void;
	outgoing: (out:any)=>void;
	pull: ()=>void;
	step: (step:number)=>void;
	next: ()=>void;
	back: ()=>void;

	complete: ()=>void;
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({
  root: {
    width: '100%',
  } as React.CSSProperties,
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
	} as React.CSSProperties,

	check: {
		strokeDasharray: '130px 130px',
		strokeDashoffset: '130px',
		webkitTransition: 'stroke-dashoffset 4.1s linear 0s',
		transition: 'stroke-dashoffset 500ms ease-in-out',
	} as React.CSSProperties,

	checked: {
		strokeDashoffset: 0
	} as React.CSSProperties,
});


class SyncStepper extends React.Component<SyncStepperProps & WithStyles<withStyleProps>> {


  totalSteps = () => {
    return this.props.steps.length;
  };

  isStepComplete(step:any) {
    return this.props.completed.has(step);
  }

  completedSteps() {
    return this.props.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isStepOptional = (step:any) => {
    return step === 1;
  };

  isStepSkipped(step:any) {
    return this.props.skipped.has(step);
  }

  skippedSteps() {
    return this.props.skipped.size;
	}

	_checkmarkClass(cls:string, ckd: string) {
		if (this.allStepsCompleted() ) {
			return cls + " " + ckd;
		}
		return cls;
	}

  render() {
    const { classes, sync, outgoing, commit, pull,next, back, complete, activeStep } = this.props;
    const steps = this.props.steps;

    return (
      <div className={classes.root}>

        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const props:any = {};
            const buttonProps:any = {};
            if (this.isStepOptional(index)) {
              buttonProps.optional = <Typography type="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>

                <StepButton
                  onClick={()=>this.props.step(index)}
                  completed={this.isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? (
            <div>

							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100">
								<polyline className={this._checkmarkClass(classes.check, classes.checked)} fill="none" stroke={LovliGreen['500']} stroke-width="10" stroke-miterlimit="20" points="15,60 40,80 85,20" />
							</svg>

							<Typography type="subheading" gutterBottom>
								Yeaahh Baby!
							</Typography>

            </div>
          ) : (
            <div>
              <div className={classes.instructions}>{getStepContent(activeStep, sync, outgoing, commit,pull, next, back, complete)}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}


const rootComponent = withStyles(styles)<{}>(SyncStepper);
export default rootComponent as any as React.StatelessComponent<SyncStepperProps>;
