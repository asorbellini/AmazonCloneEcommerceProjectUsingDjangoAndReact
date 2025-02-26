import { jwtDecode } from 'jwt-decode'
import StepTextComponents from "../components/StepTextComponents.jsx"
import StepTextAreaComponents from "../components/StepTextAreaComponents.jsx"
import StepSelectComponents from "../components/StepSelectComponents.jsx"
import StepSwitchComponents from "../components/StepSwitchComponents.jsx"
import StepJsonComponents from "../components/StepJsonComponents.jsx"
import StepFileComponents from "../components/StepFileComponents.jsx"

export const isAuthenticated = () =>{
    const token = localStorage.getItem("token")
    if (!token){
        return false
    }
    try{
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now()/1000
        if (decodedToken.exp < currentTime){
            localStorage.removeItem("token")
        }

        return decodedToken.exp > currentTime
    } catch(err) {
        return false
    }
}

export const getUser = () => {
    const token = localStorage.getItem("token")
    if (!token){
        return false
    } 
    try{
        const decodedToken = jwtDecode(token)
        return decodedToken
    } catch(err) {
        return null
    }
}

export const isValidUrl = (url) => {
    try{
        if (Array.isArray(url) && url.length>0){
                new URL(`http://127.0.0.1:8000/static${url[0]}`)
                return true
        }
        else{
            new URL(`http://127.0.0.1:8000/static${url}`)
            return true
        }
    }
    catch (e) {
        return false
    }
}

export const getFormTypes = () => {
    return (
        [
            {component:StepSelectComponents, label:'Basic Details', fieldType:'select'},
            {component:StepSwitchComponents, label:'Checklist', fieldType:'checbox'},
            {component:StepTextComponents, label:'General Information', fieldType:'text'},
            {component:StepTextAreaComponents, label:'Detailed Information', fieldType:'textarea'},
            {component:StepJsonComponents, label:'Additional Details', fieldType:'json'},
            {component:StepFileComponents, label:'Documents & Files', fieldType:'file'}
        ]
    )
}

export const getImageUrl = (url) => {
    if  (Array.isArray(url) && url.length>1){
        const previweurl = new URL(`http://127.0.0.1:8000/static${url[0]}`)
        return (previweurl)
    } else {
        const previweurl = new URL(`http://127.0.0.1:8000/static${url}`)
        return(previweurl)
    }
}