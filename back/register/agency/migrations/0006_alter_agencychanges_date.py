# Generated by Django 3.2 on 2021-05-17 15:02

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('agency', '0005_auto_20210517_0821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agencychanges',
            name='date',
            field=models.DateField(default=datetime.datetime(2021, 5, 17, 15, 2, 22, 358501, tzinfo=utc)),
        ),
    ]