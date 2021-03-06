# Generated by Django 2.0.2 on 2018-04-22 21:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0007_auto_20180417_2353'),
    ]

    operations = [
        migrations.RenameField(
            model_name='case',
            old_name='case_number',
            new_name='CaseNumber',
        ),
        migrations.RenameField(
            model_name='case',
            old_name='client',
            new_name='ClientID',
        ),
        migrations.RenameField(
            model_name='case_charge',
            old_name='case',
            new_name='CaseID',
        ),
        migrations.RenameField(
            model_name='case_charge',
            old_name='charge',
            new_name='ChargeID',
        ),
        migrations.RemoveField(
            model_name='case',
            name='case_type',
        ),
        migrations.RemoveField(
            model_name='case',
            name='name',
        ),
    ]
