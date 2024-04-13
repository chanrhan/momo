import {ObjectUtils} from "./objectUtil";
import {emailRegex, idRegex, pwdRegex, scRegex, telRegex} from "./regex";

export const validateUtils = {
    validate,
    matchPassword,
    getErrorInfo
}

function validate(key, value, onError){
    let info = getErrorInfo(key);
    if(info === false){
        return true;
    }
    const {name, regex, msg} = info;
    if(ObjectUtils.isEmpty(value)){
        onError(key, `'${name}'은(는) 필수값입니다`);
    }else{
        if(value.length === 0 || regex.test(value)){
            onError(key, null);
            return true;
        }else{
            onError(key, msg);
        }
    }
    return false;
}

function matchPassword(pwd, pwd2, handleError){
    if(pwd !== pwd2){
        handleError('pwd2', '비밀번호가 일치하지 않습니다');
        return false;
    }else{
        handleError('pwd2', null);
        return true;
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