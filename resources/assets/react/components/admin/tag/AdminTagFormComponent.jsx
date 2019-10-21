import React, { Component } from 'react';
import {
    Button,
    Divider,
    Grid,
    Form,
    Loader,
    Segment
  } from 'semantic-ui-react';
import { ajaxGet, ajaxPost, ajaxPut } from '../../../utils/Ajax';
import ErrorHandler from '../../../utils/Modal';


class AdminTagFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            tag: {
                name: '',
                parentId: ''
            },
            loading: true,
            error: false,
            savingErrors: []
        };
    }

    componentDidMount() {
        this.loadTags();
    }

    getTag = () => {
        if (this.props.tag) {
            const { tag } = this.props;
            if (!tag.parentId) {
                tag.parentId = '';
            }
            this.setState({
                tag
            });
        }
    };

    loadTags = () => {
        this.getTag();
        ajaxGet('tags').then(res => {
            this.setState({
                tags: res.data || [],
                loading: false
            });
        })
        .catch(() => {
            this.setState({
                loading: false,
                error: true
            });
        });
    };

    handleChange = event => {
        this.setState(previousState => ({
            tag: {
                ...previousState.tag,
                [event.target.name]: event.target.value
            }
        }));
    };

    saveTag = () => {
        this.setState({ loading: true });
        if (this.props.type === 'create') {
            ajaxPost('tags', this.state.tag).then(() => {
                this.props.onSave();
            })
            .catch(errors => {
                this.setState({
                    loading: false,
                    savingErrors: errors,
                    error: true
                });
            });
        } else if (this.props.type === 'edit') {
            ajaxPut(`tags/${this.state.tag.id}`, this.state.tag).then(() => {
                this.props.onSave();
            })
            .catch(errors => {
                this.setState({
                    loading: false,
                    savingErrors: errors,
                    error: true
                });
            });
        }
    };

    render() {
        const { loading, error } = this.state;

        if (error) {
            return (
                <ErrorHandler
                    open={error}
                />
            );
        }

        if (loading) {
            return (
                <Grid.Row>
                    <Divider hidden />
                    <Loader active inline="centered" />
                </Grid.Row>
            );
        }

        return (
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <div className="admin-form">
                    <Segment attached>
                        <Form loading={loading}>
                            <Form.Group widths="equal">
                                <Form.Field inline>
                                    <label>Nom</label>
                                    <input
                                        name="name"
                                        value={this.state.tag.name || ''}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Field>

                                <Form.Field inline>
                                    <label>Parent</label>
                                    <select
                                        name="parentId"
                                        value={this.state.tag.parentId}
                                        onChange={this.handleChange}
                                    >
                                        {/* <option value="" {...this.state.tag.parentId.length > 0? "": defaultValue}></option> */}
                                        <option value=" " />
                                        {
                                            this.state.tags.map(tag => (
                                                <option
                                                    value={tag.id}
                                                    key={tag.id}
                                                    defaultValue={this.state.tag.parentId && this.state.tag.parentId === tag.id}
                                                >
                                                    {tag.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </Form.Field>
                            </Form.Group>
                            <Divider fitted />
                            <Button color="blue" type="submit" onClick={this.saveTag}>Submit</Button>
                        </Form>
                    </Segment>
                </div>
            </Grid.Column>
        );
    }
}

export default AdminTagFormComponent;
