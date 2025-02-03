export function NumberInput({id, _ref, name, className, maxLength, readOnly,
                                value, preprocess, postprocess, placeholder, onChange}){
    const checkValue = ()=>{
        const regex = /[0-9]/
        if(regex.test(value)){
            return value;
        }
        return ''
    }

    const handleInput = (e)=>{
        if(preprocess){
            e = preprocess(e);
        }
        if(!Number.isNaN(Number(e.target.value))){
            if(postprocess){
                e = postprocess(e)
            }
            onChange(e)
        }
    }

    return (
        <input type="text" id={id} name={name}
               ref={_ref}
               className={`${className}`}
               maxLength={maxLength}
               value={checkValue()} onChange={handleInput}
               readOnly={readOnly}
               placeholder={placeholder}/>
    )
}