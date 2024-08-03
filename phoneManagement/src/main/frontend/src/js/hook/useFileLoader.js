import useApi from "./useApi";

export function useFileLoader(){
    const {fileApi} = useApi();

    const pfp = async (fileName)=>{
        // console.log(`fileName: ${fileName}`)
        if(!fileName){
            return null;
        }
        let url = null;

        const res = await fileApi.load("pfp", fileName);
        if(res.status === 200 && res.data){
            url = window.URL.createObjectURL(res.data)
        }
        return url;
    }

    return {
        pfp
    }
}