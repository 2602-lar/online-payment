from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
# router.register(r'users', views.UserViewSet,basename="user")
router.register(r'account-details', Account_detailsViewSet ,basename="account-details")
router.register(r'bank-account', Bank_accountViewSet, basename="bank-account")
router.register(r'users', UserViewSet, basename="user")
router.register(r'transaction', TransactionsViewSet, basename="transaction")
router.register(r'account-transaction', Account_TransactionsViewSet, basename="account-transaction")
router.register(r'message', MessagesViewSet, basename="message")

urlpatterns = [
    path('', include(router.urls)),
]

