import User from "../../css/user.module.css"
import {UserFormBox} from "../account/module/UserFormBox";
import {UserCompanyItem_backup2} from "./module/UserCompanyItem_backup2";
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {configureStore} from "@reduxjs/toolkit";
import useApi from "../hook/useApi";
import {ObjectUtils} from "../utils/objectUtil";
import {KoreanUtils} from "../utils/KoreanUtils";
import {RegexUtils} from "../utils/regex";

const VALUE_NAMES = {
    shop_nm: '매장명',
    provier: '매장 구분',
    shop_addr: '매장 주소',
    shop_addr_detail: '매장 상세 주소',
    shop_tel: '매장 전화번호'
}

const INIT_ITEMS = {
    shop_nm: '',
    provider: '',
    shop_addr: '',
    shop_addr_detail: '',
    shop_tel: ''
}



export function RegisterShop_backup2(){
    const {shopApi} = useApi();

    // input 필드와 error 필드를 나눠서 관리
    // React Rendering은 상태변화가 짧은 시간 내에 연속해서 일어날 때, 이를 모두 처리하고 지나가지 않고,
    // 지연시켰다가 한번에 처리하여 렌더링을 일으킨다.
    // 근데 input 필드에서는 입력할 때(상태변화)마다 값을 검사하여 error 필드에 메세지를 입력(상태변화)해야 하기 때문에
    // 상태변화가 한번에 2개 일어나는 상황이 벌어진다. 이를 코드로 해결할 수 는 있지만,
    // 코드를 명확하게 분리 및 모듈화를 위해 input, error 필드를 나눠서 관리하고 결정했다.
    const [input, setInput] = useState([INIT_ITEMS])
    const [error, setError] = useState([INIT_ITEMS])

    const [opened, setOpened] = useState(0);


    const inputField = {
        getInput: (i, k)=>{
            // console.log(`get-> idx: ${i} key: ${k}`)
            return input[i][k] ?? '';
        },
        getError: (i, k)=>{
            // console.log(`get Error: ${error[i][k]}`)
            return error[i][k] ?? '';
        },
        setInput: (i, k, v)=>{
            // console.log(`set-> idx: ${i} key: ${k} val: ${v}`)
            const copy1 = [...input]
            const copy2 = {...input[i]};
            copy2[k] = v;
            copy1[i] = copy2;
            setInput(copy1);
            // if(!ObjectUtils.isEmpty(v)){
            //     inputField.setError(i,k,null);
            // }
        },
        setError: (i, k, v)=>{
            console.log(`set Error: ${i} ${k} ${v}`)
            const copy1 = [...error]
            const copy2 = {...error[i]};
            copy2[k] = v;
            copy1[i] = copy2;
            console.table(copy1)
            setError(copy1);
        },
        setErrorAll: (value)=>{
            setError(value)
        },
        isError: (i)=>{
            for(const key in error[i]){
                if(!ObjectUtils.isEmpty(error[i][key])){
                    return true;
                }
            }
            return false;
        }
    }

    const fold = (e)=>{
        const next = Number(e.target.getAttribute('index'));
        if(opened === next){
            setOpened(-1)
        }else{
            setOpened(next)
        }
    }

    const addShopItem = ()=>{
        const next = input.length;
        const copyInput = [...input]
        const copyError = [...error]
        copyInput.push(INIT_ITEMS)
        copyError.push(INIT_ITEMS)
        setInput(copyInput)
        setError(copyError)

        setOpened(next);
    }

    const deleteShopItem = (e)=>{
        const index = Number(e.target.getAttribute('index'));
        // console.log(`del idx: ${index}`)
        const copyInput = [...input];
        const copyError = [...error];
        copyInput.splice(index, 1);
        copyError.splice(index, 1);
        setInput(copyInput)
        setError(copyError)
    }

    const submit = async ()=>{
        let isError = false;
        const errorField = [...error]

        for(const i in input){
            const shopItem = input[i];
            console.table(shopItem)
            for(const key in shopItem){
                let msg = null;
                if(ObjectUtils.isEmpty(shopItem[key])){
                    // console.log(`empty key: ${key}`)
                    isError = true;
                    const name = VALUE_NAMES[key];
                    msg = `${name}${KoreanUtils.eun_neun(name)} 입력해주세요.`;
                    // inputField.setError(i, key, `${name}${KoreanUtils.eun_neun(name)} 입력해주세요.`)
                }else{
                    if(key === 'shop_tel'){
                        if(!RegexUtils.tel(shopItem[key])){
                            isError = true;
                            msg = '전화번호 규격에 알맞게 입력해주세요.'
                            // inputField.setError(i, key, '전화번호 규격에 알맞게 입력해주세요.')
                        }
                    }
                }
                errorField[i][key] = msg;
            }
            inputField.setErrorAll(errorField);
        }
        if(isError){
            return;
        }

        await shopApi.addShopBulk(input).then(({status,data})=>{
            if(status === 200){
                alert(data);
            }
        })
    }


    return (
        <main>
            <div >
                <UserFormBox title='매장 등록하기'>
                    <div className={User.form_company}>
                        <ul className={User.company_list}>
                            {
                                input && input.map((_,i)=>{
                                    return <UserCompanyItem_backup2 inputField={inputField} key={i} index={i} onDelete={deleteShopItem} onSelect={fold} close={
                                        opened !== i
                                    }/>
                                })
                            }
                        </ul>

                        <button type="button" className={`btn btn_sky btn_add_icon ${User.btn}`} onClick={addShopItem}>매장 추가</button>
                    </div>

                    <div className={User.form_btn_box}>
                        <Link to='' className={`btn btn_grey ${User.btn} ${User.w30}`} to=''>이전</Link>
                        <button type="button" className={`btn btn_blue ${User.btn}`} onClick={submit}>등록완료</button>
                    </div>
                </UserFormBox>
            </div>
        </main>
    )
}