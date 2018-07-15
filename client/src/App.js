import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

// put landing / home page css in App.css
import './App.css';
// import Navigation from "./components/Navigation"

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>

        {/* <Navigation /> */}
        {/* all other landing / home page codes goes below here */}
        {/* remove navbar code below as needed */}
        {/* isAuthenticated() returns true or false, true if authenticated, false if not */}
        {/* use that to render certain features */}
        {/* i.e. user logo dropdown login / signup, log out / mydashboard */}
        { !isAuthenticated() && (
          <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
        )}


 {/* <!-- SECTION 1 MAIN LANDING PAGE  --> */}
 
 <div className="section-1">
        <div className="text-white text-center">
            <div className="container">
                <img className="img-fluid mb-5 d-block mx-auto img-logo" src="./assets/images/main-image-icon.png" alt="main image icon" />
                <h1 className="text-uppercase main-text">Local Devs</h1>

                <img className="pinlogo" src="./assets/images/icons/here.png" />

                <h2 className="main-text-2">Connecting Local Developers to Cool Projects</h2>
            </div>
         </div>
    </div>

    {/* <!-- SECTION 2 / HOW IT WORKS --> */}
    <div className="section-2">
        <div className="container">
            <h2 className="text-center text-uppercase text-secondary">How it Works</h2>
            <hr className="star-dark mb-6" />
            <div className="row ">
                <div className="col-sm-5 col-md-4 col-lg-4">
                    <img className="icons-work " src="./assets/images/icons/apply-icon.png " alt="Apply Icom" />
                    <br />
                    <br />
                    <p className="text-justify">Companies and individuals post projects to out site.   <b>Local Devs</b> will create a team of developers for each project and the technologies need it. The
                        developer can choose the technology that wants to work with an easy quick apply form.The Solution's
                        Expert Manager will contact the developer for setting up an interview.
                    </p>
                </div>
                <div className="col-md-5 col-lg-4">
                    <img className="icons-work" src="./assets/images/icons/code-browser.png" alt="Code Browser" />
                    <br />
                    <br />
                    <p className="text-justify">The developer will have a deadine for each project. You can either work remote or work on our open space
                        offices, with a great team in a healthy environment. It will not be just work. It will be fun to
                        work.
                    </p>
                </div>
                <div className="col-md-5 col-lg-4 ">
                    <img class="icons-work " src="./assets/images/icons/get-paid.png " alt="Get Paid" />
                    <br />
                    <br />
                    <p className="text-justify">The developer will get paid per project or sections of the project. Each day you will submit a quick
                        update on your job thru github or your personal dashboard. Also will be always in contact with the
                        team and the The Solution's Expert Manager . </p>
                </div>
            </div>
        </div>
    </div>
    
    {/* <!-- SECTION 3 PROJECTS --> */}
    <div className="portfolio" id="portfolio">
        <div className="container">
            <h2 className="text-center text-uppercase text-secondary mb-0">Projects</h2>
            <hr className="star-dark mb-5" />
            <div className="row">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">AD Web App</h5>
                            <p className="card-text">Four developers needed for an eleven month project.</p>
                            <p className="card-text" id="techNeeded">C#, HTML, JavaScript, CSS, JQuery, Angular</p>
                            <a href="#" class="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="Client needs clean, dynamic Active Directory personnel resource site.  This is an eleven month project and the team will consist of four developers. Client expects developers to have great teamwork and communication skills. Weekly deliverables are expected."
                                data-team="4" data-time="11mo" data-title="Active Directory Web Application">View Details / Apply</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tuition System</h5>
                            <p className="card-text">Two developers needed for a five month project.</p>
                            <p className="card-text" id="techNeeded">JavaScript, Handlebars, HTML, Bootstrap, CSS, Node, MongoDB</p>
                            <a href="#" className="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="On this project, you'll be working with our Solutions Expert.  Client needs a user-friendly tuition reimbursement system.  This is an five month project and the team will consist of two developers. Weekly deliverables are expected."
                                data-team="2" data-time="5mo" data-title="Tuition Reimbursement System">View Details / Apply</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Website Redesign</h5>
                            <p className="card-text">Five developers needed for a seven month project.</p>
                            <p className="card-text" id="techNeeded">JavaScript, React, HTML, Bootstrap, Node</p>
                            <a href="#" class="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="For this project, five developers will be working with one of our Solutions Experts to redesign the client's current website for mobility.  This project is expected to take seven months.  Need to be able to work well in a team.  Weekly deliverables are expected."
                                data-team="5" data-time="7mo" data-title="Website Redesign">View Details / Apply</a>
                        </div>
                    </div>


                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Company ReBranding</h5>
                            <p className="card-text">Two graphic design experts needed for a three month project.</p>
                            <p className="card-text" id="techNeeded">Photoshop, Illustrator</p>
                            <a href="#" class="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="Client is looking for two graphics design experts for company re-branding. Your team will work directly with the client to discuss culture and history of the company to come up with a clean design.  This project will be three months."
                                data-team="2" data-time="3mo" data-title="Company ReBranding">View Details / Apply</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Accounting System</h5>
                            <p className="card-text">Seven developers needed for an eleven month project.</p>
                            <p className="card-text" id="techNeeded">Java, MySQL, CSS, JavaScript, JQuery, Bootstrap</p>
                            <a href="#" class="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="For this project, you'll work with seven other developers and a Solutions Expert to overhaul our client's current accounting system.  This project will last eleven months and will require a good amount of collaboration.  Excellent written and oral communication required.  Weekly deliverables will be required."
                                data-team="7" data-time="11mo" data-title="Accounting Systems Build">View Details / Apply</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Customer Feedback Site</h5>
                            <p className="card-text">Two developers needed for a five month project.</p>
                            <p className="card-text" id="techNeeded">Python, MongoDB, Angular, HTML, Bootstrap, Sass</p>
                            <a href="#" class="btn btn-primary" data-target="#projectModal" data-toggle="modal" data-desc="Our client is wanting two developers to create a customer feedback site.  This project will take 5 months."
                                data-team="2" data-time="5mo" data-title="Customer Feedback Site">View Details / Apply</a>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
