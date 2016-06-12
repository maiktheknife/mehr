from django.contrib import admin
from .models import Person, Chapter, AdditionalContent, Page, Image

# Register your models here.
admin.site.register(Person)
admin.site.register(Chapter)
admin.site.register(AdditionalContent)
admin.site.register(Page)
admin.site.register(Image)
