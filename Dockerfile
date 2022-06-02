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
RUN cd frontend && npm install && npm run build
RUN cd frontend && npm install -g serve

CMD ["./run.sh"]


EXPOSE 5000
EXPOSE 3000

