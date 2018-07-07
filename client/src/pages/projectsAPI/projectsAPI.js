import React, { Component } from 'react';
import API from '../../utils/API';

class ProjectsAPI extends Component {

    state = {
        projects: null
    };

    componentDidMount() {
        API.getSavedProjects().then( res => {

            console.log(res.data);

            this.setState({
                projects: res.data
            })
        })
    }

    render () {
        return (
            <React.Fragment>
                {this.state.projects}
            </React.Fragment>
        );
    }
}

export default ProjectsAPI;