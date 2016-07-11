from django.db import models
from .utils.metadatareader import MetadataReader


class Person(models.Model):
	name = models.CharField(max_length=100)
	preview_text = models.TextField(max_length=300)
	twitter_account = models.URLField(max_length=255)

	def get_relative_id(self):
		return Person.objects.filter(id__lt=self.id).count()

	def get_next(self):
		next_persons = Person.objects.filter(id__gt=self.id)
		if next_persons:
			return next_persons.first()
		else:
			return Person.objects.first()

	def get_previous(self):
		previous_persons = Person.objects.filter(id__lt=self.id).order_by('-id')
		if previous_persons:
			return previous_persons.first()
		else:
			return Person.objects.last()

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
	# What is wrong with you python,
	# order counts, but without forward declaration
	def user_video_path(self, file_name):
		# file will be uploaded to MEDIA_ROOT/video/name/
		return 'videos/{0}/{1}'.format(self.person.name, file_name)

	name = models.CharField(max_length=100)
	video = models.FileField(null=True, upload_to=user_video_path)
	duration = models.FloatField(default=0, editable=False)
	start_time = models.FloatField(default=0, editable=False)
	# the index shouldn't be needed if we demand the chapters to be uploaded in order
	index = models.IntegerField()  # add uniqueness is combination with the person
	preview_text = models.CharField(max_length=300)
	preview_image = models.ImageField()

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

	def user_video_path(self, file_name):
		return 'videos/{0}/{1}/{2}'.format(self.chapter.person.name, self.chapter.id, file_name)

	chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)

	# Videos
	video = models.FileField(null=True, upload_to=user_video_path)
	# Image and Text
	pictures_array = models.CharField(max_length=255, blank=True)
	textblocks_array = models.CharField(max_length=1000, blank=True)

	def get_relative_id(self):
		return self.chapter.additionalcontent_set.filter(id__lt=self.id).count()

	def __str__(self):
		return "Additional Content {} for {}".format(self.id, self.chapter)


class Image(models.Model):
	person = models.ForeignKey(Person, on_delete=models.CASCADE)

	def user_image_path(self, file_name):
		# file will be uploaded to MEDIA_ROOT/images/name/
		return 'images/{0}/{1}'.format(self.person.name, file_name)

	image = models.ImageField(upload_to=user_image_path)

	def __str__(self):
		return "%s -> %s" % (self.person.name, self.image)
