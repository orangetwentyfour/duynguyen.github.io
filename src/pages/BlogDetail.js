import React from 'react';
import axios from 'axios';
import marked from 'marked';
import { Base64 } from 'js-base64';

import '../css/content.css';

marked.setOptions({
    breaks: true,
});
const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a id="tribute-link" href=${href} title=${title}" target="_blank">${text}</a>`;
};

export default class BlogDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    async componentDidMount() {
        try {
            const id = this.props.match.params.id;
            const contentBlogData = await this.getBlogContent(id);
            const contentBlog = Base64.decode(contentBlogData.data.content);
            this.setState({
                content: contentBlog
            });
        } catch (error) {
            console.log('ERROR', error);
        }
    }

    getBlogContent(id) {
        const apiGitHub = 'https://api.github.com';
        const pathGitHubApi = `${apiGitHub}/repos/orangetwentyfour/blogs-github/git/blobs/${id}`;
        return axios.get(pathGitHubApi);
    }

    render() {
        const markdownText = marked(this.state.content,renderer);
        return (
            <div className="custom-container custom-container__bg-raisin-black blog-content color-black-coral">
                <div className="box-content" dangerouslySetInnerHTML={{ __html: markdownText }}>

                </div>
            </div>
        )
    }
}
