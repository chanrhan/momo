import {useRef} from "react";
import FileInput from "../components/common/inputbox/FileInput";
import useInputField from "../hook/useInputField";
import useApi from "../hook/useApi";
import {ObjectUtils} from "../utils/objectUtil";

function FileUploadTest(){
    const inputField = useInputField();
    const {testApi} = useApi();

    const handleUpload = ()=>{
        const formData = new FormData();
        const fileData = inputField.input.file;
        console.log(fileData)
        console.table(inputField.input)
        const dir = inputField.input.dir;

        if(!ObjectUtils.isEmpty(fileData)){
            const files = Array.prototype.slice.call(fileData);
            files.forEach((file)=>{
                formData.append('file', file);
            })

            testApi.uploadFile(dir, formData).then(({status,data})=>{
                if(status === 200){
                    console.log(data)
                }
            })
        }
    }

    return (
        <div>
            <input type="text" name='dir' onChange={inputField.handleInput}/>
            <FileInput inputField={inputField} name="file" onUpload={handleUpload}/>
        </div>
    )
}

export default FileUploadTest;