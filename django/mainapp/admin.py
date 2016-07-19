from django.contrib import admin
from .models import Person, Chapter, AdditionalContent, AdditionalContentElement, Image, GalleryImage


class AdditionalContentElementsInline(admin.StackedInline):
	fieldsets = [
		('Type', {'fields': ['type']}),
		('Video', {'fields': ['video']}),
		('Image', {'fields': ['image']}),
		('Textblock', {'fields': ['text']}),
		('Video with text', {'fields': ('video', 'text')}),
		('Image with text', {'fields': ('image', 'text')}),
	]
	model = AdditionalContentElement
	extra = 1


class AdditionalContentGalleryInline(admin.StackedInline):
	model = GalleryImage
	extra = 3


# AdditionalContent
class AdditionalContentAdmin(admin.ModelAdmin):
	list_filter = ['chapter']
	list_display = ['chapter', 'name', 'index', 'type']
	ordering = ['chapter', 'index']
	fieldsets = [
		(None, {'fields': ['index', 'name', 'chapter', ]}),
		('Preview', {'fields': ['description', 'image', ]}),
		('Type', {'fields': ['type']}),
		('Video', {'fields': ['video']}),
		('Ambient Music', {'fields': ['ambient_music']}),
	]
	inlines = [AdditionalContentElementsInline, AdditionalContentGalleryInline]

	# https://stackoverflow.com/questions/9330354/django-admin-disable-field-dynamically-based-on-other-selections
	class Media:
		js = ("mainapp/js/libs/jquery.js", "admin/js/layer_admin.js", )


# Chapter

class AdditionalContentInline(admin.TabularInline):
	model = AdditionalContent
	extra = 3


class ChapterAdmin(admin.ModelAdmin):
	list_filter = ['person']
	list_display = ['person', 'index', 'name', 'video', 'start_time', 'get_additional_count']
	ordering = ['person', 'index']
	inlines = [AdditionalContentInline, ]


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
	list_display = ['name', 'twitter_account', 'preview_type', 'get_chapter_count']
	ordering = ['name', ]
	fieldsets = [
		(None, {'fields': ['name', 'twitter_account', 'preview_text',]}),
		('Preview', {'fields': ['preview_type']}),
		('Preview Video', {
			'fields': ['preview_video'],
		}),
	]
	inlines = [ImagesInline, ChapterInline]

	class Media:
		js = ("mainapp/js/libs/jquery.js", "admin/js/person_admin.js", )



# Register your models here.
admin.site.register(Person, PersonAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(AdditionalContent, AdditionalContentAdmin)

# Maybe
# https://github.com/s-block/django-nested-inline
