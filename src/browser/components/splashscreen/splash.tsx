
import * as React from 'react';

import { JupyterLabSession } from '../../../main/sessions';
import { TitleBar } from '../titlebar';


export namespace SplashScreen {
    export
    interface Props {
        finished: () => void;
        uiState: JupyterLabSession.UIState;
    }

    export
    interface State {
        fadeSplash: boolean;
    }
}

export
class SplashScreen extends React.Component<SplashScreen.Props, SplashScreen.State> {

    private fadeSplash: boolean = false;

    constructor(props: SplashScreen.Props) {
        super(props);
        this.state = {fadeSplash: false};
        this.finishIteration = this.finishIteration.bind(this);
    }

    private finishIteration(): void {
        if (this.fadeSplash)
            this.setState({fadeSplash: true});
    }
    
    fadeSplashScreen(): void {
        this.fadeSplash = true;
    }

    render() {
        const style = {
            animation: (this.state.fadeSplash ? 'fade .4s linear 0s forwards' : '')
        };
        const orbitComplete = this.state.fadeSplash ? null : this.finishIteration;
        const fadeAnim = this.state.fadeSplash ? this.props.finished : null;

        return (
            <div className="jpe-SplashScreen-body" style={style} onAnimationEnd={fadeAnim}>
                <TitleBar uiState={this.props.uiState} />
                <div className="jpe-SplashScreen-content">
                    <div className="jpe-SplashScreen-main-logo"></div>
                    <Moon name={'moon1'} orbitComplete={orbitComplete}/>
                    <Moon name={'moon2'}/>
                    <Moon name={'moon3'}/>
                </div>
            </div>
        );
    }
}

namespace Moon {
    
    export
    interface Props {
        name: string;
        orbitComplete?: () => void;
    }
}

function Moon(props: Moon.Props) {
    return (
    <div  id={props.name} className="jpe-SplashScreen-orbit" onAnimationIteration={props.orbitComplete}>
        <div className="jpe-SplashScreen-moon"></div>
    </div>
    );
}