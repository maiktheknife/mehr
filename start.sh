#!/bin/bash
# go to django
cd django
python manage.py makemigrations mainapp && python manage.py migrate && python manage.py runserver
# restore previous dir if needed
cd -

