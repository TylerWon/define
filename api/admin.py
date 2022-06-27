from django.contrib import admin

from .models import (
  Word,
  WordDefinition,
  WordType,
)

admin.site.register(Word)
admin.site.register(WordType)
admin.site.register(WordDefinition)
