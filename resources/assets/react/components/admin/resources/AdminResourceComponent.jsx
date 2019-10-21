import React, { Component } from 'react';
import {
    Button,
    Grid,
    Header,
    Icon
  } from 'semantic-ui-react';
import AdminResourceIndexComponent from './AdminResourceIndexComponent';
import AdminResourceFormComponent from './AdminResourceFormComponent';


class AdminResourceComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'index',
            title: 'Ressources',
            selected_resource: null
        };
    }

    getComponentMode = (resource = null) => {
        const { mode } = this.state;
        switch (mode) {
            case 'index':
                return (
                    <AdminResourceIndexComponent
                        onEdit={
                            // TODO: Fix this !!!
                            // eslint-disable-next-line no-shadow
                            resource => {
                                const selected_resource = resource;
                                selected_resource.tags = [];
                                selected_resource.resource_tags.forEach(element => {
                                    selected_resource.tags.push({
                                        tag_id: element.tag_id,
                                        belonging: element.belonging
                                    });
                                });
                                this.setState({
                                    mode: 'edit',
                                    title: 'Editer une ressource',
                                    selected_resource
                                });
                            }
                        }
                    />
                );
            case 'create':
                return (
                    <AdminResourceFormComponent
                        type="create"
                        onSave={
                        () => {
                            this.setState({
                                mode: 'index',
                                title: 'Resources'
                            });
                        }
                    }
                    />
);
            case 'edit':
                return (
                    <AdminResourceFormComponent
                        resource={resource}
                        type="edit"
                        onSave={
                        () => {
                            this.setState({
                                mode: 'index',
                                title: 'Resources'
                            });
                        }
                    }
                    />
                );
            default:
                return null;
        }
    };

    handleModeChange = e => {
        const mode = e.target.getAttribute('data-tag');
        let title = '';
        switch (mode) {
            case 'index': title = 'Ressources'; break;
            case 'create': title = 'Ajouter une ressource'; break;
            case 'edit': title = 'Editer une ressource'; break;
            default: break;
        }
        this.setState({ mode, title });
    };

    render() {
        const { mode, title, selected_resource } = this.state;

        return (

            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Grid.Row>
                    <Header dividing size="huge" as="h2">
                        {title}
                        {
                            (mode === 'index') ? (
                                <Button floated="right" data-tag="create" onClick={this.handleModeChange}>
                                    Ajouter
                                    <Icon name="plus" className="left7" />
                                </Button>
                            ) : (
                                <Button floated="left" data-tag="index" onClick={this.handleModeChange}>
                                    <Icon name="arrow left" className="right7" />
                                    Retour
                                </Button>
                            )
                        }
                    </Header>
                </Grid.Row>
                {this.getComponentMode(selected_resource)}
            </Grid.Column>
            );
    }
}

export default AdminResourceComponent;
