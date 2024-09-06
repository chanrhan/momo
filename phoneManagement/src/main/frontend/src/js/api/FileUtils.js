
export const FileUtils = {
    encodeFileToBase64 : async (fileList: Array<File>)=>{
        const encodingFiles = fileList.map((file)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file)
            return new Promise((resolve)=>{
                reader.onload = ()=>{
                    resolve(reader.result)
                }
            })
        });

        return await Promise.all(encodingFiles);
    }
}
