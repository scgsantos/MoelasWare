from django.test import TestCase

from dev.backend.api.models import Login
from dev.backend.api.views import login

# Create your tests here.


class LoginTestCase(TestCase):
    def test_str(self):
        """Test for string representation."""
        login = Login()
        self.assertEqual(str(login), login.email)


class LoginSerializer(TestCase):

    def test_model_fields(self):
        login = Login()
