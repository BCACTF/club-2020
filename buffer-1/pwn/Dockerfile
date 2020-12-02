FROM ubuntu:20.04

RUN apt-get update -y && \
    apt-get install -y gcc && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -d /home/ctf/ -m -p ctf -s /bin/bash ctf
RUN echo "ctf:ctf" | chpasswd

WORKDIR /home/ctf

COPY src.c .
RUN gcc src.c -o buffer1 -fno-stack-protector
COPY flag.txt .
COPY ynetd .

RUN chown -R root:root /home/ctf
RUN chmod +x ynetd

USER ctf
EXPOSE 9999
CMD ./ynetd -p 9999 ./buffer1
