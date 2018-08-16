import React, { Component } from 'react';
import axios from 'axios';

//Capturing Form data

class ProjectForm extends Component {

    state = {
        profile: {},
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    componentWillMount() {

        // Get user profile from Auth0 API
        const { userProfile, getProfile } = this.props.auth;

        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });

                console.log(`---- profile sub ${profile.email} ------`);

                axios.get('/api/users/' + profile.email)
                    .then(res => {
                        console.log(`profile view res.data.length = ${res.data.length}`);

                        if (res.data.length === 0) {
                            console.log(`dlafkjdkajfda`);
                            console.log(profile);
                            axios.post('/api/users', profile)
                                .then(res => console.log(res));
                        } else {
                            console.log(`setting profile state`);
                            this.setState({ profile: res.data[0] });
                        }
                    });
            })

        } else {
            this.setState({ profile: userProfile });
        }

    }

    render() {

        const { profile } = this.state;
        const { isAuthenticated } = this.props.auth;

        return (

            <React.Fragment>

                {isAuthenticated() && (
                    // {/* Nav bar */}
                    <nav className="navbar navbar-expand-lg navbar-dark bg-light" id="mainNav">
                        <a className="navbar-brand d-flex w-30 mr-auto" href="/">Hire Local</a>
                        <button className="navbar-toggler logged-in" type="button" data-toggle="collapse" data-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse w-100" id="navbarNav">
                            <ul className="navbar-nav ml-auto justify-content-end">
                                <li>
                                    <div className="dropdown icon-tab">
                                        <button className="btn btn-secondary dropdown-toggle text-nav logged-in" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-user-alt"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" onClick={this.logout.bind(this)}>
                                                Log Out
                                </a>
                                            <a className="dropdown-item" href="/myDashboard">
                                                My Dashboard
                                </a>
                                            {
                                                profile.isAdmin && profile.isAdmin === true ?
                                                    <a className="dropdown-item" href="/adminDashboard">
                                                        Admin Dashboard
                                    </a> : ''
                                            }
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                )}

                {!isAuthenticated() && (
                    //   <!-- Nav bar  -->
                    <nav className="navbar navbar-expand-lg navbar-dark bg-light" id="mainNav">
                        <a className="navbar-brand d-flex w-30 mr-auto" href="/">Hire Local</a>
                        <button className="navbar-toggler not-logged-in" type="button" data-toggle="collapse" data-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse w-100" id="navbarNav">
                            <ul className="navbar-nav ml-auto justify-content-end">
                                <li>
                                    <div className="dropdown icon-tab">
                                        <button className="btn btn-secondary dropdown-toggle text-nav not-logged-in" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-user-alt"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" onClick={this.login.bind(this)}>
                                                Log In
                                </a>
                                            <a className="dropdown-item" onClick={this.login.bind(this)}>
                                                Sign Up
                                </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                )}



                {/* Begin Form */}
                <div className="apply-form">
                    <div className="container">
                        <h2 className="text-center text-uppercase text-secondary mb-0">Submit a Project</h2>
                        <hr className="star-dark mb-5" />
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <div className="App">

                                    {/* <!-- ***************** BEGIN POST A PROJECT FORM *************************** --> */}
                                    <div className="tab-pane fade active show" id="postProj" role="tabpanel" aria-labelledby="home-tab">

                                        <form action="https://formspree.io/se.localdevs@gmail.com" method="POST">
                                            <div className="form-group">
                                                <label for="FormControlInput1">Project Title</label>
                                                <input type="text" className="form-control" id="projectTitle" name="title" />
                                            </div>
                                            <div className="form-group">
                                                <label for="FormControlInput1">Location Zip Code</label>
                                                <input type="text" className="form-control" id="projectLocation" name="locationZip" />
                                            </div>
                                            <div className="form-group">
                                                <label for="FormControlInput1">Start Date (mm/dd/yyyy)</label>
                                                <input type="text" className="form-control" id="start-date" name="projectStartDate" />
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleFormControlTextarea1">Full Project Description</label>
                                                <textarea className="form-control description" id="full-description" rows="5" name="projectDesc"></textarea>
                                            </div>
                                            <div>
                                                <input type="hidden" name="_subject" value="New Project Submission!" />
                                                <input type="hidden" name="projectPoster" value={profile.email} />
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-lg" id="submit-new-project">
                                                Submit Project
                                            </button>
                                        </form>
                                    </div>
                                    {/* <!-- ******************* END POST PROJECT FORM *************************** --> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>

        );
    }
}

export default ProjectForm;
