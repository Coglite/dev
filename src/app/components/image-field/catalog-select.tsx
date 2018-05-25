import * as React from 'react';
import * as select from 'react-select';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import VirtualizedSelect from 'react-virtualized-select';
import { VirtualizedOptionRenderOptions } from 'react-virtualized-select';
let injectSheet = require('react-jss').default;

import { translate } from '../../services/translation-service';
import { editorStyles } from '../../style';
import { CenteredContent } from '../../util/centered-content';
import { CatalogImage } from '../../models/catalog';

//import { themeColors } from '../../style';
//import { EditorState } from '../../models/state';
//import { WorkflowStepSimple } from '../../models/workflow';


const jssStyles = (theme: any) => ({
    select: {
        composes: `${editorStyles.largeSelect} ${editorStyles.imageSelect}`,
        
        '& .Select-control .Select-value': {
            paddingLeft: '160px'
        },

        '& .Select-menu-outer $option': {
            paddingLeft: '160px'
        },
    },
    title: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        lineHeight: '24px'
    },
    placeholder: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '16px',
        lineHeight: '24px'
    },
    description: {
        composes: theme.ide ? 'text-color' : '',
        paddingRight: '20px',
        margin: 0,
        fontSize: '14px',
        lineHeight: '16px',
        whiteSpace: 'normal'
    },
    logo: {
        position: 'absolute',
        top: '10px',
        bottom: '10px',
        left: '20px',
        width: '120px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
        backgroundColor: 'white',
        border: '3px solid white',
    },
    option: {
        cursor: 'pointer',
        margin: 0,
        padding: '0 20px',
    },
    selected: {
        composes: 'selected',
    },
    focused: {
        composes: 'focused',
    }
});

const catalogBase = 'https://s3-eu-west-1.amazonaws.com/dev.stack.foundation/catalog/';

class ImageOption implements select.Option {
    label?: string;
    value?: string | number | boolean;
    clearableValue?: boolean;
    disabled?: boolean;
    image: CatalogImage;

    constructor(option: Partial<ImageOption>) {
        Object.assign(this, option);
    }
}

export interface CatalogSelectProps {
    className?: string,
    onChange: (value: CatalogImage) => void, 
    value: string, 
    catalog: CatalogImage[]
    classes?: any
}

@injectSheet(jssStyles)
@observer
export class CatalogSelect extends React.Component<CatalogSelectProps, {}> {
    constructor(props: CatalogSelectProps) {
        super(props);
    }

    private valueRenderer = (option: ImageOption) => {
        const classes = this.props.classes || {};

        return (
            <CenteredContent container={false}>
                <div className={classes.title}>{option.image.title}</div>
                <div className={classes.description}>{option.image.description}</div>
                <div className={classes.logo} style={
                    { backgroundImage: 'url(' + catalogBase + option.image.name + '.png)' }
                }>
                </div>
            </CenteredContent>
        );
    }

    private optionRenderer = (options: VirtualizedOptionRenderOptions<any>) => {
        let option = options.option;
        const classes = this.props.classes || {},
            focused = options.focusedOption == option,
            selected = options.valueArray.indexOf(option) > -1;

        return (
            <CenteredContent
                className={`${classes.option} ${focused ? classes.focused : ''} ${selected ? classes.selected : ''}`}
                key={options.key}
                onClick={() => options.selectValue(option)}
                onMouseOver={() => options.focusOption(option)}
                style={options.style}>
                <div className={classes.title}>{option.image.title}</div>
                <div className={classes.description}>{option.image.description}</div>
                <div className={classes.logo} style={
                    { backgroundImage: 'url(' + catalogBase + option.image.name + '.png)' }
                }>
                </div>
            </CenteredContent>
        );
    }

    @computed private get options() {
        return this.props.catalog ?
            this.props.catalog
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(image => new ImageOption({ image: image, value: image.name })) :
            [];
    }

    @computed private get selectedOption() {
        return this.options.find(el => el.image.name === this.props.value);
    }

    private placeholder() {
        return (<CenteredContent>
            <div className={this.props.classes.placeholder}>{translate('PLACEHOLDER_IMAGE')}</div>
        </CenteredContent>);
    }

    public render() {
        const classes = this.props.classes || {};

        return (
            <VirtualizedSelect
                className={`native-key-bindings ${classes.select} ${this.props.className || ''}`}
                options={this.options}
                optionRenderer={this.optionRenderer}
                searchable={false}
                optionHeight={100}
                placeholder={this.placeholder()}
                maxHeight={400}
                clearable={false}
                valueRenderer={this.valueRenderer}
                onChange={option => this.props.onChange((option as ImageOption).image)}
                value={this.selectedOption} />
        )
    }
}
