from django.contrib import admin

from .models import (
  Word,
  Definition,
  Type,
)

class WordAdmin(admin.ModelAdmin):
  list_display = ["id", "spelling"]
  list_filter = ["id", "spelling"]

class TypeAdmin(admin.ModelAdmin):
  list_display = ["id", "name"]
  list_filter = ["id", "name"]

class DefinitionAdmin(admin.ModelAdmin):
  list_display = ["id", "word", "type"]
  list_filter = ["id", "word", "type"]

admin.site.register(Word, WordAdmin)
admin.site.register(Type, TypeAdmin)
admin.site.register(Definition, DefinitionAdmin)
