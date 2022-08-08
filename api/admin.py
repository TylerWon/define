from django.contrib import admin

from .models import Word

class WordAdmin(admin.ModelAdmin):
  list_display = ["id", "spelling", "word_class"]
  list_filter = ["id", "spelling", "word_class"]

admin.site.register(Word, WordAdmin)
