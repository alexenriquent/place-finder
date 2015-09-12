# Dockerfile to build API mashup
# Based on Ubuntu

# Set the base image to Ubuntu 15.04
FROM ubuntu:15.04

# File author / maintainer
MAINTAINER Thanat Chokwijitkul

# Download and update packages
RUN apt-get update

# Install basic applications
RUN apt-get install -y nodejs npm

# Copy the application folder inside the container
COPY ./src /src

# Run the command to install node modules
RUN cd /src; npm install

# Expose port
EXPOSE 80

# Set the default command to execute when creating a new container
CMD ["nodejs", "/src/server.js"]