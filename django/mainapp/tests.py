import unittest
from .utils.screen import Screen, Widget
from random import random


# Create your tests here.
class CollisionDetectionTestCase(unittest.TestCase):
	def setUp(self):
		self.screen = Screen(3)
		self.screen.add_widget(Widget(30, 30, (20, 20)))
		self.screen.add_widget(Widget(20, 40, (70, 40)))

	def test_new_box_inside_other(self):
		self.assertFalse(self.screen.test_position(Widget(10, 10, (30, 30))))
		self.assertFalse(self.screen.test_position(Widget(10, 20, (80, 60))))

	def test_new_box_intersects(self):
		self.assertFalse(self.screen.test_position(Widget(20, 20, (60, 30))))

	def test_new_box_does_not_collide(self):
		self.assertTrue(self.screen.test_position(Widget(10, 20, (80, 10))))
		self.assertTrue(self.screen.test_position(Widget(10, 20, (30, 60))))
		self.assertTrue(self.screen.test_position(Widget(10, 20, (100, 60))))


class ScreenTestCase(unittest.TestCase):
	def setUp(self):
		self.screen = Screen(3)
		self.screen.add_widget(Widget(30, 30, (10, 10)))
		self.screen.add_widget(Widget(40, 10, (50, 20)))
		self.screen.add_widget(Widget(50, 10, (20, 50)))
		self.screen.add_widget(Widget(10, 60, (80, 40)))

		self.screen.add_widget(Widget(30, 50, (30, 20)))

	def test_valid_position_generation(self):
		# widget = Widget(30, 10)
		# widget.position = self.screen.get_valid_position(widget.width, widget.height)
		# print(widget)
		# self.assertTrue(3 < widget.position[0] < 67 and 3 < widget.position[1])
		# self.assertTrue(self.screen.test_position(widget))

		for i in range(100):
			widget = Widget(random() * 80, random() * 80)
			widget.position = self.screen.get_valid_position(widget.width, widget.height)
			print(widget)
			min_x_position = self.screen.margin
			max_x_position = 100 - widget.width - self.screen.margin
			min_y_position = self.screen.margin
			self.assertTrue(min_x_position < widget.position[0] < max_x_position and min_y_position < widget.position[1])
			self.assertTrue(widget.position[0] + widget.width < 100 - self.screen.margin)
			self.assertTrue(self.screen.test_position(widget))
