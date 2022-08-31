from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.template import loader
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Word

from .serializers import UserSerializer, WordSerializer

from .permissions import UserPermissions

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
  #   - PATCH = Update the password of a User
  #
  # Expected data:
  #   - current_password = the User's current password
  #   - new_password = the User's new password
  @action(detail=True, methods=["patch"])
  def password(self, request, pk):
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")

    try:
      user = User.objects.get(pk=pk)
    except:
      return Response({ "detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    if user.check_password(current_password):
      user.set_password(new_password)
      user.save()

      login(request, user)  # log User in after password change, otherwise User is logged out
      
      return Response({ "detail": "Password updated."}, status=status.HTTP_200_OK)
    
    return Response({ "detail": "Password not updated. Provided current password did not match the stored current password." }, status=status.HTTP_400_BAD_REQUEST)
    
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
  #   - GET = Remove a User from a Word whose spelling is pk
  @action(detail=True, methods=["patch"])
  def remove_user(self, request, pk):
    try:
      word = Word.objects.get(spelling=pk)
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

# Supported request methods:
#     - POST = Send a password reset email to a user
class PasswordResetEmailView(APIView):
  permission_classes = [permissions.AllowAny]

  # Expected data:
  #   - email = the email of the user requesting a password reset
  def post(self, request):
    email = request.data.get("email")

    # Verify User exists
    try:
      user = User.objects.get(username=email)
    except:
      return Response({ "message": "User not found." }, status=status.HTTP_400_BAD_REQUEST)
    
    # Prepare data for email
    domain = get_current_site(request).domain
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    subject = "Define - Password reset"

    context = {
      "domain": domain,
      "uid": uid,
      "token": token,
      "user": user
    }
    text_content = loader.render_to_string("emails/password-reset-email.txt", context)
    html_content = loader.render_to_string("emails/password-reset-email.html", context)

    # Create email
    email_message = EmailMultiAlternatives(subject=subject, body=text_content, to=[email])
    email_message.attach_alternative(html_content, "text/html")

    # Send email
    try:
      email_message.send()
    except:
      return Response({ "message": f"Password reset email unable to be sent to {email}."}, status=status.HTTP_400_BAD_REQUEST)

    return Response({ "message": f"Password reset email sent to {email}."}, status=status.HTTP_200_OK)
  
# Supported request methods:
#   - POST = Check if a password reset url is valid
class PasswordResetCheckView(APIView):
  permission_classes = [permissions.AllowAny]

  # Expected data:
  #   - uid = the uid from the password reset url
  #   - token = the token from the password reset url
  def post(self, request):
    uidb64 = request.data.get("uid")
    token = request.data.get("token")

    # Verify uid maps to a User
    try:
      uid = urlsafe_base64_decode(uidb64).decode()
      user = User.objects.get(pk=uid)
    except:
      return Response({ "message": "uid invalid" }, status=status.HTTP_400_BAD_REQUEST)
    
    # Verify token is valid
    # Reference for what makes an invalid token: https://stackoverflow.com/questions/46234627/how-does-default-token-generator-store-tokens
    if not default_token_generator.check_token(user, token):
      return Response({ "message": "token invalid" }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({ "message": "token and uid are valid" }, status=status.HTTP_200_OK)

# Supported request methods:
#   - POST = Updates a User's password to a new password and sends a confirmation email. This view is used only for 
#     password resets (i.e. when the User forgot their password). Normal password updates use a different view.
class PasswordResetUpdateView(APIView):
  permission_classes = [permissions.AllowAny]

  # Expected data:
  #   - new_password = the user's new password
  #   - uid = the uid from the password reset url
  #   - token = the token from the password reset url
  def post(self, request):
    new_password = request.data.get("new_password")
    uidb64 = request.data.get("uid")
    token = request.data.get("token")

    # Verify uid maps to a User
    try:
      uid = urlsafe_base64_decode(uidb64).decode()
      user = User.objects.get(pk=uid)
    except:
      return Response({ "message": "uid invalid" }, status=status.HTTP_400_BAD_REQUEST)
    
    # Verify token is valid
    # Reference for what makes an invalid token: https://stackoverflow.com/questions/46234627/how-does-default-token-generator-store-tokens
    if not default_token_generator.check_token(user, token):
      return Response({ "message": "token invalid" }, status=status.HTTP_400_BAD_REQUEST)
    
    # Update the User's password
    user.set_password(new_password)
    user.save()

    # Prepare data for email
    subject = "Define - Password reset confirmation"
    to_email = user.email

    context = {
      "user": user
    }
    text_content = loader.render_to_string("emails/password-reset-confirmation-email.txt", context)
    html_content = loader.render_to_string("emails/password-reset-confirmation-email.html", context)

    # Create email
    email_message = EmailMultiAlternatives(subject=subject, body=text_content, to=[to_email])
    email_message.attach_alternative(html_content, "text/html")

    # Send email
    try:
      email_message.send()
    except:
      return Response({ "message": f"Password updated but confirmation email unable to be sent to {to_email}."}, status=status.HTTP_200_OK)

    return Response({ "message": f"Password updated and confirmation email sent to {to_email}."}, status=status.HTTP_200_OK)
