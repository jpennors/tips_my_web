import React, { Component } from 'react';
import {ajaxGet, ajaxPost} from "../../utils/Ajax";
import ErrorHandler from "../../utils/Modal";

import {
    Button,
    Divider,
    Grid,
    Header,
    Form,
    Icon,
    Input,
    Image,
    Label,
    Menu,
    Table,
    Tab,
    GridColumn,
    Segment
  } from "semantic-ui-react";

class AdminTagFormComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags : [],
            tag : {
                'name' : ''
            },
            loading : true,
            error : false,
            savingErrors : [],
        };

        this.handleChange = this.handleChange.bind(this)
        this.saveTag = this.saveTag.bind(this)
        this.getTag = this.getTag.bind(this)
    }

    getTag(){
        if (this.props.tag) {
            this.setState({
                tag : this.props.tag
            })
        }
    }

    async componentDidMount() {
        await this.loadTags();
    }

    async loadTags() {
		try {
            const res = await ajaxGet('tags');
			this.setState({
                tags: res || [],
                loading : false
            });
            this.getTag();
		} catch (error) {
            this.setState({
                loading:false,
                error:true
            });
		}
    }

    handleChange(event){
        this.setState({
            tag: {
                ...this.state.tag,
                [event.target.name]: event.target.value
            }
        })
    }

    async saveTag(){
        this.setState({loading:true})
        ajaxPost('tags', this.state.tag).then(result => {
            this.setState({
                loading : false
            });
        })
        .catch((errors) => {
            this.setState({
                loading:false,
                savingErrors:errors
            });
        });
    }

    render() {

        const {loading, error, savingErrors, tags} = this.state

        if(error){
            return(
                <ErrorHandler
                    open={error}
                />
            )
        }

        return (
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <div className="admin-form">
                    <Segment attached>
                        <Form loading={loading}>
                            <Form.Group widths='equal'>
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
                                        <input/>
                                    </Form.Field>
                                </Form.Group>
                                <Divider fitted/>
                                <Button color='blue' onClick={this.saveTag}>Submit</Button>
                        </Form>
                    </Segment>
                </div>
            </Grid.Column>
        )
    }
}

export default AdminTagFormComponent;
