import { isValidUrl, getImageUrl } from "../utils/Helpers"
import { Typography } from "@mui/material"

const RenderImage = ({data, name}) => {
    return(
        data && data!=='' && isValidUrl(data)
    ?<img src={getImageUrl(data)} alt={name} style={{width:"70px", height:"70px", padding:'5px'}}/>
    :<Typography variant='body2' pt={3} pb={3}>No image available.</Typography>)
}

export default RenderImage