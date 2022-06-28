from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
  Word,
  WordDefinition,
  WordType,
)

from .serializers import (
  UserSerializer,
  WordSerializer,
  WordDefinitionSerializer,
  WordTypeSerializer,
)

from .permissions import (
  UserPermissions,
)

# Supported request methods:
#   - GET = List all Users/retrieve a User
#   - POST = Create a User and log them in
#   - PUT = Update all fields of a User
#   - PATCH = Update some fields of a User
class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [UserPermissions]
  http_method_names = ["get", "post", "put", "patch"] # define supported request methods

  # Override default create method to log in User after being created
  def create(self, request):
    serializer = self.serializer_class(data=request.data)

    if serializer.is_valid():
      user = serializer.save()
      login(request, user)

      # Serializer User model object for output
      serializer = UserSerializer(user)

      return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Supported request methods:
#   - GET = List all Words/retrieve a Word
#   - POST = Create a Word
#   - PUT = Update all fields of a Word
#   - PATCH = Update some fields of a Word
#   - DELETE = Delete a Word
class WordViewSet(viewsets.ModelViewSet):
  queryset = Word.objects.all()
  serializer_class = WordSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Supported request methods:
#   - GET = List all WordTypes/retrieve a WordType
#   - POST = Create a WordType
#   - PUT = Update all fields of a WordType
#   - PATCH = Update some fields of a WordType
#   - DELETE = Delete a WordType
class WordTypeViewSet(viewsets.ModelViewSet):
  queryset = WordType.objects.all()
  serializer_class = WordTypeSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Supported request methods:
#   - GET = List all WordDefinitions/retrieve a WordDefinition
#   - POST = Create a WordDefinition
#   - PUT = Update all fields of a WordDefinition
#   - PATCH = Update some fields of a WordDefinition
#   - DELETE = Delete a WordDefinition
class WordDefinitionViewSet(viewsets.ModelViewSet):
  queryset = WordDefinition.objects.all()
  serializer_class = WordDefinitionSerializer
  # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
