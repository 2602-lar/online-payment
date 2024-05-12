from .models import *
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer) :
    class Meta:
        model=User
        # fields='__all__'
        exclude=['password']

class CreateUserSerializer(serializers.ModelSerializer) :
    class Meta:
        model=User
        fields='__all__'
#account deatails serializers
class Account_DetailsSerializer(serializers.ModelSerializer) :
    user=UserSerializer(many=False,read_only=True)
    class Meta:
        model = account_detail
        exclude=['password']
        
class PruneAccount_DetailsSerializer(serializers.ModelSerializer) :
    
    class Meta:
        model = account_detail
        fields = '__all__'

#bank account serializer
class Bank_AccountSerializer(serializers.ModelSerializer) :
    account_owner=Account_DetailsSerializer(many=False,read_only=True)
    class Meta:
        model = bank_account
        fields = '__all__'
        
class PruneBank_AccountSerializer(serializers.ModelSerializer) :
    
    class Meta:
        model = bank_account
        fields = '__all__'

#transactions serializer
class TransactionsSerializer(serializers.ModelSerializer) :
    sender=Bank_AccountSerializer(many=False,read_only=True)
    recipient = Bank_AccountSerializer(many=False,read_only=True)
    class Meta:
        model = transaction
        fields = '__all__'
        
class PruneTransactionsSerializer(serializers.ModelSerializer) :
    
    class Meta:
        model = transaction
        fields = '__all__'


#transactions serializer
class Account_TransactionsSerializer(serializers.ModelSerializer) :
    account = Bank_AccountSerializer(many=False,read_only=True)
    
    class Meta:
        model = account_transaction
        fields = '__all__'
        
class PruneAccount_TransactionsSerializer(serializers.ModelSerializer) :
    
    class Meta:
        model = account_transaction
        fields = '__all__'

#messages serializer
class MessageSerializer(serializers.ModelSerializer) :
    account=Account_DetailsSerializer(many=False,read_only=True)
    reply_by = UserSerializer(many=False,read_only=True)
    class Meta:
        model = message
        fields = '__all__'
        
class PruneMessageSerializer(serializers.ModelSerializer) :
    
    class Meta:
        model = message
        fields = '__all__'