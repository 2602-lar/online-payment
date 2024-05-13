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
from django.contrib.auth.hashers import check_password 

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

#api view for validating transaction
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
    
    #validate for USD
    if(data['currency'][0] == 'USD'):
        if(amount >= account['balance_USD']):
            return Response({'message' : 'Insufficient funds USD'})
        else:
            serializer = PruneBank_AccountSerializer(
                    bank_account.objects.filter(account_number = data['recipient'][0]), 
                    many = True
                )
            #validating recipient account
            if (len(serializer.data) < 1):
                return Response({
                    'message' : 'Recipient account not found'
                })
            else:
                return Response({'message' : 'all good'})
    
    #validate for ZIG     
    else:
        if(amount >= account['balance_ZIG']):
            return Response({'message' : 'Insufficient funds ZIG.'})
        else:
            serializer = PruneBank_AccountSerializer(
                    bank_account.objects.filter(account_number = data['recipient'][0]), 
                    many = True
                )
            #validating recipient account
            if (len(serializer.data) < 1):
                return Response({'message' : 'Recipient account not found'})
            else:
                return Response({'message' : 'all good'})

#api view for validating transaction
@api_view(['POST'])
@csrf_exempt
def process_transactions(request):
    data = dict(request.data)
    user_password = User.objects.filter(username = data['sender'][0])
    user_serializer = CreateUserSerializer(user_password, many=True)
    user_password = user_serializer.data[0]['password']
    password_valid = check_password(data['pin'][0], user_password )
    if check_password(data['pin'][0], user_password ) :
        #getting sender 
        sender_object = bank_account.objects.filter(account_number = data['sender'][0])
        recipient_object = bank_account.objects.filter(account_number = data['recipient'][0])
        sender = PruneBank_AccountSerializer(sender_object, many = True).data[0]
        recipient = PruneBank_AccountSerializer(recipient_object, many = True).data[0]
        if data['currency'][0] == 'USD' :
            sender_balance = sender['balance_USD']
            recipient_balance = recipient['balance_USD']
        else:
            sender_balance = sender['balance_ZIG']
            recipient_balance = recipient['balance_ZIG']            
        
        amount = float(data['amount'][0])
        sender_closing_balance = sender_balance - amount
        recipient_closing_balance = recipient_balance + amount 
        
        #generate referencenumber
        reference_number = generate_id(transaction, 'REF')
        
        #creating transaction
        transaction_create = PruneTransactionsSerializer(data = {
            'date' : data['date'][0],
            'reference_number' : reference_number,
            'sender' : data['sender'][0],
            'recipient' : data['recipient'][0],
            'amount' : amount,
            'currency' : data['currency'][0],
            'sender_opening_balance' : sender_balance,
            'recipient_opening_balance' : recipient_balance,
            'sender_closing_balance' : sender_closing_balance,
            'recipient_closing_balance' : recipient_closing_balance
        }) 
        if transaction_create.is_valid():
            transaction_create.save()
            if data['currency'][0] == 'USD' :
                #updating bank accounts
                recipient_record = bank_account.objects.get(account_number = data['recipient'][0])
                recipient_record.balance_USD = recipient_closing_balance
                recipient_record.save()
                
                sender_record = bank_account.objects.get(account_number = data['sender'][0])
                sender_record.balance_USD = sender_closing_balance
                sender_record.save()
            else:
                #updating bank accounts
                recipient_record = bank_account.objects.get(account_number = data['recipient'][0])
                recipient_record.balance_ZIG = recipient_closing_balance
                recipient_record.save()
                
                sender_record = bank_account.objects.get(account_number = data['sender'][0])
                sender_record.balance_ZIG = sender_closing_balance
                sender_record.save()
            return Response({'message' : 'Funds transfered successfully.'})   
        else:
            print('invalid serializer')
            print('date : ', data['date'][0])
            print('reference_number : ',reference_number)
            print('sender : ',data['sender'][0])
            print('recipient : ',data['recipient'][0])
            print('amount : ',amount)
            print('currency : ',data['currency'][0])
            print('sender_opening_balance : ',sender_balance)
            print('recipient_opening_balance : ',recipient_balance)
            print('sender_closing_balance : ',sender_closing_balance)
            print('recipient_closing_balance : ',recipient_closing_balance)
            return Response({'message' : 'Transaction not complete!'})        
    else:
        return Response({'message' : 'Transaction failed!. Incorrect pin provided'})
    