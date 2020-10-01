FROM node:12-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install node modules
COPY package*.json /app/
RUN cd /app && \
  if [ "$NODE_ENV" = "production" ]; then npm install --registry=https://registry.npmjs.org/ --only=production; \
  else npm install --registry=https://registry.npmjs.org/; \
  fi

# Install application
COPY . /app
RUN chmod +x ./start.sh

# Mount persistent storage
VOLUME /app/pages

CMD [ "./start.sh" ]
