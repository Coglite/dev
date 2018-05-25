import * as React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

const Remove = require('react-icons/lib/fa/times-circle');

import { WorkflowStepSimple } from '../../models/workflow';
import { Volume } from '../../models/workflow';
import { VolumeEditor } from './volume-editor';
import { mediaQueries } from '../../style';

let injectSheet = require('react-jss').default;

const jssStyles = (theme: any) => {
    return {
        fieldBlock: {
            composes: 'pure-g block-force base-border-color component-padding-bottom',
            borderBottomWidth: theme.ide ? '1px' : '0px',
            borderBottomStyle: 'solid',
    
            '&:last-child': {
                borderBottom: 'none',
                paddingBottom: '0px'
            },
    
            [mediaQueries.lg]: {
                borderBottom: 'none',
                paddingBottom: '0px'
            }
        },
        optionSettings: {
            composes: 'pure-u-1 pure-u-lg-1-6',
            textAlign: 'right',
            paddingLeft: '0px',
    
            [mediaQueries.lg]: {
                paddingLeft: '10px'
            }
        },
        deleteButton: {
            composes: theme.ide ? 'btn btn-error btn-block' : 'pure-button danger',
            width: '100%',
            display: 'block',
    
            '& > svg': {
                position: 'relative',
                display: 'inline-block',
                top: '-0.10em'
            }
        },
        editorDiv: {
            composes: 'pure-u-1 pure-u-lg-5-6'
        }
    };
};

export interface EnvironmentOptionsProps {
    step: WorkflowStepSimple;
    ide: boolean;
    classes?: any;
}

class EditorState {
    constructor(
        private step: WorkflowStepSimple,
        private volume: Volume,
        public committed: boolean) {
    }

    commitIfNecessary() {
        if (!this.committed) {
            if (!this.step.volumes) {
                this.step.volumes = [];
            }

            this.step.volumes.push(this.volume);
            this.committed = true;
        }
    }
}

class EditorVolume implements Volume {
    @observable mountPath?: string = '';
    @observable hostPath?: string = '';
}

@injectSheet(jssStyles)
@observer
export class VolumeOptions extends React.Component<EnvironmentOptionsProps, {}> {
    constructor(props: EnvironmentOptionsProps) {
        super(props);
    }

    private get volumes() {
        return this.props.step.volumes;
    }

    @action
    private remove(volume: Volume) {
        this.volumes.splice(this.volumes.indexOf(volume), 1);
    }

    private volumeEditor(volume: Volume, key: number, committed: boolean) {
        let state = new EditorState(this.props.step, volume, committed),
            classes = this.props.classes,
            editor = (<VolumeEditor
            volume={volume}
            onChange={() => state.commitIfNecessary()} />);

        return (<div className={classes.fieldBlock} key={key}>

            <div className={classes.editorDiv}>{editor}</div>
            <div className={classes.optionSettings}>
                {committed && this.deleteButton(volume)}
            </div>
        </div>);
    }

    private deleteButton (volume: Volume) {
        return <div className="pure-g">
                <div className="pure-u-1-4 pure-u-lg-0">
                </div>
                <div className="pure-u-3-4 pure-u-lg-1">
                    <button 
                        className={this.props.classes.deleteButton} 
                        onClick={e => this.remove(volume)}>
                        <Remove /> Remove
                    </button>
                </div>
            </div>;
    }

    private sourceEditors() {
        let editors = [];

        if (this.volumes) {
            for (let i = 0; i <= this.volumes.length; i++) {
                let volume = undefined;
                let committed = false;

                if (i < this.volumes.length) {
                    volume = this.volumes[i];
                    committed = true;
                } else {
                    volume = new EditorVolume();
                }

                editors.push(this.volumeEditor(volume, i, committed));
            }
        } else {
            editors.push(this.volumeEditor(new EditorVolume(), 0, false));
        }

        return editors;
    }

    public render() {
        //let classes = this.props.classes || {}
        return (<div>
            {this.sourceEditors()}
        </div>);
    }
}

//import { Options } from '../options';
//import { translate } from '../../services/translation-service';
//const Text = require('react-icons/lib/fa/font');
//const File = require('react-icons/lib/fa/file-text-o');