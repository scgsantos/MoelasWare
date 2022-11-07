FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install gunicorn -r requirements.txt
CMD ./run.sh
