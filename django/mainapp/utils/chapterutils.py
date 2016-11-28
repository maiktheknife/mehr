import logging

logger = logging.getLogger('mehr')


def get_all_chapters_duration(chapters):
	return sum(map(lambda x: x.duration, chapters))


def get_global_chapter_progress(current_chapter, chapters, current_time):
	all_chapters_duration = get_all_chapters_duration(chapters)
	logger.debug('get_global_chapter_progress %s %s' % (current_chapter, current_time))

	if all_chapters_duration != 0:
		return 100.0 * (current_chapter.start_time() + current_time) / all_chapters_duration
	else:
		return 0
