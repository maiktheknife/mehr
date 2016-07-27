from random import random


def possible_collision_on_axis(widget1, widget2, axis_id):
	if widget1.position[axis_id] < widget2.position[axis_id]:
		first_widget = widget1
		second_widget = widget2
	else:
		first_widget = widget2
		second_widget = widget1

	if axis_id == 0:
		return first_widget.position[axis_id] + first_widget.width >= second_widget.position[axis_id]
	else:
		return first_widget.position[axis_id] + first_widget.height >= second_widget.position[axis_id]


def detect_widget_collision(widget1, widget2):
	return possible_collision_on_axis(widget1, widget2, 0) and possible_collision_on_axis(widget1, widget2, 1)


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
		return True not in map(lambda x: detect_widget_collision(widget, x), self.widgets)
