import {
    AnchorButton,
    Button,
    Dialog,
    Intent,
    Popover,
    PopoverInteractionKind,
    Position,
    Tab,
    Tabs,
} from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { ComponentKitConfig } from '../../stores/ComponentKitConfig';
import { ConfigStore } from '../../stores/ConfigStore';
import { IPackageDependency } from '../../stores/EditorSessionStore';
import { InstalledPluginPanel, UninstalledPluginPanel } from './PluginPanels';



interface INavBarProps {
    componentKitsConfigs: ComponentKitConfig[];
    activeComponentKit: ComponentKitConfig;
    onComponentKitChange: (componentKitKey: string) => void;
    onModuleInstall: (name: string) => void;
    dependencies: IPackageDependency;
    onModuleUninstall: (name: string) => void;
    isInProgress: boolean;
    config: ConfigStore;
    onComponentInstall: (name: string) => void;
    onComponentUnInstall: (name: string) => void;
    onCreateFile: (name: string) => void;
    webpackPort: number;
}

interface INavBarState {
    isModalOpen?: boolean;
    newKitName?: string;
}

@inject('configStore')
@observer
export class NavBar extends React.Component<INavBarProps, INavBarState> {
    public fileNameInput: HTMLInputElement;
    
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            newKitName: ''
        };
    }
    
     getPreferenceComponentContent(){
        const installedKits = this.props.config.componentKitInfo.installedKits.map((item) => {
            return (
                <tr>
                    <td>{item.label}</td>
                    <td>{item.version}</td>
                    <td>
                        <a onClick={this.props.onComponentUnInstall.bind(null, item.name)}>Uninstall</a>
                    </td>
                </tr>
            );
        });

        const uninstalledKits = this.props.config.componentKitInfo.uninstalledKits.map((item) => {
            return (
                <tr>
                    <td>{item.label}</td>
                    <td>
                        <a onClick={this.props.onComponentInstall.bind(null, item.name)}>Install</a>
                    </td>
                </tr>
            );
        });
        
        return (
            <div>
                <Tabs id="InstalledPlugins">
                        <Tab
                        id="InstalledPlugins"
                        panel={<InstalledPluginPanel/>}
                        >Installed Kits</Tab>
                        <Tab
                        id="InstallNewPlugins"
                        panel={<UninstalledPluginPanel/>}
                        >Install New Kits</Tab>
                </Tabs>
                {this.props.isInProgress && <div className='pt-progress-bar'>
                    <div className='pt-progress-meter' />
                </div>}
            </div>
        );
    }

    public handleModuleInstall = (e) => {
        if (e.key === 'Enter') {
            this.props.onModuleInstall(e.target.value);
            e.target.value = '';
        }
    }

    getNodeModuleComponentContent() {
        const dependencies = this.props.dependencies.dependencies.map((dependency) => {
            return (
                <tr>
                    <td>{dependency.name}</td>
                    <td>{dependency.version}</td>
                    <td>
                        <a onClick={this.props.onModuleUninstall.bind(this, dependency.name)}>
                            Uninstall
                        </a>
                    </td>
                </tr>
            );
        });

        const devDependencies = this.props.dependencies.devDependencies.map((dependency) => {
            return (
                <tr>
                    <td>{dependency.name}</td>
                    <td>{dependency.version}</td>
                    <td>
                        <a onClick={this.props.onModuleUninstall.bind(this, dependency.name)}>
                            Uninstall
                        </a>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <div className='pt-input-group'>
                    <span className='pt-icon pt-icon-download' />
                    <input
                        type='text'
                        className='pt-input'
                        placeholder='Install node module'
                        onKeyPress={this.handleModuleInstall}
                        />
                    <table className='pt-table pt-condensed pt-bordered'>
                        <tbody>
                            {dependencies}
                            {devDependencies}
                        </tbody>
                    </table>
                    {this.props.isInProgress && <div className='pt-progress-bar'>
                        <div className='pt-progress-meter' />
                    </div>}
                </div>
            </div>
        );
    }

    public handleDialogClose(){
        this.setState({
            isModalOpen: false
        });
    }

    public handleKitChange = (name: string) => {
        this.setState({
            isModalOpen: true,
            newKitName: name
        });
    }

    public handleKitChangeConfirm(){
        this.setState({
            isModalOpen: false
        });

        this.props.onComponentKitChange(this.state.newKitName);
    }

    public handleFileCreation = (e) => {
        this.props.onCreateFile(this.fileNameInput.value);
        this.fileNameInput.value = '';
    }

    public handlePreviewLinkClick(){

    }

    public render() {
        const componentKitList = (
            <ul className='pt-menu pt-elevation-1'>
                {this.props.componentKitsConfigs.map(item => {
                    return (
                        <li onClick={() => { this.handleKitChange(item.name) } }>
                            <a
                                className='pt-menu-item pt-icon-control'
                            >
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );

        return (
            <nav className='pt-navbar pt-dark pt-fixed-top'>
                <div className='pt-navbar-group pt-align-left'>
                    <div className='pt-navbar-heading'>
                        <span className='pt-icon-standard pt-icon-layers' />
                        {' React Slate'}
                    </div>
                    <Popover
                        content={componentKitList}
                        interactionKind={PopoverInteractionKind.CLICK}
                        position={Position.BOTTOM}
                        >
                        <button type='button' className='pt-button'>
                            <span className='pt-icon-standard pt-icon-control' />
                            {this.props.activeComponentKit.label}
                            <span className='pt-icon-standard pt-icon-caret-down pt-align-right' />
                        </button>
                    </Popover>
                    <span className='pt-navbar-divider' />
                    <Popover
                        usePortal={false}
                        content={this.getNodeModuleComponentContent()}
                        popoverClassName='pt-popover-content-sizing'
                        interactionKind={PopoverInteractionKind.CLICK}
                        position={Position.BOTTOM_RIGHT}
                        >
                        <button type='button' className='pt-button'>
                            <span className='pt-icon-standard pt-icon-add' />
                            Node modules
                        </button>
                    </Popover>
                    <span className='pt-navbar-divider' />
                    <div className='pt-control-group'>
                        <div className='pt-input-group'>
                            <span className='pt-icon pt-icon-new-object' />
                            <input
                                ref={ele => this.fileNameInput = ele}
                                type='text'
                                className='pt-input'
                                placeholder='Create New File'
                            />
                        </div>
                         <button
                            className='pt-button pt-intent-primary'
                            onClick={this.handleFileCreation}
                        >
                            Create
                        </button>
                    </div>
                </div>
                <div className='pt-navbar-group pt-align-right'>
                    <AnchorButton
                        text={`http://localhost:${this.props.webpackPort}`}
                        icon='application'
                        className='pt-minimal'
                        onClick={this.handlePreviewLinkClick}
                        href={`http://localhost:${this.props.webpackPort}`}
                        target='_blank'
                    />
                    <span className='pt-navbar-divider' />
                    <Popover
                        content={this.getPreferenceComponentContent()}
                        popoverClassName='pt-popover-content-sizing'
                        interactionKind={PopoverInteractionKind.CLICK}
                        position={Position.BOTTOM_RIGHT}
                        >
                        <button className='pt-button pt-minimal pt-icon-cog' />
                    </Popover>
                </div>
                <Dialog
                    icon='inbox'
                    isOpen={this.state.isModalOpen}
                    onClose={this.handleDialogClose}
                    title='Are you sure?'
                    >
                    <div className='pt-dialog-body'>
                        You will lose your work in the slate. Are you sure?
                    </div>
                    <div className='pt-dialog-footer'>
                        <div className='pt-dialog-footer-actions'>
                            <Button text='Yes' onClick={this.handleKitChangeConfirm} />
                            <Button intent={Intent.PRIMARY} text='No' onClick={this.handleDialogClose} />
                        </div>
                    </div>
                </Dialog>
            </nav>
        );
    }
}

