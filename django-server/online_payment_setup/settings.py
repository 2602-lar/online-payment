from pathlib import Path
from datetime import timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-5%4t^h+o$s64@b*yxtywq#k5bt7u(j@xe*d^7-c$)4arye_9@s'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]

CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']

CORS_ORIGIN_ALLOW_ALL = True
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    #other apps not default
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt.token_blacklist',
    
    #system apps
    'payments_api'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'online_payment_setup.urls'

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

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME' : timedelta(minutes = 5),
    'REFRESH_TOKEN_LIFETIME' : timedelta(days=3),
    'ROTATE_REFRESH_TOKENS' : True,
    'BLACKLIST_AFTER_ROTATION' : True,
    'UPDATE_LAST_LOGIN' : False,
    
    'ALGORITH' : 'HS252',
    'VERIFYING_KEY' : None,
    'AUDIENCE' : None,
    'ISSUER' :None,
    'JWK_URL' : None,
    'LEEWAY' : 0,
    
    'AUTH_HEADER_TYPES' : ('Bearer',),
    'AUTH_HEADER_NAME' : 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD' : 'id',
    'USER_ID_CLAIM' : 'user_id',
    'USER_AUTHENTICATION_RULE' : 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    
    'AUTH_TOKEN_CLASSES' : ('rest_framework_simplejwt.tokens.AccessToken'),
    'TOKEN_TYPE_CLAIM' : 'token_type',
    
    'JTI_CLAIM' : 'jti',
    
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM' : 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME' : timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME' : timedelta(days=1)
    
    } 

REST_FRAMEWORK = {
     # Use Django's standard `django.contrib.auth` permissions,
     # or allow read-only access for unauthenticated users.
     'DEFAULT_PERMISSION_CLASSES': [
         'rest_framework.permissions.AllowAny'
     ],
     'DEFAULT_AUTHENTICATION_CLASSES': (
         'rest_framework_simplejwt.authentication.JWTAuthentication',
     ),
     'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 3,
    
 }

WSGI_APPLICATION = 'online_payment_setup.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

