/**
 * Component panel item
 */
import './style.scss';

import * as React from 'react';

import ComponentMeta from '../../../stores/ComponentMeta';


const { DragSource } = require('react-dnd');

const knightSource = {
    beginDrag(props) {
        return {
            detail: props.detail
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        props.onDropped(item.detail);
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

interface IActionMiniProps {
    detail: ComponentMeta;
    connectDragSource?: any;
    isDragging?: boolean;
    onDropped?: (id: string) => void;
}

@DragSource('ACTION', knightSource, collect)
export class ComponentItem extends React.Component<IActionMiniProps, {}> {
    public render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div
                className='pt-card pt-elevation-0 pt-interactive slate-component-item'
                style={{height: '65px', padding: '11px', marginBottom: '5px', marginRight: '5px', marginLeft: '5px'}}
            >
                <h6>
                    <a target='_blank' href={this.props.detail.documentationUrl}>
                        {!this.props.detail.snippet && <span className='pt-icon pt-icon-widget' />}
                        {this.props.detail.snippet && <span className='pt-icon pt-icon-code' />}
                        {' '}{this.props.detail.name}
                    </a>
                </h6>
                <p className='slate-component-description' title={this.props.detail.description}>
                    {this.props.detail.description}
                </p>
            </div>
        );
    }
}
