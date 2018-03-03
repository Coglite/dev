import * as React from 'react';

const increment = (arg: number): number => arg + 1;

export interface HelloProps { compiler: string; framework: string;
}

export class Main extends React.Component<HelloProps, { counter: number }> {
  constructor(props: HelloProps) {
    super(props);
    this.state = {counter: 0};
  }

  private btnClick = (): boolean => {
    this.setState({counter: increment(this.state.counter)});
    return false;
  };

  render() {
    return <h1 onClick={this.btnClick}>Hello from {this.props.compiler} and {this.props.framework}! Click counter is {this.state.counter}</h1>;
  };
}
