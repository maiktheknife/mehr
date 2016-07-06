from django.core.urlresolvers import reverse
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings

from os.path import join

from .models import Person, AdditionalContent


def index(request):
	video_path = join(settings.STATIC_URL, 'mainapp', 'video', 'Start.mp4')
	context = {
		"people": Person.objects.all(),
		"firstID": Person.objects.all().first().id,
		"video_path": video_path
	}
	return render(request, "mainapp/index.html", context)


def person_view_start(request):
	return redirect('0/')


def person_view(request, relative_person_id):
	persons = list(Person.objects.all())
	person = persons[int(relative_person_id)]
	index = persons.index(person)

	context = {
		"people": persons,
		"person": person,
		"index": index,
	}
	return render(request, "mainapp/person.html", context)


def chapter_view(request, relative_person_id, relative_chapter_id):
	persons = list(Person.objects.all())
	person = persons[int(relative_person_id)]
	chapters = list(person.chapter_set.all())
	chapter = chapters[int(relative_chapter_id)]

	return render(request, "mainapp/chapter.html", {"person": person, "chapter": chapter})


def additional_content_view(request, relative_person_id, relative_chapter_id, relative_additional_content_id):
	person = list(Person.objects.all())[int(relative_person_id)]
	chapter = list(person.chapter_set.all())[int(relative_chapter_id)]

	additional_content = list(chapter.additionalcontent_set.all())[int(relative_additional_content_id)]

	context = {"person": person, "chapter": chapter}

	if additional_content.type == AdditionalContent.TYPE_VIDEO:
		context["video"] = additional_content.video
		site = "mainapp/layer_video.html"
	else:
		context["pictures_array"] = additional_content.pictures_array
		context["textblocks_array"] = additional_content.textblocks_array
		site = "mainapp/layer_images.html"

	return render(request, site, context)
