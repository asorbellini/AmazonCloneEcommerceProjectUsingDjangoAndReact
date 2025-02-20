from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from EcommerceInventory.permission import IsSuperAdmin
from EcommerceInventory.helpers import renderResponse, getSuperAdminDynamicFormModels, getExcludeFields
from django.apps import apps
from django.core.serializers import serialize
import json

class SuperAdminDynamicFormController(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperAdmin]

    def post(self, request, modelName):
        #Checking if Model exist in out Dynamic Form Models
        if modelName not in getSuperAdminDynamicFormModels():
            return renderResponse(data='Model not exists.', message='Model not exists.', status=status.HTTP_404_NOT_FOUND)
        
        #Getting the Model Name from Dynamic Form Models
        model = getSuperAdminDynamicFormModels()[modelName]
        #Getting the Model Class from Model Name
        model_class = apps.get_model(model)
        #Checking if ModelClass Exists
        if model_class is None:
            return renderResponse(data='Model not found.', message='Model not found.', status=status.HTTP_404_NOT_FOUND)
        #Getting the Model Fields Info
        fields_info = model_class._meta.fields
        #Getting the Model Fields Name
        model_fields = {field.name for field in fields_info}
        #Getting the Exclude Fields
        excluded_fields = getExcludeFields()

        #Checking the Required Fields are in the Model Data
        required_fields = [field.name for field in fields_info if not field.null and field.default is not None and field.name not in excluded_fields]

        #Matching with validation for fields not exists in Post Data
        missing_fields = [field for field in required_fields if field not in request.data]
        #Response for Required Missing Fields
        if missing_fields:
            return renderResponse(data=[f'The folowing field is in required: {field}' for field in missing_fields], message='Validation Error.', status=status.HTTP_400_BAD_REQUEST)

        #Creating a copy of Post Data for Manipulation
        fields = request.data.copy()

        #Filtering the Post Data Fields by Model Fields and eliminating extra fields
        fieldsdata = {key:value for key,value in fields.items() if key in model_fields}

        #Assigning Forein Key instance for Forein Key Fields in the Post Data by getting the instance of the related model by the ID.
        for field in fields_info: 
            if field.is_relation and field.name in fieldsdata and isinstance(fieldsdata[field.name], int):
                related_model = field.related_model
                try:
                    related_instance = related_model.objects.get(id=fieldsdata[field.name])
                    fieldsdata[field.name] = related_instance
                except related_model.DoesNotExist:
                    return renderResponse(data=f'{field.name} relation not exists.', message=f'{field.name} relation not exists.', status=status.HTTP_404_NOT_FOUND)

        #Creating the Model Instance and Saving the Data in the DataBase
        model_instance = model_class.objects.create(**fieldsdata)
        #Serializing Data
        serialized_data = serialize('json', [model_instance])
        #Converting Serializing Data to JSON
        model_json = json.loads(serialized_data)
        #Getting the first object of the JSON
        response_json = model_json[0]['fields']
        response_json['id'] = model_json[0]['pk']
        #Returning the response data
        return renderResponse(data=response_json, message='Data saved successfully.',status=status.HTTP_200_OK)