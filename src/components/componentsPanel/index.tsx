
import './style.scss';

import { observer } from 'mobx-react';
import * as React from 'react';

import { ISnippet } from '../../services/snippetService';
import ComponentMeta from '../../stores/ComponentMeta';
import ComponentItem from './item';
import SnippetItem from './snippetItem';


interface IComponentPanelProps {
    components: ComponentMeta[];
    onDropped: (code: any) => void;
    onSnippetDropped: (code: string) => void;
    onSearchTextChange: (text: string) => void;
    searchText: string;
    snippets: ISnippet[];
}

@observer
export default class ComponentsPanel extends React.Component<IComponentPanelProps, {}> {

    public handleSearch = (e) => {
        const val = e.target.value;
        this.props.onSearchTextChange(val);
    }

    public handleSnippetDrop  = (detail: ISnippet) => {
        this.props.onSnippetDropped(detail.code);
    }

    public render() {
        const components = this.props.components
        .filter(item => {
            if (item.isVisibleInComponentPanel === undefined) {
                return true;
            }

            return item.isVisibleInComponentPanel;
        })
        .map(component => {
            return (
                <ComponentItem
                    detail={component}
                    onDropped={this.props.onDropped}
                />
            );
        });

        const snippets = this.props.snippets.map(snippet => {
            return (
                <SnippetItem
                    detail={snippet}
                    onDropped={this.handleSnippetDrop}
                />
            );
        });

        return (
            <div className='pt-card' style={{ height: '100%', padding: '10px' }}>
                <div className='pt-input-group' style={{ marginBottom: '10px' }}>
                    <span className='pt-icon pt-icon-search' />
                    <input
                        className='pt-input'
                        type='search'
                        placeholder='Search components...'
                        dir='auto'
                        onChange={this.handleSearch}
                        value={this.props.searchText}
                    />
                </div>
                <div style={{height: '75vh', overflow: 'auto'}}>
                    <div className='components-header'>Snippets</div>
                    {snippets}
                    <div className='components-header'>Components from the kit</div>
                    {components}
                </div>
            </div>
        );
    }
}
