import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, Button } from 'react-bootstrap';
// import './App.css';

class UserProfileForm extends Component {

    // constructor(props) {
    //   super();
    //   this.state = {
    //       profile: {}
    //   };
    // }
    

    tempSkills = [];

    state = {
      profile: {},
      given_name: '',
      family_name: '',
      picture: '',
      nickname: '',
      zip: '',
      phone: '',
      experience_level: '',
      technologies: [],
      experience_desc: '',
      bio_desc: '',
      title: '',
      isProfileCompleted: false
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
      

      if ( name === 'technology') {

        let isChecked = document.getElementById(value).checked;
        console.log('------');
        console.log(isChecked);
        console.log('------');


        if ( isChecked ) {
          this.tempSkills.push(value);
          document.getElementById(value).checked = true;
        } else {
          let index = this.tempSkills.indexOf(value);

          if ( index !== -1 ) {
            this.tempSkills.splice( index, 1 );
            document.getElementById(value).checked = false;
          }
        }        

        this.setState({
            technologies: this.tempSkills
        })

        console.log(this.tempSkills);
        console.log(this.state.technologies);

      } else {
        this.setState({
            [name]: value    
        })

        console.log([name] + ': ' + value);
      }

    };
  
    handleFormSubmit = event => {
      event.preventDefault();

      let updateUser = {
        given_name: this.state.given_name || this.state.profile.given_name,
        family_name: this.state.family_name || this.state.profile.family_name,
        picture: this.state.picture || this.state.profile.picture,
        nickname: this.state.nickname || this.state.profile.nickname,
        zip: this.state.zip || this.state.profile.zip,
        phone: this.state.phone || this.state.profile.phone,
        experience_level: this.state.experience_level || this.state.profile.experience_level,
        technologies: this.state.technologies || this.state.profile.technologies,
        experience_desc: this.state.experience_desc || this.state.profile.experience_desc,
        bio_desc: this.state.bio_desc || this.state.profile.bio_desc,
        title: this.state.title || this.state.profile.title,
        isProfileCompleted: true
      }

      console.log('--- updating user profile ---');
      console.log(updateUser);
      console.log('-----------------------------');

      axios.put('/api/users/' + this.state.profile.email, updateUser)
        .then( res => {
          console.log(res);
          
          this.setState({
            given_name: '',
            family_name: '',
            picture: '',
            nickname: '',
            zip: '',
            phone: '',
            experience_level: '',
            technologies: [],
            experience_desc: '',
            bio_desc: '',
            title: '',
            isProfileCompleted: false
          })

          alert('User Profile successfully updated.');
        })
        .catch(err => alert(`There was an error while updating your profile: ${err}`));

    };

    componentDidMount() {

      // this.setState({ 
      //   profile: {},
      // });
  
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
                  console.log(this.state.profile);
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
               id="given-name"
               name="given_name"
               value={this.state.given_name || profile.given_name}
               onChange={this.handleInputChange} 
        />
    </div>
    <div className="form-group">
        <label for="FormControlInput1">Last Name</label>
        <input type="text" 
               className="form-control" 
               id="family-name"
               name="family_name"
               value={this.state.family_name || profile.family_name}
               onChange={this.handleInputChange} 
        />
    </div>
    <div className="form-group">
        <label for="FormControlInput1">Hosted Picture Link</label>
        <input type="text" 
               className="form-control" 
               id="picture"
               name="picture"
               value={this.state.picture || profile.picture}
               onChange={this.handleInputChange}
        />
    </div>
    <div className="form-group">
        <label for="FormControlInput1">Nickname</label>
        <input type="text"
               className="form-control"
               id="nickname"
               name="nickname"
               value={this.state.nickname || profile.nickname}
               onChange={this.handleInputChange}
        />
    </div>
    <div className="form-group">
        <label for="FormControlInput1">Location Zip</label>
        <input type="text"
               className="form-control"
               id="zip"
               name="zip"
               value={this.state.zip || profile.zip}
               onChange={this.handleInputChange}
        />
    </div>
    <div className="form-group">
        <label for="FormControlInput1">Phone Number</label>
        <input type="text"
               className="form-control"
               id="phone"
               name="phone"
               value={this.state.phone || profile.phone}
               onChange={this.handleInputChange}
        />
    </div>
    <div className="form-group">
        <label for="FormControlInput1">Industry Position Title</label>
        <input type="text"
               className="form-control"
               id="title"
               name="title"
               value={this.state.title || profile.title}
               onChange={this.handleInputChange}
        />
    </div>
    <div className="form-group">
        <label>Overall Experience Level</label>
        <select className="form-control"
                id="experience-level"
                name="experience_level"
                value={this.state.experience_level || profile.experience_level}
                onChange={this.handleInputChange}
        >
            <option selected>Choose Experience...</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
        </select>
    </div>
    {/* <!-- Technologies Checkboxes --> */}
    <div className="form-group">
        <label for="FormControlInput1">Technologies</label><br />
        
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="angular" value="angular" name="technology" onChange={this.handleInputChange} />
            <label className="form-check-label" for="inlineCheckbox1">Angular</label>
        </div>
        
        <div className="form-check form-check-inline tech">
            <input className="form-check-input" type="checkbox" id="bootstrap" value="bootstrap" name="technology" 
              // checked={ this.state.profile.technologies.includes("bootstrap") ? true : false}
              onChange={this.handleInputChange} />
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
        <label for="exampleFormControlTextarea1">Experience Description</label>
        <textarea className="form-control description" id="experience-desc" rows="5" value={this.state.experience_desc || profile.experience_desc} name="experience_desc" onChange={this.handleInputChange}></textarea>
    </div>
    <div className="form-group">
        <label for="exampleFormControlTextarea1">Brief Profile Bio</label>
        <textarea className="form-control description" id="bio-desc" rows="5" value={this.state.bio_desc || profile.bio_desc} name="bio_desc" onChange={this.handleInputChange}></textarea>
    </div>
    <button type="button" className="btn btn-primary btn-lg" id="submit-new-project" onClick={this.handleFormSubmit} >Update Profile</button>
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
