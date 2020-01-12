import * as React from 'react';
import { Manager, Reference, Popper } from 'react-popper';


import './header-modal.css';

interface HeaderModalProps {
    content: React.ReactNode;
    target: React.ReactNode;
}

export const HeaderModal: React.FunctionComponent<HeaderModalProps> = ({
    content, target,
}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const toggleIsOpen = (): void => { setIsOpen(!isOpen); };

    return (
        <Manager>
            <Reference>
                {({ ref }): React.ReactNode =>
                    <span ref={ref} onClick={toggleIsOpen}>
                        {target}
                    </span>
                }
            </Reference>
            {isOpen ? (
                <Popper placement="bottom" modifiers={{ preventOverflow: { padding: 20 } }}>
                    {({ ref, style, placement }): React.ReactNode => (
                        <div ref={ref} style={style} data-placement={placement} className="header-modal">
                            <div className="header-modal__container">
                                {content}
                            </div>
                        </div>
                    )}
                </Popper>) : null}
        </Manager>
    );
};
