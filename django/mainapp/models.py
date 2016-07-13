from django.db import models
from .utils.metadatareader import MetadataReader
from .utils.pathutil import *


class Person(models.Model):
	PREVIEW_TYPE_VIDEO = 0
	PREVIEW_TYPE_IMAGES = 1

	name = models.CharField(max_length=100)
	twitter_account = models.URLField(max_length=255)
	type_choices = (
		(PREVIEW_TYPE_VIDEO, "Video"), (PREVIEW_TYPE_IMAGES, "Images")
	)
	preview_type = models.IntegerField(choices=type_choices)
	preview_text = models.TextField(max_length=300)
	preview_video = models.FileField(null=True, blank=True, upload_to=user_preview_video_path)

	def get_relative_id(self):
		return Person.objects.filter(id__lt=self.id).count()

	def get_next(self):
		next_persons = Person.objects.filter(id__gt=self.id)

		if next_persons:
			return next_persons.first()
		elif Person.objects.count() > 1:
			return Person.objects.first()
		else:
			return False

	def get_previous(self):
		previous_persons = Person.objects.filter(id__lt=self.id).order_by('-id')

		if previous_persons:
			return previous_persons.first()
		elif Person.objects.count() > 1:
			return Person.objects.last()
		else:
			return False

	def get_images(self):
		return self.image_set.all()

	def get_images_count(self):
		return self.image_set.count()

	def get_chapter_count(self):
		return self.chapter_set.count()

	def get_first_chapter(self):
		return self.chapter_set.first()

	def __str__(self):
		return self.name

	# Admin Page Anpassungen
	get_images_count.short_description = 'Bilder'
	get_chapter_count.short_description = 'Chapter'


class Chapter(models.Model):
	name = models.CharField(max_length=100)
	video = models.FileField(null=True, upload_to=user_chapter_path)
	duration = models.FloatField(default=0, editable=False)
	start_time = models.FloatField(default=0, editable=False)
	# the index shouldn't be needed if we demand the chapters to be uploaded in order
	index = models.IntegerField()  # add uniqueness is combination with the person
	preview_text = models.CharField(max_length=300)
	preview_image = models.ImageField(upload_to=user_chapter_path)

	person = models.ForeignKey(Person, on_delete=models.CASCADE)

	def save(self, *args, **kwargs):
		# save first, so we can work with the uploaded file
		super(Chapter, self).save(*args, **kwargs)

		metadata = MetadataReader(self.video.path)
		self.duration = metadata.get_duration()

		previous_chapters = self.person.chapter_set.filter(id__lt=self.id).order_by('-id')
		if previous_chapters:
			chapter = previous_chapters.first()
			self.start_time = chapter.start_time + chapter.duration

		# there might be a better solution than resaving.
		super(Chapter, self).save(*args, **kwargs)

	def get_relative_id(self):
		return self.person.chapter_set.filter(id__lt=self.id).count()

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

	def get_additional_count(self):
		return self.additionalcontent_set.count()

	def __str__(self):
		return "Chapter {} of {}; start: {}; duration: {}".format(self.index, self.person, self.start_time, self.duration)

	get_additional_count.short_description = 'Ebenen'


class AdditionalContent(models.Model):
	TYPE_VIDEO = 0
	TYPE_IMAGES = 1

	index = models.IntegerField()
	name = models.CharField(max_length=30)
	type_choices = (
		(TYPE_VIDEO, "Video"), (TYPE_IMAGES, "Images and Text")
	)
	type = models.IntegerField(choices=type_choices)

	chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)

	# Videos
	video = models.FileField(null=True, upload_to=user_chapter_layer_path)
	# Image and Text
	pictures_array = models.CharField(max_length=255, blank=True)
	textblocks_array = models.CharField(max_length=1000, blank=True)

	def get_relative_id(self):
		return self.chapter.additionalcontent_set.filter(id__lt=self.id).count()

	def __str__(self):
		return "Additional Content {} for {}".format(self.id, self.chapter)


class Image(models.Model):
	person = models.ForeignKey(Person, on_delete=models.CASCADE)
	image = models.ImageField(upload_to=user_preview_images_path)

	def __str__(self):
		return "%s -> %s" % (self.person.name, self.image)
