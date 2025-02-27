import { FormControl, Box, FormControlLabel, Switch } from "@mui/material"
import { useFormContext } from "react-hook-form"

const StepSwitchComponents = ({formConfig, fieldType}) => {
    const {register, formState:{errors}} = useFormContext()
    const checkboxFields = formConfig.data.checkbox
    return (
        <Box>
            {checkboxFields.map((field, index) => (
                <FormControl fullWidth margin="normal" key={field.name}>
                    <FormControlLabel
                        control = {
                            <Switch
                                error={!!errors[field.name]}
                                {... register(field.name, {required:field.required})}
                                defaultValue={field.default}
                            />
                        }
                        label={field.label}
                        />
                </FormControl>
            ))}
        </Box>
    )
}

export default StepSwitchComponents