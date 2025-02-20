from rest_framework import generics
from UserServices.models import Modules
from django.core.serializers import serialize
from EcommerceInventory.helpers import renderResponse
import json

class ModuleView(generics.CreateAPIView):

    def get(self, request):
        menus = Modules.objects.filter(is_menu=True, parent_id=None, is_active=True).order_by('display_order')
        serialized_menus = serialize('json',menus)
        serialized_menus = json.loads(serialized_menus)
        cleaned_menus= []
        for menu in serialized_menus:
            menu['fields']['id'] = menu['pk']
            menu['fields']['submenus'] = Modules.objects.filter(parent_id=menu['pk'], is_active=True, is_menu=True).order_by('display_order').values('id','module_name', 'module_icon', 'is_menu', 'is_active', 'module_url', 'parent_id', 'display_order', 'module_description')
            cleaned_menus.append(menu['fields'])
        return renderResponse(data=cleaned_menus, message='All modules', status=200)