from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import (
  Word,
  Definition,
  Type,
)

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

  # Override default update method (otherwise password not hashed properly)
  def update(self, instance, validated_data):
    instance.username = validated_data.get("username", instance.username)
    instance.email = validated_data.get("email", instance.email)
    instance.password = make_password(validated_data.get("password", instance.password))
    instance.first_name = validated_data.get("first_name", instance.first_name)
    instance.last_name = validated_data.get("last_name", instance.last_name)

    instance.save()

    return instance

# Serializer for the Word model
class WordSerializer(serializers.ModelSerializer):
  class Meta:
    model = Word
    fields = [
      "id",
      "users",
      "spelling",
      "pronunciation",
    ]

# Serializer for the Type model
class TypeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Type
    fields = [
      "id",
      "name",
    ]

# Serializer for the Definition model
class DefinitionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Definition
    fields = [
      "id",
      "word",
      "type",
      "definition_text",
    ]
