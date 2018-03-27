/**
 * Sninppet service
 */

export interface ISnippet {
    name: string;
    description: string;
    code: string;
}

export default function getSnippets() {
    const snippets: ISnippet[] = [{
        name: 'React ES6 Component',
        description: 'ES6 component snippet',
        code: `import React, { Component } from 'react';
export default SampleComponent extends Component {
    render() {
    }
}`
    }];

    return snippets;
}