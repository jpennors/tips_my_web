import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

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

    if (horizontalDisplay) {
        return (
            <Menu icon='labeled' size='tiny' compact>
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
    } else {
        return (
            <Menu vertical>
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
    }

};

/*
<Grid padded className="mobile only">
                    <Menu borderless inverted fluid fixed="top">
                        <Menu.Item header as="a">
                        TipsMyWeb
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button
                                    basic
                                    inverted
                                    icon
                                    toggle
                                    onClick={this.handleToggleDropdownMenu}
                                >
                                    <Icon name="content" />
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu
                            borderless
                            fluid
                            inverted
                            vertical
                            style={this.state.dropdownMenuStyle}
                        >
                            {navItems.map(item => (
                                <Link to={item.path} key={item.path}>
                                    <Menu.Item>
                                        {item.name}
                                    </Menu.Item>
                                </Link>
                        ))}
                            <Divider fitted />
                        </Menu>
                    </Menu>
                </Grid>
 */
