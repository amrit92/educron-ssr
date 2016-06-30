import React, {Component, PropTypes} from 'react';
import {Grid,Col,Button} from 'react-bootstrap';
import {InputText, Textarea, WrapContainer, Loading} from '../../form/index';

export default class Profile extends Component {

    constructor() {
        super(...arguments);
        // this.state = { inputs: ['input-0'] };
    }

    onSumbit() {
        let profile = {
            first_name: this.props.fields.first_name.value,
            last_name: this.props.fields.last_name.value,
            description: this.props.fields.description.value,
            inputs: this.props.fields.inputs,
            program: this.props.fields.program.value,
            major: this.props.fields.major.value,
            specialization: this.props.fields.specialization.value,
            term: this.props.fields.term.value,
            gre_quant: this.props.fields.gre_quant.value,
            gre_verbal: this.props.fields.gre_verbal.value,
            gre_awa: this.props.fields.gre_awa.value,
            toefl: this.props.fields.toefl.value,
            ietls: this.props.fields.ietls.value,
            ug_college_name: this.props.fields.ug_college_name.value,
            ug_department_name: this.props.fields.ug_department_name.value,
            grade: this.props.fields.grade.value,
            topper_grade: this.props.fields.topper_grade.value,
            grade_scale: this.props.fields.grade_scale.value
        }
        this.props.onSubmit(profile);
    }

    appendInput() {
        var newInput = `input-${this.state.inputs.length}`;
        this.setState({ inputs: this.state.inputs.concat([newInput]) });
    }

    render() {
        const {fields:{first_name, last_name, description, inputs, program, major, specialization, term, gre_quant, gre_verbal, gre_awa, toefl, ietls, ug_college_name, ug_department_name, grade, topper_grade, grade_scale}, handleSubmit, awaitStatuses} = this.props;
        return (
            <WrapContainer animateIn="fadeIn">
                <h1 className="title">Profile</h1>
                {awaitStatuses.getProfile == 'pending' && <Loading text="Profile is loading"/>}
                {awaitStatuses.getProfile == 'success' &&
                <form className="form" onSubmit={handleSubmit(this.onSumbit.bind(this))}>
                    <InputText title="Nick name" placeholder="Nick name" {...first_name}/>
                    <InputText title="First name" placeholder="First name" {...first_name}/>
                    <InputText title="Last name" placeholder="Last name" {...last_name}/>
                    <InputText title="Program" placeholder="Program" {...program}/>
                    <InputText title="Major" placeholder="Major" {...major}/>
                    <InputText title="Specialization" placeholder="Specialization" {...specialization}/>
                    <InputText title="Term" placeholder="Term" {...term}/>
                    <InputText title="GRE Quant" placeholder="GRE Quant" {...gre_quant}/>
                    <InputText title="GRE Verbal" placeholder="GRE Verbal" {...gre_verbal}/>
                    <InputText title="GRE AWA" placeholder="GRE AWA" {...gre_awa}/>
                    <InputText title="TOEFL" placeholder="TOEFL" {...toefl}/>
                    <InputText title="IETLS" placeholder="IETLS" {...ietls}/>
                    <InputText title="UG college name" placeholder="UG college name" {...ug_college_name}/>
                    <InputText title="UG Department name" placeholder="UG Department name" {...ug_department_name}/>
                    <InputText title="Grade" placeholder="Grade" {...grade}/>
                    <InputText title="Toppers grade" placeholder="Toppers grade" {...topper_grade}/>
                    <InputText title="Grade scale" placeholder="Grade scale" {...grade_scale}/>
                    <Textarea title="Other details" placeholder="Other details" {...description}/>
                    <h1 className="title">Application Details</h1>
                    <button onClick={ () => {
                      inputs.addField()  // pushes empty award field onto the end of the array
                    }}>
                      Add University
                    </button>
                    {inputs.map((child, index) => <div key={index}>
                      <div>
                        <label>#{index + 1}</label>
                        <div>
                          <InputText type="text" placeholder="University Name" field={child.name}/>
                        </div>
                        <div>
                          <InputText type="text" placeholder="Details" field={child.name}/>
                        </div>
                        <div>
                          <InputText type="text" placeholder="Decision" field={child.age}/>
                        </div>
                      </div>
                  </div>)}
                    <Button bsStyle="red" className="pull-right" type="submit">Update</Button>
                </form>
                }
                {awaitStatuses.updateProfile == 'pending' && <Loading text="Profile is updating ..."/>}
            </WrapContainer>
        )
    }
}

Profile.propTypes = {
    fields: PropTypes.object.isRequired,
    awaitStatuses: PropTypes.shape({
        getProfile: PropTypes.string,
        updateProfile: PropTypes.string
    }),
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}