import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import useAPI from "../hooks/APIHandleForm.jsx"
import { getFormTypes } from "../utils/Helpers.jsx"
import { Box, Button, Container, Divider, LinearProgress, Typography } from '@mui/material'
import {Step, StepLabel, Stepper} from '@mui/material'
import { ArrowBackIos, ArrowForwardIos, Save } from '@mui/icons-material'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const DynamicForm = () => {
    const stepItems = getFormTypes()
    const {formName} = useParams()
    const {callAPI, error, loading} = useAPI()
    const [formConfig, setFormConfig] = useState(null)
    const [currentStep, setCurrentStep] = useState(0)
    const methods = useForm()
    const [steps, setSteps] = useState(stepItems)

    const fetchForm = async() =>{
        const response = await callAPI({url:`getForm/${formName}`, method:"get"})
        let stepFilter = stepItems.filter(step => response.data.data[step.fieldType] && response.data.data[step.fieldType].length>0)
        setSteps(stepFilter)
        setFormConfig(response.data)
        setCurrentStep(0)
    } 
    
    useEffect(()=>{
        fetchForm()
    },[formName])

    const goToStep = (index) => {
        setCurrentStep(index)
    }

    const getCurrentStepFields = () => {
        const currentStepType = steps[currentStep]?.fieldType
        return formConfig.data[currentStepType] || []
    }
    const validateCurrentStepFields = (fields) => {
        return fields.filter(field => field.required && !methods.getValues()[field.name])
    }

    const nextStep = () => {
        const currentStepFields = getCurrentStepFields()
        const errors = validateCurrentStepFields(currentStepFields)
        if (errors.length > 0) {
            errors.forEach(error => {
                methods.setError(error.name, {
                    type:'manual',
                    message:`${error.label} is Required.`
                })
            })
        } else {
            const currentStepFields = getCurrentStepFields()
            currentStepFields.forEach( field => {
                methods.clearErrors(field.name);
            })
            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1)
            }
        }
    }
    
    const onSubmit = async(data) => {
        try {
            const response = await callAPI({url:`getForm/${formName}`, method:"post", body:data})
            toast.success(response.data.message)
            setCurrentStep(0)
            methods.reset()
        }
        catch (err){
            console.log(err)
        }
    }

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Add {formName.toUpperCase()}
            </Typography>
            <Divider style={{marginTop:'15px', marginBottom:'15px'}} />
            <Stepper key={formName} activeStep={currentStep} alternativeLabel>
                {steps.map((step,index)=>(
                        <Step key={index} onClick={()=>goToStep(index)}>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                ))}
            </Stepper>
            <Divider style={{marginTop:'15px', marginBottom:'15px'}} />
            <Typography variant="h6" gutterBottom>
                {steps[currentStep].label}
            </Typography>
            {/* Section for Form */}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {formConfig && 
                        <>
                            {steps.map((step, index) => (
                                <Box component={"div"} key={index} sx={{display:index===currentStep?'block':'none'}}>
                                    {step.component && <step.component formConfig={formConfig} fieldType={step.fieldType}/>}
                                </Box>
                            ))}
                        </> 
                    }
                    {!formConfig && loading && <LinearProgress/>}
                    <Box mt={2} display="flex" justifyContent="space-between">
                        {currentStep > 0 && (<Button type="button" variant="contained" color="primary" onClick={() => goToStep(currentStep-1)}><ArrowBackIos sx={{fontSize:'18px', marginRight:'5px'}}/>Back</Button>)}
                        {currentStep < steps.length-1 && (<Button type="button" variant="contained" color="primary" onClick={() => nextStep()}>Next<ArrowForwardIos sx={{fontSize:'18px', marginLeft:'5px'}}/></Button>)}
                        {<Button sx={{display:currentStep===steps.length-1?'inline-flex':'none'}} variant="contained" color="primary" type="submit"><Save sx={{fontSize:'20px',marginRight:'5px',margingTop:'8px'}}/> Submit</Button>}
                    </Box>
                </form>
            </FormProvider>
            {
                loading && <LinearProgress style={{width:'100%', marginBottom:'10px', marginTop:'10px'}}/>
            }
        </Container>
    )
}

export default DynamicForm