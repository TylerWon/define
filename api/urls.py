from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"words", views.WordViewSet)

urlpatterns = [
  path(r'', include(router.urls)),
  path(r'login/', views.LoginView.as_view()),
  path(r'logout/', views.LogoutView.as_view()),
  path(r'password-reset-check/', views.PasswordResetCheckView.as_view()),
  path(r'password-reset-email/', views.PasswordResetEmailView.as_view()),
  path(r'password-reset-update/', views.PasswordResetUpdateView.as_view())
]
