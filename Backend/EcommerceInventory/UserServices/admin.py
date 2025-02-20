from django.contrib import admin
from .models import Modules, Users
# Register your models here.

class ModulesAdmin(admin.ModelAdmin):
    list_display = ('module_name', 'parent_id_id')

admin.site.register(Modules, ModulesAdmin)
admin.site.register(Users)