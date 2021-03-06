# Generated by Django 3.2 on 2021-05-01 22:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('founders', '0001_initial'),
        ('agency', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='agency',
            name='founders',
        ),
        migrations.AddField(
            model_name='agency',
            name='founders',
            field=models.ManyToManyField(to='founders.Founder'),
        ),
        migrations.CreateModel(
            name='AgencyChanges',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registrarID', models.IntegerField()),
                ('doc_name', models.CharField(max_length=256)),
                ('doc_number', models.IntegerField()),
                ('doc_date', models.DateField()),
                ('doc_issued', models.CharField(max_length=256)),
                ('changed_field_name', models.CharField(max_length=32)),
                ('old_value', models.CharField(max_length=512)),
                ('date', models.DateField()),
                ('agencyID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agency.agency')),
            ],
        ),
    ]
