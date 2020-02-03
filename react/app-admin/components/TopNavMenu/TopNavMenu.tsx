import * as React from 'react';
import { Container, Grid, Image, Input, Menu } from 'semantic-ui-react';
import { ADMIN_APP_MAIN_URL } from 'tmw-admin/constants/app-constants';

export const TopNavMenu: React.FunctionComponent = () => {
    return (
        <Grid padded className="tablet computer only">
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item href={ADMIN_APP_MAIN_URL} header>
                        <Image size='mini' src='/images/logo.png' style={{ marginRight: '5px' }} />
                        TipsMyWeb Admin
                    </Menu.Item>
                    <Menu.Item>
                        Logout
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Input inverted className='icon' icon='search' placeholder='Search...' />
                    </Menu.Item>
                </Container>
            </Menu>
        </Grid>
    );
};
