import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';




class App extends Component {
  constructor (props) {
      super(props);
      this.state = {
          inputvalue: ''
      }
      this.handleChange = this.handleChange.bind(this);
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
    return (


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
     
    );
  }
}

export default App;
