FROM python:alpine3.13
WORKDIR /app
COPY ./src .
RUN pip install requests
CMD ["python", "-u", "app.py"]
