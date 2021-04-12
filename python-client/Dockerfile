FROM python:alpine
WORKDIR /app
COPY ./src .
RUN pip install -r deps.txt
CMD ["python", "-u", "app.py"]
