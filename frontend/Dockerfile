FROM pytorch/pytorch

WORKDIR /app


RUN apt update
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs 
RUN apt install -y graphicsmagick ghostscript

COPY . .
RUN npm install
RUN npm install -g serve 
RUN npm run build

CMD ["serve", "-s", "build"]

EXPOSE 5000

