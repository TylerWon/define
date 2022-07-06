from django.conf import settings
from django.db import models

# Model that represents a word
class Word(models.Model):
  users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="words")
  spelling = models.CharField(unique=True, max_length=50)
  pronunciation = models.CharField(max_length=75)

  def __str__(self):
    return self.spelling

# Model that represents a type of word (i.e. noun, verb. adjective, etc.)
class Type(models.Model):
  name = models.CharField(unique=True, max_length=25)

  def __str__(self):
    return self.name

# Model that represents a word definition
class Definition(models.Model):
  word = models.ForeignKey(Word, on_delete=models.CASCADE, null=True, blank=True, related_name="word_definitions")
  type = models.ForeignKey(Type, on_delete=models.CASCADE, related_name="type_definitions")
  definition_text = models.CharField(max_length=350)
