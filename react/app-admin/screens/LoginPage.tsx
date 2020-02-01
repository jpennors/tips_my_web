import * as React from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import Auth from 'tmw-admin/utils/Auth';

export const LoginPage: React.FunctionComponent = () => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const onFormSubmit = async (): Promise<void> => {
        await Auth.login({ username, password });
    };

    const onUsernameInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setUsername(value);
    };

    const onPasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        // TODO: Add validation
        setPassword(value);
    };

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image size='tiny' centered src='/images/logo.png' />
                <Header as='h2' color='orange' textAlign='center'>
                    TipsMyWeb Admin
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            value={username}
                            onChange={onUsernameInputChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={onPasswordInputChange}
                        />
                        <Button
                            color='orange'
                            fluid
                            size='large'
                            onClick={onFormSubmit}
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};
