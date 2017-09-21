FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get install -y netcat && \
    apt-get clean

WORKDIR /code
ADD django /code/django
ADD requirements.txt /code/requirements.txt

RUN pip install -r requirements.txt

WORKDIR /code/django

CMD ./start.sh