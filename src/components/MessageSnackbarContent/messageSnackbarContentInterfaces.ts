import { WithStyles } from '@material-ui/core';
import * as React from 'react';
import messageSnackbarStyles from './messageSnackbarContentStyles';

export interface IMessageSnackbarProps extends WithStyles<typeof messageSnackbarStyles> {
    className?: string;
    message: string;
    onClose: (event: React.MouseEvent<HTMLElement>) => void;
    variant: 'success' | 'warning' | 'error' | 'info';
    additionalActions?: JSX.Element;
}
