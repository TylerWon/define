"""
Django settings for define project.

Generated by 'django-admin startproject' using Django 4.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from pathlib import Path

import dj_database_url
import os

# Constants that indicate the environment the application is running in (production or development)
PROD = os.environ['ENV_TYPE'] == "prod"
DEV = os.environ['ENV_TYPE'] == "dev"


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')


if PROD:
    DEBUG = False
elif DEV:
    DEBUG = True


if PROD:
    ALLOWED_HOSTS = ['define-production.herokuapp.com']
elif DEV:
    ALLOWED_HOSTS = ['*']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'frontend',
    'api',
    'rest_framework',
    'webpack_loader',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'define.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'define.wsgi.application'


# Database
# In production, connect to Heroku Postgres (reference: https://devcenter.heroku.com/articles/connecting-heroku-postgres#connecting-in-python)
# In dev, connect to Docker Postgres service
if PROD:
    DATABASES = {}
    DATABASES['default'] = dj_database_url.config(conn_max_age=600)
elif DEV:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ['DEV_DB_NAME'],
            'USER': os.environ['DEV_DB_USERNAME'],
            'PASSWORD': os.environ['DEV_DB_PASSWORD'],
            'HOST': os.environ['DEV_DB_HOSTNAME'],
            'PORT': os.environ['DEV_DB_PORT'],
        }
    }


# Model to use to represent a user
AUTH_USER_MODEL = 'auth.User'


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'frontend/static'), )
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'frontend/staticfiles')


# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Email settings
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = os.environ["EMAIL_PORT"]
EMAIL_HOST_USER = os.environ["EMAIL_HOST_USER"]
EMAIL_HOST_PASSWORD = os.environ["EMAIL_HOST_PASSWORD"]
DEFAULT_FROM_EMAIL = os.environ["EMAIL_HOST_USER"]
EMAIL_USE_TLS = True


# django-webpack-loader settings
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'STATS_FILE': os.path.join(BASE_DIR, 'frontend/webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map'],
    }
}
