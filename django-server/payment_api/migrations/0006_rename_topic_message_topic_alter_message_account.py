# Generated by Django 5.0.6 on 2024-05-13 10:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment_api', '0005_alter_message_reply_alter_message_reply_by'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='Topic',
            new_name='topic',
        ),
        migrations.AlterField(
            model_name='message',
            name='account',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='payment_api.bank_account'),
        ),
    ]
