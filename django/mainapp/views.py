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
		"video_path": video_path
	}
	return render(request, "mainapp/index.html", context)


# FIXME: redirect geht nicht -.-
def person_view_start(request):
	person_id = Person.objects.first().id
	# return redirect('person_view', person_id=person_id)
	return HttpResponseRedirect(
		reverse('personPage', kwargs={'person_id': person_id}))


def person_view(request, person_id):
	person = get_object_or_404(Person, pk=person_id)
	people = list(map(lambda p: (p, "active" if p.id == int(person_id) else ""), Person.objects.all()))
	context = {
		"person": person,
		"people": people,
	}
	return render(request, "mainapp/person.html", context)


def chapter_view(request, person_id, chapter_id):
	person = get_object_or_404(Person, pk=person_id)
	chapter = person.chapter_set.get(id=chapter_id)
	return render(request, "mainapp/chapter.html", {"person": person, "chapter": chapter})


def additional_content(request, person_id, chapter_id, additional_content_id):
	person = get_object_or_404(Person, pk=person_id)
	chapter = person.chapter_set.get(id=chapter_id)
	additional_content = chapter.additional_content_set.get(id=additional_content_id)

	context = {"person": person, "chapter": chapter}

	if additional_content.type == AdditionalContent.TYPE_VIDEO:
		context["video_url"] = additional_content.video_url
		site = "mainapp/layer_video.html"
	else:
		context["pictures_array"] = additional_content.pictures_array
		context["textblocks_array"] = additional_content.textblocks_array
		site = "mainapp/layer_images.html"

	return render(request, site, context)
