import React, { Component } from 'react';
import axios from 'axios';
import API from '../../utils/API';
import AdminProjectCard from '../../components/AdminProjectCard';
import { join } from 'path';

class AdminDash extends Component {

    tempSkills = [];

    state = {
        profile: {},
        projects: [],
        name: '',
        desc: '',
        locationZip: null,
        budget: null,
        img: null,
        reqSkills: [],
        seLed: true,
        startDate: null,
        duration: null,
        compPerc: null,
        teamMembers: [],
        teamApplicants: [],
        projectStage: 'pending',
        teamSize: null
    };

    handleInputChange = event => {
        const { name, value } = event.target;

        if (name === 'technology') {

            let isChecked = document.getElementById(value).checked;
            console.log('------');
            console.log(isChecked);
            console.log('------');


            if (isChecked) {
                this.tempSkills.push(value);
                document.getElementById(value).checked = true;
            } else {
                let index = this.tempSkills.indexOf(value);

                if (index !== -1) {
                    this.tempSkills.splice(index, 1);
                    document.getElementById(value).checked = false;
                }
            }

            this.setState({
                reqSkills: this.tempSkills
            })

            console.log(this.tempSkills);
            console.log(this.state.reqSkills);

        } else {
            this.setState({
                [name]: value
            })

            console.log([name] + ': ' + value);
        }
    };

