# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-06-16 06:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import mainapp.models
import mainapp.utils.pathutil


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=mainapp.utils.pathutil.user_preview_images_path)),
            ],
        ),
        migrations.AddField(
            model_name='person',
            name='preview_text',
            field=models.TextField(default=422, max_length=300),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='person',
            name='twitter_account',
            field=models.URLField(max_length=255),
        ),
        migrations.AddField(
            model_name='image',
            name='person',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.Person'),
        ),
    ]
