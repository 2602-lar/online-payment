# Generated by Django 5.0.6 on 2024-05-31 03:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payment_api', '0009_rename_zig_balance_withdrawal_zig_opening_balance'),
    ]

    operations = [
        migrations.RenameField(
            model_name='deposit',
            old_name='zig_balance',
            new_name='zig_opening_balance',
        ),
    ]
