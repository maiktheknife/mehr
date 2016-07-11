from django.shortcuts import render, get_object_or_404, redirect
from django.conf import settings
from os import listdir
from os.path import join

from .models import Person, AdditionalContent


def index(request):
	path = join(settings.BASE_DIR, 'mainapp', 'static', 'mainapp', 'images', 'index')
	# i am ugly
	images = list(map(lambda x: join(settings.STATIC_URL, 'mainapp', 'images', 'index', x).replace('\\', '/'), listdir(path)))
	context = {
		"people": Person.objects.all(),
		"firstID": Person.objects.first().id,
		"images": images
	}
	return render(request, "mainapp/index.html", context)


def person_view_start(request):
	first_person = Person.objects.first()
	return redirect("mainapp:personPage", person_id=first_person.id)


def person_view(request, person_id):
	persons = Person.objects.all()
	person = get_object_or_404(Person, pk=person_id)

	context = {
		"people": persons,
		"person": person,
		#"index": index,
	}
	return render(request, "mainapp/person.html", context)


def chapter_view(request, person_id, relative_chapter_id):
	persons = Person.objects.all()
	person = get_object_or_404(Person, pk=person_id)
	chapters = list(person.chapter_set.all())
	chapter = chapters[int(relative_chapter_id)]

	context = {
		"people": persons,
		"person": person,
		"chapter": chapter,
	}
	return render(request, "mainapp/chapter.html", context)


def additional_content_view(request, person_id, relative_chapter_id, relative_additional_content_id):
	person = get_object_or_404(Person, pk=person_id)
	chapter = list(person.chapter_set.all())[int(relative_chapter_id)]

	additional_content = list(chapter.additionalcontent_set.all())[int(relative_additional_content_id)]

	context = {
		"person": person,
		"chapter": chapter,
		"layer": additional_content
	}

	if additional_content.type == AdditionalContent.TYPE_VIDEO:
		context["video"] = additional_content.video
		site = "mainapp/layer_video.html"
	else:
		context["pictures_array"] = additional_content.pictures_array
		context["textblocks_array"] = additional_content.textblocks_array
		site = "mainapp/layer_images.html"

	return render(request, site, context)
