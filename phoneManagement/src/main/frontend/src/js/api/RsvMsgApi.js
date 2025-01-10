import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";
import axios from "axios";

function SaleApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getReserveMsgForCalendar: async (date)=>{
            return axiosApiWithAccessToken.get(`/api/v1/msg/calendar?date=${date}`, accessToken);
        },
        getReserveMsgDetail: async (date)=>{
            return axiosApiWithAccessToken.get(`/api/v1/msg/detail?date=${date}`, accessToken);
        },
        getReserveMsgBySale: async (saleId)=>{
            return axiosApiWithAccessToken.get(`/api/v1/msg/sale?saleId=${saleId}`, accessToken);
        },
        insertReserveMsg: async (data)=>{
            return axiosApiWithAccessToken.post(`/api/v1/msg/add`,  data,accessToken);
        },
        deleteReserveMsg: async (data)=>{
            return axiosApiWithAccessToken.post(`/api/v1/msg/del`,  data,accessToken);
        }
    }
}

export default SaleApi;

