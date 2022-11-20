FROM python:3.10-slim
RUN apt update && apt install -y netcat
WORKDIR /app
COPY . .
RUN pip install gunicorn -r requirements.txt
CMD ./run.sh
