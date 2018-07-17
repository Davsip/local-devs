import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
// import API from '../../utils.API'
// import './App.css';




class UserProfileForm extends Component {

  constructor (props) {
      super(props);
      this.state = {
          inputvalue: ''
      }
      this.handleChange = this.handleChange.bind(this);
  }

  state = {
    profile: {},
    projects: []
  };

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
  
  handleChange (event) {
    this.setState({
        inputvalue: event.target.value
    })
  }

  handleSubmit (event) {
    console.log('Form value: ' + this.state.inputvalue);
    event.preventDefault();
}
  
  render() {

    const { profile, projects } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (

      <React.Fragment>

      { isAuthenticated() && (
        // {/* Nav bar */}
        <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
        <div className="hire-tab">
            <a className="navbar-brand text-nav" href="/">Hire Local</a>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="nav-tabs">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li>
                        <div className="dropdown icon-tab ">
                            <button className="btn btn-secondary dropdown-togglen text-nav " type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user-alt"></i>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={this.logout.bind(this)}>Log Out</a>
                                <a className="dropdown-item" href="/myDashboard">My Dashboard</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
    )}

    { !isAuthenticated() && (
        //   <!-- Nav bar  -->
        <nav className=" navbar navbar-expand-lg fixed-top" id="mainNav">
            <div className="hire-tab">
                <a className="navbar-brand text-nav" href="/">Hire Locals</a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="nav-tabs">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <div className="post-tab">
                                <a className="nav-link text-nav" href="#portfolio">Post Projects</a>
                            </div>                       
                        </li>
                        <li>
                            <div className="work-tab">
                                <a className="nav-link text-nav" href="#">How it Works
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="browse-tab">
                                <a className="nav-link text-nav" href="#">Browse Jobs
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="social-tab">
                                <a className="nav-link text-nav" href="#">Social
                                </a>
                            </div>
                        </li>
                        <li>        
                            <div className="dropdown icon-tab ">
                                <button className="btn btn-secondary dropdown-togglen text-nav" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user-alt"></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={this.login.bind(this)}>Log in</a>
                                    <a className="dropdown-item" onClick={this.login.bind(this)}>Sign up</a>
                                </div>
                            </div>        
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )}



{/* Begin Form */}
  <div className="apply-form">
    <div className="container">
      <h2 className="text-center text-uppercase text-secondary mb-0">Sign up</h2>
      <hr className="star-dark mb-5" />
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="App">
            <form name="sentMessage" id="contactForm" novalidate="novalidate" onSubmit={this.handleSubmit.bind(this)}>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2"> 
                  <label className="label">Local Devs Name:  </label>
                  <input className="form-control" id="name" type="text" onfocus="value=''" required="required" data-validation-required-message="Please enter your name." value={this.state.inputvalue} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2">    
                  <label className="label">Email Address:  </label>
                  <input type="email" className="form-control" id="email" value="Email Address" onfocus="value=''" required="required" data-validation-required-message="Please enter your email address." value={this.state.inputvalue} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2">    
                  <label className="label">Phone Number:  </label>
                  <input type="text" className="form-control" id="phone-number" onfocus="value=''" required="required" data-validation-required-message="Please enter your phone number." value={this.state.inputvalue} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2">
                  <label className="label">Password:  </label>
                  <input className="form-control" id="email" type="email" onfocus="value=''" required="required" data-validation-required-message="Please enter your password." value={this.state.inputvalue} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2">
                  <label className="label">Re enter Password:  </label>
                  <input className="form-control" id="email" type="email" onfocus="value=''" required="required" data-validation-required-message="Please re-enter your password." value={this.state.inputvalue} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="control-group">
              <div className="form-group floating-label-form-group controls mb-0 pb-2">
                <label className="label">What are the main types of services you offer?</label>
                <label className="checkbox-container">Web Development
                  <input type="checkbox" name="skill" value="web-dev" value={this.state.inputvalue} onChange={this.handleChange}/>
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-container">Mobile Development
                  <input type="checkbox" name="skill" value="mobile-dev" value={this.state.inputvalue} onChange={this.handleChange}/>
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-container">Software Development
                  <input type="checkbox" name="skill" value="software-dev" value={this.state.inputvalue} onChange={this.handleChange}/>
                  <span className="checkmark"></span>
                </label>
                <p className="help-block text-danger"></p>
                  <label className="label">What is your level of experience?</label>
                  <label className="radio-container">Beginner
                    <input type="radio" name="radio" value={this.state.inputvalue} onChange={this.handleChange}/>
                    <span className="radio-checkmark"></span>
                  </label>
                  <label className="radio-container">Intermediate
                    <input type="radio" name="radio" value={this.state.inputvalue} onChange={this.handleChange}/>
                    <span className="radio-checkmark"></span>
                  </label>
                  <label className="radio-container">Expert
                    <input type="radio" name="radio" value={this.state.inputvalue} onChange={this.handleChange}/>
                    <span className="radio-checkmark"></span>
                  </label>
                  <p className="help-block text-danger"></p>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls mb-0 pb-2">
                      <label className="label">Describe your background</label>
                      <textarea className="form-control" rows="5" id="comment"></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>



                </div>
              </div>



              <div id="success"></div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-xl" id="sendMessageButton">Go!</button>
                </div>
            </form>
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
