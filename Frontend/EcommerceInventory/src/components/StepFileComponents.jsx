
import { Box } from "@mui/material"
import FileInputComponent from "./FileInputComponent.jsx"

const StepFileComponents = ({formConfig}) => {
    return (
        <Box>  
            {formConfig?.data?.file?.map((field, index) => (
                <FileInputComponent field={field} key={index} />
            ))}
        </Box>
    )
}

export default StepFileComponents