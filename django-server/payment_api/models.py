from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class account_detail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    date_created = models.DateField()
    name = models .CharField(max_length=255)
    middle_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255)
    id_number = models.CharField(max_length=255, primary_key=True)
    gender = models .CharField(max_length=20)
    marital_status = models.CharField(max_length=255)
    dob = models.DateField()
    nationality = models.CharField(max_length=255)
    email = models.CharField(max_length=255, null = True)
    phone_home = models.CharField(max_length=255) 
    phone_work = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255)
    nok_name = models.CharField(max_length=255)
    nok_relationship = models.CharField(max_length=25)
    nok_phone = models.CharField(max_length=255)
    nok_email = models.CharField(max_length=255, null=True)
    nok_address = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    
class bank_account(models.Model):
    account_number = models.CharField( max_length=20, primary_key=True)
    account_owner = models.ForeignKey(account_detail, on_delete=models.CASCADE)
    balance_USD = models.FloatField()
    balance_ZIG = models.FloatField()
    
class transaction(models.Model):
    date = models.DateField()
    reference_number = models.CharField(max_length=100, primary_key=True)
    sender = models.ForeignKey(bank_account,related_name='sender', on_delete=models.CASCADE)
    recipient = models.ForeignKey(bank_account,related_name='recipient', on_delete=models.CASCADE)
    reason = models.CharField(max_length=255, default='Gift')
    amount = models.FloatField()
    currency = models.CharField(max_length=100)
    sender_opening_balance = models.FloatField()
    recipient_opening_balance = models.FloatField()
    sender_closing_balance = models.FloatField()
    recipient_closing_balance = models.FloatField()
    
class account_transaction(models.Model):
    date = models.DateField()
    reference_number = models.CharField(max_length=100, primary_key=True)
    type_of_transaction = models.CharField(max_length=100)
    account = models.ForeignKey(bank_account, on_delete=models.CASCADE)
    amount = models.FloatField()
    currency = models.CharField(max_length=100)
    usd_opening_balance = models.FloatField()
    zig_balance = models.FloatField()
    usd_closing_balance = models.FloatField()
    zig_closing_balance = models.FloatField()
    
class message(models.Model):
    date = models.DateField()
    account = models.ForeignKey(bank_account, on_delete=models.CASCADE)
    message = models.TextField()
    topic = models.CharField(max_length=255)
    reply = models.TextField(null=True)
    reply_by = models.ForeignKey(User, on_delete=models.CASCADE, null = True)