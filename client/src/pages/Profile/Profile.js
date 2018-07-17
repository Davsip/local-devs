import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
// import './Profile.css';

class Profile extends Component {

  state = {
    profile: {}
  };
  
  componentWillMount() {

    this.setState({ 
      profile: {} 
    });

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

    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.given_name} {profile.family_name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;