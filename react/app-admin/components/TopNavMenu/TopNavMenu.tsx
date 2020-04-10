import * as React from 'react';
import { Container, Image, Input, Menu, Responsive } from 'semantic-ui-react';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';
import { logout } from 'tmw-admin/utils/auth-module';

export const TopNavMenu: React.FunctionComponent = () => {
    return (
        <Menu inverted style={{ borderRadius: 0 }}>
            <Container>
                <Menu.Item href={ADMIN_APP_ROUTES.MAIN} header>
                    <Image size="mini" src="/images/logo-icon.svg" style={{ marginRight: '5px' }} />
                    TipsMyWeb Admin
                </Menu.Item>
                <Menu.Item onClick={logout}>Logout</Menu.Item>
                <Menu.Item position="right">
                    <Responsive minWidth={500}>
                        <Input inverted className="icon" icon="search" placeholder="Search..." />
                    </Responsive>
                </Menu.Item>
            </Container>
        </Menu>
    );
};
