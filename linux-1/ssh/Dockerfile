FROM ubuntu:latest AS build

RUN apt-get update -y && apt-get install -y gcc && rm -r /var/lib/apt/lists/*
COPY secret/ /tmp/build
WORKDIR /tmp/build
RUN gcc no.c -o no
RUN gcc yes.c -o yes

FROM ubuntu:latest

RUN apt-get update && apt-get install -y openssh-server && rm -r /var/lib/apt/lists/*
RUN mkdir /var/run/sshd
RUN echo 'root:$(< /dev/urandom tr -cd "[:print:]" | head -c 32; echo)' | chpasswd

RUN sed -i 's/#LogLevel INFO/LogLevel VERBOSE/' /etc/ssh/sshd_config
RUN sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication no/' /etc/ssh/sshd_config
RUN sed -i 's/X11Forwarding yes/X11Forwarding no/' /etc/ssh/sshd_config
RUN echo "AllowUsers ctf" >> /etc/sshd_config
RUN sed -i 's/session\s*required\s*pam_loginuid.so/session optional pam_loginuid.so/g' /etc/pam.d/sshd
RUN sed -i 's/session\s*optional\s*pam_motd.so/#/g' /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

RUN useradd --create-home --shell /bin/bash ctf
RUN echo 'ctf:ctfclub-53726' | chpasswd
RUN passwd ctf --mindays 9999

COPY secret/some-program-that-takes-arguments /bin/
RUN chmod +x /bin/some-program-that-takes-arguments

COPY --from=build /tmp/build/no /usr/local/bin/ctf
COPY --from=build /tmp/build/yes /usr/bin/ctf

WORKDIR /home/ctf

COPY ./ ./
RUN rm -r secret Dockerfile
RUN touch .hushlogin
RUN chown -R ctf:ctf .
RUN chmod -w -R .

RUN chmod -x /usr/bin/ssh*

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D", "-e"]
