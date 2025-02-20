#Stage 1: Building Frontend application
FROM node:18 as build-stage 

WORKDIR /code

COPY ./Frontend/EcommerceInventory/ /code/Frontend/EcommerceInventory/

WORKDIR /code/Frontend/EcommerceInventory

#Installing packages
RUN npm install --legacy-peer-deps

# Debug: Mostrar estructura antes del build
RUN ls -la /code/Frontend/EcommerceInventory

# Creating build directory manually
RUN mkdir -p /code/Frontend/EcommerceInventory/build && chmod -R 777 /code/Frontend/EcommerceInventory/build

# Building frontend
RUN npm run build

# Debug: Verificar si build se generó
RUN ls -la /code/Frontend/EcommerceInventory/build

#Stage 2: Build Backend
FROM python:3.12.4

#Set Environment Variables
ENV PYTHONDONTWRITEBYCODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

#Copy Django Project to the container
COPY ./Backend/EcommerceInventory /code/Backend/EcommerceInventory/

#Install the required package
RUN pip install -r ./Backend/EcommerceInventory/requirements.txt

#Copy the Frontend build to the Django Project
COPY --from=build-stage ./code/Frontend/EcommerceInventory/build /code/Backend/EcommerceInventory/static/
COPY --from=build-stage ./code/Frontend/EcommerceInventory/build/static /code/Backend/EcommerceInventory/static/
COPY --from=build-stage ./code/Frontend/EcommerceInventory/build/index.html /code/Backend/EcommerceInventory/EcommerceInventory/templates/index.html

#Run Django Migration Command
RUN python ./Backend/EcommerceInventory/EcommerceInventory/manage.py migrate

#Run Django Collectstatic Command
RUN python ./Backend/EcommerceInventory/EcommerceInventory/manage.py collectstatic --no-input

#Expose the port
EXPOSE 80

WORKDIR /code/Backend/EcommerceInventory/

#Run Django Server
CMD ["gunicorn", "EcommerceInventory.wsgi.application", "--bind", "0.0.0.0:8000"]
