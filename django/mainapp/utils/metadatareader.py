from hachoir.parser import createParser
from hachoir.core.tools import makePrintable
from hachoir.metadata import extractMetadata
from hachoir.core.i18n import getTerminalCharset
import logging

logger = logging.getLogger('mehr')


class MetadataReader:
	def __init__(self, file):
		parser = createParser(file)

		if not parser:
			logger.error("Unable to parse file")
			exit(1)
		try:
			self.metadata = extractMetadata(parser)
		except Exception as err:
			logger.exception("Metadata extraction error", file, err)
			self.metadata = None
		if not self.metadata:
			logger.error("Unable to extract metadata", file)
			exit(1)

		self.data_string = self.metadata.exportPlaintext()
		charset = getTerminalCharset()
		# print metadata to debug log
		for line in self.data_string:
			logger.debug(makePrintable(line, charset))

	def get_duration(self):
		return self.metadata.get("duration").total_seconds()

	def get_width(self):
		return self.metadata.get("width")

	def get_height(self):
		return self.metadata.get("height")
