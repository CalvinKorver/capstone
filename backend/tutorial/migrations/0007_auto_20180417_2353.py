# Generated by Django 2.0.2 on 2018-04-17 23:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0006_auto_20180417_2348'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
