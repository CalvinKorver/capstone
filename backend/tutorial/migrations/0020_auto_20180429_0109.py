# Generated by Django 2.0.2 on 2018-04-29 01:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0019_auto_20180429_0106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='punishment',
            name='punishmentTypeID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.PunishmentType'),
        ),
    ]