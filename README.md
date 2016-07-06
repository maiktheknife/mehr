#AwesomeDev

##Prepare
```bash
pip install django
pip install django-bootstrap3
pip install django-fontawesome
```

## Run
if starting for the first time, run the following:
```bash
$ python manage.py makemigrations mainapp
$ python manage.py migrate
```
to start the application:
```bash
$ python manage.py runserver
```
-> The running application can be reached at <http://127.0.0.1:8000/mainapp>.

To provide data visit <http://127.0.0.1:8000/admin>
you may need an admin user:
```bash
$ python manage.py createsuperuser
```

## Libs
* [Django](https://www.djangoproject.com/)
* [Django-bootstrap3](https://github.com/dyve/django-bootstrap3)
* [Django-fontawesome](https://github.com/redouane/django-fontawesome)
* [hachoir3](https://bitbucket.org/haypo/hachoir3) / [hachoir3 windows](https://pypi.python.org/pypi/hachoir3-superdesk/3.0a1.post2)

