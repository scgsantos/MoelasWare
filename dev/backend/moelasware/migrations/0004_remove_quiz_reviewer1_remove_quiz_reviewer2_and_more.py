# Generated by Django 4.1.1 on 2022-11-17 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('moelasware', '0003_quiz_name_quiz_reviewer1_quiz_reviewer2_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quiz',
            name='reviewer1',
        ),
        migrations.RemoveField(
            model_name='quiz',
            name='reviewer2',
        ),
        migrations.RemoveField(
            model_name='quiz',
            name='reviewer3',
        ),
        migrations.AddField(
            model_name='quiz',
            name='finished',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='review',
            name='pending',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='name',
            field=models.TextField(unique=True),
        ),
    ]
