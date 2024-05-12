from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from .serializers import *
from .auxillary import *
from django.contrib.auth.hashers import make_password
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt

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
    

        #queryset = User.objects.all()
        #serializers = UserSerializer(queryset, many=True)
        #return Response(serializers.data)

##CRUD view for account details
class Account_detailsViewSet(viewsets.ModelViewSet):
    
    http_method_names = ['get', 'post', 'put']
    
    queryset = account_detail.objects.all()
    serializer_class = PruneAccount_DetailsSerializer
    
    def perform_create(self, serializer):
        request_data = dict(self.request.data)
        serializer.save()
        account_number = generate_id(bank_account, "ACC")
        account_user = account_detail.objects.get(id_number = serializer.data['id_number'])
        bank_account_create = PruneBank_AccountSerializer(data = {
            'account_number' : account_number,
            'account_owner' : serializer.data['id_number'],
            'balance_USD' : 0.0,
            'balance_ZIG' : 0.0,
        })
        if bank_account_create.is_valid():
            bank_account_create.save()
            password = make_password(request_data['pin'][0])
            print(password)
            user = CreateUserSerializer(data = {
                'username' : account_number,
                'password' : password,
                "is_superuser": False,
                "first_name": "",
                "last_name": "",
                "email": "",
                "is_staff": True,
                "is_active": True,
                "date_joined": datetime.now(),
                "groups": [],
                "user_permissions": []
            })
            if user.is_valid():
                print('good')
                user.save()
                user_details = User.objects.get(username = account_number)
                account_user.user = user_details
                account_user.save()
        
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
    serializer_class = PruneBank_AccountSerializer
    
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
    serializer_class = PruneTransactionsSerializer
    
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
    serializer_class = PruneAccount_TransactionsSerializer
    
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
    serializer_class = PruneMessageSerializer
    
    def perform_create(self, serializer):
        serializer.save()
        
    def perform_update(self, serializer):
        serializer.save()
        
    def perform_destroy(self, instance):
         messages = message.objects.get(id=id)
         messages.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@csrf_exempt
def get_user(request):
    data = dict(request.data)
    account = account_detail.objects.filter(id_number = (data['id_number'][0]))
    account = Account_DetailsSerializer(account, many=True)
    return JsonResponse(account.data, safe= False)

@api_view(['POST'])
@csrf_exempt
def get_transactions(request):
    data = dict(request.data)
    data_fethched = transaction.objects.filter(sender = (data['account_number'][0]))
    serializer = TransactionsSerializer(data_fethched, many=True)
    return JsonResponse(serializer.data, safe= False)

@api_view(['POST'])
@csrf_exempt
def validate_transactions(request):
    data = dict(request.data)
    serializer = PruneBank_AccountSerializer(
        bank_account.objects.filter(account_number = data['sender'][0]), 
        many = True
        )
    account = serializer.data[0]
    amount = float(data['amount'][0])
    if(data['currency'][0] == 'USD'):
        if(amount >= account['balance_USD']):
            print('Insufficient funds USD.')
        else:
            print('sufficient funds USD')
    else:
        if(amount >= account['balance_ZIG']):
            print('Insufficient funds ZIG.')
        else:
            print('sufficient funds ZIG')
    return Response({'loading' : 'loading'})