# Generated by Django 5.1.5 on 2025-02-07 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserServices', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='profile_pic',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
