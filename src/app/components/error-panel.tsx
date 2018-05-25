import * as React from 'react';
import { observer } from 'mobx-react';

const CloseIcon = require('react-icons/lib/go/x');

let injectSheet = require('react-jss').default;
import {  errorStyles } from '../style';

const styles = (theme: any) => {
    return errorStyles(theme);
};

export interface ErrorPanelProps {
    onClose?: () => void;
    message: string;
    classes?: any;
}

@injectSheet(styles)
@observer
export class ErrorPanel extends React.Component<ErrorPanelProps, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        let classes = this.props.classes;

        return <div className="block">
            <div className={classes.errorPanel}>
                {this.props.message}
                <div onClick={() => this.props.onClose && this.props.onClose()} className={classes.errorPanelClose}><CloseIcon/></div>
            </div>
        </div>
    }
}

// import { computed } from 'mobx';
//import { editorStyles, themeColors } from '../style';
//import { translate } from '../services/translation-service';