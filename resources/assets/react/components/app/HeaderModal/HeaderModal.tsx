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

    const modalRef = React.useRef(null);

    const handleClickOutside = (event: any): void => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    React.useEffect(()  => {
        document.addEventListener('mousedown', handleClickOutside);
        return (): void => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

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
                    {({ ref, style, placement, arrowProps }): React.ReactNode => (
                        <div ref={ref} style={style} data-placement={placement} className="header-modal">
                            <div ref={modalRef} className="header-modal__container">
                                {content}
                            </div>
                            <div ref={arrowProps.ref} style={arrowProps.style} className="header-modal__arrow"/>
                        </div>
                    )}
                </Popper>) : null}
        </Manager>
    );
};
