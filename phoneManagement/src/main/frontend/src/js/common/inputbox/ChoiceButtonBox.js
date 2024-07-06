import button from "bootstrap/js/src/button";
import {useEffect, useState} from "react";
import ValidationError from "../../error/ValidationError";

function ChoiceButtonBox({name, items = [], inputField, className, btn_class = 'primary'}){


    const [value, setValue] = useState((inputField.input[name] != null ? inputField.input[name] : 0));

    useEffect(()=>{
        if(inputField != null && inputField.setInput != null && !inputField.input[name]){
            inputField.setInput(prev=>({
                ...prev,
                [name]: value
            }))
        }
    },[])


    const selectedStyle = (v)=>{
        return v === Number(value) ? `btn-${btn_class}` : `btn-outline-${btn_class}`;
    }

    const handleChange = e=>{
        // console.log(`e inde: ${e.target.getAttribute('index')}`)
        setValue(e.target.getAttribute('index'));
        e.target.value = e.target.getAttribute('index');
        inputField.handleInput(e);
    }

    if(typeof valid !== 'object'){
        return null;
    }

    return (
        <div className='d-flex flex-column'>
            <div className={`d-flex flex-row ${className}`}>
                {
                    items.map((value, index) => {
                        return (
                            <button className={`btn ${selectedStyle(index)}`} name={name} index={index}
                                    onClick={handleChange}>{value}</button>
                        )
                    })
                }
            </div>
            <ValidationError error={inputField.error[name]}/>
        </div>

    )
}

export default ChoiceButtonBox;