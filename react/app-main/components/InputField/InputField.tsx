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
}) => {
    const isTextarea = type === 'textarea';
    const finalClassName = classNames('input-field', className, {
        'input-field--full-width': isFullWidth,
        'input-field__textarea': isTextarea,
        'input-field__input': !isTextarea,
    });

    return (
        <>
            {isTextarea ? (
                <textarea
                    className={finalClassName}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    required={isRequired}
                    onChange={onChange}
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
                />
            )}
        </>
    );
};
