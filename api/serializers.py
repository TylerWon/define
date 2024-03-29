from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Word

# Serializer for the User model
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = [
      "id",
      "username",
      "email",
      "password",
      "first_name",
      "last_name",
      "is_active",
      "is_staff",
      "is_superuser",
      "last_login",
      "date_joined",
    ]
    read_only_fields = [
      "id",
      "is_staff",
      "is_superuser",
      "last_login",
      "date_joined",
    ]
    extra_kwargs = {
      "password": {
        "write_only": True
      }, 
    }

  # Override default create method (otherwise password not hashed properly)
  def create(self, validated_data):
    user = User.objects.create_user(
            username = validated_data.get("username"),
            email = validated_data.get("email"),
            password = validated_data.get("password"),
            first_name = validated_data.get("first_name"),
            last_name = validated_data.get("last_name"),
          )
    return user

# Serializer for the Word model
class WordSerializer(serializers.ModelSerializer):
  class Meta:
    model = Word
    fields = [
      "id",
      "users",
      "spelling",
      "part_of_speech"
    ]
