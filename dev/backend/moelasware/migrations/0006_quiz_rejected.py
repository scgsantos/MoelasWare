# Generated by Django 4.1.3 on 2022-12-09 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("moelasware", "0005_quiz_review_count"),
    ]

    operations = [
        migrations.AddField(
            model_name="quiz",
            name="rejected",
            field=models.BooleanField(default=False),
        ),
    ]
