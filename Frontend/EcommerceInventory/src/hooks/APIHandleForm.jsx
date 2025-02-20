import { useState } from "react";
import axios from "axios"
import config from '../utils/config.js';

function useAPI(){
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const callAPI = async({url, method="GET", body={}, header={}, params={}}) =>{
        let gUrl = config.API_URL+url
        setLoading(true)
        let response = null
        header['Authorization'] = localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:""
        try {
            response = await axios.request({url:gUrl, method:method, data:body, headers:header, params:params})
        }
        catch (err){
            setError(err)
        }
        setLoading(false)
        return response
    }
    return {callAPI, error, loading}
}

export default useAPI