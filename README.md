# Ubuntu Getting Started
A beginners guide to Ubuntu.

The author(s) assume(s) that you have already installed your laptop with the latest version of Ubuntu and you already know how to pick it from OS menu & alunch it. Additionally, I/we assume you have some prior programming knowledge. If you do not know how to install it or get started, then you may refer to our **Installation Guide**.

## Your first steps

* Key board shortcuts
  * Alt + Arrow (left/right) - Takes you to the beginning/end of the line of text
  * Ctrl + Arrow (left/right) - Does the same with a word
* Windows Key a.k.a. Command key or Super Key - It opens the dashboard menu with a filterable list of pre-installed applications

## Creating your `~/.bash_profile`

* `~` represents the current user's home directory
* Often you may not find the above file in that directory. You've to create one.

```
$ cd ~
$ touch .bash_profile
```

*Alternatively,*

`$ touch ~/.bash_profile`



**After you're done**

**To reload:**

`$ source ~/.bash_profile`

Alternatively, save some keystrokes:

`$ . ~/.bash_profile`

**Know CPU architecture of your current machine**

`$ file /sbin/init`

* It's often a symlink to `/lib/systemd/systemd`
* therefore, the following should also give the same output

`$ file /lib/systemd/systemd`

**Note:** **symlink** means symbolic link, it's similar to your windows PC's shortcuts

## Installing Java

Digital Ocean has a brilliant source of information regarding software installations. You can find answers to most of your needs about them.

**URL**: https://www.digitalocean.com/community/tutorials/how-to-install-java-on-ubuntu-with-apt-get

They've covered almost every application that can ever be installed on a server. Therefore, if there is anything missing in this guide, you can definitely find it there.




## Handy Bash Shell aliases

**What is an alias**

Alias is just like a pet name to your favorite, most frequently used application. Programmers use it to reduce agony related to typing long shell commands and frustration coming out of it when they go wrong because of a typo. 

**know more:** https://www.cyberciti.biz/tips/bash-aliases-mac-centos-linux-unix.html


## Creating Alias and reloading `.bash_profile`

**To create alias:**

**Example:** In Linux, if you want to run node, the executable comes as `nodejs` and not `node` like other environments. To fix this we'll create an `alias` in the `.bash_profile`. We'll use a command-line capable light weight text editor called `nano` for this purpose.

```bash
$ nano ~/.bash_profile
# when the editor opens, type the following
# alternatively, use ctrl + shift + c to copy
# and ctrl + shift + v to paste
alias node='nodejs'

# press ctrl + x to exit
# press 'Y' when prompted and allow it to over write the file
```

**Offline installation of npm packages**
Addy Osmani wrote a nice article about enabling `npm install` while you're offline.
**URL**: https://addyosmani.com/blog/using-npm-offline/ 

This is accomplished by increasing the caching of packages to `Infinity` while installing.
```
$ npm --cache-min 9999999 install <package-name>

# Alternatively
$ npm --cache-min Infinity install <package-name>
```

Why type it everytime? Why not create an alias?

```
$ nano ~/.bash_profile

# sudo is optional here
# you won't need it if you've fixed the npm directory access right bug
alias npmis=`$ npm --cache-min Infinity install --save'
alias npmig=`$ npm --cache-min Infinity install -g'

# press ctrl + x, save and exit nano

$ source ~/.bash_profile

```




**After you're done**

To reload:

```
$ source ~/.bash_profile
```

Alternatively, save some keystrokes:

```
$ . ~/.bash_profile
```

------------------------------------------------------------------------------------

## Installing nginx in Ubuntu

