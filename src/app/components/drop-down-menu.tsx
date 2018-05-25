import * as React from 'react';
import { observer } from 'mobx-react';
let injectSheet = require('react-jss').default;

//import { computed } from 'mobx';
//import { editorStyles, themeColors } from '../style';


const hoverItem = {
    color: '#000',
    background: 'none',
    fontWeight: '700'
};

const hoverLabel = {
    color: '#000',
    background: 'none'
};

const styles = (theme: any) => {
    if (theme.ide) {
        return {
            container: {
                composes: 'block padded'
            },
            menu: {
                composes: 'btn-group'
            },
            button: {
                composes: 'btn'
            }
        };
    }
    else {
        return {
            container: {
                composes: 'pure-menu pure-menu-horizontal',
                display: 'inline-block',
                width: 'auto'
            },
            menuLabelContainer: {
                composes: 'pure-menu pure-menu-horizontal'
            },
            menuLabel: {
                composes: 'pure-menu-item pure-menu-has-children pure-menu-allow-hover',
                background: 'none',
                color: '#aaa',
                fontWeight: 'bold',
                '&:hover': hoverLabel,
                '&:focus': hoverLabel
            },
            labelLink: {
                composes: theme.ide ? "" : "pure-button",
                textDecoration: 'none',
                'a&': {color: '#444'},
                '&:hover': theme.ide? Object.assign({cursor: "pointer"}, hoverLabel) : {},
                '&:focus': hoverLabel
            },
            menuContainer: {
                composes: 'pure-menu-children',
                padding: '5px',
                border: 'solid 1px #ccc',
                zIndex: '10',
                minWidth: '100%',
                boxSizing: 'border-box',
            },
            item: {
                composes: 'pure-menu-link',
                padding: '10px 15px',
                fontWeight: '500',
                borderBottom: 'solid 3px transparent',
                'a&': {color: '#444'},
                '&:hover': hoverItem,
                '&:focus': {
                    background: 'none',
                    color: '#444',
                    fontWeight: '700'
                }
            }
        };
    }
};

export interface Item {
    display: JSX.Element;
    onClick?: () => void;
}

export interface DropDownMenuProps {
    ide: boolean;
    label: string;
    items: Item[];
    classes?: any;
}

@injectSheet(styles)
@observer
export class DropDownMenu extends React.Component<DropDownMenuProps, {}> {
    constructor(props: DropDownMenuProps) {
        super(props);
    }

    private handleClick(e: React.MouseEvent<any>, item: Item) {
        if (item.onClick) {
            item.onClick();
        }

        e.preventDefault();
    }

    private item(item: Item, key: number) {
        let classes = this.props.classes || {};
        return this.props.ide ?
            (<button key={key} className={classes.button} onClick={e => this.handleClick(e, item)}>
                {item.display}
            </button>) :
            (<li key={key} className="pure-menu-item" onClick={e => this.handleClick(e, item)}>
                <a href="#" className={classes.item}>
                    {item.display}
                </a>
            </li>);
    }

    public render() {
        let classes = this.props.classes || {};
        return this.props.ide ?
            (<div>
                <h3>{this.props.label}:</h3>
                <div className="block">
                    <div className="btn-group">
                    {this.props.items && this.props.items.map((b, i) => this.item(b, i))}
                    </div>
                </div>
            </div>):
            (<div className={classes.menuLabelContainer}>
                <li className={classes.menuLabel}>
                    <a className={classes.labelLink}>{this.props.label} <span className="Select-arrow"></span></a>
                    <ul className={classes.menuContainer}>
                        {this.props.items && this.props.items.map((b, i) => this.item(b, i))}
                    </ul>
                </li>
            </div>);
    }
}