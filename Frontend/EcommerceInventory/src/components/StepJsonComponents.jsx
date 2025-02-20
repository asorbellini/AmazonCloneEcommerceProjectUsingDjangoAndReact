import { useFormContext } from "react-hook-form"
import { Box, TextField } from "@mui/material"
import JsonInputComponent from "./JsonInputComponent.jsx"

const StepJsonComponents = ({formConfig, fieldType}) => {
    const {register} = useFormContext()
    const jsonFields = formConfig.data.json
    return (
        <Box>
            {
                jsonFields.map((field, index)=>(
                    <JsonInputComponent fields={field} key={index} />
                ))
            }
        </Box>
    )
}

export default StepJsonComponents