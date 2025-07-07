import {ImageProxy} from "../../hook/imageProxy";
import defaultProfileImage from "../../../images/profile_img1.jpg";

export function ImageListProxy(){
    const imageProxy = ImageProxy();
    const pfp = async (list, propName)=>{
        if(list){

            const copy = new Array(list.length)
            for(let i=0;i<list.length; ++i){
                await imageProxy.pfp(list[i][propName]).then(d=>{
                    copy[i] = d;
                })
            }
            return copy;
        }
        return null;
    }

    return {
        pfp
    }
}