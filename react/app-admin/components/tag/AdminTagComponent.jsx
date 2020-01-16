import React, { Component } from 'react';
import {
    Button,
    Grid,
    Header,
    Icon
  } from 'semantic-ui-react';
import AdminTagIndexComponent from 'tmw-admin/components/tag/AdminTagIndexComponent';
import AdminTagFormComponent from 'tmw-admin/components/tag/AdminTagFormComponent';

class AdminTagComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'index',
            title: 'Tags',
            selectedTag: null
        };
    }

    getComponentMode = (tag = null) => {
        const { mode } = this.state;
        switch (mode) {
            case 'index':
                return (
                    <AdminTagIndexComponent
                        onEdit={
                            // TODO: Fix this !!!
                            // eslint-disable-next-line no-shadow
                            tag => {
                                this.setState({
                                    mode: 'edit',
                                    title: 'Editer un tag',
                                    selectedTag: tag
                                });
                            }
                        }
                    />
                );
            case 'create':
                return (
                    <AdminTagFormComponent
                        type="create"
                        onSave={
                        () => {
                            this.setState({
                                mode: 'index',
                                title: 'Tags'
                            });
                        }
                    }
                    />
                );
            case 'edit':
                return (
                    <AdminTagFormComponent
                        tag={tag}
                        type="edit"
                        onSave={
                        () => {
                            this.setState({
                                mode: 'index',
                                title: 'Tags'
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
            case 'index': title = 'Tags'; break;
            case 'create': title = 'Ajouter un tag'; break;
            case 'edit': title = 'Editer un tag'; break;
            default: break;
        }
        this.setState({ mode, title });
    };

    render() {
        const { title, mode, selectedTag } = this.state;

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
                {this.getComponentMode(selectedTag)}
            </Grid.Column>
        );
    }
}

export default AdminTagComponent;
