import React, { Component } from 'react';
import API from '../../utils/API';

class ProjectsAPI extends Component {

    state = {
        projects: []
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
                { this.state.projects.map( project => {
                    return (
                        <React.Fragment key={project._id}>
                            <p>{project._id}</p>
                            <p>{project.name}</p>
                            <p>{project.desc}</p>
                            <p>{project.locationZip}</p>
                            <p>{project.budget}</p>
                            <p>{project.img}</p>
                            <p>{project.reqSkills}</p>
                            <p>{project.seLed}</p>
                            <p>{project.startDate}</p>
                            <p>{project.compDate}</p>
                            <p>{project.compPerc}</p>
                            <p>{project.teamMembers}</p>
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        );
    }
}

export default ProjectsAPI;