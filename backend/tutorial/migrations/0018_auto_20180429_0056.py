# Generated by Django 2.0.2 on 2018-04-29 00:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0017_case_courtid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='sentenceStart',
            field=models.DateField(blank=True, null=True),
        ),
    ]
