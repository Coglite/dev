import * as React from 'react';
import { observer } from 'mobx-react';

const InfoCircle = require('react-icons/lib/fa/info-circle');
const ReactTooltip = require('react-tooltip');
let injectSheet = require('react-jss').default;

var tooltipCount = 0;

export interface TooltipProps {
    onClose?: () => void;
    className?: string;
    classes?: any;
}
const styles = (theme: any) => ({
    solid: {
        composes: 'tooltip',
        pointerEvents: 'auto !important',
        '&:hover': {
            visibility: 'visible !important',
            opacity: '1 !important'
        }
    }
});

@injectSheet(styles)
@observer
export class InfoTooltip extends React.Component<TooltipProps, {}> {
    private tooltipId: string;
    constructor(props: TooltipProps) {
        super(props);
        this.tooltipId = 'InfoTooltip-'+tooltipCount++;
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    componentDidMount() {
        ReactTooltip.rebuild();
    }

    public render() {
        let classes = this.props.classes || {};
        return <span
            data-tip=""
            data-for={this.tooltipId}
            data-delay-hide={300}
            data-effect={'solid'}
            data-class={classes.solid}
            className={this.props.className || ''}>
            <InfoCircle />
            <ReactTooltip id={this.tooltipId}>
                {this.props.children}
            </ReactTooltip>
        </span>
    }
}

//import { computed } from 'mobx';