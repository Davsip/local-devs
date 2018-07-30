import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, Button } from 'react-bootstrap';
// import './App.css';

class UserProfileForm extends Component {
    tempSkills = [];

    state = {
      profile: {},
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
  
    handleInputChange = event => {
      const { name, value } = event.target;

      this.setState({
          [name]: value    
      })
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
  
      alert('need to handle user update here & in user controller')  
    };

    componentWillMount() {

      this.setState({ 
        profile: {},
      });
  
      // Get user profile from Auth0 API
      const { userProfile, getProfile } = this.props.auth;
  
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
  
          console.log(`---- profile sub ${profile.email} ------`);
  
          axios.get('/api/users/' + profile.email)
            .then( res => {
                console.log(`profile view res.data.length = ${res.data.length}`);
      
                if ( res.data.length === 0 ) {
                  console.log(`dlafkjdkajfda`);
                  console.log(profile);
                  axios.post('/api/users', profile)
                    .then( res => console.log(res));
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

      { isAuthenticated() && (
        // {/* Nav bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-light" id="mainNav">
          <a className="navbar-brand d-flex w-30 mr-auto" href="/">Hire Local</a>
          <button className="navbar-toggler logged-in" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse w-100" id="navbarNav">
            <ul className="navbar-nav ml-auto justify-content-end">
            <li>
              <div className="navbar-nav-link">
                <a className="nav-link text-nav" href="/ProjectForm">Submit Project</a>
              </div>
            </li>
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

    { !isAuthenticated() && (
        //   <!-- Nav bar  -->
        <nav className="navbar navbar-expand-lg navbar-dark bg-light" id="mainNav">
          <a className="navbar-brand d-flex w-30 mr-auto" href="/">Hire Local</a>
          <button className="navbar-toggler not-logged-in" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse w-100" id="navbarNav">
            <ul className="navbar-nav ml-auto justify-content-end">
              <li>
                <div className="navbar-nav-link">
                  <a className="nav-link text-nav" href="/ProjectForm">Submit Project</a>
                </div>
              </li>
              <li>
                <div className="dropdown icon-tab">
                  <button className="btn btn-secondary dropdown-toggle text-nav not-logged-in" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user-alt"></i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={this.login.bind(this)}>
                    Log In
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
      <h2 className="text-center text-uppercase text-secondary mb-0">Update Your Profile</h2>
      <hr className="star-dark mb-5" />
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="App">

            {/* <!-- ***************** BEGIN UPDATE YOUR PROFILE FORM *************************** --> */}

                <div className="tab-pane fade active show" id="postProj" role="tabpanel" aria-labelledby="home-tab">

<form>
    <div className="form-group">
        <label for="FormControlInput1">First Name</label>
        <input type="text" 
               className="form-control" 
               id="title"
               name="given_name"
               value={this.state.given_name}
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
            <input className="form-check-input" type="checkbox" id="angular" value="angular" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox1">Angular</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="bootstrap" value="bootstrap" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox2">Bootstrap</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="chart" value="chart" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox3">Chart</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="cplusplus" value="cplusplus" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox4">C++</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="csharp" value="csharp" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox5">C#</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="css" value="css" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox6">CSS</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="github" value="github" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox7">GitHub</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="handlebars" value="handlebars" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox8">Handlebars</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="heroku" value="heroku" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox9">Heroku</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="html" value="html" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox10">HTML</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="illustrator" value="illustrator" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox11">Illustrator</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="java" value="java" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox12">Java</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="javascript" value="javascript" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox13">JavaScript</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="jquery" value="jquery" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox14">JQuery</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="mongodb" value="mongodb" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox15">MongoDB</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="mysql" value="mysql" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox16">MySQL</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="node" value="node" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox17">Node</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="photoshop" value="photoshop" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox18">PhotoShop</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="python" value="python" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox19">Python</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="react" value="react" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox20">React</label>
        </div>
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="sass" value="sass" name="technology" onChange={this.handleInputChange} />
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

          </div>
        </div>
      </div>
    </div>
  </div>

    </React.Fragment>
     
    );
  }
}

export default UserProfileForm;
