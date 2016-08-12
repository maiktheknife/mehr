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

	def __str__(self):
		return "pos: {:5.2f}, {:6.2f} | size: {:5.2f} * {:5.2f}".format(self.position[0], self.position[1], self.width, self.height)


class PositionGenerator:
	def __init__(self, step_size, free_space):
		self.step_size = step_size
		self.free_space = free_space

	def generate_position(self, widget):
		# maybe throw an exception if the width is > 100 - 2 * free_space (the widget would be to wide)

		if 100 - 2 * self.free_space - widget.position[0] - widget.width > 0:
			random_range = min(self.step_size, 100 - 2 * self.free_space - widget.position[0] - widget.width)
			x_pos = widget.position[0] + self.free_space + random() * random_range
		else:
			random_range = min(self.step_size, 100 - 2 * self.free_space - widget.width)
			x_pos = self.free_space + random() * random_range

		y_pos = widget.position[1] + self.free_space + random() * self.step_size

		return x_pos, y_pos


class Screen:
	def __init__(self, margin):
		self.widgets = []
		self.margin = margin

	def add_widget(self, widget):
		self.widgets.append(widget)

	def get_valid_position(self, width, height):
		position_generator = PositionGenerator(10, self.margin)

		widget = Widget(width, height)
		widget.position = position_generator.generate_position(widget)

		while not self.test_position(widget):
			widget.position = position_generator.generate_position(widget)

		return widget.position

	def test_position(self, widget):
		return True not in map(lambda x: detect_widget_collision(widget, x), self.widgets)
