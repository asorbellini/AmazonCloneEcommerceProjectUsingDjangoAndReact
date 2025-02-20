import { useState } from "react"
import {useFormContext} from "react-hook-form"
import { Box } from "@mui/system"
import { Divider, IconButton, TextField, Button } from "@mui/material"
import { Add, Delete } from "@mui/icons-material"

const JsonInputComponent = ({fields}) => {
    const {register} = useFormContext()
    const [keyValuePairs, setKeyValuePairs] = useState([{key:"", value:""}])

    const handleClickValueRemove = (index) => {
        const newPairs = keyValuePairs.filter((_,i)=>i!==index)
        setKeyValuePairs(newPairs)
        
    }
    const handleClickValueAdd = () =>{
        setKeyValuePairs([...keyValuePairs, {key:"", value:""}])
    }
    return (
        <Box mb={2}>
            <label>{fields.label}</label>
            <Divider sx={{marginBottom:"15px", marginTop:"10px"}}/>
            {
                keyValuePairs.map((pair, index) => (
                    <Box key={`${fields.name}-${index}`} display='flex' alignItems='center' mb={2}>
                        <TextField 
                        fullWidth
                        margin='normal'
                        key={fields.name}
                        label="Key"
                        {... register(`${fields.name}[${index}].key`)}
                        defaultValue={pair.key}
                        placeholder="Key"
                        />
                        <TextField 
                        fullWidth
                        margin='normal'
                        key={fields.name}
                        label="Value"
                        {... register(`${fields.name}[${index}].value`)}
                        defaultValue={pair.value}
                        placeholder="Value"
                        />
                        <IconButton onClick={()=>handleClickValueRemove(index)} variant={"outlined"} color={"secondary"}>
                            <Delete />
                        </IconButton>
                    </Box>
                ))
            }
            <Button variant={"outlined"} color={"primary"} onClick={handleClickValueAdd}><Add/>Add</Button>
            <Divider sx={{marginBottom:"10px", marginTop:"10px"}} />
        </Box>
    )
}

export default JsonInputComponent