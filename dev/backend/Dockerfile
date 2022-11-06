FROM python:3.10-slim
COPY . /app
WORKDIR /app
RUN pip install gunicorn -r requirements.txt
CMD gunicorn -b 0.0.0.0:8000 moelasware.wsgi 