    handleFormSubmit = event => {
        event.preventDefault();

        let newProject = {
            name: this.state.name,
            desc: this.state.desc,
            locationZip: this.state.locationZip,
            budget: this.state.budget,
            img: this.state.img,
            reqSkills: this.state.reqSkills,
            seLed: this.state.seLed,
            startDate: this.state.startDate,
            duration: this.state.duration,
            compPerc: this.state.compPerc,
            teamMembers: this.state.teamMembers,
            teamApplicants: this.state.teamApplicants,
            projectStage: this.state.projectStage,
            teamSize: this.state.teamSize
        }

        console.log('--- posting new project ---');
        console.log(newProject);
        console.log('---------------------------');

        axios.post('/api/projects', newProject)
            .then(res => {
                console.log(res);

                // reset all form values to default
                // reset all project state values to default
                this.tempSkills = [];


                alert('Project succesfully added to database.');
            })
            .catch(err => alert(`There was an error while posting the project: ${err}`));

    };

    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    componentWillMount() {

        this.setState({
            profile: {},
            projects: []
        });

        // Get projects from Projects API
        API.getSavedProjects().then(res => {
            console.log(res.data);

            this.setState({
                projects: res.data
            })
        })

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
    const { profile, projects } = this.state;
    const { isAuthenticated } = this.props.auth;


        // console.log('--- component will mount ---');
        // console.log(this.state.profile);
        // console.log(this.state.profile.technologies);

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








                {/* <!-- Admin Dashboard Nav Pills, Form, Accordian View--> */}
                <section className="dashboard">
                    <div className="container">
                        <h2 className="text-center text-uppercase text-secondary ">Admin Dashboard</h2>
                        <hr className="star-dark mb-6 " />

                        <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link nav-dashboard active" data-toggle="pill" href="#postProj">Post Project</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-dashboard" data-toggle="pill" href="#pendingProjs">Pending Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-dashboard" data-toggle="pill" href="#startedProjs">Started Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-dashboard" data-toggle="pill" href="#completedProjs">Completed Projects</a>
                            </li>
                        </ul>

                        {/* <!--    ***** BEGIN ALL PILLS CONTENT (inludes all content in tabs)****    --> */}
                        <div className="tab-content" id="pills-tabContent">


                            {/* <!-- ***************** BEGIN POST A PROJECT FORM *************************** --> */}

                            <div className="tab-pane fade active show" id="postProj" role="tabpanel" aria-labelledby="home-tab">

                                <form>
                                    <div className="form-group">
                                        <label for="FormControlInput1">Project Title</label>
                                        <input type="text"
                                            className="form-control"
                                            id="title"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="FormControlInput1">Budget</label>
                                        <input type="text"
                                            className="form-control"
                                            id="budget"
                                            name="budget"
                                            value={this.state.budget}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="FormControlInput1">Location Zip Code</label>
                                        <input type="text"
                                            className="form-control"
                                            id="location"
                                            name="locationZip"
                                            value={this.state.locationZip}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="FormControlInput1">Start Date (mm/dd/yyyy)</label>
                                        <input type="text"
                                            className="form-control"
                                            id="start-date"
                                            name="startDate"
                                            value={this.state.startDate}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="FormControlInput1">Team Size</label>
                                        <input type="text"
                                            className="form-control"
                                            id="team-size"
                                            name="teamSize"
                                            value={this.state.teamSize}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Duration</label>
                                        <select className="form-control"
                                            id="duration"
                                            name="duration"
                                            value={this.state.duration}
                                            onChange={this.handleInputChange}
                                        >
                                            <option selected>Choose Duration...</option>
                                            <option value="3">3 Months</option>
                                            <option value="5">5 Months</option>
                                            <option value="7">7 Months</option>
                                            <option value="8">8 Months</option>
                                            <option value="11">11 Months</option>
                                            <option value="18">18 Months</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>SE Led</label><br />
                                        <div className="form-check form-check-inline seled">
                                            <input className="form-check-input" type="radio" name="seLed" id="seledTrue" value="true" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineRadio1">True</label>
                                        </div>
                                        <div className="form-check form-check-inline seled">
                                            <input className="form-check-input" type="radio" name="seLed" id="seledFalse" value="false" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineRadio2">False</label>
                                        </div>
                                    </div>
                                    {/* <!-- Technologies Checkboxes --> */}
                                    <div className="form-group">
                                        <label for="FormControlInput1">Technologies</label><br />

                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Angular" value="Angular" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox1">Angular</label>
                                        </div>

                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Bootstrap" value="Bootstrap" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox2">Bootstrap</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Chart" value="Chart" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox3">Chart</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="C++" value="C++" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox4">C++</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="C#" value="C#" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox5">C#</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="CSS" value="CSS" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox6">CSS</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="GitHub" value="GitHub" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox7">GitHub</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Handlebars" value="Handlebars" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox8">Handlebars</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Heroku" value="Heroku" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox9">Heroku</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="HTML" value="HTML" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox10">HTML</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Illustrator" value="Illustrator" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox11">Illustrator</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Java" value="Java" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox12">Java</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="JavaScript" value="JavaScript" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox13">JavaScript</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="JQuery" value="JQuery" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox14">JQuery</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="MongoDB" value="MongoDB" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox15">MongoDB</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="MySQL" value="MySQL" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox16">MySQL</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Node" value="Node" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox17">Node</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Photoshop" value="Photoshop" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox18">PhotoShop</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Python" value="Python" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox19">Python</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="React" value="React" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox20">React</label>
                                        </div>
                                        <div className="form-check form-check-inline tech">
                                            <input className="form-check-input" type="checkbox" id="Sass" value="Sass" name="technology" onChange={this.handleInputChange} />
                                            <label className="form-check-label" for="inlineCheckbox21">Sass</label>
                                        </div>
                                    </div>
                                    {/* <!-- End Technologies Checkboxes --> */}
                                    <div className="form-group">
                                        <label for="exampleFormControlTextarea1">Full Project Description</label>
                                        <textarea className="form-control description" id="full-description" rows="5" name="desc" onChange={this.handleInputChange}></textarea>
                                    </div>
                                    <button type="button" className="btn btn-primary btn-lg" id="submit-new-project" onClick={this.handleFormSubmit} >Submit Project</button>
                                </form>
                            </div>

                            {/* <!-- ******************* END POST PROJECT FORM *************************** --> */}
                            {/* <!-- ******************* BEGIN PENDING PROJECTS ************************** --> */}

                            <div className="tab-pane fade" id="pendingProjs" role="tabpanel" aria-labelledby="profile-tab">

                                {/* <!-- All Pending Projs Content in Accordian --> */}

                                <div id="accordion">

                                    {/* <!-- Proj 1 --> */}

                            {projects.map((project, index) => {
                                if (project.projectStage === "pending") {
                                    return (
                                        <AdminProjectCard
                                            key={index}
                                            id={project._id}
                                            name={project.name}
                                            budget={Number(project.budget).toLocaleString()}
                                            location={project.locationZip}
                                            skills={project.reqSkills.join(", ")}
                                            startDate={project.startDate.substring(5,7) + '/' + project.startDate.substring(8,10) + '/' + project.startDate.substring(0,4)}
                                            duration={project.duration}
                                            seLed={String(project.seLed)}
                                            desc={project.desc}
                                            teamSize={project.teamSize}
                                            applicants={project.teamApplicants}
                                            team={project.teamMembers}
                                            stage={project.projectStage}
                                             />
                                    )
                                }
                            })}

                        {/* <div className="card card-proj">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#pendingCollapseOne" aria-expanded="true" aria-controls="pendingCollapseOne">
                                    Project 1 (ID) - AD Web App
                                    </button>
                                </h5>
                            </div>
                        
                            <div id="pendingCollapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    
                                    <!-- Begin Proj 1 Details -->

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <!-- Details -->
                                            <h6><span className="projTitle">AD Web App</span></h6>
                                            <p>
                                                <em>Budget</em>: $<span className="projBudget">60,000</span><br />
                                            
                                                <em>Location</em>: <span className="projLocation">75126</span><br />

                                                <em>Technologies</em>: <span className="projTech">C#, HTML, JavaScript, CSS, JQuery, Angular</span><br />

                                                <em>Start Date</em>: <span className="projStartDate">8/15/2018</span><br />
                                            
                                                <em>Duration</em>: <span className="projDuration">4 Months</span><br />

                                                <em>SE Led</em>: <span className="seLed">false</span>
                                            </p>
                                            
                                        </div>
                                        <div className="col-sm-6">
                                            <!-- Desc -->
                                            <p>Client needs clean, dynamic Active Directory personnel resource site. This is an eleven month project and the team will consist of four developers. Client expects developers to have great teamwork and communication skills. Weekly deliverables are expected.</p>

                                        </div>
                                      </div>
                                      
                                      <div className="row">
                                        <div className="col-sm-12">
                          



                                            <!-- Editable -->
                                            <h6 className="projDetails">Applicants</h6>

                                            <!-- Each Applicant 1 -->
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    David Sipala
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            <!-- End Applicant 1 -->
                                                    
                                            <!-- Applicant 2 -->
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Doug Henderson
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            <!-- End Applicant 2 -->
                                            <!-- Applicant 3 -->
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Jason Warner
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            <!-- End Applicant 3 -->
                                            <!-- Applicant 4 -->
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bryan Aber
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            <!-- End Applicant 4 -->
                                            <!-- Applicant 5 -->
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bill Bradsky
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                            <!-- End Applicant 5 -->
                                            
                                          </div>
                                          
                                          <!-- Team Members -->

                                        <div className="col-sm-12" id="team-members">
                                            <!-- Editable -->
                                            <h6 className="projDetails">Team Members</h6>

                                            <!-- Each Team Member 1 -->
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Bill Bradsky
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                                </div>
                                            </span>
                                            <!-- End Team Member 1 -->

                                            <!-- Each Team Member 2 -->
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Doug Henderson
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                                </div>
                                            </span>
                                            <!-- End Team Member 2 -->
                                            
                                        </div>

                                        <!-- End Team Members -->

                                        <!-- Project Stage -->
                                        <div className="col-sm-12">
                                        
                                          <h6 className="projDetails">Project Stage</h6>
                                          
                                          <!-- Each Applicant 1 -->
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle proj-state" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Pending
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item pstage" id='Started'>Started</a>
                                                                <a className="dropdown-item pstage" id='Completed'>Completed</a>
                                                            </div>
                                                        </span>
                                                        <!-- End Applicant 1 -->

                                                    </div>
                                                    <div className="col-sm-12">
                                                        <button type="button" className="btn btn-primary" id="update-project">Update Project</button>
                                                    </div>
                                                </div>
                                              </div>
                                              
                                              
                                               <!-- End Proj 1 Details -->
                                          </div>
                                      </div> */}

                                      {/* <!-- End Proj 1 / Beg Proj 2 --> */}

                                      {/* <div className="card card-proj">
                                    <div className="card-header" id="headingTwo">
                                      <h5 className="mb-0">
                                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#pendingCollapseTwo" aria-expanded="false" aria-controls="pendingCollapseTwo">
                                        Project 32 - Company Branding
                                      </button>
                                      </h5>
                                     </div>
                                     <div id="pendingCollapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                      <div className="card-body">
                                        Project 32 Details Here
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <!-- End Proj 2 -->
                                 <!-- Proj 3 -->
                                 <div className="card card-proj">
                                   <div className="card-header" id="headingThree">
                                     <h5 className="mb-0">
                                     <button className="btn btn-link" data-toggle="collapse" data-target="#pendingCollapseThree" aria-expanded="false" aria-controls="pendingCollapseThree">
                                       Project 33 - Company Static Website
                                   </div>
                                </div>
                        </div>
                        <!-- End Proj 3 --> */}

                        {/* <!-- End Accordian --> */}
                      </div>

                    </div>

                    {/* <!-- ******************* END PENDING PROJECTS ************************** --> */}
                    {/* <!-- ******************* BEGIN STARTED PROJECTS ************************ --> */}
            

                            <div className="tab-pane fade" id="startedProjs" role="tabpanel" aria-labelledby="contact-tab">

                                {/* <!-- Started Projs Content --> */}

                                <div id="accordion">

                                    {/* <!-- Accordian - Started Proj 1 --> */}

                                    <div className="card card-proj">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" data-toggle="collapse" data-target="#startedCollapseOne" aria-expanded="true" aria-controls="startedCollapseOne">
                                                    Project 4 (ID) - Professional ToDo App
                                    </button>
                                            </h5>
                                        </div>

                                        <div id="startedCollapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="card-body">

                                                {/* <!-- Begin Started Proj 1 Details --> */}

                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {/* <!-- Details --> */}
                                                        <h6><span className="projTitle">AD Web App</span></h6>
                                                        <p>
                                                            <em>Budget</em>: $<span className="projBudget">60,000</span><br />

                                                            <em>Location</em>: <span className="projLocation">75126</span><br />

                                                            <em>Technologies</em>: <span className="projTech">C#, HTML, JavaScript, CSS, JQuery, Angular</span><br />

                                                            <em>Start Date</em>: <span className="projStartDate">8/15/2018</span><br />

                                                            <em>Duration</em>: <span className="projDuration">4 Months</span><br />

                                                            <em>SE Led</em>: <span className="seLed">false</span>
                                                        </p>


                                                    </div>
                                                    <div className="col-sm-6">
                                                        {/* <!-- Desc --> */}
                                                        <p>Client needs clean, dynamic Active Directory personnel resource site. This is an eleven month project and the team will consist of four developers. Client expects developers to have great teamwork and communication skills. Weekly deliverables are expected.</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">

                                                        {/* <!-- Editable --> */}
                                                        <h6 className="projDetails">Applicants</h6>

                                                        {/* <!-- Each Applicant 1 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                David Sipala
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 1 --> */}

                                                        {/* <!-- Applicant 2 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Doug Henderson
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 2 --> */}
                                                        {/* <!-- Applicant 3 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Jason Warner
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 3 --> */}
                                                        {/* <!-- Applicant 4 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Bryan Aber
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 4 --> */}
                                                        {/* <!-- Applicant 5 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Bill Bradsky
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 5 --> */}

                                                    </div>

                                                    {/* <!-- Team Members --> */}

                                                    <div className="col-sm-12">
                                                        {/* <!-- Editable --> */}
                                                        <h6 className="projDetails">Team Members</h6>

                                                        {/* <!-- Each Team Member 1 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Bill Bradsky
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item member-remove">Remove From Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Team Member 1 --> */}

                                                        {/* <!-- Each Team Member 2 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Doug Henderson
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item member-remove">Remove From Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Team Member 2 --> */}

                                                    </div>

                                                    {/* <!-- End Team Members --> */}

                                                    {/* <!-- Project Stage --> */}
                                                    <div className="col-sm-12">

                                                        <h6 className="projDetails">Project Stage</h6>

                                                        {/* <!-- Each Applicant 1 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle proj-state" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Pending
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item">Started</a>
                                                                <a className="dropdown-item">Completed</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 1 --> */}


                                                    </div>



                                                </div>

                                            </div>

                                            {/* <!-- End Started Proj 1 Details --> */}
                                        </div>
                                    </div>

                                    <div className="card card-proj">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#startedCollapseTwo" aria-expanded="false" aria-controls="startedcollapseTwo">
                                                    Project 5 - Auto Market Site
                                </button>
                                            </h5>
                                        </div>
                                        <div id="startedCollapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                            <div className="card-body">
                                                Project 5 Details
                                </div>
                                        </div>
                                    </div>

                                    {/* <!-- End Proj 2 --> */}

                                </div>

                            </div>

                            {/* <!-- ******************* END STARTED PROJECTS ************************ --> */}
                            {/* <!-- ******************* BEGIN COMPLETED PROJECTS ******************** --> */}

                            <div className="tab-pane fade" id="completedProjs" role="tabpanel" aria-labelledby="contact-tab">

                                {/* <!-- Completed Projs Content --> */}

                                <div id="accordion">

                                    {/* <!-- Accordian - Compl Proj 1 --> */}

                                    <div className="card card-proj">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" data-toggle="collapse" data-target="#completedCollapseOne" aria-expanded="true" aria-controls="completedCollapseOne">
                                                    Project 4 (ID) - Professional ToDo App
                                    </button>
                                            </h5>
                                        </div>

                                        <div id="completedCollapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="card-body">

                                                {/* <!-- Begin Compl Proj 1 Details --> */}

                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {/* <!-- Details --> */}
                                                        <h6><span className="projTitle">AD Web App</span></h6>
                                                        <p>
                                                            <em>Budget</em>: $<span className="projBudget">60,000</span><br />

                                                            <em>Location</em>: <span className="projLocation">75126</span><br />

                                                            <em>Technologies</em>: <span className="projTech">C#, HTML, JavaScript, CSS, JQuery, Angular</span><br />

                                                            <em>Start Date</em>: <span className="projStartDate">8/15/2018</span><br />

                                                            <em>Duration</em>: <span className="projDuration">4 Months</span><br />

                                                            <em>SE Led</em>: <span className="seLed">false</span>
                                                        </p>

                                                    </div>
                                                    <div className="col-sm-6">
                                                        {/* <!-- Desc --> */}
                                                        <p>Client needs clean, dynamic Active Directory personnel resource site. This is an eleven month project and the team will consist of four developers. Client expects developers to have great teamwork and communication skills. Weekly deliverables are expected.</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">

                                                        {/* <!-- Editable --> */}
                                                        <h6 className="projDetails">Applicants</h6>

                                                        {/* <!-- Each Applicant 1 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                David Sipala
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 1 --> */}

                                                        {/* <!-- Applicant 2 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Doug Henderson
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 2 --> */}
                                                        {/* <!-- Applicant 3 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Jason Warner
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 3 --> */}
                                                        {/* <!-- Applicant 4 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Bryan Aber
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 4 --> */}
                                                        {/* <!-- Applicant 5 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Bill Bradsky
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item applicant-move">Copy to Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 5 --> */}

                                                    </div>

                                                    {/* <!-- Team Members --> */}

                                                    <div className="col-sm-12">
                                                        {/* <!-- Editable --> */}
                                                        <h6 className="projDetails">Team Members</h6>

                                                        {/* <!-- Each Team Member 1 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Bill Bradsky
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item member-remove">Remove From Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Team Member 1 --> */}

                                                        {/* <!-- Each Team Member 2 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Doug Henderson
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item member-remove">Remove From Team</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Team Member 2 --> */}

                                                    </div>

                                                    {/* <!-- End Team Members --> */}

                                                    {/* <!-- Project Stage --> */}
                                                    <div className="col-sm-12">

                                                        <h6 className="projDetails">Project Stage</h6>

                                                        {/* <!-- Each Applicant 1 --> */}
                                                        <span className="dropdown">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle proj-state" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Pending
                                                </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item">Started</a>
                                                                <a className="dropdown-item">Completed</a>
                                                            </div>
                                                        </span>
                                                        {/* <!-- End Applicant 1 --> */}

                                                    </div>
                                                </div>
                                            </div>

                                            {/* <!-- End Compl Proj 1 Details --> */}
                                        </div>
                                    </div>

                                    <div className="card card-proj">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#completedCollapseTwo" aria-expanded="false" aria-controls="completedCollapseTwo">
                                                    Project 5 - Auto Market Site
                                </button>
                                            </h5>
                                        </div>
                                        <div id="completedCollapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                            <div className="card-body">
                                                Project 5 Details
                                </div>
                                        </div>
                                    </div>

                                    {/* <!-- End Proj 2 --> */}

                                </div>
                            </div>

                            {/* <!-- ******************* END COMPLETED PROJECTS ******************** --> */}

                        </div>

                        {/* <!--    ***** END ALL PILLS CONTENT (inludes all content in tabs)****    --> */}

                    </div>
                    {/* <!-- End page container (above) --> */}

                </section>





            </React.Fragment>
        );
    }
}

export default AdminDash;