#!/bin/bash

set -e

mkdir -p logs

while ! nc -w 2 db 5432 </dev/null; do
  sleep 2;
  echo "postgres not yet reachable yet, sleep 2"
done;
echo "now reachable"

python manage.py makemigrations mainapp
python manage.py migrate

echo "from django.contrib.auth.models import User; User.objects.filter(email='admin@example.com').delete(); User.objects.create_superuser('admin', 'admin@example.com', 'adminadmin')" | python manage.py shell

python manage.py migrate

python manage.py runserver 0.0.0.0:8000

#echo "Migrate"
#python manage.py migrate                  # Apply database migrations
#python manage.py collectstatic --noinput  # Collect static files
#
#echo "Starting Gunicorn"
#exec gunicorn \
#    --name mehr \
#    --reload \
#    --preload \
#    --workers=3 \
#    --worker-class=tornado \
#    --timeout=3 \
#    --graceful-timeout=3 \
#    --log-level=DEBUG \
#    --log-file=gunicorn_logs/debug.log \
#    --error-logfile=gunicorn_logs/error.log \
#    --bind 127.0.0.1:61561 \
#    magazin.wsgi:application 2>&1
