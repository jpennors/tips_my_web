import * as React from 'react';
import { Container, Image, Menu, Responsive, Icon } from 'semantic-ui-react';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';
import { logout } from 'tmw-admin/utils/auth-module';
import { AdminSearch } from '../AdminSearch';


export const TopNavMenu: React.FunctionComponent = () => { 

    return (
        <Menu inverted style={{ borderRadius: 0 }}>
            <Container>
                <Menu.Item href={ADMIN_APP_ROUTES.MAIN} header>
                    <Image size="mini" src="/images/logo-icon.svg" style={{ marginRight: '5px' }} />
                    TipsMyWeb Admin
                </Menu.Item>
                <Menu.Item onClick={logout}>Logout</Menu.Item>
                <Menu.Item href={ADMIN_APP_ROUTES.PUBLIC_APP} target="_blank">
                    Public App
                    <Icon className="external alternate" style={{ marginLeft: '8px' }} />
                </Menu.Item>
                <Menu.Item position="right">
                    <Responsive minWidth={500}>
                        <AdminSearch/>
                    </Responsive>
                </Menu.Item>
            </Container>
        </Menu>
    );
};
