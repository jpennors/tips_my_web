import * as React from 'react';
import * as classNames from 'classnames';

import './input-field.less';

interface InputFieldProps {
    type: 'text' | 'number' | 'textarea';
    name: string;
    value: string;
    isRequired?: boolean;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent) => void;
    className?: string;
    isFullWidth?: boolean;
    isInvalid?: boolean;
    validationMessage?: string;
    isDisabled?: boolean;
}

export const InputField: React.FunctionComponent<InputFieldProps> = ({
    type,
    name,
    value,
    isRequired = false,
    placeholder,
    onChange,
    className,
    isFullWidth = true,
    isInvalid,
    validationMessage,
    isDisabled = false,
}) => {
    const isTextarea = type === 'textarea';
    const finalClassName = classNames('input-field', className, {
        'input-field__textarea': isTextarea,
        'input-field__input': !isTextarea,
        'input-field--full-width': isFullWidth,
        'input-field--invalid': isInvalid,
    });

    return (
        <div className="input-field">
            {isTextarea ? (
                <textarea
                    className={finalClassName}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    required={isRequired}
                    onChange={onChange}
                    disabled={isDisabled}
                />
            ) : (
                <input
                    className={finalClassName}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    required={isRequired}
                    onChange={onChange}
                    disabled={isDisabled}
                />
            )}
            {validationMessage ? (
                <div className="input-field__validation-message">{validationMessage}</div>
            ) : null}
        </div>
    );
};
