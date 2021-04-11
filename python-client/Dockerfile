FROM python:alpine3.13
WORKDIR /app
COPY ./src .
RUN pip install -r deps.txt
CMD ["python", "-u", "app.py"]
