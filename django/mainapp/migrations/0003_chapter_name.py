# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-18 20:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_auto_20160616_0844'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='name',
            field=models.CharField(default='ame', max_length=100),
            preserve_default=False,
        ),
    ]