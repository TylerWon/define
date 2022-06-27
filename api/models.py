from django.conf import settings
from django.db import models

# Model that represents a word
class Word(models.Model):
  id = models.CharField(primary_key=True, max_length=50, editable=False)
  users = models.ManyToManyField(settings.AUTH_USER_MODEL, null=True, blank=True, related_name="words")
  pronunciation = models.CharField(max_length=75)

# Model that represents a type of word (i.e. noun, verb. adjective, etc.)
class WordType(models.Model):
  id = models.CharField(primary_key=True, max_length=25, editable=False)

# Model that represents a word definition
class WordDefinition(models.Model):
  word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="definitions")
  wordType = models.ForeignKey(WordType, on_delete=models.CASCADE, related_name="definitions")
  definition_text = models.CharField(max_length=350)
