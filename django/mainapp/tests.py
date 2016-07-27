import unittest
from .utils.screen import Screen, Widget


# Create your tests here.
class ScreenTestCase(unittest.TestCase):
	def setUp(self):
		self.screen = Screen()
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

	def test_valid_position_generation(self):
		(x, y) = self.screen.get_valid_position(20, 20)
		self.assertTrue(80 >= x >= 0)
		self.assertTrue(80 >= y >= 0)
		self.assertTrue(self.screen.test_position(Widget(20, 20, (x, y))))
