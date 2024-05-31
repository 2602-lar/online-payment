from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
# router.register(r'users', views.UserViewSet,basename="user")
router.register(r'account-details', views.Account_detailsViewSet ,basename="account-details")
router.register(r'bank-account', views.Bank_accountViewSet, basename="bank-account")
router.register(r'users', views.UserViewSet, basename="user")
router.register(r'transaction', views.TransactionsViewSet, basename="transaction")
router.register(r'account-transaction', views.Account_TransactionsViewSet, basename="account-transaction")
router.register(r'message', views.MessagesViewSet, basename="message")

urlpatterns = [
    path('', include(router.urls)),
    path('user/', views.get_user, name = 'user'),
    path('client-transactions/', views.get_transactions, name = 'client-transactions'),
    path('validate-transaction/', views.validate_transactions, name = 'validate-transaction'),
    path('process-transaction/', views.process_transactions, name = 'process-transaction' ),
    path('madhiri/', views.madhiri, name = 'madhiri'),
    path('all-clients/', views.get_all_clients , name = 'all-clients' ),
    path('all-deposits/', views.get_all_deposits , name = 'all-deposits' ),
    path('all-withdrawals/', views.get_all_withdrawals , name = 'all-withdrawals' ),
    path('account-verification/', views.account_verification , name = 'account-verification' ),
    path('process-withdrawal/', views.process_withdrawal , name = 'process-withdrawal' ),
    path('account-verification-deposit/', views.account_verification_deposit , name = 'account-verification-deposit' ),
    path('process-deposit/', views.process_deposit , name = 'process-deposit' ),
    path('account-stats/', views.account_stats , name = 'account-stats' ),
    
]

