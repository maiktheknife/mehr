from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from .utils.metadatareader import MetadataReader
from .utils.pathutil import *
from .utils.screen import Screen, Widget


class SocialMediaPlatform(models.Model):
	icon = models.ImageField(upload_to=icons_path)
	url = models.CharField(max_length=255, unique=True)

	def __str__(self):
		return self.url


class Intro(models.Model):
	video = models.FileField()
	text = models.TextField(max_length=100, blank=True)


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
		return "{} ({})".format(self.name, self.id)

	# Admin Page Anpassungen
	get_images_count.short_description = '#Bilder'
	get_chapter_count.short_description = '#Chapter'


class Chapter(models.Model):
	name = models.CharField(max_length=100)
	video = models.FileField(null=True, upload_to=user_chapter_path)
	duration = models.FloatField(default=0, editable=False)
	start_time = models.FloatField(default=0, editable=False)
	additional_content_signal_time = models.FloatField(default=0)

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
		return "{}; Chapter {}: {}".format(self.person, self.get_relative_id(), self.name)

	get_additional_count.short_description = 'Ebenen'


class AdditionalContent(models.Model):
	TYPE_VIDEO = 0
	TYPE_MISC = 1
	TYPE_GALLERY = 2

	name = models.CharField(max_length=30)
	description = models.CharField(max_length=300)
	image = models.ImageField(upload_to=user_chapter_layer_path)

	type_choices = (
		(TYPE_VIDEO, "Video"),  # eingabe des video attr
		(TYPE_MISC, "Stuff"),  # eingabe des ambient_music attr und AdditionalContentElementsInline
		(TYPE_GALLERY, "Gallery")  # eingabe der AdditionalContentGalleryInline
	)

	type = models.IntegerField(choices=type_choices)
	chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)

	video = models.FileField(null=True, blank=True, upload_to=user_chapter_layer_path)
	ambient_music = models.FileField(null=True, blank=True, upload_to=user_chapter_layer_path, default=None)

	def get_relative_id(self):
		return self.chapter.additionalcontent_set.filter(id__lt=self.id).count()

	def get_next(self):
		next_layers = self.chapter.additionalcontent_set.filter(id__gt=self.id)
		if next_layers:
			return next_layers.first()
		return False

	def get_previous(self):
		previous_layers = self.chapter.additionalcontent_set.filter(id__lt=self.id).order_by('-id')
		if previous_layers:
			return previous_layers.first()
		return False

	def __str__(self):
		type_string = self.type_choices[int(self.type)][1]
		return "{}; Layer {} ({})".format(self.chapter, self.get_relative_id(), type_string)


class AdditionalContentElement(models.Model):
	TYPE_VIDEO = 0
	TYPE_IMAGE = 1
	TYPE_TEXT = 2
	TYPE_VIDEO_TEXT = 3
	TYPE_IMAGE_TEXT = 4

	type_choices = (
		(TYPE_VIDEO, "Video"), (TYPE_IMAGE, "Image"), (TYPE_TEXT, "Text"),
		(TYPE_VIDEO_TEXT, "Video and text"), (TYPE_IMAGE_TEXT, "Image and text"),
	)

	type = models.IntegerField(choices=type_choices)

	position_x = models.FloatField(default=0, editable=False)
	position_y = models.FloatField(default=0, editable=False)
	width = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(100.0)])
	height = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(100.0)])
	frontend_id = models.CharField(max_length=30, default="", editable=False)
	first_video_flag = models.BooleanField(default=False, editable=False)

	additional_content = models.ForeignKey(AdditionalContent, on_delete=models.CASCADE)

	video = models.FileField(upload_to=user_additional_content_images_path, null=True, blank=True)
	image = models.ImageField(upload_to=user_additional_content_images_path, null=True, blank=True)
	text = models.TextField(max_length=1000, null=True, blank=True)

	def get_position(self):
		return self.position_x, self.position_y

	def get_size(self):
		return self.width, self.height

	def get_autoplay(self):
		if self.first_video_flag:
			return "autoplay"
		else:
			return ""

	def save(self, *args, **kwargs):
		elements = self.additional_content.additionalcontentelement_set.all()
		if self.type == 0 or self.type == 3:
			self.first_video_flag = True not in map(lambda x: x.first_video_flag, elements)

		screen = Screen()
		for element in elements:
			screen.add_widget(Widget(element.width, element.height, (element.position_x, element.position_y)))

		(self.position_x, self.position_y) = screen.get_valid_position(self.width, self.height)
		self.frontend_id = "layer-mix-element-" + str(len(elements))

		super(AdditionalContentElement, self).save(*args, **kwargs)

	def __str__(self):
		type_string = self.type_choices[int(self.type)][1]
		return "{}; Element {} ({})".format(self.additional_content, self.id, type_string)


class SocialMediaLink(models.Model):
	platform = models.ForeignKey(SocialMediaPlatform)
	additional_content_element = models.ForeignKey(AdditionalContentElement, on_delete=models.CASCADE)
	link = models.CharField(max_length=255)


class Image(models.Model):
	person = models.ForeignKey(Person, on_delete=models.CASCADE)
	image = models.ImageField(upload_to=user_preview_images_path)

	def __str__(self):
		return "%s -> %s" % (self.person.name, self.image)


class GalleryImage(models.Model):
	additional_content = models.ForeignKey(AdditionalContent, on_delete=models.CASCADE)
	image = models.ImageField(upload_to=user_additional_content_images_path)
