def get_all_chapters_duration(chapters):
	return sum(map(lambda x: x.duration, chapters))


def get_global_chapter_progress(current_chapter, chapters, current_time):
	return 100.0 * (current_chapter.start_time + current_time) / get_all_chapters_duration(chapters)
