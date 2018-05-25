import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import { translate } from '../../services/translation-service';
import { WorkflowStepSimple, Workflow, UXImageSourceType } from '../../models/workflow';
import { Options } from '../options';
import { CatalogImageField, parseImage } from './catalog-image-field';
import { ManualImageField } from './manual-image-field';
import { StepImageField } from './step-image-field';


import { CatalogImage } from "../../models/catalog";

let injectSheet = require('react-jss').default;

const styles = (theme: any) => ({
    editor: {
        marginTop: '8px'
    }
});

export interface ImageFieldProps {
    ide: boolean,
    catalog: CatalogImage[],
    workflow: Workflow,
    step: WorkflowStepSimple,
    classes?: any
}

@injectSheet(styles)
@observer
export class ImageField extends React.Component<ImageFieldProps, {}> {
    constructor(props: ImageFieldProps) {
        super(props);
    }

    private get imageSource(): UXImageSourceType {
        if (this.props.step.imageSource == 'step') {
            return this.props.step.imageSource;
        }
        
        let isCatalogImage = this.props.step.transient.imageSourceTypeSelected === undefined ?
            this.isImageInCatalog() : this.props.step.transient.imageSourceTypeSelected === 'catalog';

        return isCatalogImage ? 'catalog' : 'manual';
    }

    @action
    private setImageSource(source: UXImageSourceType) {
        this.props.step.transient.imageSourceTypeSelected = source;
        this.props.step.imageSource = source === 'step' ? 'step' : 'image';
    }

    private imageSourceOption(source: UXImageSourceType) {
        return {
            value: source,
            display: (<span>{translate('SOURCE_' + source.toUpperCase())}</span>)
        };
    }

    private options() {
        let options = [
            this.imageSourceOption('catalog'),
            this.imageSourceOption('manual')
        ];

        if (this.props.workflow.stepsBefore(this.props.step).length > 0) {
            options.push(this.imageSourceOption('step'));
        }

        return options;
    }

    private isImageInCatalog () {
        let catalog = this.props.catalog || [],
            image = parseImage(this.props.step.image);

        let catalogImage = catalog.find(catEntry => catEntry.name === image.image);
        if (catalogImage) {
            let tag = catalogImage.tags.find(tag => tag === image.tag);
            if (tag) {
                return true;
            }
        }

        return false;
    }

    private selectedEditor() {
        switch (this.imageSource) {
            case 'step':
                return (<StepImageField 
                        step={this.props.step} 
                        workflow={this.props.workflow}>
                    </StepImageField>)
            case 'manual':
                return (<ManualImageField step={this.props.step}></ManualImageField>)
            default:
                return (<CatalogImageField 
                        catalog={this.props.catalog} 
                        step={this.props.step} 
                        workflow={this.props.workflow}>
                    </CatalogImageField>)
        }
    }

    public render() {
        let classes = this.props.classes || {};
        return (
            <div>
                <Options
                    ide={this.props.ide}
                    fill={true}
                    options={this.options()}
                    onChange={a => this.setImageSource(a.value)}
                    selected={this.imageSource} />
                <div className={classes.editor}>
                    {this.selectedEditor()}
                </div>
            </div>);
    }
}

//import { EditorState } from '../../models/state';
//import { editorStyles, themeColors } from '../../style';
//import { ImageSource } from '../../models/workflow';
