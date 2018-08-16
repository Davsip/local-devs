import React, { Component } from 'react';

// const AdminProjectCard = this.props => (
class AdminProjectCard extends Component {

    render() {
        return (
            <div className="card card-proj">
                <div className="card-header">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target={'#' + this.props.id} aria-expanded="true" aria-controls={this.props.id}>
                            Project {this.props.key} ({this.props.id}) - {this.props.name}
                        </button>
                    </h5>
                </div>

                <div id={this.props.id} className="collapse hide" aria-labelledby={this.props.id} data-parent="#accordion">
                    <div className="card-body">

                        {/* <!-- Begin Proj Details --> */}

                        <div className="row">
                            <div className="col-sm-6">

                                {/* <!-- Details --> */}
                                <h6><span className="projTitle">{this.props.name}</span></h6>
                                <p>
                                    <em>Budget</em>: $<span className="projBudget">{this.props.budget}</span><br />

                                    <em>Location</em>: <span className="projLocation">{this.props.location}</span><br />

                                    <em>Technologies</em>: <span className="projTech">{this.props.skills}</span><br />

                                    <em>Start Date</em>: <span className="projStartDate">{this.props.startDate}</span><br />

                                    <em>Duration</em>: <span className="projDuration">{this.props.duration} Months</span><br />

                                    <em>Team Size</em>: <span className="teamSize">{this.props.teamSize}</span><br />

                                    <em>SE Led</em>: <span className="seLed">{this.props.seLed}</span>
                                </p>

                            </div>
                            <div className="col-sm-6">
                                {/* <!-- Desc --> */}
                                <p>{this.props.desc}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">

                                {/* <!-- Editable --> */}
                                <h6 className="projDetails" >Applicants</h6>

                                {/* <!-- Each Applicant --> */}

                                {
                                    this.props.applicants ? this.props.applicants.map(applicant => {

                                        return (
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle projectApplicants" type="button" id="dropdownMenuButton index" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" key={applicant} data-proj={this.props.id}
                                                >
                                                    {applicant}
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item applicant-move">Copy to Team</a>
                                                </div>
                                            </span>
                                        )

                                    }) : <div></div>
                                }


                                {/* <!-- End Applicants --> */}


                            </div>

                            {/* <!-- Team Members --> */}

                            <div className="col-sm-12" id="team-members">
                                {/* <!-- Editable --> */}
                                <h6 className="projDetails">Team Members</h6>

                                {/* <!-- Each Team Member --> */}

                                {

                                    this.props.team ? this.props.team.map(member => {


                                        return (
                                            <span className="dropdown">
                                                <button className="btn btn-secondary btn-sm dropdown-toggle projectMembers" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" key={member} data-proj={this.props.id}
                                                >
                                                    {member}
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                                </div>
                                            </span>
                                        )
                                    }) : <div></div>

                                }



                                {/* <!-- End Team Members --> */}


                            </div>


                            {/* <!-- Project Stage --> */}
                            <div className="col-sm-12">

                                <h6 className="projDetails">Project Stage</h6>

                                <span className="dropdown">
                                    <button className="btn btn-secondary btn-sm dropdown-toggle proj-state" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.props.stage}
                                    </button>

                                    {
                                        this.props.stage === "pending"
                                            ?
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item pstage" id='Started'>started</a>
                                                <a className="dropdown-item pstage" id='Completed'>completed</a>
                                            </div>
                                            : this.props.stage === "started" ?
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item pstage" id='Started'>pending</a>
                                                    <a className="dropdown-item pstage" id='Completed'>completed</a>
                                                </div>
                                                :
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item pstage" id='Started'>pending</a>
                                                    <a className="dropdown-item pstage" id='Completed'>started</a>
                                                </div>

                                    }

                                </span>

                            </div>
                            <div className="col-sm-12">
                                <button type="button" className="btn btn-primary" id="update-project" data-proj={this.props.id} onClick={this.props.handleUpdate}>Update Project</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminProjectCard;