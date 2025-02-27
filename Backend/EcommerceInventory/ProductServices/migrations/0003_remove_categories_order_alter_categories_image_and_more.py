# Generated by Django 5.1.5 on 2025-02-07 21:23

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProductServices', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='categories',
            name='order',
        ),
        migrations.AlterField(
            model_name='categories',
            name='image',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='categories',
            name='name',
            field=models.CharField(default=django.utils.timezone.now, max_length=255),
            preserve_default=False,
        ),
    ]
