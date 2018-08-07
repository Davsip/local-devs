import React from 'react';

const AdminProjectCard = props => (
    
<div className="card card-proj">
    <div className="card-header">
        <h5 className="mb-0">
        <button className="btn btn-link" data-toggle="collapse" data-target={'#' + props.id} aria-expanded="true" aria-controls={props.id}>
            Project {props.key} ({props.id}) - {props.name}
            </button>
        </h5>
    </div>

    <div id={props.id} className="collapse hide" aria-labelledby={props.id} data-parent="#accordion">
        <div className="card-body">
            
            {/* <!-- Begin Proj Details --> */}

            <div className="row">
                <div className="col-sm-6">
                
                    {/* <!-- Details --> */}
                    <h6><span className="projTitle">{props.name}</span></h6>
                    <p>
                        <em>Budget</em>: $<span className="projBudget">{props.budget}</span><br />
                    
                        <em>Location</em>: <span className="projLocation">{props.location}</span><br />

                        <em>Technologies</em>: <span className="projTech">{props.skills}</span><br />

                        <em>Start Date</em>: <span className="projStartDate">{props.startDate}</span><br />
                    
                        <em>Duration</em>: <span className="projDuration">{props.duration} Months</span><br />

                        <em>Team Size</em>: <span className="teamSize">{props.teamSize}</span><br />

                        <em>SE Led</em>: <span className="seLed">{props.seLed}</span>
                    </p>
                    
                </div>
                <div className="col-sm-6">
                    {/* <!-- Desc --> */}
                    <p>{props.desc}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">

                    {/* <!-- Editable --> */}
                    <h6 className="projDetails">Applicants</h6>

                    {/* <!-- Each Applicant --> */}

                    {
                        props.applicants ? props.applicants.map(applicant => {
                            
                            return (
                                <span className="dropdown">
                                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton index" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                    key={applicant}>
                                        {applicant}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item applicant-move">Copy to Team</a>
                                    </div>
                                </span>
                            )
                        
                        }): <div></div>
                    }

                    
                    {/* <!-- End Applicants --> */}
                            
                    
                </div>

                {/* <!-- Team Members --> */}

                <div className="col-sm-12" id="team-members">
                    {/* <!-- Editable --> */}
                    <h6 className="projDetails">Team Members</h6>

                    {/* <!-- Each Team Member --> */}

                {

                    props.team ? props.team.map(member => {

                        
                        return (
                            <span className="dropdown">
                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                key={member}>
                                    {member}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item member-remove">Remove From Team</a>
                                </div>
                            </span>
                        )
                    }): <div></div>

                }


                    
                    {/* <!-- End Team Members --> */}

                    
                </div>


                {/* <!-- Project Stage --> */}
                <div className="col-sm-12">

                    <h6 className="projDetails">Project Stage</h6>

                    <span className="dropdown">
                        <button className="btn btn-secondary btn-sm dropdown-toggle proj-state" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {props.stage}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item pstage" id='Started'>Started</a>
                            <a className="dropdown-item pstage" id='Completed'>Completed</a>
                        </div>
                    </span>

                </div>
                <div className="col-sm-12">
                    <button type="button" className="btn btn-primary" id="update-project">Update Project</button>
                </div>
            </div>
        </div>
    </div>
</div>
);

export default AdminProjectCard;