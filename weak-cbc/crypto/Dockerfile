FROM ubuntu:20.04

RUN apt-get update -y && \
    apt-get install -y wget python2 python2-dev build-essential libssl-dev libffi-dev && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -d /home/ctf/ -m -p ctf -s /bin/bash ctf
RUN echo "ctf:ctf" | chpasswd

RUN wget https://bootstrap.pypa.io/2.7/get-pip.py
RUN python2 get-pip.py
RUN python2 -m pip install pycrypto
RUN rm get-pip.py

WORKDIR /home/ctf

COPY weak-cbc.py .
COPY keys.py .
COPY ynetd .

RUN chown -R root:root /home/ctf
RUN chmod +x ynetd
RUN chmod +x weak-cbc.py

USER ctf
EXPOSE 9999
CMD ./ynetd -p 9999 ./weak-cbc.py
