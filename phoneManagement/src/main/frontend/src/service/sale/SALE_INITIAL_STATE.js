import {scRegex, telRegex} from "../../utils/regex";

export const SALE_INITIAL_STATE = [
    {
        key: 'provider'
    },
    {
        key: 'provider_fix',
        required: false
    },
    {
      key: 'actv_dt'
    },
    {
        key: 'stf_id'
    },
    {
        key: 'cust_nm',
        name: '고객 이름',
        regex: scRegex,
        msg: '고객 이름에 특수문자는 포함될 수 없습니다'
    },
    {
        key: 'cust_gd'
    },
    {
        key: 'cust_tel',
        name: '고객 전화번호',
        regex: telRegex,
        msg: '전화번호 형식을 올바르게 입력해 주세요'
    },
    {
        key: 'cust_gtel',
        name: '보호자 전화번호',
        regex: telRegex,
        msg: '전화번호 형식을 올바르게 입력해 주세요',
        required: false
    },
    {
        key: 'cust_cd',
        name: '고객 식별번호'
    },
    {
        key: 'ph_md'
    },
    {
        key: 'ct_actv_plan'
    },
    {
        key: 'ct_dec_plan'
    },
    {
        key: 'ct_actv_tp'
    },
    {
        key: 'ct_actv_div'
    },
    {
        key: 'ct_istm'
    },
    {
        key: 'sec_md'
    },
    {
        key: 'ct_cms'
    },
    {
        key: 'inet_actv_plan'
    },
    {
        key: 'inet_dec_plan'
    },
    {
        key: 'tv_actv_plan'
    },
    {
        key: 'tv_dec_plan'
    },
    {
        key: 'wt_actv_tp'
    },
    {
        key: 'wt_cms'
    },
    {
        key: 'sale_memo'
    }

]

