/**
 * Left panel component
 */
import * as React from 'react';

import { ISnippet } from '../../services/snippetService';
import ComponentMeta from '../../stores/ComponentMeta';
import {ComponentsPanel} from '../componentsPanel';
import {ProjectPanel} from '../projectPanel';


interface ILeftPanelProps {
    components: ComponentMeta[];
    onDropped: (code: any) => void;
    onSnippetDropped: (code: string) => void;
    onSearchTextChange: (text: string) => void;
    searchText: string;
    files: string[];
    onNodeClick: (fileName: string) => void;
    activeFileName: string;
    isActiveFileDirty: boolean;
    onDelete: (fileName: string) => void;
    entryFile: string;
    snippets: ISnippet[];
}

export class LeftPanel extends React.Component<ILeftPanelProps, {}> {
    public render() {
        return (
            <div className='pt-card' style={{ height: '100%', padding: '0px' }}>
                <ProjectPanel
                    files={this.props.files}
                    onNodeClick={this.props.onNodeClick}
                    activeFileName={this.props.activeFileName}
                    isActiveFileDirty={this.props.isActiveFileDirty}
                    onDelete={this.props.onDelete}
                    entryFile={this.props.entryFile}
                />
                <ComponentsPanel
                    {...this.props}
                />
            </div>
        );
    }
}
