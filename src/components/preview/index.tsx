/**
 * Preview frame
 */
import * as React from 'react';


export default class Preview extends React.Component<{}, {}> {
    public render() {
        return <iframe src={'http://localhost:3000/'}/>
    }
}