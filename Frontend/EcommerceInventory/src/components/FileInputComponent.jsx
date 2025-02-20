import { useFormContext } from "react-hook-form"
import { Alert, Box, Button, IconButton, Typography } from "@mui/material"
import useAPI from "../hooks/APIHandleForm.jsx"
import { useEffect, useState } from "react"
import { Delete, Description } from "@mui/icons-material"

const FileInputComponent = ({field}) => {
    const {register, formState:{errors}, watch, setValue} = useFormContext()
    const {callAPI, loading} = useAPI()
    const [selectedFiles, setSelectedFiles] = useState([])
    const [filePreviews, setFilePreviews] = useState([])
    const [fileUploaded, setFileUploaded] = useState(false)

    const handleDeleteImage = (index) => {
        //Delete file from data
        const updatedFiles = [...selectedFiles]
        updatedFiles.splice(index, 1)
        setSelectedFiles(updatedFiles)
        //Delete for file preview
        const updatedPreviews = [...filePreviews]
        updatedPreviews.splice(index,1)
        setFilePreviews(updatedPreviews)

        setFileUploaded(false)
    }

    const uploadFiles = async()=>{
        //FALTA
    }
    
    const deleteAllFiles = (index) => {
        setSelectedFiles([])
        setFilePreviews([])
        setFileUploaded(false)

    }


    useEffect(()=>{
        if(!selectedFiles.length && watch(field.name)){
            console.log(watch(field.name))
            const fileArray = Array.from(watch(field.name)) || []
            setSelectedFiles(fileArray)
            const preview = fileArray.map((file, index)=>({
                url:URL.createObjectURL(file),
                name: file.name,
                type:file.type.split("/")[0]
            }))
            console.log(preview)
            setFilePreviews(preview)
            setFileUploaded(false)
        }
    },[watch(field.name)])
    
    return (
        <>
        {
            filePreviews.length > 0 && filePreviews.map((file, index)=>(
                <Box key={index} sx={{display:'flex', alignItems:'center', mb:2}}>
                    {
                        file.type === 'image'?<img src={file.url} alt={file.name} style={{width:'60px', height:'60px'}} />:<Description sx={{width:'60px',height:'60px'}} />
                    }
                    <Typography variant="body1" p={2}>{file.name}</Typography>
                    <IconButton onClick={()=>handleDeleteImage(index)} sx={{color:'red'}}>
                        <Delete></Delete>
                    </IconButton>
                </Box>
            ))   
        }
        { !filePreviews.length && 
            <Box p={1} mb={1}>
                <Typography variant="title">{field.label}</Typography>  
                <Box key={field.name} component={"div"} className="fileInput" mt={1}> 
                    <label>{field.label}</label>
                    <input type="file" multiple {... register(field.name, {required:field.required})} />
                    {
                        errors[field.name] && <Alert variant="outlined" severity="error">
                            This field is Required.
                        </Alert>
                    }
                </Box>
            </Box>
        }
        {
            selectedFiles.length > 0 && !fileUploaded && (
                <Box mt={2} display="flex" justifyContent='space-between'>
                    <Button onClick={uploadFiles} variant="contained" color="primary">Upload Files</Button>
                    <Button onClick={deleteAllFiles} variant="contained" color="primary">Delete All Files</Button>
                </Box>
            )
        }
        </>
    )
}

export default FileInputComponent