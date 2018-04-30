import * as React from "react"
import { Slider } from "rmwc/Slider"

export interface CustomSliderProps {
  onSliderUpdate: (number) => void
  initialValue?: number
  min: number
  max: number
}

export interface CustomSliderState {
  sliderValue: number
}

export class CustomSlider extends React.Component<CustomSliderProps, CustomSliderState> {
  state = {
    sliderValue: this.props.min,
  }

  constructor(props) {
    super(props)
    if (this.props.initialValue) this.state.sliderValue = this.props.initialValue
  }

  handleSliderValue(sliderValue) {
    this.setState({ sliderValue: sliderValue })
    this.props.onSliderUpdate(sliderValue)
  }

  render() {
    const { min, max } = this.props
    return (
      <Slider
        value={this.state.sliderValue}
        min={min}
        max={max}
        onChange={evt => this.handleSliderValue(evt.target.value)}
      />
    )
  }
}
