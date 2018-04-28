# Generated by Django 2.0.2 on 2018-04-28 00:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0011_remove_event_end_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='CaseOutcome',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CaseOutcomeName', models.CharField(default='DEFAULT', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ChargeType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ChargeTypeName', models.CharField(default='DEFAULT', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='FailToAppear',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FailToAppearDate', models.DateField(default='2000-10-10')),
            ],
        ),
        migrations.CreateModel(
            name='Offense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('OffenseDate', models.DateField(default='2000-10-10')),
            ],
        ),
        migrations.CreateModel(
            name='PreTrialStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PreTrialStatusName', models.CharField(default='DEFAULT', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Probation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ProbationStart', models.DateField(default='2000-10-10')),
                ('ProbationEnd', models.DateField(default='2000-10-10')),
            ],
        ),
        migrations.CreateModel(
            name='ProbationType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ProbationTypeName', models.CharField(default='DEFAULT', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Punishment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Credit', models.IntegerField(default=0)),
                ('DueDate', models.DateField(default='2000-10-10')),
                ('Jurisdiction', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PunishmentType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PunishmentTypeName', models.CharField(default='DEFAULT', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SentencingStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('SentencingStatusName', models.CharField(default='DEFAULT', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Trial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('TrialDate', models.DateField(default='2000-10-10')),
                ('TrialTime', models.TimeField(blank=True, null=True)),
                ('Motion36', models.BooleanField(default=False)),
                ('Motion35', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Violation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ViolationName', models.CharField(default='DEFAULT', max_length=50)),
            ],
        ),
        migrations.RemoveField(
            model_name='case_charge',
            name='CaseID',
        ),
        migrations.RemoveField(
            model_name='case_charge',
            name='ChargeID',
        ),
        migrations.RemoveField(
            model_name='case_event',
            name='case',
        ),
        migrations.RemoveField(
            model_name='case_event',
            name='event',
        ),
        migrations.DeleteModel(
            name='Case_Type',
        ),
        migrations.DeleteModel(
            name='Client_Type',
        ),
        migrations.RemoveField(
            model_name='event',
            name='StatusID',
        ),
        migrations.RemoveField(
            model_name='event',
            name='court',
        ),
        migrations.RemoveField(
            model_name='event',
            name='event_type',
        ),
        migrations.RenameField(
            model_name='client',
            old_name='city',
            new_name='City',
        ),
        migrations.RenameField(
            model_name='client',
            old_name='country',
            new_name='Country',
        ),
        migrations.RenameField(
            model_name='client',
            old_name='date_of_birth',
            new_name='DateOfBirth',
        ),
        migrations.RenameField(
            model_name='client',
            old_name='first_name',
            new_name='FirstName',
        ),
        migrations.RenameField(
            model_name='client',
            old_name='last_name',
            new_name='LastName',
        ),
        migrations.RenameField(
            model_name='client',
            old_name='state',
            new_name='State',
        ),
        migrations.RenameField(
            model_name='client',
            old_name='street_address',
            new_name='StreetAddress',
        ),
        migrations.RenameField(
            model_name='client',
            old_name='zipcode',
            new_name='Zipcode',
        ),
        migrations.RenameField(
            model_name='court',
            old_name='name',
            new_name='CourtName',
        ),
        migrations.RemoveField(
            model_name='case',
            name='FineID',
        ),
        migrations.RemoveField(
            model_name='case',
            name='SentenceComplianceID',
        ),
        migrations.RemoveField(
            model_name='court',
            name='description',
        ),
        migrations.RemoveField(
            model_name='fine',
            name='fine_payment_service',
        ),
        migrations.RemoveField(
            model_name='fine',
            name='fine_payment_work',
        ),
        migrations.RemoveField(
            model_name='fine',
            name='fines_imposed',
        ),
        migrations.RemoveField(
            model_name='fine',
            name='fines_suspended',
        ),
        migrations.RemoveField(
            model_name='sentencecompliance',
            name='admit',
        ),
        migrations.RemoveField(
            model_name='sentencecompliance',
            name='alleged_violation',
        ),
        migrations.RemoveField(
            model_name='sentencecompliance',
            name='reserve',
        ),
        migrations.AddField(
            model_name='case',
            name='BenchWarrant',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='case',
            name='CaseClosed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='case',
            name='DomesticViolence',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='case',
            name='JailTimeSuspended',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='case',
            name='PayCommunityService',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='case',
            name='PayWorkCrew',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='case',
            name='SentenceEnd',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='case',
            name='SentenceStart',
            field=models.DateField(default='2000-10-10'),
        ),
        migrations.AddField(
            model_name='fine',
            name='CaseID',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='tutorial.Case'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='fine',
            name='FinesImposed',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='fine',
            name='FinesSuspended',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='sentencecompliance',
            name='Admit',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='sentencecompliance',
            name='CaseID',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='tutorial.Case'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sentencecompliance',
            name='Reserve',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='Case_Charge',
        ),
        migrations.DeleteModel(
            name='Case_Event',
        ),
        migrations.DeleteModel(
            name='Charge',
        ),
        migrations.DeleteModel(
            name='Event',
        ),
        migrations.DeleteModel(
            name='Event_Type',
        ),
        migrations.DeleteModel(
            name='Status',
        ),
        migrations.AddField(
            model_name='trial',
            name='CaseID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.Case'),
        ),
        migrations.AddField(
            model_name='punishment',
            name='CaseID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.Case'),
        ),
        migrations.AddField(
            model_name='punishment',
            name='PunishmentTypeID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.ProbationType'),
        ),
        migrations.AddField(
            model_name='probation',
            name='CaseID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.Case'),
        ),
        migrations.AddField(
            model_name='probation',
            name='ProbationTypeID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.ProbationType'),
        ),
        migrations.AddField(
            model_name='offense',
            name='CaseID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.Case'),
        ),
        migrations.AddField(
            model_name='offense',
            name='ChargeTypeID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.Court'),
        ),
        migrations.AddField(
            model_name='failtoappear',
            name='CaseID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tutorial.Case'),
        ),
        migrations.AddField(
            model_name='case',
            name='CaseOutcomeID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tutorial.CaseOutcome'),
        ),
        migrations.AddField(
            model_name='case',
            name='PreTrialStatusID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tutorial.PreTrialStatus'),
        ),
        migrations.AddField(
            model_name='case',
            name='SentencingStatusID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tutorial.SentencingStatus'),
        ),
        migrations.AddField(
            model_name='sentencecompliance',
            name='ViolationID',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='tutorial.ProbationType'),
            preserve_default=False,
        ),
    ]
