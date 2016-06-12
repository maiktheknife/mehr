from django.shortcuts import render, get_object_or_404

from django.http import HttpResponse, Http404

from .models import Person


def index(request):
    person_list = Person.objects.all()
    context = {
        "persons": person_list
    }
    return render(request, "mainapp/index.html", context)


def person_view(request, person_id):
    person = get_object_or_404(Person, pk=person_id)
    people = list(map(lambda p: (p, "active" if p.id == int(person_id) else ""), Person.objects.all()))
    context = {
        "person": person,
        "people": people
    }
    return render(request, "mainapp/person.html", context)


def chapter_view(request, person_id, chapter_id):
    person = get_object_or_404(Person, pk=person_id)
    chapter = person.chapter_set.get(id=chapter_id)
    return render(request, "mainapp/chapter.html", {"person": person, "chapter": chapter})


def additional_content(request, person_id, chapter_id, content_id):
    return HttpResponse("this is the page for additional a chapters content.")
