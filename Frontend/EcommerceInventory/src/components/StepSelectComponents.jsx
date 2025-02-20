import { FormControl, Box, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import { useFormContext } from "react-hook-form";

const StepSelectComponents = ({ formConfig, fieldType }) => {
    const { register, setValue, watch, formState: { errors } } = useFormContext();
    const selectFields = formConfig.data.select

    return (
        <Box>
            {selectFields.map((field, index) => {
                const selectedValue = watch(field.name) || field.default
                return (
                    <FormControl fullWidth margin="normal" key={`${field.name}-${index}`}>
                        <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                        <Select
                            labelId={`${field.name}-label`}
                            {...register(field.name, { required: field.required })}
                            value={selectedValue}
                            onChange={(e) => {
                                setValue(field.name, e.target.value, { shouldValidate: true });
                            }}
                        >
                            {field.options.map((option, idx) => (
                                <MenuItem key={`${option.id || idx}`} value={option.id || option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors[field.name] && (
                            <Alert variant="outlined" severity="error">
                                {errors[field.name]?.message || "This field is required."}
                            </Alert>
                        )}
                    </FormControl>
                );
            })}
        </Box>
    );
};

export default StepSelectComponents;
