# Generated by Django 2.0.2 on 2018-04-29 00:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0016_auto_20180428_2349'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='courtID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tutorial.Court'),
        ),
    ]