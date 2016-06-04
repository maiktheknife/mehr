from django.conf.urls import url

from . import views

app_name = "mainapp"
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^people_(?P<person_id>[0-9]+)/$', views.person_view, name="personPage"),
	url(r'^people_(?P<person_id>[0-9]+)/chapter_(?P<chapter_id>[0-9]+)/$', views.chapter, name="chapterPage"),
	url(
		r'^people_(?P<person_id>[0-9]+)/chapter_(?P<chapter_id>[0-9]+)/inDepth(?P<additional_content_id>[0-9]+)/$',
		views.additional_content,
		name="additionalContentPage"
	),
]