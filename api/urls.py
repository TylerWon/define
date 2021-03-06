from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"definitions", views.DefinitionViewSet)
router.register(r"word_and_definitions", views.WordAndDefinitionsViewSet)
router.register(r"types", views.TypeViewSet)
router.register(r"users", views.UserViewSet)
router.register(r"words", views.WordViewSet)

urlpatterns = [
  path(r'', include(router.urls)),
  path(r'login/', views.LoginView.as_view()),
  path(r'logout/', views.LogoutView.as_view()),
]
