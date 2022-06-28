from django.contrib import admin

from .models import (
  Word,
  Definition,
  Type,
)

admin.site.register(Word)
admin.site.register(Type)
admin.site.register(Definition)
