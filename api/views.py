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
  DefinitionSerializer,
  TypeSerializer,
  UserSerializer,
  WordSerializer,
  WordAndDefinitionsSerializer,
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
  #   - GET = Retrieve the Words of a User
  @action(detail=True, methods=["get"])
  def words(self, request, pk):
    words = Word.objects.filter(users=pk)

    serializer = WordSerializer(words, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

  # Supported request methods:
  #   - GET = Retrieve the Words (and their Definitions) of a User
  @action(detail=True, methods=["get"])
  def words_and_definitions(self, request, pk):
    words = Word.objects.filter(users=pk)

    serializer = WordAndDefinitionsSerializer(words, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
  
   # Supported request methods:
  #   - GET = Update the password of a User
  @action(detail=True, methods=["patch"])
  def password(self, request, pk):
    try:
      user = User.objects.get(pk=pk)
    except:
      return Response({ "detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")

    if user.check_password(old_password):
      user.set_password(new_password)
      user.save()

      login(request, user)  # log User in after password change, otherwise User is logged out
      
      return Response({ "detail": "Password updated."}, status=status.HTTP_200_OK)
    
    return Response({ "detail": "Password not updated. Old password does match new password."}, status=status.HTTP_400_BAD_REQUEST)
    
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
  #   - GET = Retrieve the Definitions of a Word
  @action(detail=True, methods=["get"])
  def definitions(self, request, pk):
    definitions = Definition.objects.filter(word=pk)

    serializer = DefinitionSerializer(definitions, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

  # Supported request methods:
  #   - GET = Add a User to a Word whose spelling is pk
  @action(detail=True, methods=["patch"])
  def add_user(self, request, pk):
    try:
      word = Word.objects.get(spelling=pk)
    except:
      return Response({ "detail": "Word not found."}, status=status.HTTP_404_NOT_FOUND)

    try:
      user = User.objects.get(pk=request.data["user"])
    except:
      return Response({ "detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
    word.users.add(user)

    serializer = WordSerializer(word)

    return Response(serializer.data, status=status.HTTP_200_OK)

  # Supported request methods:
  #   - GET = Remove a User from a Word
  @action(detail=True, methods=["patch"])
  def remove_user(self, request, pk):
    try:
      word = Word.objects.get(pk=pk)
    except:
      return Response({ "detail": "Word not found."}, status=status.HTTP_404_NOT_FOUND)

    try:
      user = User.objects.get(pk=request.data["user"])
    except:
      return Response({ "detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
    if word.users.contains(user):
      word.users.remove(user)
      word.save()

      serializer = WordSerializer(word)

      return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({ "detail": "The User is not associated with the Word"}, status=status.HTTP_400_BAD_REQUEST)

# Supported request methods:
#   - POST = Create a Word and its Definitions
class WordAndDefinitionsViewSet(viewsets.ModelViewSet):
  queryset = Word.objects.all()
  serializer_class = WordAndDefinitionsSerializer
  permission_classes = [permissions.AllowAny]
  http_method_names = ["post"]

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
  #   - GET = Retrieve the Definitions for a Type
  @action(detail=True, methods=["get"])
  def definitions(self, request, pk):
    definitions = Definition.objects.filter(type=pk)

    serializer = DefinitionSerializer(definitions, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

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

      serializer = UserSerializer(user)

      return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({ "detail": "Login unsuccessful. Invalid credentials." }, status=status.HTTP_400_BAD_REQUEST)
  
# Supported request methods:
#   - GET = Log a User out
class LogoutView(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request):
    logout(request)

    return Response({ "detail": "Logout successful."}, status=status.HTTP_200_OK)
