FROM ubuntu:18.04
RUN apt-get -y update
RUN apt-get -y install apache2
COPY index.html style.css scripts.js arithmetics.js /var/www/html/
EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-DFOREGROUND"]
