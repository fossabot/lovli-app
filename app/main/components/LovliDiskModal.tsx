import * as React from 'react';

import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { Sync } from '../../sync/model';
import Typography from 'material-ui/Typography/Typography';
import Modal from 'material-ui/Modal/Modal';
import { CSSProperties } from 'react';

type withStyleProps = 'root' ;


interface LovliDiskModalState {
	open: boolean;
};
interface LovliDiskModalProps {
	sync: Sync;
};


const styles: StyleRulesCallback<withStyleProps> = (theme) => ({

	root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
	}),
})



class LovliDiskModal extends React.Component<LovliDiskModalProps & WithStyles<withStyleProps>, LovliDiskModalState> {
	state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
	};

	_getModalStyle = () => {
		const top = 50;
		const left = 50;

		return {
			position: 'absolute',
			width: 8 * 50,
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
			border: '1px solid #e5e5e5',
			backgroundColor: '#fff',
			boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
			padding: 8 * 4,
		} as CSSProperties;
	}


  render() {
		return (
			<div>
        <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={this._getModalStyle()}>
            <Typography type="title" id="modal-title">
              Text in a modal
            </Typography>
            <Typography type="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
      </div>
		);
  }
}


const rootComponent = withStyles(styles)<{}>(LovliDiskModal);
export default rootComponent as any as React.StatelessComponent<LovliDiskModalProps>;
