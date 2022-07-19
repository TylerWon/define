from django.urls import path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    re_path(r'.*', TemplateView.as_view(template_name='index/index.html')), # Put other paths before this one otherwise this path will take precedence
]
