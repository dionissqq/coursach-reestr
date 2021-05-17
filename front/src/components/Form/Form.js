import React, { useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './form.css';

const InputType = { 
    None : 0,
    Multiple : 1,
    Text : 2,
    TextArea : 3,
    Selector : 4,
    File : 5,
    Button : 6,
    Date : 7,
    Checkbox : 8,
    Separator : 9
}

const MessageColor = {
    Default : 0,
    Red : 1,
    Green : 2
}

function Form({ inputs, cb, labels, props}) {

    // let initialDate = ;
    // function setInitialDate (inputs) {
    //     inputs.forEach (input => {
    //         if (input.type === InputType.Date && input.props && input.props.defaultValue)
    //             initialDate = input.props.defaultValue;
    //         if (input.type === InputType.Multiple && input.inputs)
    //             setInitialDate(input.inputs);
    //     })
    // }
    // setInitialDate(inputs);

    const [date, setDate] = useState(new Date());

    function parseInputs (inputs, inline = false) {
        return inputs.map ((input, index) => {
            return (
                <React.Fragment>
                    { input.props && input.props.label && input.type !== InputType.Checkbox ? <div style={{marginTop: "1rem"}}>{input.props.label} </div> : '' }
                    <div key = {index} className={(inline ? "form_inline" : "")} {...input.outterProps} >
                        { (input.type === InputType.Text) ? <input {...input.props} className="input_field form_input"/> : '' }
                        { (input.type === InputType.Multiple) ?
                            
                            <div className="form_inputs_container" style={{marginLeft: "1rem"}}>
                                {
                                    parseInputs(input.inputs, true)
                                }
                            </div>
                        : '' }
                        { (input.type === InputType.Date) ?
                            <React.Fragment>
                                <DatePicker selected={ date } {...input.props} className="button form_datepicker" onChange={ setDate } timeFormat="p"  dateFormat="dd/MM/yyyy"/>
                            </React.Fragment>
                        : '' }
                        { (input.type === InputType.Checkbox) ?
                            <React.Fragment>
                                { input.props.label ? <span>{input.props.label} </span> : '' }
                                
                                <input {...input.props} type="checkbox" style={{marginTop : "2vh"}} />
                            </React.Fragment>
                        : '' }
                        { (input.type === InputType.TextArea) ? <textarea {...input.props} className = "input_field form_input form_text_area"/> : '' }
                        { (input.type === InputType.Separator) ? <hr style = {{marginTop: "3rem", marginBottom: "1.8rem" }} {...input.props} /> : '' }
                        {
                            (input.type === InputType.Selector) ?
                            <select {...input.props} >
                                {
                                    input.disabledOption ? 
                                    <option disabled selected>{input.disabledOption}</option>
                                    : ''
                                }
                                {
                                    input.options.map((el, index) => {
                                        const prop = {
                                            key : index,
                                            value : el.value
                                        }
                                        return <option {...prop}>{ el.name }</option>
                                    })
                                }
                            </select>
                            : ''
                        }
                        {
                            (input.type === InputType.File) ?
                            <React.Fragment>
                                <input hidden {...input.props}/>
                                <div className="form_button_outter">
                                    <label htmlFor={ input.props.id }>
                                        <div className="button">
                                            { input.label }
                                        </div>
                                    </label>
                                </div>
                            </React.Fragment>
                            : ''
                        }
                        {
                            (input.type === InputType.Button) ?
                            <div className="form_button_outter">
                                <div className="button" onClick={input.onClick}>
                                    { input.label }
                                </div>
                            </div>
                            : ''
                        }
                    </div>
                </React.Fragment>
            )
        })
    }

    return (
        <React.Fragment>
            {
                (labels.message && labels.message.text && labels.message.text !== "") ?  
                    <div className = "shadow card_view form_info">
                        <p className={ "form_info_text" + ( labels.message.color ===  MessageColor.Red ? " form_red" : "") + ( labels.message.color ===  MessageColor.Green ? " form_green" : "")}>
                            { labels.message.text }
                        </p>
                    </div>
                : ''
            }

            <form className = "shadow card_view form" onSubmit={ e => {e.preventDefault(); cb(e.target)} } {...props}>
                <p className="emphasized form_legend">{labels.legend}</p>
                {
                    parseInputs(inputs)
                }
                
                <div className="form_button_outter">
                    <label htmlFor="submit">
                        <div id="submit_button" className="button">
                            Застосувати
                        </div>
                    </label>
                </div>
                <input type="submit" id="submit" hidden/>
                <p className = "form_footer" >
                    { labels.footer }
                </p>
            </form>
        </React.Fragment>
    )
}

Form.InputType = InputType;
Form.MessageColor = MessageColor;

export default Form;