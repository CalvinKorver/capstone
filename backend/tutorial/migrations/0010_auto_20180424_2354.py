# Generated by Django 2.0.2 on 2018-04-24 23:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0009_auto_20180424_2331'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='event_status',
        ),
        migrations.RemoveField(
            model_name='status',
            name='description',
        ),
        migrations.AddField(
            model_name='event',
            name='StatusID',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tutorial.Status'),
        ),
    ]
