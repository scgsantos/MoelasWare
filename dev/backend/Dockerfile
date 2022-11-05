FROM python:3.10-slim
COPY . /app
WORKDIR /app
RUN pip install gunicorn -r requirements.txt
CMD gunicorn moelasware.wsgi 
