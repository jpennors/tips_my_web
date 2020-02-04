import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Menu, StrictMenuProps } from 'semantic-ui-react';
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic';

interface SideNavMenuProps {
    horizontalDisplay?: boolean;
}
export const SideNavMenu: React.FunctionComponent<SideNavMenuProps> = ({
    horizontalDisplay = false,
}) => {
    const history = useHistory();
    const activePath = window.location.pathname;

    const navItems = [
        {
            name: 'Overview',
            path: '/admin',
            iconName: 'newspaper',
        },
        {
            name: 'Resources',
            path: '/admin/resources',
            iconName: 'rocket',
        },
        {
            name: 'Tags',
            path: '/admin/tags',
            iconName: 'tags',
        },
        {
            name: 'Import',
            path: '/admin/import',
            iconName: 'plus circle',
        },
        {
            name: 'Suggestions',
            path: '/admin/suggestions',
            iconName: 'thumbs up',
        },
        {
            name: 'Contact',
            path: '/admin/contact',
            iconName: 'question circle',
        },
    ];

    const horizontalDisplayProps: StrictMenuProps = {
        icon: 'labeled',
        size: 'tiny',
        fluid: true,
        widths: navItems.length as SemanticWIDTHS,
    };

    const verticalDisplayProps: StrictMenuProps = {
        vertical: true,
    };

    return (
        <Menu {...(horizontalDisplay ? horizontalDisplayProps : verticalDisplayProps)}>
            {navItems.map(item => (
                <Menu.Item
                    key={item.path}
                    active={activePath === item.path}
                    onClick={(): void => history.push(item.path)}
                >
                    <Icon className={item.iconName} />
                    {item.name}
                </Menu.Item>
            ))}
        </Menu>
    );
};
