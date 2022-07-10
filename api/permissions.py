from rest_framework import permissions

class UserPermissions(permissions.BasePermission):
  
  def has_permission(self, request, view):
    if view.action in ["words_and_definitions", "words", "retrieve", "list", "create"]:
      return True
    elif view.action in ["password", "update", "partial_update"]:
      return request.user.is_authenticated
    else:
      return False
