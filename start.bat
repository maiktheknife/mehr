REM save directory
pushd
REM go to django
cd django
python manage.py makemigrations mainapp && python manage.py migrate && python manage.py runserver
REM restore previous directory
popd
