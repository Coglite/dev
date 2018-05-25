import * as React from 'react';
import { observer } from 'mobx-react';
let injectSheet = require('react-jss').default;
import { themeColors, mediaQueries } from '../style';


const activeOption = {
    fontWeight: 'bold',
    color: themeColors.fadedGreen,
    borderBottom: 'solid 3px ' + themeColors.fadedGreen,
    background: 'none'
};

const activeSelectedOption = {
    fontWeight: 'bold',
    color: themeColors.darkerGreen,
    borderBottom: 'solid 3px ' + themeColors.darkerGreen,
    background: 'none'
};

const styles = (theme: any) => {
    let out: any;
    if (theme.ide) {
        out = {
            optionsList: {
                composes: 'btn-group'
            },
            option: {
                composes: 'btn'
            },
            selected: {
                composes: 'btn selected'
            },
            fullWidth: {
                width: '100%'
            },
        };
    }
    else {
        out = {
            optionsList: {
                composes: 'pure-menu-list select-list'
            },
            fullWidth: {
                width: '100%'
            },
            option: {
                composes: 'pure-menu-link',
                color: '#aaa',
                fontWeight: 'bold',
                borderBottom: 'solid 3px transparent',
                'a&': {
                    color: '#aaa',
                },
                '&:hover': activeOption,
                '&:focus': {
                    background: 'none',
                    color: '#aaa',
                    fontWeight: 'bold'
                }
            },
            selected: {
                composes: 'pure-menu-link',
                borderBottom: 'solid 3px ' + themeColors.darkerGreen,
                color: themeColors.darkerGreen,
                fontWeight: 'bold',
                'a&': {
                    color: themeColors.darkerGreen
                },
                '&:hover': activeSelectedOption,
                '&:focus': activeSelectedOption
            }
        };
    }

    Object.assign(out, {
        'options-1': optionStyle(1),
        'options-2': optionStyle(2),
        'options-3': optionStyle(3),
        'options-4': optionStyle(4),
        'options-5': optionStyle(5),
        'options-6': optionStyle(6),
    });

    return out;
};

function optionStyle (optionNumber: number) {
    return {
        width: '100%',
        textAlign: 'center',
        float: 'left',

        [mediaQueries.md]: {
            width: (100 / optionNumber).toPrecision(5) + '%',
        }
    };
}

export interface Option {
    display: JSX.Element;
    value: any;
}

export interface OptionsProps {
    ide: boolean;
    fill?: boolean;
    className?: string;
    options: Option[];
    selected?: any;
    onChange?: (option: Option) => void;
    classes?: any;
}

@injectSheet(styles)
@observer
export class Options extends React.Component<OptionsProps, {}> {
    constructor(props: OptionsProps) {
        super(props);
    }

    private optionClass(option: Option) {
        let classes = this.props.classes || {};
        return this.props.selected === option.value ? classes.selected : classes.option;
    }

    private setSelected(e: React.MouseEvent<any>, option: Option) {
        if (this.props.onChange) {
            this.props.onChange(option);
        }

        e.preventDefault();
    }

    private option(option: Option, key: number) {
        let optionCount = this.props.options.length,
            classes = this.props.classes;

        return this.props.ide ?
            (<button 
                key={key} 
                className={[this.optionClass(option), classes['options-' + optionCount]].join(' ')} 
                onClick={e => this.setSelected(e, option)}>
                {option.display}
            </button>) :
            (<li key={key}
                className={['pure-menu-item', classes['options-' + optionCount]].join(' ')} 
                onClick={e => this.setSelected(e, option)} >
                <a href="#" className={this.optionClass(option)}>
                    {option.display}
                </a>
            </li>);
    }

    public render() {
        let classes = this.props.classes || {};
        return this.props.ide ?
            (<div className={`block ${this.props.className || ''}`}>
                <div className={[classes.optionsList, this.props.fill ? classes.fullWidth : ''].join(' ')}>
                    {this.props.options && this.props.options.map((o, i) => this.option(o, i))}
                </div>
            </div>) :
            (<div className={`block pure-menu pure-menu-horizontal ${this.props.className || ''}`}>
                <ul className={[classes.optionsList, this.props.fill ? classes.fullWidth : ''].join(' ')}>
                    {this.props.options && this.props.options.map((o, i) => this.option(o, i))}
                </ul>
            </div>);
    }
}

//import { computed } from 'mobx';
//import { editorStyles } from '../style';