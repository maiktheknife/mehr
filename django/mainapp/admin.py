from django.contrib import admin
from .models import Person, Chapter, AdditionalContent, Page, Image


# AdditionalContent

class PageInline(admin.TabularInline):
	model = Page
	extra = 3


class AdditionalContentAdmin(admin.ModelAdmin):
	inlines = [PageInline, ]


# Chapter

class AdditionalContentInline(admin.TabularInline):
	model = AdditionalContent


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
	verbose_name = "Bild auf der Startseite"
	verbose_name_plural = "Bilder auf der Startseite"
	extra = 3


class PersonAdmin(admin.ModelAdmin):
	list_filter = ['name']
	list_display = ['name', 'twitter_account', 'get_chapter_count', 'get_images_count']
	ordering = ['name', ]
	fieldsets = [
		(None, {'fields': ['name', 'twitter_account']}),
		('Text auf der Startseite', {
			'fields': ['preview_text'],
		}),
	]
	inlines = [ImagesInline, ChapterInline]


# Register your models here.
admin.site.register(Person, PersonAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(AdditionalContent, AdditionalContentAdmin)

# Maybe
# https://github.com/s-block/django-nested-inline
