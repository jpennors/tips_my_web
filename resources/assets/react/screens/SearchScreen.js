import React, { Component } from 'react';
import {ajaxGet, ajaxPost} from "../utils/Ajax";
import ErrorHandler from "../utils/Modal";

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            selected_tags: [],
            active: true,
            resources : [],
            research: false,
            loading : true,
            error : false
        };

        this.selectTag = this.selectTag.bind(this)
        this.searchResources = this.searchResources.bind(this)
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
		} catch (error) {
            this.setState({
                loading:false,
                error:true
            })
            console.log(this.state.error)
        }
	}


    async searchResources(){
        this.setState({loading:true});
        try {
            const res = await ajaxPost('resources/search', {'tags' : this.state.selected_tags});
			this.setState({
                resources: res || [],
                research : true,
                loading : false
			});
		} catch (error) {
            this.setState({loading:false})
			this.setState({error:true})
		}
    }

    selectTag(event) {

        const tag_id = event.target.getAttribute("data-tag");

        var index = this.state.selected_tags.indexOf(tag_id)
        if (index !== -1) {
            this.setState({selected_tags: this.state.selected_tags.filter((_, t) => t !== index)});
        } else {
            let array =  this.state.selected_tags
            array.push(tag_id)
            this.setState({selected_tags: array});
        }
    }


    render() {

        const {error} = this.state
        return (
            <div>
                <ErrorHandler
                    open={error}
                />
                { this.state.research?
                    (
                        <div className="research_content">
                            <h1 className="left">Here are some website to improve your workflow </h1>

                            <ul id="research_results" key>
                                {
                                    this.state.resources.map((resource, index) => {
                                        return <div className="research_resource" key={index}>
                                            <a href={resource.url} target="_blank" ><img src={resource.image ? resource.image : '/images/default.jpg'} alt={resource.name} className="resource_img" /></a>
                                            <h2 className="center">{resource.name}</h2>
                                            <p>{resource.description}</p>
                                            <p className="research_results_btn">
                                                <a>Already know</a>
                                                <a>Try it !</a>
                                            </p>
                                        </div>
                                    })
                                }
                            </ul>
                        </div>

                    ) :
                    (
                        <div className="landing_content">
                            <h1>What are your centers of interest?</h1>
                            <p>Let’s find your most useful websites</p>


                                {
                                    this.state.loading ? (
                                        <div className="ui active inverted loader"></div>
                                    ) : (
                                        <div className="table">
                                            <div className="bar">
                                                <a title="Launch search"><img src="/images/Arrow.svg" alt="arrow" className="arrow" onClick={this.state.selected_tags.length ? this.searchResources : null} /></a>
                                            </div>
                                            <ul id="categories" key>
                                            {
                                                this.state.tags.map((tag, index) => {
                                                    return <li key={index} onClick={this.selectTag}>
                                                        <a data-tag={tag.id} className={`btnOne noselect ${(this.state.selected_tags.length >0
                                                                                    && this.state.selected_tags.indexOf(String(tag.id)) !== -1)? 'btnOneSelected' : ''}`}>
                                                            {tag.name}
                                                        </a>
                                                    </li>
                                                })
                                            }
                                            </ul>
                                        </div>
                                    )
                                }
                        </div>
                    )
                }
            </div>
        );
    }
}
