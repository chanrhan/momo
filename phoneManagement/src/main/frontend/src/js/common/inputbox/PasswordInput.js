import {useState} from "react";

export function PasswordInput({id, name, placeholder, className, value, onChange, readOnly, autoComplete}){
    const [visible, setVisible] = useState(false)

    return (
        <>
            <input type={visible ? 'text':'password'}
                   id={id}
                   name={name}
                   placeholder={placeholder}
                   readOnly={readOnly}
                   className={`${className}`}
                   onChange={onChange}
                   value={value} autoComplete={autoComplete}/>
            {
                value && <button type='button' className={`visible ${visible && 'active'}`} onClick={() => {
                    setVisible(!visible)
                }}>비밀번호 표시</button>
            }

        </>
    )
}