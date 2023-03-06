# FROM python:3.8.9
# COPY requirements.txt .
# RUN pip install -r requirements.txt

# COPY . .
# EXPOSE 5000 
# CMD ["flask","run","--host=0.0.0.0","--port=5000"]

# start by pulling the python image
FROM python:3.8.9-slim-buster

# switch working directory
WORKDIR /app

# copy the requirements file into the image
COPY ./requirements.txt ./requirements.txt

# install the dependencies and packages in the requirements file
RUN apt-get update && apt-get install -y libgomp1 \
    && pip install -r requirements.txt

# copy every content from the local file to the image
COPY . .

# configure the container to run in an executed manner
ENTRYPOINT [ "python" ]

CMD ["app.py" ]