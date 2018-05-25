import * as React from 'react';

let injectSheet = require('react-jss').default;

const styles = (theme: any) => ({
    container: {
        height: '100%',
        '&:before': {
            content: "''",
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'middle',
            // marginRight: '-0.25em'   
        }
    },
    content: {
        display: 'inline-block',
        verticalAlign: 'middle'
    }
});

export interface ContentProperties extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    container?: boolean;
    classes?: any;
}

interface ContentPropertiesIgnoreTheme extends ContentProperties {
    sheet?: any;
    theme?: any;
}

@injectSheet(styles)
export class CenteredContent extends React.Component<ContentProperties, {}> {
    constructor(props: ContentProperties) {
        super(props);
    }

    public render() {
        let { container, className, classes, sheet, theme, ...other } = this.props as ContentPropertiesIgnoreTheme;
        classes = classes || {};

        if (container !== false) {
            const containerClasses = classes.container;
            return (
                <div className={className ? className + ' ' + containerClasses : containerClasses} {...other}>
                    <div className={classes.content}>
                        {this.props.children}
                    </div>
                </div>)
        } else {
            const contentClasses = classes.content;
            return (<div className={className ? className + ' ' + contentClasses : contentClasses} {...other}>
                {this.props.children}
            </div>)
        }
    }
}
