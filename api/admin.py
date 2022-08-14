from django.contrib import admin

from .models import Word

class WordAdmin(admin.ModelAdmin):
  list_display = ["id", "spelling", "part_of_speech"]
  list_filter = ["id", "spelling", "part_of_speech"]

admin.site.register(Word, WordAdmin)
