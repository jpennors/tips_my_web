import React, { Component } from 'react';
import {ajaxGet, ajaxPost, ajaxPostImage, ajaxPut} from "../../../utils/Ajax";
import ErrorHandler from "../../../utils/Modal";

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
    Message,
    Table,
    Tab
  } from "semantic-ui-react";

class AdminResourceFormComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags : [],
            prices : [],
            types : [],
            // selected_tags : [],
            resource : {
                'name': '',
                'file': '',
                'image': '',
                'url' : '',
                'description': '',
                'language' : 'fr',
                'score' : '',
                'price_id' : '',
                'type_id' : '',
                'interface': '',
                'tags' : [],
            },
            loading : true,
            error : false,
            savingErrors : [],
        };


        this.selectTag = this.selectTag.bind(this)
        this.unselectTag = this.unselectTag.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.saveResource = this.saveResource.bind(this)
        this.getResource = this.getResource.bind(this)
        this.addBelongingScore = this.addBelongingScore.bind(this)
        this.removeBelongingScore = this.removeBelongingScore.bind(this)
    }

    componentDidMount() {
        this.loadTags();
    }

    getResource(){
        if (this.props.resource) {
            let resource = this.props.resource
            if (resource.url.startsWith("https://")) {
                resource.url = resource.url.replace("https://", "")
            }
            this.setState({
                resource : resource
            })
        }
    }

    loadTags() {
        ajaxGet('tags').then(res => {
            this.setState({
                tags: res.data || [],
            });
            this.loadPrices();
        })
        .catch(error => {
            this.setState({
                loading:false,
                error:true
            });
        })
    }


    loadPrices() {
        ajaxGet('prices').then(res => {
            this.setState({
                prices: res.data || [],
            });
            this.loadTypes();
        })
        .catch(error => {
            this.setState({
                loading:false,
                error:true
            });
        })
    }

    loadTypes(){
        ajaxGet('types').then(res => {
            this.setState({
                types: res.data || [],
                loading: false,
            });
        })
        .catch(error => {
            this.setState({
                loading: false,
                error:true
            });
        })
    }


    selectTag(event,tag){
        let array =  this.state.resource.tags
        tag = {
            tag_id : tag.id,
            belonging : 5,
        }
        array.push(tag);
        this.setState({
            resource: {
                ...this.state.resource,
                tags: array
            }
        })
    }

    unselectTag(event, tag_id){
        let array =  this.state.resource.tags
        array = array.filter(function(elm){
            return elm.tag_id !== tag_id
        })
        this.setState({
            resource: {
                ...this.state.resource,
                tags: array
            }
        })
    }

    handleChange(event){
        this.setState({
            resource: {
                ...this.state.resource,
                [event.target.name]: event.target.value
            }
        })
    }

    handleImageChange(event){
        this.setState({
            resource: {
                ...this.state.resource,
                'file': event.target.files[0]
            }
        })
    }

    addBelongingScore(event, tag_id){
        let array =  this.state.resource.tags
        const index = array.findIndex(function(elm){
            return elm.tag_id == tag_id
        })
        if (index !== -1 && array[index].belonging < 10){
            array[index].belonging += 1
        }
        this.setState({
            resource: {
                ...this.state.resource,
                tags: array
            }
        })
    }

    removeBelongingScore(event, tag_id){
        let array =  this.state.resource.tags
        const index = array.findIndex(function(elm){
            return elm.tag_id == tag_id
        })
        if (index !== -1 && array[index].belonging > 1){
            array[index].belonging -= 1
        }
        this.setState({
            resource: {
                ...this.state.resource,
                tags: array
            }
        })
    }

    async saveResource(){
        this.setState({loading:true})

        let resource = this.state.resource
        if (!resource.url.startsWith("https://")){
            resource.url = "https://" + resource.url
        }

        if (this.props.type == "create"){
            ajaxPost('resources', resource).then(res => {
                if (resource.file) {
                    this.fileUpload(resource.file, res.data.id)    
                } else {
                    this.setState({
                        loading : false
                    });
                    this.props.onSave()
                }
            })
            .catch((errors) => {
                this.setState({
                    loading:false,
                    savingErrors :errors
                });
            });
        } else if (this.props.type == "edit"){
            ajaxPut('resources/' + resource.id, resource).then(() => {
                if (resource.file) {
                    this.fileUpload(resource.file, resource.id)    
                } else {
                    this.setState({
                        loading : false
                    });
                    this.props.onSave()
                }
            })
            .catch((errors) => {
                this.setState({
                    loading:false,
                    savingErrors :errors
                });
            });
        }
    }

    async fileUpload(file, id){
        var fd = new FormData();
        fd.append('file',file)
        ajaxPostImage("resources/image/" + id, fd).then(() => {
            this.setState({
                loading : false
            });
            this.props.onSave()
        })
        .catch((errors) => {
            this.setState({
                loading:false,
                savingErrors :errors
            });
        })
    }

    render() {

        const {loading, error, savingErrors} = this.state

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
                    <form className="ui form attached fluid segment">
                        <div className="fields">
                            <div className="four wide field">
                                <img 
                                    className="rounded ui centered small image"
                                    src={this.state.resource.image ? 
                                        "/resources/image/" + this.state.resource.id
                                        : "/images/default.png"} 
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={this.handleImageChange}
                                    // className="upload-img"
                                />
                            </div>
                            <div className="six wide field">
                                <div className="field">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        placeholder="TipsMyWeb"
                                        name="name"
                                        value={this.state.resource.name}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <label>Language</label>
                                    <select
                                        name="language"
                                        value={this.state.resource.language}
                                        onChange={this.handleChange}
                                    >
                                        <option value="fr" defaultValue>Français</option>
                                        <option value="en">Anglais</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Prix</label>
                                    <select
                                        name="price_id"
                                        value={this.state.resource.price_id}
                                        onChange={this.handleChange}
                                    >
                                        <option value=" "></option>
                                        {
                                            this.state.prices.map((price, index) => {
                                                return <option 
                                                    value={price.id} 
                                                    key={index}
                                                    defaultValue={this.state.resource.price_id && this.state.resource.price_id === price.id}
                                                >
                                                    {price.name}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Type</label>
                                    <select
                                        name="type_id"
                                        value={this.state.resource.type_id}
                                        onChange={this.handleChange}
                                    >
                                        <option value=" "></option>
                                        {
                                            this.state.types.map((type, index) => {
                                                return <option 
                                                    value={type.id} 
                                                    key={index}
                                                    defaultValue={this.state.resource.type_id && this.state.resource.type_id === type.id}
                                                >
                                                    {type.name}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="six wide field">
                                <div className="field">
                                    <label>Url</label>
                                    <div className="ui labeled input">
                                        <div className="ui label">
                                            https://
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="tipsmyweb.com"
                                            name="url"
                                            value={this.state.resource.url}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Score</label>
                                    <input
                                        type="number"
                                        name="score"
                                        value={this.state.resource.score || ''}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="field">
                                    <label>Interface</label>
                                    <input
                                        type="number"
                                        name="interface"
                                        value={this.state.resource.interface || ''}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <textarea
                                rows="2"
                                name="description"
                                value={this.state.resource.description}
                                onChange={this.handleChange}
                            >
                            </textarea>
                        </div>
                        <h4 className="ui dividing header">Tags sélectionnées</h4>
                        <div className="fields">
                            {
                                this.state.resource.tags.map((selected_tag, index) => {
                                    let tag = this.state.tags.find(function(elm){
                                        return elm.id == selected_tag.tag_id;
                                    });
                                    return <div className="ui blue label" key={index}>
                                            <a onClick={((e) => this.addBelongingScore(e, tag.id))}>
                                                <i className="plus icon"></i>
                                            </a>
                                            <span className="right7 left7">{selected_tag.belonging}</span>
                                            <a className="right7" onClick={((e) => this.removeBelongingScore(e, tag.id))}>
                                                <i className="minus icon"></i>
                                            </a>
                                            <span className="right15">{tag.name}</span>
                                            <a onClick={((e) => this.unselectTag(e, tag.id))}>
                                                <i className="delete icon"></i>
                                            </a>
                                        </div>
                                })
                            }

                        </div>
                        <h4 className="ui dividing header">Autre tags</h4>
                        <div className="fields">
                            {
                                this.state.tags.map((tag, index) => {
                                    return <div  className={`ui grey label ${(this.state.resource.tags.find(function(
                                            selected_tag){return selected_tag.tag_id == tag.id}
                                        ))? 'hidden' : ''}`} key={index}>
                                        <span className="right15">
                                            {tag.name}
                                        </span>
                                        <a onClick={((e) => this.selectTag(e, tag))}>
                                            <i className="plus icon"></i>
                                        </a>
                                    </div>
                                })
                            }
                        </div>
                        <Divider fitted/>
                        <div className="ui blue submit button" onClick={this.saveResource}>
                            Ajouter
                        </div>
                        {
                            (Object.keys(savingErrors).length > 0)?(
                                <Message negative>
                                    <Message.Header>Erreur lors de l'ajout</Message.Header>
                                    <Message.List>
                                    {
                                        Object.keys(savingErrors).map(function(input, idx) {
                                            return <Message.Item key={idx}><strong>{input}</strong> : {savingErrors[input][0]}</Message.Item>
                                        }.bind(this))
                                    }
                                    </Message.List>
                                </Message>
                            ):(null)
                        }
                    </form>
                </div>
            </Grid.Column>
            )
    }
}

export default AdminResourceFormComponent;
