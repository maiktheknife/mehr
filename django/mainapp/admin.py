from django.contrib import admin
from .models import Person, Chapter, AdditionalContent, AdditionalContentElement, Image, GalleryImage
from .models import SocialMediaPlatform, SocialMediaLink, Menu


class MenuAdmin(admin.ModelAdmin):
	def has_add_permission(self, request):
		base_add_permission = super(MenuAdmin, self).has_add_permission(request)
		if base_add_permission:
			if Menu.objects.all().count() == 0:
				return True
		return False


# AdditionalContent
class AdditionalContentElementSocialMediaInline(admin.TabularInline):
	model = SocialMediaLink
	extra = 1


class AdditionalContentElementsInline(admin.StackedInline):
	model = AdditionalContentElement
	extra = 1


class AdditionalContentGalleryInline(admin.StackedInline):
	model = GalleryImage
	extra = 3


class AdditionalContentAdmin(admin.ModelAdmin):
	list_filter = ['chapter']
	list_display = ['name', 'chapter', 'type']
	ordering = ['chapter']
	fieldsets = [
		(None, {'fields': ['name', 'chapter', ]}),
		('Preview', {'fields': ['description', 'image', ]}),
		('Type', {'fields': ['type']}),
		('Video', {'fields': ['video']}),
		('Ambient Music', {'fields': ['ambient_music']}),
	]
	inlines = [AdditionalContentElementsInline, AdditionalContentGalleryInline]

	# https://stackoverflow.com/questions/9330354/django-admin-disable-field-dynamically-based-on-other-selections
	class Media:
		js = ("mainapp/js/libs/jquery.js", "admin/js/layer_admin.js",)


# Chapter

class ChapterAdmin(admin.ModelAdmin):
	list_filter = ['person']
	list_display = ['person', 'name', 'video', 'get_additional_count']
	ordering = ['id']


# People

class ChapterInline(admin.TabularInline):
	model = Chapter
	extra = 3


class ImagesInline(admin.TabularInline):
	model = Image
	verbose_name = "Preview Images"
	verbose_name_plural = "Preview Images"
	extra = 3


class PersonAdmin(admin.ModelAdmin):
	list_filter = ['name']
	list_display = ['name', 'preview_type', 'get_chapter_count']
	ordering = ['name', ]
	fieldsets = [
		(None, {'fields': ['name', 'preview_text', ]}),
		('Preview', {'fields': ['preview_type']}),
		('Preview Video', {
			'fields': ['preview_video'],
		}),
	]
	inlines = [ImagesInline, ChapterInline]

	class Media:
		js = ("mainapp/js/libs/jquery.js", "admin/js/person_admin.js",)


admin.site.register(Menu, MenuAdmin)
admin.site.register(Person, PersonAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(AdditionalContent, AdditionalContentAdmin)
admin.site.register(SocialMediaPlatform)
admin.site.register(SocialMediaLink)
