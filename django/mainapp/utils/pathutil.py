def user_preview_video_path(person, file_name):
	return '{0}/preview_video/{1}'.format(person.name, file_name)


def user_chapter_path(chapter, file_name):
	return '{0}/chapter/{1}/{2}'.format(chapter.person.name, chapter.id, file_name)


def user_chapter_layer_path(layer, file_name):
	return '{0}/chapter/{1}/{2}/{3}'.format(layer.chapter.person.name, layer.chapter.id, layer.id, file_name)


def user_preview_images_path(image, file_name):
	return '{0}/preview_images/{1}'.format(image.person.name, file_name)


def user_additional_content_images_path(image, file_name):
	return '{0}/chapter/{1}/additional_content/images/{2}'.format(
		image.additional_content.chapter.person.name,
		image.additional_content.chapter.id,
		file_name
	)
