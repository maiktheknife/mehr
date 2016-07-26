from random import random

def widgets_separated(widget1, widget2):
	elem1_pos_x = widget1.position[0]
	elem1_pos_y = widget1.position[1]
	elem2_pos_x = widget2.position[0]
	elem2_pos_y = widget2.position[1]

	# TODO implement collision detection

	return True


class Widget:
	def __init__(self, width, height, position=(0, 0)):
		self.position = position
		self.width = width
		self.height = height


class Screen:
	def __init__(self):
		self.widgets = []

	def add_widget(self, widget):
		self.widgets.append(widget)

	def get_valid_position(self, width, height):
		valid_position_found = False

		widget = Widget(width, height)
		while not valid_position_found:
			widget.position = (random() * (100 - width), random() * (100 - height))

			if self.test_position(widget):
				valid_position_found = True

		return widget.position

	def test_position(self, widget):
		return False not in map(lambda x: widgets_separated(widget, x), self.widgets)