from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from .serializers import *

# Create your views here.
# CRUD view for users
class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def destroy(self, request, id=None):
        user = User.objects.get(id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @api_view(['GET', 'POST'])
    def users(request):
        queryset = User.objects.all()
        serializers = UserSerializer(queryset, many=True)
        return Response(serializers.data)

##CRUD view for account details
class Account_detailsViewSet(viewsets.ModelViewSet):
    
    http_method_names = ['get', 'post', 'put']
    
    queryset = account_detail.objects.all()
    serializer_class = PruneAccount_DetailsSerializer
    
    def perform_create(self, serializer):
        serializer.save()
        
    def perform_update(self, serializer):
        serializer.save()
        
    def perform_destroy(self, instance):
         account = account_detail.objects.get(id=id)
         account.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)


##CRUD view for bank account
class Bank_accountViewSet(viewsets.ModelViewSet):
    
    http_method_names = ['get', 'post', 'put']
    
    queryset = bank_account.objects.all()
    serializer_class = Bank_AccountSerializer
    
    def perform_create(self, serializer):
        serializer.save()
        
    def perform_update(self, serializer):
        serializer.save()
        
    def perform_destroy(self, instance):
         account = bank_account.objects.get(id=id)
         account.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)

##CRUD view for transactions
class TransactionsViewSet(viewsets.ModelViewSet):
    
    http_method_names = ['get', 'post', 'put']
    
    queryset = transaction.objects.all()
    serializer_class = TransactionsSerializer
    
    def perform_create(self, serializer):
        serializer.save()
        
    def perform_update(self, serializer):
        serializer.save()
        
    def perform_destroy(self, instance):
         transactions = transaction.objects.get(id=id)
         transactions.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)

##CRUD view for account transactions
class Account_TransactionsViewSet(viewsets.ModelViewSet):
    
    http_method_names = ['get', 'post', 'put']
    
    queryset = account_transaction.objects.all()
    serializer_class = Account_TransactionsSerializer
    
    def perform_create(self, serializer):
        serializer.save()
        
    def perform_update(self, serializer):
        serializer.save()
        
    def perform_destroy(self, instance):
         transaction = account_transaction.objects.get(id=id)
         transaction.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)

##CRUD view for messages
class MessagesViewSet(viewsets.ModelViewSet):
    
    http_method_names = ['get', 'post', 'put']
    
    queryset = message.objects.all()
    serializer_class = MessageSerializer
    
    def perform_create(self, serializer):
        serializer.save()
        
    def perform_update(self, serializer):
        serializer.save()
        
    def perform_destroy(self, instance):
         messages = message.objects.get(id=id)
         messages.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)

