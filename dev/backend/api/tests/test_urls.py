from django.test import SimpleTestCase
from django.urls import reverse, resolve
from ..views import get_test_view, tests_view


class TestUrls(SimpleTestCase):

    def test_get_test_view_url(self):
        url = reverse('get_test_view', args=['0'])

        self.assertEquals(resolve(url).func, get_test_view)

    def test_tests_view_url(self):
        url = reverse('tests_view')

        self.assertEquals(resolve(url).func, tests_view)
