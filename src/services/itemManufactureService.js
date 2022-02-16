import { GetManufactureDetails, InsertUpdateManufacture } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getManuDetApi = (successCallback, id = 0) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetManufactureDetails}?id=${id}`);
            if(response?.status === 200)
                successCallback(response?.data?.GetManufactureDetails);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertManufactureApi = (data, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(data)
            const response = await store(InsertUpdateManufacture, formData);
            // if(response?.status === 200)
                returnData(response?.data)
            // else
            //     returnData([])
        } catch (error) {

        }

    }
}