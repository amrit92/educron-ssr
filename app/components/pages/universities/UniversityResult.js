import React, {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {Editors, WrapContainer, Loading} from '../../form/index';

export default class UniversityResult extends Component {
    constructor() {
        super(...arguments)
    }

    render() {
        let {university, isAuthor, awaitStatuses, awaitErrors} = this.props;
        return (
            <WrapContainer animateIn="fadeIn">
                {awaitStatuses.getResultSummary == 'pending' && <Loading text="Loading"/>}
                {awaitStatuses.getResultSummary == 'success' &&
                <div className="post-view">
                    <div className="clearfix">
                        <div className="pull-left">
                            <h1 className="title">{university.title}</h1>
                            {"university.user" &&
                            <div className="meta">
                                <ul>
                                    <li className="user"><i className="icon-user"/> {"university.user.first_name"}</li>
                                </ul>
                            </div>
                            }
                        </div>
                        {isAuthor &&
                            <a href={`#/university/edit/${university.id}`} className="btn btn-sm pull-right btn-red"><i className="icon-pencil"/> Edit</a>
                        }
                    </div>
                    <div className="content">
                        {university.content}
                    </div>
                </div>
                }
                {awaitErrors.getResultSummary &&
                <p>{awaitErrors.getResultSummary}</p>
                }
            </WrapContainer>
        )
    }
}

UniversityResult.propTypes = {
    university: PropTypes.shape({
        user: PropTypes.object
    }),
    isAuthor: PropTypes.bool,
    awaitStatuses:PropTypes.shape({
        getResultSummary: PropTypes.string
    }),
    awaitErrors:PropTypes.shape({
        getResultSummary: PropTypes.string
    })
}
