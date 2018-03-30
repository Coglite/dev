/** Project panel component*/
import { Alert, Classes, Intent, ITreeNode, Tooltip, Tree } from '@blueprintjs/core';
import * as React from 'react';


interface IProjectPanelProps {
    files: string[];
    onNodeClick: (fileName: string) => void;
    activeFileName: string;
    isActiveFileDirty: boolean;
    entryFile: string;
    onDelete: (fileName: string) => void;
}

interface IProjectPanelState {
    isConfirmOpen: boolean;
}

export class ProjectPanel extends React.Component<IProjectPanelProps, IProjectPanelState> {
    public clickedNode: ITreeNode;
    constructor(props) {
        super(props);

        this.state = {
            isConfirmOpen: false
        };
    }

    public handleNodeClick = (node: ITreeNode) => {
        this.clickedNode = node;
        if (node.id !== this.props.activeFileName && this.props.activeFileName !== '' && this.props.isActiveFileDirty) {
           this.setState({
                    isConfirmOpen: true
            });
        } else {
            this.props.onNodeClick(this.clickedNode.id as string);
        }
    }

    public handleConfirm = () => {
        this.props.onNodeClick(this.clickedNode.id as string);
        this.setState({
            isConfirmOpen: false
        });
    }

    public handleCancel = () => {
        this.setState({
            isConfirmOpen: false
        });
    }

    public handleDelete = (file: string, e) => {
        this.props.onDelete(file);
        e.stopPropagation();
    }

    public render() {
        const nodes: ITreeNode = {
            id: 'asas',
            iconName: 'folder-close',
            isExpanded: true,
            label: 'project',
            childNodes: [],
        };

        this.props.files.forEach((file, i) => {
            const isDirtyLabel = file === this.props.activeFileName && this.props.isActiveFileDirty ? '*' : '';
            const secondaryLabel = this.props.entryFile === file ? (
                <Tooltip content='Webpack entry file can not be deleted'>
                        <span className='pt-icon-standard pt-icon pt-icon-lock'/>
                </Tooltip>
            ) : (
                 <Tooltip content='Delete'>
                        <span
                            className='pt-icon-standard pt-icon pt-icon-small-cross'
                            onClick={this.handleDelete.bind(this, file)}
                        />
                </Tooltip>
            );
            nodes.childNodes.push({
                id: file,
                iconName: 'document',
                label: `${file} ${isDirtyLabel}`,
                isSelected: this.props.activeFileName === file,
                secondaryLabel
            });
        });


        return (
            <div>
                <Tree
                    contents={[nodes]}
                    className={Classes.ELEVATION_0}
                    onNodeClick={this.handleNodeClick}
                />
                <Alert
                    intent={Intent.PRIMARY}
                    isOpen={this.state.isConfirmOpen}
                    confirmButtonText='Yes'
                    cancelButtonText='Nop'
                    onConfirm={this.handleConfirm}
                    onCancel={this.handleCancel}
                >
                    <p>
                        There are un-saved changes. Are you sure you want to cotinue?
                    </p>
                </Alert>
            </div>
        );
    }
}
