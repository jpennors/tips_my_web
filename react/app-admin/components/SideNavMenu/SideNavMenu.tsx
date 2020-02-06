import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Menu, StrictMenuProps } from 'semantic-ui-react';
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic';
import {
    ADMIN_APP_CONTACT_URL,
    ADMIN_APP_IMPORT_URL,
    ADMIN_APP_MAIN_URL,
    ADMIN_APP_RESOURCES_URL,
    ADMIN_APP_SUGGESTIONS_URL,
    ADMIN_APP_TAGS_ADD_URL,
    ADMIN_APP_TAGS_URL,
} from 'tmw-admin/constants/app-constants';

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
            path: ADMIN_APP_MAIN_URL,
            iconName: 'newspaper',
        },
        {
            name: 'Resources',
            path: ADMIN_APP_RESOURCES_URL,
            iconName: 'rocket',
        },
        {
            name: 'Tags',
            path: ADMIN_APP_TAGS_URL,
            iconName: 'tags',
            subMenu: [
                {
                    name: 'List',
                    path: ADMIN_APP_TAGS_URL,
                },
                {
                    name: 'Add',
                    path: ADMIN_APP_TAGS_ADD_URL,
                },
            ],
        },
        {
            name: 'Import',
            path: ADMIN_APP_IMPORT_URL,
            iconName: 'plus circle',
        },
        {
            name: 'Suggestions',
            path: ADMIN_APP_SUGGESTIONS_URL,
            iconName: 'thumbs up',
        },
        {
            name: 'Contact',
            path: ADMIN_APP_CONTACT_URL,
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
            {navItems.map(item => {
                const onClick = !item.subMenu ? (): void => history.push(item.path) : undefined;
                const allPaths = !item.subMenu ? [item.path] : item.subMenu.map(subItem => subItem.path);

                return (
                    <Menu.Item
                        name={item.name}
                        key={item.path}
                        active={allPaths.includes(activePath)}
                        onClick={onClick}
                    >
                        <Icon className={item.iconName} />
                        {item.name}
                        {item.subMenu && (
                            <Menu.Menu>
                                {item.subMenu.map(subItem => (
                                    <Menu.Item
                                        name={subItem.name}
                                        key={subItem.path}
                                        active={activePath === subItem.path}
                                        onClick={(): void => history.push(subItem.path)}
                                    >
                                        {subItem.name}
                                    </Menu.Item>
                                ))}
                            </Menu.Menu>
                        )}
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};
