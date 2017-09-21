# Mehr
An implementation for a bachelor thesis (communications design) as a Docker Image

## Build &amp; Run
```bash
docker build -t maiktheknife/mehr_django .
docker-compose up --remove-orphans --abort-on-container-exit
```

## Usage
The running application can be reached at <http://localhost:8000>.

To provide data visit <http://localhost:8000/admin><br />
Login with admin - adminadmin

## Libs
* [Django](https://www.djangoproject.com/)
* [Django-bootstrap3](https://github.com/dyve/django-bootstrap3)
* [Django-fontawesome](https://github.com/redouane/django-fontawesome)
* [hachoir3](https://bitbucket.org/haypo/hachoir3)