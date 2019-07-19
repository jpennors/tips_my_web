import React, { Component } from 'react';
import {ajaxGet, ajaxDelete} from "../../utils/Ajax";
import ErrorHandler from "../../utils/Modal";

import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Input,
    Image,
    Label,
    Loader,
    Menu,
    Table,
    Tab
  } from "semantic-ui-react";

class AdminTagIndexComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags : [],
            loading : true,
            error : false,
            type : this.props.type
        };
        this.editTag = this.editTag.bind(this)
        this.deleteTag = this.deleteTag.bind(this)
    }

    componentDidMount() {
        this.loadTags();
    }

    async loadTags() {
		try {
            const res = await ajaxGet('tags');
			this.setState({
                tags: res || [],
                loading : false
			});
		} catch (error) {
            this.setState({
                loading:false,
                error : true
            });
		}
    }

    async deleteTag(e){
        
        const tag_id = e.target.getAttribute("data-tag");
        ajaxDelete("tags/" + tag_id).then(result => {
            let array = this.state.tags;
            array = array.filter((r) => r.id !== tag_id)
            this.setState({tags: array})
        })
        .catch((errors) => {
            this.setState({
                loading:false,
                error :true
            });
        });    
    }

    editTag(e) {
        const tag_id = e.target.getAttribute("data-tag")
        const index = this.state.tags.findIndex(function(elm){
            return elm.id == tag_id
        })
        if (index !== -1){
            this.props.onEdit(this.state.tags[index]);
        }
    }


    render() {

        const {loading, error} = this.state;

        if(error){
            return (
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
            <Grid.Row>
                <Table singleLine striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Nom</Table.HeaderCell>
                        <Table.HeaderCell>Parents</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.tags.map((tag, index)=>{
                                return <Table.Row key={index}>
                                        <Table.Cell>{index}</Table.Cell>
                                        <Table.Cell>{tag.name}</Table.Cell>
                                        <Table.Cell>{tag.parent? tag.parent.name : ''}</Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <i className="edit blue link icon" data-tag={tag.id} onClick={this.editTag}></i>
                                            <i className="trash alternate red link icon left7" data-tag={tag.id} onClick={this.deleteTag}></i>
                                        </Table.Cell>
                                    </Table.Row>
                            })
                        }
                    </Table.Body>
                </Table>
            </Grid.Row>
            )
    }
}

export default AdminTagIndexComponent;
