FROM ubuntu:18.04
RUN apt-get -y update
RUN apt-get -y install apache2
COPY index.html /var/www/html
COPY style.css /var/www/html
COPY scripts.js /var/www/html
COPY arithmetics.js /var/www/html
EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-DFOREGROUND"]
