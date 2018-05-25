import * as React from 'react';
import { Option } from 'react-select';
import VirtualizedSelect from 'react-virtualized-select'
import { VirtualizedOptionRenderOptions } from 'react-virtualized-select'

import { translate } from '../services/translation-service';

import { CenteredContent } from '../util/centered-content';

import { StepTypes } from '../models/workflow';

let injectSheet = require('react-jss').default;
import { editorStyles } from '../style';
//import {themeColors } from '../style';


const styles = (theme: any) => ({
    select: {
        composes: `${editorStyles.mediumSelect} native-key-bindings`,
    },
    title: {
        composes: theme.ide ? 'text-color': '',
        padding: 0,
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        lineHeight: '24px'
    },
    description: {
        composes: theme.ide ? 'text-color': '',
        padding: 0,
        margin: 0,
        fontSize: '14px',
        lineHeight: '16px'
    },
    option: {
        cursor: 'pointer',
        margin: 0,
        padding: '0 20px'
    },
    selected: {
        composes: 'selected',
    },
    focused: {
        composes: 'focused',
    }
});

const typeOptions = StepTypes.map(type => ({ value: type }));

export interface StepTypeSelectProps {
    type: string;
    onChange: (value: string) => void;
    classes?: any
}

@injectSheet(styles)
export class StepTypeSelect extends React.Component<StepTypeSelectProps, {}> {
    constructor(props) {
        super(props);
    }

    private valueRenderer = (option: Option) => {
        let classes = this.props.classes || {};

        return (
            <CenteredContent container={false}>
                <div className={classes.title}>
                    {translate('TYPE_NAME_' + (option.value as string).toUpperCase())}
                    </div>
                <div className={classes.description}>
                    {translate('TYPE_DESCRIPTION_' + (option.value as string).toUpperCase())}
                    </div>
            </CenteredContent>
        );
    }

    private optionRenderer = (options: VirtualizedOptionRenderOptions<any>) => {
        let option = options.option,
            classes = this.props.classes || {},
            focused = options.focusedOption == option,
            selected = options.valueArray.indexOf(option) > -1;
        return (
            <CenteredContent
                className={`${classes.option} ${focused ? classes.focused : ''} ${selected ? classes.selected : ''}`}
                key={options.key}
                onClick={() => options.selectValue(option)}
                onMouseOver={() => options.focusOption(option)}
                style={options.style}>
                <div className={classes.title}>
                    {translate('TYPE_NAME_' + (option.value as string).toUpperCase())}
                    </div>
                <div className={classes.description}>
                    {translate('TYPE_DESCRIPTION_' + (option.value as string).toUpperCase())}
                    </div>
            </CenteredContent>
        );
    }

    private placeholder() {
        return (<CenteredContent>
            {translate('PLACEHOLDER_TYPE')}
        </CenteredContent>);
    }

    public render() {
        let classes = this.props.classes || {};

        return (
            <VirtualizedSelect
                className={classes.select}
                clearable={false}
                options={typeOptions}
                optionRenderer={this.optionRenderer}
                searchable={false}
                optionHeight={70}
                maxHeight={400}
                placeholder={this.placeholder()}
                valueRenderer={this.valueRenderer}
                onChange={option => this.props.onChange((option as Option).value as string)}
                value={this.props.type} />
        )
    }
}
