import ValidationError from "../../error/ValidationError";

function InputBox({flexDir = 'row', type = 'text', valid, className, subject, name, value}){

    const handleChange = e=>{
        if(valid !== null && valid !== undefined){
            valid.handleInput(e);
        }
    }

    if(typeof valid !== 'object'){
        return null;
    }

    switch (type){
        case 'text' :
            return (
                <div className='d-flex flex-column'>
                    <div className={`d-flex flex-${flexDir} justify-content-center align-items-baseline mt-2 ms-3 ${className}`}>
                        <p>{subject}</p>
                        <input className='ms-2' type={type} name={name} value={valid.input[name]} placeholder={subject}
                               onChange={handleChange}/>
                        <br/>
                    </div>
                    <ValidationError error={valid.error[name]}/>
                </div>
            )
        case 'file' :
            return (
                <div className='d-flex flex-column'>
                    <div className={`d-flex flex-${flexDir} justify-content-center align-items-baseline mt-2 ms-3 ${className}`}>
                        <p>{subject}</p>
                        <input className='ms-2' type={type} onChange={handleChange}/>
                        <br/>
                    </div>
                    <ValidationError error={valid.error[name]}/>
                </div>
            )
        case 'checkbox' :
            return (
                <div className='d-flex flex-column'>
                    <div
                        className={`d-flex flex-${flexDir} justify-content-center align-items-baseline mt-2 ms-3 ${className}`}>
                        <input type={type} name={name} value={value} placeholder={subject} onChange={handleChange}/>
                        <p className='ms-2'>{subject}</p>
                        <br/>
                    </div>
                    <ValidationError error={valid.error[name]}/>
                </div>
            )
    }
}

export default InputBox;