"""
URL configuration for EcommerceInventory project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from EcommerceInventory import settings
from UserServices.Controller.DynamicFormController import DynamicFormController
from UserServices.Controller.SuperAdminDinamicFormController import SuperAdminDynamicFormController
from UserServices.Controller.SidebarController import ModuleView
from django.conf.urls.static import static
from EcommerceInventory.views import FileUploadView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('UserServices.urls')),
    path('api/getForm/<str:modelName>', DynamicFormController.as_view(), name='dynamicForm'),
    path('api/superAdminForm/<str:modelName>', SuperAdminDynamicFormController.as_view(), name='superAdminDynamicForm'),
    path('api/getMenus/', ModuleView.as_view(), name='sidebarMenu'),
    path('api/products/', include('ProductServices.urls')),
    path('api/upload-images/', FileUploadView.as_view(), name='fileUpload')
]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_URL)



""" urlpatterns += [
    re_path(r'^(?:.*)/?$', views.index, name="index")
] """