FROM python:3

ENV PYTHONUNBUFFERED 1

RUN apt-get update
RUN apt-get install -y netcat
RUN apt-get clean

WORKDIR /code
ADD django /code/django
ADD requirements.txt /code/requirements.txt

RUN pip install -r requirements.txt

WORKDIR /code/django

CMD ./start.sh