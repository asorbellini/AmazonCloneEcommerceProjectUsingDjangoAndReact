from django.urls import path
from .controller.CategoryController import CategoryListView

urlpatterns=[
    path('categories/',CategoryListView.as_view(), name='category_list'),
]