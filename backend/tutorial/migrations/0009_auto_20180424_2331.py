# Generated by Django 2.0.2 on 2018-04-24 23:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0008_auto_20180422_2140'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fines_imposed', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('fines_suspended', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('fine_payment_work', models.NullBooleanField()),
                ('fine_payment_service', models.NullBooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='SentenceCompliance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('alleged_violation', models.CharField(default='DEFAULT', max_length=50)),
                ('admit', models.BooleanField()),
                ('reserve', models.BooleanField()),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='case_outcome',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='credit',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='due_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='jail_time_suspended',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='jurisdiction_work_crew',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='motions',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='time',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='treatment_ordered',
            field=models.CharField(blank=True, max_length=400, null=True),
        ),
        migrations.AddField(
            model_name='case',
            name='FineID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tutorial.Fine'),
        ),
        migrations.AddField(
            model_name='case',
            name='SentenceComplianceID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tutorial.SentenceCompliance'),
        ),
    ]
