from django.db import models
from django.conf import settings
from os import listdir
from os.path import join


# Create your models here.
class Person(models.Model):
	name = models.CharField(max_length=100)
	preview_text = models.TextField(max_length=300)
	twitter_account = models.URLField(max_length=255)

	def get_next(self):
		next_persons = Person.objects.filter(id__gt=self.id)
		if next_persons:
			return next_persons.first()
		return False

	def get_previous(self):
		previous_persons = Person.objects.filter(id__lt=self.id).order_by('-id')
		if previous_persons:
			return previous_persons.first()
		return False

	def get_images(self):
		return self.image_set.all()

	def __str__(self):
		return self.name


class Chapter(models.Model):
	index = models.IntegerField()  # add uniqueness is combination with the person
	video_url = models.CharField(max_length=255)
	start_time = models.IntegerField()

	person = models.ForeignKey(Person, on_delete=models.CASCADE)

	def get_next(self):
		next_chapters = self.person.chapter_set.filter(id__gt=self.id)
		if next_chapters:
			return next_chapters.first()
		return False

	def get_previous(self):
		previous_chapters = self.person.chapter_set.filter(id__lt=self.id).order_by('-id')
		if previous_chapters:
			return previous_chapters.first()
		return False

	def __str__(self):
		return "Chapter {} of {}".format(self.index, self.person)


class AdditionalContent(models.Model):
	index = models.IntegerField()
	video_url = models.CharField(max_length=255)

	chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)

	def __str__(self):
		return "Additional Content {} for {}".format(self.index, self.chapter)


class Page(models.Model):
	pictures_array = models.CharField(max_length=255)
	textblocks_array = models.CharField(max_length=1000)

	additional_content = models.ForeignKey(AdditionalContent, on_delete=models.CASCADE)

	def __str__(self):
		return "Page as {}".format(self.additional_content)


class Image(models.Model):
	person = models.ForeignKey(Person, on_delete=models.CASCADE)

	def user_directory_path(self, file_name):
		# file will be uploaded to MEDIA_ROOT/images/name/
		return 'images/{0}/{1}'.format(self.person.name, file_name)

	image = models.ImageField(upload_to=user_directory_path)

	def __str__(self):
		return "%s -> %s" % (self.person.name, self.image)
