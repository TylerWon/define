from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"words", views.WordViewSet)
router.register(r"wordtypes", views.WordTypeViewSet)
router.register(r"worddefinitions", views.WordDefinitionViewSet)

urlpatterns = [
  path('', include(router.urls)),
]
