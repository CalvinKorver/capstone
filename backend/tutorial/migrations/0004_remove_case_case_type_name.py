# Generated by Django 2.0.2 on 2018-04-07 19:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0003_case_case_type_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='case',
            name='case_type_name',
        ),
    ]
