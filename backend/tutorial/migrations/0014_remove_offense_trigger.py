# Generated by Django 2.0.2 on 2018-04-28 23:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0013_offense_trigger'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='offense',
            name='trigger',
        ),
    ]
