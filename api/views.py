from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
  Word,
  Definition,
  Type,
)

from .serializers import (
  UserSerializer,
  WordSerializer,
  DefinitionSerializer,
  TypeSerializer,
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
#   - GET = List all Types/retrieve a Type
#   - POST = Create a Type
#   - PUT = Update all fields of a Type
#   - PATCH = Update some fields of a Type
#   - DELETE = Delete a Type
class TypeViewSet(viewsets.ModelViewSet):
  queryset = Type.objects.all()
  serializer_class = TypeSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Supported request methods:
#   - GET = List all Definitions/retrieve a Definition
#   - POST = Create a Definition
#   - PUT = Update all fields of a Definition
#   - PATCH = Update some fields of a Definition
#   - DELETE = Delete a Definition
class DefinitionViewSet(viewsets.ModelViewSet):
  queryset = Definition.objects.all()
  serializer_class = DefinitionSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Supported request methods:
#   - POST = Log a User in
class LoginView(APIView):
  permission_classes = [permissions.AllowAny]

  # Expected request data:
  #   - email
  #   - password
  def post(self, request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(request, username=email, password=password)

    if user is not None:
      login(request, user)

      return Response({ "message": "Login successful" }, status=status.HTTP_200_OK)
    
    return Response({ "message": "Login unsuccessful. Invalid credentials." }, status=status.HTTP_400_BAD_REQUEST)
  
# Supported request methods:
#   - GET = Log a User out
class LogoutView(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request):
    logout(request)

    return Response({ "message": "Logout successful."}, status=status.HTTP_200_OK)
