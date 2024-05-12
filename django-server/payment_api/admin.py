from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(account_detail)
admin.site.register(bank_account)
admin.site.register(transaction)
admin.site.register(account_transaction)
admin.site.register(message)

