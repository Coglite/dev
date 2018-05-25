
#src/app/components/error-panel.tsx

editor and theme are unused : see -->

import { editorStyles, themeColors, errorStyles } from '../style';

const styles = (theme: any) => {
    return errorStyles(theme);
};

-->

try something like this
const styles = (theme: any) => {
    return errorStyles(theme);
    editorStlyes(theme)
    themeColors(theme)

};


#src/app/components/workflow-editor.tsx
--

in this function let out = ''; isnt read by anything, making function public didnt do anything. its also a getting, maybe should be computed

    private get selectedItemDescription () {
->       let out = '';
//       let out = '';

        if (this.state.section === 'workflow') {
            return translate('TITLE_WORKFLOW_VARIABLES');
        }
        else {
            return 'Step - ' + this.props.state.currentStep.name;
        }
    }