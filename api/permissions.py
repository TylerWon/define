from rest_framework import permissions

class UserPermissions(permissions.BasePermission):
  
  def has_permission(self, request, view):
    if view.action in ["retrieve", "list", "create"]:
      return True
    elif view.action in ["update", "partial_update"]:
      return request.user.is_authenticated
    else:
      return False
