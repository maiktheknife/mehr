# AwesomeDev

# Libs
#####[Django](https://www.djangoproject.com/)
#####[hachoir3](https://bitbucket.org/haypo/hachoir3) [hachoir3 windows](https://pypi.python.org/pypi/hachoir3-superdesk/3.0a1.post2)

# Run
if starting for the first time, run the following:
$ python manage.py makemigrations mainapp
$ python manage.py migrate

to start the application:
$ python manage.py runserver

-> The running application can be reached at <http://127.0.0.1:8000/mainapp>.

To provide data visit <http://127.0.0.1:8000/admin>.
you may need an admin user:
$ python manage.py createsuperuser