<br />
<br />
<br />
 {/* <!-- SECTION 5- SOCIAL  --> */}
    <div className="section-5">
        <div className="container">
            <h2 className="text-center text-uppercase text-secondary">Social</h2>
            <hr className="star-dark mb-6 " />
            <div className="row ">
                <div className="col-sm-5 col-md-4 col-lg-4">
                    <img class="icons-work " src="./assets/images/icons/meet-dev.png" alt="Meet Dev" />
                    <br />
                    <br />
                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae quaerat soluta sapiente beatae?
                        Omnis eum perferendis est cum quisquam rerum molestiae minima. Consequuntur ipsum tempora velit facere
                        nostrum cupiditate?.</p>
                </div>
                <div className="col-md-5 col-lg-4 ">
                    <img className="icons-work " src="./assets/images/icons/meet-comp.png" alt=" " />
                    <br />
                    <br />
                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae quaerat soluta sapiente beatae?
                        Omnis eum perferendis est cum quisquam rerum molestiae minima. Consequuntur ipsum tempora velit facere
                        nostrum cupiditate?.</p>
                </div>
                <div className="col-md-5 col-lg-4">
                    <img className="icons-work" src="./assets/images/icons/activities.png" alt="Activities" />
                    <br /> 
                    <br/>
                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae quaerat soluta sapiente beatae?
                        Omnis eum perferendis est cum quisquam rerum molestiae minima. Consequuntur ipsum tempora velit facere
                        nostrum cupiditate?.</p>
                </div>
            </div>
        </div>
    </div>
  {/*   <!-- Project Modal - Loads Dynamic Content --> */}
    <div className="modal fade" id="projectModal" tabindex="-1" role="dialog" aria-labelledby="projectModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">

           {/*  <!-- Header --> */}
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="projectTitle">
              {/* <!-- Project Title Here -->  */}
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

               {/*  <!-- Content --> */}
                <div className="modal-body">
                    <div className="row">

                      {/*   <!-- Full Description --> */}
                        <div className="col">
                            <div className="row">
                                <h5>Overview</h5>
                                <p id="description">
                                 {/*   <!-- Project Description Here -->  */}
                                </p>
                            </div>
                            <div className="row" id="time">
                       {/*  <!-- Project Time Img Here -->   */}
                            </div>
                        </div>

                      {/*   <!-- Technology --> */}
                        <div className="col" id="tech">
                            <h5>Technologies</h5>
                          {/*  <!-- Technologies Load Here (in p tags) --> */}
                        </div>

                      {/*   <!-- Team Info --> */}
                        <div className="col" id="team-info">
                            <h5>Team</h5>
                            <div className="row" id="team-display">
                            {/*     <!-- Team Here --> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" id="applyButton">Apply</button>
                </div>
            </div>
          {/*   <!-- End Content --> */}
        </div>
    </div>
  {/*   <!-- End Modal --> */}
    <br />
    <br />
    <br />
    <div id="contact">
        <div className="container">
            <h2 className="text-center text-uppercase text-secondary mb-0">Post your Project</h2>
            <hr className="star-dark mb-5" />
            <div className="row">
                <div class="col-lg-8 mx-auto">
                  {/*  <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. -->
                    <!-- The form should work on most web servers, but if the form is not working you may need to configure your web server differently. --> */}
                  {/*  <form name="sentMessage" id="contactForm" novalidate="novalidate">
                        <div className="control-group">
                            <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                <label className="label">Name</label>
                                <input className="form-control" id="name" type="text" required="required" data-validation-required-message="Please enter your name.">
                                <p className="help-block text-danger"></p>
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                <label className="label">Email Address</label>
                                <input className="form-control" id="email" type="email" required="required" data-validation-required-message="Please enter your email address.">
                                <p className="help-block text-danger"></p>
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                <label className="label">Phone Number</label>
                                <input className="form-control" id="phone" type="tel" required="required" data-validation-required-message="Please enter your phone number.">
                                <p className="help-block text-danger"></p>
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                <label className="label">Message</label>
                                <textarea className="form-control" id="message" rows="5" required="required" data-validation-required-message="Please enter a message."></textarea>
                                <p className="help-block text-danger"></p>
                            </div> 
                        </div>
                        <br>
                        <div id="success"></div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-xl" id="sendMessageButton">Send</button>
                        </div>
                  </form> */}
                </div>
            </div>
        </div>
    </div>

{/* <!-- Mission section -->  */}
    <div className="portfolio" id="portfolio">
        <div className="container">
            <h2 className="text-center text-uppercase text-secondary mb-0">Mission</h2>
            <hr className="star-dark mb-6" />
            <h5>Local Devs company was founded on strong values; Integrity, Communication and Passion. We are not just another
                company, Local Devs was created by passionate developers who believe that each project is unique and deserves
                the best of us. Our mission is to connect new and experienced local developers with the best projects.
            </h5>
        </div>
    </div>

        { isAuthenticated() && (
          // {/* Nav bar */}
          <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
          <div className="hire-tab">
              <a className="navbar-brand text-nav" href="#">Hire Locals</a>
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
                                  <a className="dropdown-item" href="#">Log in</a>
                                  <a className="dropdown-item" href="#">Sign up</a>
                                  <a className="dropdown-item" href="#">My Dashboard</a>
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          </nav>
        )}
        
      </div>
    );
  }
}

export default App;