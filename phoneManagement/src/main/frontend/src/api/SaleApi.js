import {requestApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";

export const getSaleList = async (data, accessToken)=>{
    const response = await requestApiWithAccessToken.post(`/api/v1/sale/list`,data, accessToken);
    if(response.status === 200){
        if(!ObjectUtils.isEmpty(response.data)){
            return response;
        }
    }
    response.data = [];
    return response;
}

export const getSaleListWithCategory = async (category, data, accessToken)=>{
    if(data.order === 'state'){
        switch (category){
            case 'card':
                data.order = 'card_st';
                break;
            case 'green':
                data.order = 'green_st';
                break;
            case 'comb':
                data.order = 'comb_st';
                break;
            case 'support':
                data.order = 'support_st';
                break;
        }
    }
    const response = await requestApiWithAccessToken.post(`/api/v1/sale/list/${category}`,data, accessToken);
    if(response.status === 200){
        response.data.map(function (value){
            let state = '';
            let stateColor = '';
            switch (category){
                case 'card':
                    let card_st = value.card_st;
                    console.log(`card_st: ${card_st}`)
                    if(card_st === null || card_st === undefined || card_st === 0){
                        state = '등록전'
                        stateColor = '#fff29b'
                    }else if(card_st === 1){
                        state = '등록완료'
                        stateColor = '#99fa8a'
                    }else if(card_st === 2){
                        state = '패스'
                        stateColor = '#8cf8ff'
                    }
                    break;
                case 'green':
                    let green_st = value.green_st;
                    if(green_st === null || green_st === undefined || green_st === 0){
                        state = '반납전'
                        stateColor = '#fff29b'
                    }else{
                        state = '반납완료'
                        stateColor = '#99fa8a'
                    }
                    break;
                case 'comb':
                    let comb_st = value.comb_st;
                    if(comb_st === null || comb_st === undefined || comb_st === 0){
                        state = '등록전'
                        stateColor = '#fff29b'
                    }else{
                        state = '등록완료'
                        stateColor = '#99fa8a'
                    }
                    break;
                case 'support':
                    let sup_st = value.sup_st;
                    if(sup_st === null || sup_st === undefined || sup_st === 0){
                        state = '지원전'
                        stateColor = '#fff29b'
                    }else{
                        state = '지원완료'
                        stateColor = '#99fa8a'
                    }
                    break;
            }
            value['state'] = state;
            value['state_color'] = stateColor;
        })

        return response;
    }else{
        return response;
    }
}

export const deleteSales = async (data, accessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/sale/delete', data, accessToken);
}