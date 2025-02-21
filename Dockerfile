#Stage 1: Building Frontend application
FROM node:18 as build-stage 

WORKDIR /code

COPY ./Frontend/EcommerceInventory/ /code/Frontend/EcommerceInventory/

WORKDIR /code/Frontend/EcommerceInventory

#Installing packages
RUN npm install

# Building frontend
RUN npm run build

# Debug: Verificar si build se generó
RUN ls -la /code/Frontend/EcommerceInventory/dist

#Stage 2: Build Backend
FROM python:3.12.4

#Set Environment Variables
ENV PYTHONDONTWRITEBYCODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

#Copy Django Environment Variables to the container 
COPY ./Backend/EcommerceInventory/.env /code/Backend/EcommerceInventory/.env

#Copy Django Project to the container
COPY ./Backend/EcommerceInventory /code/Backend/EcommerceInventory/

#Install the required package
RUN pip install -r ./Backend/EcommerceInventory/requirements.txt

#Copy the Frontend build to the Django Project
COPY --from=build-stage ./code/Frontend/EcommerceInventory/dist /code/Backend/EcommerceInventory/static/
COPY --from=build-stage ./code/Frontend/EcommerceInventory/dist/assets /code/Backend/EcommerceInventory/static/asset
COPY --from=build-stage ./code/Frontend/EcommerceInventory/dist/index.html /code/Backend/EcommerceInventory/templates/index.html

#Run Django Migration Command
RUN python ./Backend/EcommerceInventory/manage.py migrate

#Run Django Collectstatic Command
RUN python ./Backend/EcommerceInventory/manage.py collectstatic --no-input

#Expose the port
EXPOSE 80

WORKDIR /code/Backend/EcommerceInventory/

#Run Django Server
CMD ["gunicorn", "EcommerceInventory.wsgi:application", "--bind", "0.0.0.0:8000", "--timeout", "120"]
