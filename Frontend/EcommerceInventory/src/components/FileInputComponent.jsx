import {useFormContext} from 'react-hook-form';
import { Box, Alert, Typography, IconButton, LinearProgress} from "@mui/material";
import useAPI from '../hooks/APIHandleForm.jsx';
import { useEffect, useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const FileInputComponent = ({field}) => {
    const {register,formState:{errors}, watch, setValue} = useFormContext();
    const {callAPI, loading} = useAPI()
    const [selectedFiles, setSelectedFiles] = useState([])
    const [filePreviews, setFilePreviews] = useState([])
    const [fileUploaded, setFileUploaded] = useState(false)

    const handleDeleteImage = (index) => {
        const updatedFiles = [...selectedFiles]
        updatedFiles.splice(index, 1)
        setSelectedFiles(updatedFiles)

        const updatedPreviews = [...filePreviews]
        updatedPreviews.splice(index,1)
        setFilePreviews(updatedPreviews)

        setFileUploaded(false)
    }

    const uploadFiles = async() =>{
        try{
            const formData = new FormData()
            selectedFiles.forEach((file,index)=>{
                formData.append('images',file)
            })
            const response = await callAPI({url:'upload-images/', method:'POST', body:formData})
            console.log(response)
            setValue(field.name, response?.data?.image_urls)
            toast.success(response?.data?.message)
            setFileUploaded(true)
        }
        catch(err){
            toast.error(err?.message)
        }
    }

    const deleteAllFiles = () => {
        setSelectedFiles([])
        setFilePreviews([])
        setFileUploaded(false)
    }

    useEffect(()=>{
        if (!selectedFiles.length && watch(field.name)) {
            console.log(watch(field.name))
            const fileArray = Array.from(watch(field.name)) || []
            setSelectedFiles(fileArray)
            const preview = fileArray.map((file, index) => ({
                url:URL.createObjectURL(file),
                name:file.name,
                type:file.type.split('/')[0]
            }))
            console.log('preview',preview)
            setFilePreviews(preview)
            setFileUploaded(false)
        }
    },[watch(field.name)])
        
    return (
        <>
            {
            filePreviews.length>0 && filePreviews.map((file, index)=>(
                <Box key={index} sx={{display:'flex', alignItems:'center', mb:2}}>
                    {
                    file.type==='image'?<img src={file.url} alt={file.name} style={{width:'60px', height:'60px'}} />:<DescriptionIcon sx={{width:'60px', height:'60px'}} />
                    }
                    <Typography variant='body1' p={1}>{file.name}</Typography>
                    <IconButton onClick={()=>handleDeleteImage(index)} sx={{color:'red'}}>
                        <Delete />
                    </IconButton>
                </Box>
            ))
            }

            {!filePreviews.length && 
                <Box p={1} mb={1}>
                    <Typography variant='title'>{field.label}</Typography>
                    <Box component={"div"} className='fileInput' mt={1}>
                        <input type='file' multiple {...register(field.name,{required:field.required})} />
                    </Box>
                </Box>
            }
            {
                !!errors[field.name] && <Alert variant='outlined' severity='error'>
                    This field is required.
                </Alert>
            }
            {
                selectedFiles.length>0 && !fileUploaded && (
                    loading?<LinearProgress sx={{width:'100%'}}/>:
                    <Box mt={2} display='flex' justifyContent='space-between' mb={2}>
                        <Button onClick={uploadFiles} variant='contained' color='primary'>Upload Files</Button>
                        <Button onClick={deleteAllFiles} variant='contained' color='primary'>Delete All Files</Button>
                    </Box>
                )
            }
        </>
    )
}
export default FileInputComponent;