/**
 * Home view
 */
import './style.scss';
import '@blueprintjs/core/dist/blueprint.css';
import 'flexboxgrid/css/flexboxgrid.css';

import { inject, observer } from 'mobx-react';
import * as React from 'react';

import Editor from '../components/editor';
import InsightPanel from '../components/insightPanel';
import LeftPanel from '../components/leftPanel';
import NavBar from '../components/nabBar';
import Notification from '../components/notification';
import getSnippets from '../services/snippetService';
import { ConfigStore } from '../stores/config/ConfigStore';
import { EditorSession } from '../stores/EditorSessionStore';
import { WorkspaceStore } from '../stores/WorkspaceStore';

const { DragDropContext } = require('react-dnd');
const Html5Backend = require('react-dnd-html5-backend');
interface IHomeProps {
    editorSessionStore?: EditorSession;
    configStore?: ConfigStore;
    workspaceStore?: WorkspaceStore;
}

@inject('editorSessionStore')
@inject('configStore')
@inject('workspaceStore')
@DragDropContext(Html5Backend)
@observer
export default class Home extends React.Component<IHomeProps, {}> {
    public editor: any;

    public onComponentDroppedOnEditor = (detail: any) => {
        if (detail.snippet) {
            this.editor.handler.component.insertInCursor(detail.snippet);
        } else {
            this.editor.handler.component.insertInCursor(this.props.editorSessionStore.getComponentSnippet(detail));
        }
        this.props.editorSessionStore.addImport(detail.exported);
    }

    public onSnippetDroppedOnEditor = (code: string) => {
        this.editor.handler.component.insertInCursor(code);
    }

    public render() {
        const { editorSessionStore, configStore, workspaceStore } = this.props;
        return (
            <div className='container-fluid app-container'>
                <Notification
                    message={configStore.notification.message}
                    notificationType={configStore.notification.notificationType}
                />
                <div className='row'>
                    <NavBar
                      componentKitsConfigs={configStore.installedComponentKits}
                      activeComponentKit={configStore.activeComponentKit}
                      onComponentKitChange={configStore.setActiveComponentKit}
                      onModuleInstall={configStore.installModule}
                      dependencies={editorSessionStore.dependencies}
                      onModuleUninstall={configStore.uninstallModule}
                      isInProgress={configStore.isInProgress}
                      componentKitInfo={configStore.componentKitInfo}
                      onComponentInstall={configStore.installComponentKit}
                      onComponentUnInstall={configStore.uninstallComponentKit}
                      onCreateFile={configStore.createFile}
                      webpackPort={configStore.webpackPort}
                    />
                </div>
                <div className='row' style={{marginTop: '50px'}}>
                    <div className='col-md-2 componentPanel'>
                        <LeftPanel
                            components={editorSessionStore.filteredComponent}
                            onDropped={this.onComponentDroppedOnEditor}
                            onSnippetDropped={this.onSnippetDroppedOnEditor}
                            searchText={editorSessionStore.componentSearchText}
                            onSearchTextChange={editorSessionStore.setFitlerText}
                            files={workspaceStore.files}
                            onNodeClick={configStore.readProjectFile}
                            activeFileName={workspaceStore.activeFile}
                            isActiveFileDirty={editorSessionStore.IsDirty}
                            onDelete={configStore.deleteProfileFile}
                            entryFile={workspaceStore.entryFile}
                            snippets={getSnippets()}
                        />
                    </div>
                    <div className='col-md-7 editorPanel'>
                        {workspaceStore.activeFile !== '' && <Editor
                            ref={editor => this.editor = editor}
                            onChange={editorSessionStore.setCode}
                            code={editorSessionStore.code}
                            onClick={editorSessionStore.findNode}
                            onSave={configStore.writeCode}
                            mode={workspaceStore.editorMode}
                        />}
                    </div>
                    <div className='col-md-3 propertyPanel'>
                        <InsightPanel
                            componentInfo={editorSessionStore.componentsMeta}
                            componentProps={editorSessionStore.props}
                            componentNode={editorSessionStore.componentNode}
                            onChange={editorSessionStore.regenerateCode}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
