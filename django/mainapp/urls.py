from django.conf.urls import url
from django.core.urlresolvers import reverse_lazy
from django.views.generic import RedirectView

from . import views

app_name = "mainapp"
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^people/$', views.person_view_start, name="personPageStart"),
	url(r'^people/(?P<relative_person_id>[0-9]+)/$', views.person_view, name="personPage"),
	url(r'^people/(?P<relative_person_id>[0-9]+)/chapter/(?P<relative_chapter_id>[0-9]+)/$', views.chapter_view, name="chapterPage"),
	url(
		r'^people/(?P<person_id>[0-9]+)/chapter/(?P<chapter_id>[0-9]+)/inDepth/(?P<additional_content_id>[0-9]+)/$',
		views.additional_content,
		name="additionalContentPage"
	),
]
