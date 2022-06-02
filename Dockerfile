FROM pytorch/pytorch

WORKDIR /app


RUN apt update
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs 
RUN apt install -y graphicsmagick ghostscript

COPY . .
RUN pip install -r requirements.txt
RUN cd backend && npm install

CMD ["node", "backend/index.js"]

EXPOSE 5000

