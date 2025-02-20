import { TextField, Box } from "@mui/material"
import { useFormContext } from "react-hook-form"


const StepTextComponents = ({formConfig, fieldType}) => {
    const {register, formState:{errors}} = useFormContext()
    const textFields = formConfig.data.text
    return (
        <Box>
            {textFields.map((field, index) => (
                    <TextField 
                    fullWidth margin="normal" 
                    key={field.name} 
                    label={field.label}
                    error={!!errors[field.name]}
                    {... register(field.name,{required:field.required})}
                    defaultValue={field.default}
                    placeholder={field.placeholder}
                    />

            ))}
        </Box>
    )
}

export default StepTextComponents