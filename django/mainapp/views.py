import logging

from django.shortcuts import render, get_object_or_404, redirect

from .models import Person, AdditionalContent, Menu
from .utils import chapterutils

logger = logging.getLogger('mehr')


def index(request):
	logger.debug('render index page')

	context = {
		"menu": Menu.objects.first(),
		"people": Person.objects.all(),
		"firstID": Person.objects.first().id,
	}
	return render(request, "mainapp/index.html", context)


def person_view_start(request):
	logger.debug('render index page without a person_id')
	first_person = Person.objects.first()
	return redirect("mainapp:personPage", person_id=first_person.id)


def person_view(request, person_id):
	logger.debug('render person page ID: %s' % person_id)

	persons = Person.objects.all()
	person = get_object_or_404(Person, pk=person_id)

	context = {
		"menu": Menu.objects.first(),
		"people": persons,
		"person": person,
	}
	return render(request, "mainapp/person.html", context)


def chapter_view(request, person_id, relative_chapter_id, chapter_time=0):
	logger.debug('render chapter page: PID: %s CID: %s at %s sec.' % (person_id, relative_chapter_id, chapter_time))

	persons = Person.objects.all()
	person = get_object_or_404(Person, pk=person_id)
	chapters = list(person.chapter_set.all())
	chapter = chapters[int(relative_chapter_id)]

	context = {
		"menu": Menu.objects.first(),
		"people": persons,
		"person": person,
		"chapter": chapter,
		"current_time": chapter_time,
		"all_chapters_duration": chapterutils.get_all_chapters_duration(chapters)
	}
	return render(request, "mainapp/chapter.html", context)


def additional_content_view(request, person_id, relative_chapter_id, relative_additional_content_id, chapter_time=0):
	logger.debug('render additional page: PID: %s CID: %s at %s sec. AID: %s' % (person_id, relative_chapter_id, chapter_time, relative_additional_content_id))

	persons = Person.objects.all()
	person = get_object_or_404(Person, pk=person_id)
	chapters = list(person.chapter_set.all())
	chapter = chapters[int(relative_chapter_id)]

	additional_content = list(chapter.additionalcontent_set.all())[int(relative_additional_content_id)]

	context = {
		"menu": Menu.objects.first(),
		"people": persons,
		"person": person,
		"chapter": chapter,
		"layer": additional_content,
		"current_time": chapter_time,
		"chapter_progress": chapterutils.get_global_chapter_progress(chapter, chapters, int(chapter_time)),
	}

	if additional_content.type == AdditionalContent.TYPE_VIDEO:
		context["video"] = additional_content.video
		site = "mainapp/layer_video.html"
	elif additional_content.type == AdditionalContent.TYPE_MISC:
		site = "mainapp/layer_mix.html"
	else:
		site = "mainapp/layer_gallery.html"

	return render(request, site, context)
