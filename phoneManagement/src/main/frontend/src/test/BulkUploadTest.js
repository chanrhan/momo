import CustomTable from "./CustomTable";
import FileUpload from "./FileUpload";
import {useCallback, useEffect, useState} from "react";
import button from "bootstrap/js/src/button";
import * as XLSX from "xlsx"
import {ObjectUtils} from "../utils/objectUtil";


function BulkUploadTest(){


    return (
        <div className='mt-4'>
            <h3>Bulk Upload</h3>
            <div className='mt-3'>
                <CustomTable/>
            </div>
        </div>
    )
}

export default BulkUploadTest;