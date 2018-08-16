import React from 'react';

const ProjectCard = props => (
    <div
        className="col-md-6 col-lg-4"
        key={props.key}
        data-id={props.dataId}
        >
        <div className="card" style={{ width: 18 + "rem" }}>
            <div className="card-body">
                <h5 className="card-title">{props.projectName}</h5>
                <p className="card-text">
                    {props.descSub}...
                </p>
                <p className="card-text" id="techNeeded">
                    {props.skills}
                </p>
                <a
                    href="#"
                    className="btn btn-primary"
                    data-target="#projectModal"
                    data-toggle="modal"
                    data-desc={props.desc}
                    data-team={props.teamSize}
                    data-time={props.duration}
                    data-title={props.projectName}
                    data-id={props.dataId}
                    data-start={props.startDate}
                >
                {
                    props.status === 'started' || props.applicants ?
                    'View Details'
                    :
                    'View Details / Apply'
                }
                </a>
            </div>
        </div>
    </div>
);

export default ProjectCard;