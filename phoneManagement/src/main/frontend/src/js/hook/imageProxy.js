import useApi from "./useApi";
import defaultProfileImage from "../../images/profile_img1.jpg"
import UnknownUserImage from "../../images/unknown_fill_icon.png"

export function ImageProxy(){
    const {fileApi} = useApi();

    const load = async (dir, fileName)=>{
        let url = defaultProfileImage;

        if(!fileName){
            return url;
        }


        if(fileName == 0){
            return UnknownUserImage;
        }

        const res = await fileApi.load(dir, fileName);
        if(res.status === 200 && res.data){
            const _url = window.URL.createObjectURL(res.data)

            if(_url != null){
                url = _url;
            }
        }
        return url;
    }

    const pimg = async (fileName)=>{
        return await load('pimg',fileName)
    }

    const pfp = async (fileName)=>{
        return await load('pfp',fileName);
    }

    const saleFile = async (fileName)=>{
        return await load('sale',fileName);
    }


    return {
        pfp,
        pimg,
        saleFile,
    }
}

