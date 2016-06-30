import React,{Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import ValidateWrapControl from './ValidateWrapControl';
import validator from 'validator';

export default class InputText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ValidateWrapControl {...this.props}>
                <FormControl {...this.props}/>
            </ValidateWrapControl>
        )
    }
}

