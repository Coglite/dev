/**
 * Notification component
 */
import { Position, Toaster } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';


interface INotificationProps {
    notificationType: string;
    message: string;
}

@observer
export class Notification extends React.Component<INotificationProps, {}> {
    public toaster: Toaster;
    componentDidReceiveProps = (nextProps: INotificationProps) => {
        if (nextProps.message !== '' && nextProps.message !== this.props.message) {
            this.toaster.show({
                message: nextProps.message
            });
        }
    }

    public render() {
        return (
            <Toaster position={Position.TOP} ref={comp => this.toaster = comp} />
        );
    }
}
