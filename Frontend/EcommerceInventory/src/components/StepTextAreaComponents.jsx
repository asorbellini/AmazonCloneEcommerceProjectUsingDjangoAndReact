import { useFormContext } from "react-hook-form"
import { Box, TextField } from "@mui/material"


const StepTextAreaComponents = ({formConfig, fieldType}) => {
    const {register, formState:{errors}} = useFormContext()
    const textAreaFields = formConfig.data.textarea
    return (
        <Box>
            {textAreaFields.map((field, index) => (
                    <TextField 
                    fullWidth margin="normal" 
                    key={field.name} 
                    label={field.label}
                    error={!!errors[field.name]}
                    {... register(field.name,{required:field.required})}
                    defaultValue={field.default}
                    rows={4}
                    multiline
                    placeholder={field.placeholder}
                    />

            ))}
        </Box>
    )
}

export default StepTextAreaComponents