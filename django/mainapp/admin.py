from django.contrib import admin
from embed_video.admin import AdminVideoMixin
from .models import Person, Chapter, AdditionalContent, Page


class MyModelAdmin(AdminVideoMixin, admin.ModelAdmin):
    pass

# Register your models here.
admin.site.register(Person)
admin.site.register(Chapter, MyModelAdmin)
admin.site.register(AdditionalContent)
admin.site.register(Page)
