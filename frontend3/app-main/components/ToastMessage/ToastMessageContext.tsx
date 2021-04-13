import * as React from 'react';
import { createPortal } from 'react-dom';
import { ToastMessage } from './ToastMessage';

import './toast-message.less';

const TOAST_MESSAGE_DURATION = 3000;

type ToastMessageState = {
    message: string;
    isOpen: boolean;
};

const toastMessageInitialState: ToastMessageState = {
    message: '',
    isOpen: false,
};

enum ToastMessageActionType {
    OPEN = 'open',
    CLOSE = 'close',
}

type ToastMessageAction =
    | { type: ToastMessageActionType.OPEN; message?: string }
    | { type: ToastMessageActionType.CLOSE };

function toastMessageReducer(
    state: ToastMessageState,
    action: ToastMessageAction,
): ToastMessageState {
    switch (action.type) {
        case ToastMessageActionType.OPEN: {
            const { message } = action;
            return { ...state, isOpen: true, message: message || state.message };
        }
        case ToastMessageActionType.CLOSE:
            return { ...state, isOpen: false };
        default:
            return state;
    }
}

interface ToastContext {
    openToastMessage: (message?: string) => void;
    closeToastMessage: () => void;
}

const ToastMessageContext = React.createContext<ToastContext | null>(null);

export const ToastMessageProvider: React.FunctionComponent = ({ children }) => {
    const [state, dispatch] = React.useReducer(toastMessageReducer, toastMessageInitialState);

    const openToastMessage = (message?: string): void => {
        dispatch({ type: ToastMessageActionType.OPEN, message });
        setTimeout(() => dispatch({ type: ToastMessageActionType.CLOSE }), TOAST_MESSAGE_DURATION);
    };

    const closeToastMessage = (): void => {
        dispatch({ type: ToastMessageActionType.CLOSE });
    };

    const toastContextValue = { openToastMessage, closeToastMessage };
    return (
        <ToastMessageContext.Provider value={toastContextValue}>
            {children}
            {/*{createPortal(*/}
            {/*    <ToastMessage message={state.message} isOpen={state.isOpen} />,*/}
            {/*    document.body,*/}
            {/*)}*/}
        </ToastMessageContext.Provider>
    );
};

export const useToastMessageContext = (): ToastContext => {
    return React.useContext(ToastMessageContext) as ToastContext;
};
