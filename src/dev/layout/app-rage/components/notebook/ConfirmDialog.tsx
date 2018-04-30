import Button from "material-ui/Button"
import Dialog, { DialogActions, DialogContent, DialogTitle } from "material-ui/Dialog"
import { FormControlLabel } from "material-ui/Form"
import Radio, { RadioGroup } from "material-ui/Radio"
import * as React from "react"

export interface ConfirmOptionDialogState {
  selectedOption: string
}

export interface DialogOptionsType {
  dialogTitle: string
  cancelText: string
  okText: string
}

export interface ConfirmOptionDialogProps extends React.Component<any> {
  selectedOption: string
  options: string[]
  dialogOptions?: DialogOptionsType
  open: boolean
  onOptionDialogClose: (selectedOption: string, selectedAction: string) => void
}

//"Cancel", "Ok" action type should be enum, also dialogOptions needs to be mergeable

export class ConfirmOptionDialog extends React.Component<any, ConfirmOptionDialogState> {
  static defaultProps = {
    dialogOptions: {
      dialogTitle: "Coglite Dialog",
      cancelText: "Cancel",
      okText: "Ok",
    },
  }

  state = {
    selectedOption: "",
  }

  constructor(props, context) {
    super(props, context)

    this.state.selectedOption = this.props.selectedOption
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedOption !== this.props.selectedOption) {
      this.setState({ selectedOption: nextProps.selectedOption })
    }
  }

  handleEntering = () => {
    //no-op;
  }

  handleCancel = () => {
    this.props.onOptionDialogClose(this.props.selectedOption, "cancel")
  }

  handleOk = () => {
    this.props.onOptionDialogClose(this.state.selectedOption, "ok")
  }

  handleChange = (event, selectedOption) => {
    this.setState({ selectedOption })
  }

  render() {
    const { selectedOption, options, dialogOptions, open, ...other } = this.props
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={open}
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">{dialogOptions.dialogTitle}</DialogTitle>
        <DialogContent>
          <RadioGroup
            aria-label="ringtone"
            name="ringtone"
            value={this.state.selectedOption}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            {dialogOptions.cancelText}
          </Button>
          <Button onClick={this.handleOk} color="primary">
            {dialogOptions.okText}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
