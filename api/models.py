from django.conf import settings
from django.db import models

# Model that represents a word
class Word(models.Model):
  users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="words")
  spelling = models.CharField(unique=True, max_length=50)
  word_class = models.CharField(max_length=25)
