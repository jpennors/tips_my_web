import React, { Component } from 'react';
import {ajaxGet, ajaxPost, ajaxPut} from "../../utils/Ajax";
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
    Loader,
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
                'name' : '',
                'parent_id' : '',
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
            let tag = this.props.tag
            if (!tag.parent_id) {
                tag.parent_id = ""
            }
            this.setState({
                tag : tag
            })
        }   
    }

    async componentDidMount() {
        await this.loadTags();
    }

    async loadTags() {
        this.getTag();
		try {
            const res = await ajaxGet('tags');
			this.setState({
                tags: res || [],
                loading : false
            }); 
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
        if (this.props.type == "create") {
            ajaxPost('tags', this.state.tag).then(result => {
                this.props.onSave()
            })
            .catch((errors) => {
                this.setState({
                    loading:false,
                    savingErrors:errors,
                    error : true
                });
            });
        } else if (this.props.type == "edit") {
            ajaxPut('tags/' + this.state.tag.id, this.state.tag).then(result => {
                this.props.onSave()
            })
            .catch((errors) => {
                this.setState({
                    loading:false,
                    savingErrors:errors,
                    error : true
                });
            });
        }
        
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

        if(loading){
            return (
                <Grid.Row>
                    <Divider hidden />
                    <Loader active inline='centered' />
                </Grid.Row>
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
                                        <select
                                            name="parent_id"
                                            value={this.state.tag.parent_id}
                                            onChange={this.handleChange}
                                        >
                                            {/* <option value="" {...this.state.tag.parent_id.length > 0? "": defaultValue}></option> */}
                                            <option value=" "></option>
                                            {
                                                this.state.tags.map((tag, index) => {
                                                    return <option 
                                                        value={tag.id} 
                                                        key={index}
                                                        defaultValue={this.state.tag.parent_id && this.state.tag.parent_id === tag.id}
                                                        // {...this.state.tag.parent_id.length>0 && this.state.tag.parent_id === tag.id ? 
                                                        //     "defaultValue" : ""}
                                                    >
                                                        {tag.name}
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </Form.Field>
                                </Form.Group>
                                <Divider fitted/>
                                <Button color='blue' type='submit' onClick={this.saveTag}>Submit</Button>
                        </Form>
                    </Segment>
                </div>
            </Grid.Column>
        )
    }
}

export default AdminTagFormComponent;
