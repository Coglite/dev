/**Panel which shows context aware details*/
import './style.scss';

import { observer } from 'mobx-react';
import * as React from 'react';

import ComponentMeta from '../../stores/ComponentMeta';
import { IEditorSessionComponentProps } from '../../stores/EditorSessionStore';
import { Row } from './Row';


interface IInsightPanelProps {
    componentInfo: ComponentMeta;
    componentProps: IEditorSessionComponentProps[];
    componentNode: any;
    onChange: () => void;
}

@observer
export class InsightPanel extends React.Component<IInsightPanelProps, {}> {
    public render() {
        const rows = this.props.componentProps.map(item => {
            return <Row componentProps={item} componentNode={this.props.componentNode} onChange={this.props.onChange}/>;
        });
        return (
            <div className='pt-card ' style={{ height: '100%', display: 'flex' }}>
                {this.props.componentNode && this.props.componentInfo && <div className='property-panel'>
                    <h5>
                        {this.props.componentInfo.name} {' '}
                        <span className='pt-icon-standard pt-icon-document-open' title='Open component documentation'/>
                    </h5>
                    <p>{this.props.componentInfo.description}</p>
                    <table className='pt-table pt-interactive pt-bordered pt-striped' style={{width: '100%'}}>
                        <thead>
                            <th>Props</th>
                            <th>Description</th>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>}
                {!this.props.componentNode && <div className='pt-non-ideal-state'>
                    <div className='pt-non-ideal-state-visual pt-non-ideal-state-icon'>
                        <span className='pt-icon pt-icon-code-block' />
                    </div>
                    <h4 className='pt-non-ideal-state-title'>Opps! It's empty in here.</h4>
                    <div className='pt-non-ideal-state-description'>
                        Click on a component in the editor.
                    </div>
                </div>}
            </div>
        );
    }
}
