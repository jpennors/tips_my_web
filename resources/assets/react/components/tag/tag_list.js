import React, { Component } from 'react';
// import '/assets/css/tag.css';


export default class TagList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            selected_tags: [],
            active: true,
            resources : [],
        };

        this.selectTag = this.selectTag.bind(this)
        this.searchResources = this.searchResources.bind(this)
    }

    componentDidMount() {
        this.TagList();
    }

    TagList() {
        fetch("http://localhost:8000/api/tags")
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({tags: result});
            },
            (error) => {
                console.log(error);
            }
        )
    }

    searchResources(){
        fetch("http://localhost:8000/api/resources/search", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'tags' : this.state.selected_tags
            })
        })
            // JSON.stringify({
            //     tags : this.state.selected_tags
            // })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                this.setState({resources: result});
                this.render()
            },
            (error) => {
                console.log(error);
            }
        )
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


        return (
            <div>
                <div className="bar">
                    <a><img src="/assets/images/Arrow.svg" alt="arrow" className="arrow" onClick={this.searchResources} /></a>
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
                {
                    this.state.resources.map((resource, index) => {
                        return <p key={index}>{resource.name}</p>
                    })
                }
            </div>
        );
    }
}
