import {useState} from "react";
import {ObjectUtils} from "./objectUtil";
import {validateUtils} from "./validateUtils";
import {emailRegex, idRegex, pwdRegex, scRegex, telRegex} from "./regex";

function useValidation(initialState){
    const init = {};
    for(const i in initialState){
        init[initialState[i]] = null
    }
    const [input, setInput] = useState(init);
    const [error, setError] = useState(init);

    const [serverError, setServerError] = useState(null);

    const handleInput = (e)=>{
        const key = e.target.name;
        const value = e.target.value;
        if(ObjectUtils.isEmpty(value)){
            handleError(key, null);
        }else{
            validate(key, value)
        }

        setInput(prev=>({
            ...prev,
            [key]: value
        }))
    }

    const handleError = (key, msg)=>{
        setError(prev=>({
            ...prev,
            [key]: msg
        }))
    }

    const handlePassword = (e)=>{
        setInput(prev=>({
            ...prev,
            'pwd2': ''
        }))
        setError(prev=>({
            ...prev,
            'pwd2': null
        }))
        handleInput(e);
    }

    const handleConfirmPassword = (e)=>{
        handleInput(e);
        matchPassword(e.target.value);
    }

    const matchPassword = (pwd2)=>{
        const {pwd} = input;

        if(ObjectUtils.isEmpty(pwd2)){
            handleError('pwd2', '비밀번호 재입력은 필수입니다')
            return false;
        }

        if(ObjectUtils.isEmpty(pwd)){
            return false;
        }

        if(pwd !== pwd2){
            handleError('pwd2', '비밀번호가 일치하지 않습니다');
            return false;
        }else{
            handleError('pwd2', null);
            return true;
        }
    }

    const matchAuthNumber = (auth)=>{
        const {auth_code} = input;
        console.log(`auth: ${auth}, auth_code: ${auth_code}`)
        if(ObjectUtils.isEmpty(auth)){
            handleError('auth_code', '먼저 인증번호를 발송해야 합니다')
            return false;
        }

        if(ObjectUtils.isEmpty(auth_code)){
            handleError('auth_code', '인증번호를 입력해 주세요')
            return false;
        }

        if(auth != auth_code){
            handleError('auth_code', '인증번호가 일치하지 않습니다');
            return false;
        }else{
            handleError('auth_code', null);
            return true;
        }
    }

    const validateAll = ()=>{
        let result = true;
        // console.table(input)
        for(const key in input){
            // console.log(`val: k(${key}) v(${input[key]})`)
            if(!validate(key, input[key])){
                result = false;
            }
        }
        const {pwd, pwd2} = input;
        // console.log(`${pwd} ${pwd2} res: ${result}`)
        if(pwd !== undefined && pwd2 !== undefined){
            if(!matchPassword(input.pwd2)){
                return false;
            }
        }

        return result;
    }

    const validate = (key, value)=>{
        let info = getErrorInfo(key);
        if(info === false){
            return true;
        }
        const {name, regex, msg} = info;
        if(ObjectUtils.isEmpty(value)){
            handleError(key, `'${name}'은(는) 필수값입니다`);
        }else{
            if(value.length === 0 || regex.test(value)){
                handleError(key, null);
                return true;
            }else{
                handleError(key, msg);
            }
        }
        return false;
    }

    const clearInput = ()=>{
        setInput(init);
    }

    const clearError = ()=>{
        setError(init)
        setServerError(null)
    }

    const clear = ()=>{
        setInput(init)
        setError(init)
        setServerError(null)
    }

    const clearOf = (arr)=>{
        const init2 = {};
        for(const j in arr){
            init2[arr[j]] = null
        }
        setInput(init2)
        setError(init2)
        setServerError(null)
    }

    const handleServerError = (msg)=>{
        setServerError(msg);
    }


    return {
        input,
        error,
        serverError,
        setInput,
        setError,
        matchPassword,
        matchAuthNumber,
        handleInput,
        handleError,
        handlePassword,
        handleConfirmPassword,
        handleServerError,
        validateAll,
        clearInput,
        clearError,
        clear,
        clearOf
    }
}

function getErrorInfo(key){
    switch (key){
        case 'name':
            return {name: '이름', regex: scRegex, msg: '이름에 특수문자는 포함될 수 없습니다'};
        case 'tel':
            return {name: '전화번호', regex: telRegex, msg: '전화번호를 정확히 입력해주세요'};
        case 'email':
            return {name: '이메일', regex: emailRegex, msg: '유효한 이메일 주소를 입력해 주세요'};
        case 'id':
            return {name: '아이디', regex: idRegex, msg: '5~32자리의 영문 소문자, 숫자만 입력해 주세요'};
        case 'pwd':
            return {name: '비밀번호', regex: pwdRegex, msg: '영문, 숫자, 특수문자가 적어도 1개씩 포함된 8~32자리를 입력해 주세요'};
        default:
            return false;
    }
}

export default useValidation;