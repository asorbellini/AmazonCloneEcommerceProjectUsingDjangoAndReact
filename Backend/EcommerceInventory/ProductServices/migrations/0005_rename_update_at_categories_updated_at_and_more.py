# Generated by Django 5.1.5 on 2025-02-12 13:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ProductServices', '0004_alter_categories_parent_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='categories',
            old_name='update_at',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='productquestions',
            old_name='update_at',
            new_name='updated_at',
        ),
        migrations.RenameField(
            model_name='products',
            old_name='update_at',
            new_name='updated_at',
        ),
    ]
