# Generated by Django 3.2 on 2021-05-08 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='buyers',
            name='firstName',
        ),
        migrations.RemoveField(
            model_name='buyers',
            name='lastName',
        ),
        migrations.AddField(
            model_name='buyers',
            name='name',
            field=models.CharField(default='nitin', max_length=120),
        ),
    ]
