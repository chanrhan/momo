import {useState} from "react";

function FileInput({inputField, onUpload=null, name}){
    // const [file, setFile] = useState(value ? value : null);
    const handleFileInput = e=>{
        inputField.setInput(prev=>({
            ...prev,
            [name]: e.target.files
        }))
    }

    return (
        <div className='mt-4 d-flex flex-column justify-content-center'>
            <div>
                <input className='icon-file' type="file" name={name} onChange={handleFileInput}/>
            </div>
            {
                onUpload && <div className='mt-3'>
                    <button className='btn btn-outline-primary' onClick={onUpload}>파일 업로드</button>
                </div>
            }
        </div>
    )
}

export default FileInput;