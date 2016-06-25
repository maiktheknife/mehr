from hachoir.parser import createParser
from hachoir.core.tools import makePrintable
from hachoir.metadata import extractMetadata
from hachoir.core.i18n import getTerminalCharset
from sys import stderr, exit


class MetadataReader:
	def __init__(self, file):
		parser = createParser(file)

		if not parser:
			print("Unable to parse file", file=stderr)
			exit(1)
		try:
			self.metadata = extractMetadata(parser)
		except Exception as err:
			print("Metadata extraction error: %s" % err, file=stderr)
			self.metadata = None
		if not self.metadata:
			print("Unable to extract metadata", file=stderr)
			exit(1)

		self.data_string = self.metadata.exportPlaintext()
		charset = getTerminalCharset()
		for line in self.data_string:
			print(makePrintable(line, charset))

	def get_duration(self):
		return self.metadata.get("duration").total_seconds()

	def get_width(self):
		return self.metadata.get("width")

	def get_height(self):
		return self.metadata.get("height")