* [First we need to get rid of nginx-full & nginx-common](http://serverfault.com/a/317192)
* Then reinstall it from `apt-get`
* After that, we need to ensure if in the `nginx.conf` file has `worker_process` set to `auto`
* It might happen that it was set to `0` and your server won't run that way. 
* So, Run:

```
sudo apt-get remove --purge nginx nginx-full nginx-common
# and, then
sudo apt-get install nginx

```



### Accurately find the nginx conf location:

As stated in [the stackoverflow answer here](http://stackoverflow.com/a/39335059/2458438): 'default public web root' can be found from `nginx -V` output:

```
nginx -V
nginx version: nginx/1.10.0 (Ubuntu)
built with OpenSSL 1.0.2g  1 Mar 2016
TLS SNI support enabled
configure arguments: --with-cc-opt='-g -O2 -fPIE -fstack-protector-strong -Wformat -Werror=format-security -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -fPIE -pie -Wl,-z,relro -Wl,-z,now' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-ipv6 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module --with-http_v2_module --with-http_sub_module --with-http_xslt_module --with-stream --with-stream_ssl_module --with-mail --with-mail_ssl_module --with-threads
```

** The --prefix value is the answer to the question. for the sample above the root is `/usr/share/nginx` & the conf path is `/etc/nginx/nginx.conf`**


#### Quick location of examples & documentation:

* `/usr/share/doc/nginx-doc/examples/`
* http://wiki.nginx.org/Pitfalls
* http://wiki.nginx.org/QuickStart
* http://wiki.nginx.org/Configuration

##### Now, the default set:

```
# Default nginx location
/etc/nginx

# nginx default conf location
# default, without an extension, is the file name containing nginx conf
/etc/nginx/sites-enabled/default

# typical web root for apache and other similar web servers should be
/var/www

# if installed using apt-get, the default location for web root is:
/usr/share/nginx/www

# which nginx (when installed via apt-get)
/usr/sbin/nginx

# kill all php, nginx, mysql or any kind of processes
# https://easyengine.io/tutorials/linux/kill-all-processes/

kill $(ps aux | grep '[p]hp' | awk '{print $2}')
kill $(ps aux | grep '[n]ginx' | awk '{print $2}')
kill $(ps aux | grep '[m]ysql' | awk '{print $2}')

```

#### Sample configuration

* take backups of `default` files (without extension) present in `sites_enabled` & `sites_available` directories
* path can be found using `nginx -V` and then looking at `--prefix` & `--conf` paths in the output of it
* delete the `default` files
* go to `nginx.conf`
* add a `server` block, nested under `http` block
* the contents for the block are as follows:

```
    server {
        listen 9000 default_server;
        listen [::]:9000 default_server;

        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
            try_files $uri $uri/ =404;
        }

        location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
            expires 1y;
        }
    }
```

** Note: ** The directive for filtering out image and mp4 files is also setting a caching header with `max-age=31536000` i.e. 1 year on them.

------------------------------------------------------------------------------------


## Ubuntu 16.04 Wifi issues

In Ubuntu `16.04`, you might find your pc disconnected from wifi after you wake your PC up from sleep, especially if is on battery power when it was in sleep mode. And to your surprise, you're left with no option to restart your wifi (unless you have one of those archaic physical buttons on your machine).

The following might help

```
# 16.04 runs on systemd. Try the following:
# http://askubuntu.com/questions/761180/wifi-doesnt-work-after-suspend-after-16-04-upgrade

sudo systemctl restart network-manager.service

# If this works, you can create a script to automate it.
```

------------------------------------------------------------------------------------

## Process killing shortcuts
You may always desire to kill a  processes without doing 2 steps viz. ps-ef-grepping & then finding the `pid` to send a kill signal. 
This example will reduce some friction their.

**Note**: (post repeated intentionally).

```
# kill all php, nginx, mysql or any kind of processes
# https://easyengine.io/tutorials/linux/kill-all-processes/

kill $(ps aux | grep '[p]hp' | awk '{print $2}')
kill $(ps aux | grep '[n]ginx' | awk '{print $2}')
kill $(ps aux | grep '[m]ysql' | awk '{print $2}')
```


### Find and kill application using port in Ubuntu / Unix

This `fuser 8080/tcp` will print you PID of process bound on that port.

And this `fuser -k 8080/tcp` will kill that process.

Works on Linux only. More universal is use of `lsof -i4` (or 6 for IPv6).

And to kill that particular process occupying port

`sudo fuser -k 80/tcp`

** credits: **
* [Easy Engine](https://easyengine.io/tutorials/nginx/troubleshooting/emerg-bind-failed-98-address-already-in-use/)
* [nudzo | stackoverflow](http://stackoverflow.com/a/11596144/2458438)

------------------------------------------------------------------------------------


## Dealing with Aerospike

```
sudo service aerospike start && \

sudo tail -f /var/log/aerospike/aerospike.log | grep cake
# wait for it. "service ready: soon there will be cake!"

get -O aerospike.tgz 'http://aerospike.com/download/server/latest/artifact/ubuntu12'
# for ubuntu 14.04, replace "ubuntu12" with ubuntu14
tar -xvf aerospike.tgz
cd aerospike-server-community-*-ubuntu12*
# for ubuntu 14.04, replace "ubuntu12" with ubuntu14
sudo ./asinstall # will install the .deb packages
sudo service aerospike start && \
sudo tail -f /var/log/aerospike/aerospike.log | grep cake
# wait for it. "service ready: soon there will be cake!"

```



------------------------------------------------------------------------------------
