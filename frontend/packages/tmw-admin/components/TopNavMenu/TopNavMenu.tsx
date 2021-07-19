import * as React from 'react';
import { Container, Image, Menu, Icon } from 'semantic-ui-react';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';
import { logout } from 'tmw-admin/utils/auth-module';
import logoIcon from 'tmw-common/images/logo-icon.svg';
import { AdminSearch } from 'tmw-admin/components/AdminSearch';

export const TopNavMenu: React.FunctionComponent = () => {
    return (
        <Menu inverted style={{ borderRadius: 0 }}>
            <Container>
                <Menu.Item href={ADMIN_APP_ROUTES.MAIN} header>
                    <Image size="mini" src={logoIcon} style={{ marginRight: '5px' }} />
                    TipsMyWeb Admin
                </Menu.Item>
                <Menu.Item onClick={logout}>Logout</Menu.Item>
                <Menu.Item href={ADMIN_APP_ROUTES.PUBLIC_APP} target="_blank">
                    Public App
                    <Icon className="external alternate" style={{ marginLeft: '8px' }} />
                </Menu.Item>
                <Menu.Item position="right">
                    <div>
                        <AdminSearch />
                    </div>
                </Menu.Item>
            </Container>
        </Menu>
    );
};
