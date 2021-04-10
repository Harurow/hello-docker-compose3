FROM hayd/alpine-deno:1.8.3
WORKDIR /app
USER deno
COPY ./src .
RUN deno cache app.ts
EXPOSE 3001
CMD ["run", "--allow-net", "--allow-env", "./app.ts"]
