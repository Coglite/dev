//import 'dragula/dist/dragula.css'
import './style.less';

export const themeColors = {
    darkerGreen: '#33A626',
    darkestGreen: '#23731A',
    fadedGreen: '#95CC8F',
    darkerRed: '#d13b2e',
}

export const editorStyles = {
    largeSelect: 'select-large',
    mediumSelect: 'select-medium',
    imageSelect: 'select-image',
    normalSelect: 'select-normal'
};

export {mediaQueries, noSelectStyle} from './style-constants';

export function sectionStyles (theme: any): {
    section:any, 
    sectionTitle: any, 
    sectionBody: any, 
    sectionTitleLarge: any, 
    sectionBodyTight: any, 
    sectionBodyBorderless: any,
    sectionTooltip: any} {
    return {
        section: theme.ide ?
            {
                composes: 'inset-panel block'
            } :
            {
                composes: 'pure-u-1',
                marginBottom: '20px'
            },
        sectionTitle: theme.ide ?
            {
                composes: 'panel-heading',
                position: 'relative'
            } :
            {
                fontWeight: '700',
                border: '1px solid #ddd',
                borderBottom: 'none',
                padding: '5px',
                background: '#eee',
                position: 'relative'
            },
        sectionTooltip: {
            position: 'absolute',
            right: '6px',
            top: '3px',
            display: 'block',
        },
        sectionTitleLarge: {
            composes: '$sectionTitle',
            fontSize: '2em',
            fontWeight: 'bold',
            padding: '10px',
        },
        sectionBody: theme.ide ?
            { composes: 'panel-body padded' } 
            : { 
                border: '1px solid #ddd',
                padding: '10px'
            },
        sectionBodyTight: theme.ide ?
            { composes: 'panel-body' } 
            : {
                composes: '$sectionBody',
                padding: '0px'
            },
        sectionBodyBorderless: theme.ide ?
            { composes: 'panel-body' } 
            : {
                composes: '$sectionBody',
                border: 'none'
            }
    }
}

export function listStyles (theme: any): {listTitle: any, rootListTree: any, listTree: any, listItem:any, listItemSelected: any, listItemSubList: any} {
    return {
        listTitle: {
            composes: 'title',
            fontSize: theme.ide ? undefined : '1.2em',
            marginTop: '10px',
        },
        listTree: {
            composes: theme.ide ? 'list-tree' : '',
            padding: '0 0 0 8px',
            marginLeft: theme.ide ? '0' : '6px',
            borderLeft: theme.ide ? 'none' : 'solid 17px #ddd',
        },
        rootListTree: {
            composes: '$listTree',
            padding: '0px',
            margin: '0',
            marginBottom: '20px',
            borderLeft: 'none'
        },
        listItem: theme.ide ? 
            {
                composes: 'list-item step',
                cursor: 'pointer',
                position: 'relative',
                listStyle: 'none',
                paddingLeft: '10px'
            } : {
                composes: 'step',
                listStyle: 'none',
                lineHeight: '2em',
                fontSize: '16px',
                color: '#666',
                fontWeight: 'normal',
                cursor: 'pointer',
                position: 'relative',
                paddingLeft: '10px',
                
                '& > span': {
                    lineHeight: '2em',
                    overflowX: 'hidden',
                    marginRight: '45px',
                    maxWidth: '100%',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    display: 'block',
                },

                '&:hover': {
                    color: '#000',
                }
            },
        listItemSelected: theme.ide ? {
                composes: 'selected'
            } : {
                fontWeight: 'bold',
                color: themeColors.darkerGreen,
                
                '&:hover': {
                    color: themeColors.darkerGreen,
                }
            },
        listItemSubList: {
            composes: theme.ide ? 'list-nested-item' : '',

            '& > $listTree': {
                position: 'relative',
                top: '-10px',
                marginTop: '10px',
                marginBottom: '-10px',
                minHeight: '20px'
            },
        },
    }
}

export function errorStyles (theme: any): {errorPanel: any, errorPanelClose: any} {
    return {
        errorPanel: theme.ide ?
            {
                composes: 'pure-u-1 inset-panel padded background-error',
                
                color: 'white',
                fontWeight: 'bold'
            } : {
                composes: 'pure-u-1',

                color: 'white',
                fontWeight: 'bold',
                background: themeColors.darkerRed,
                padding: '16px',
                position: 'relative',
                borderRadius: '5px',
                boxSizing: 'border-box'
            },
        errorPanelClose: {
            composes: theme.ide ? 'text-error': '',
            position: 'absolute',
            right: '0.2em',
            top: '0.2em',
            fontSize: '2em',
            lineHeight: '1em',

            '&:hover': {
                color: 'white',
                cursor: 'pointer'
            }
        }
    };
}

export var shadows = {
    top: {
        content: " ",
        display: 'block',
        position: 'absolute',
        height: '20px',
        left: '-10px',
        right: '-10px',
        top: '-20px',
        boxShadow: '0px 5px 5px rgba(0,0,0,0.2)',
    },

    bottom: {
        content: " ",
        display: 'block',
        position: 'absolute',
        height: '20px',
        left: '-10px',
        right: '-10px',
        bottom: '-20px',
        boxShadow: '0px -5px 5px rgba(0,0,0,0.2)',
    }
}
