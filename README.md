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
$ source ~/.bash_profile

Alternatively, save some keystrokes:
$ . ~/.bash_profile


# Dealing with nginx

* Nginx can be installed using `sudo apt-get install nginx` from `apt-get` directly.
* Then you need to login into 

```
# Default nginx location
/etc/nginx

# Default nginx conf location
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


### Ubuntu 16.04 Wifi issues

In Ubuntu `16.04`, you might find your pc disconnected from wifi after you wake your PC up from sleep, especially if is on battery power when it was in sleep mode. And to your surprise, you're left with no option to restart your wifi (unless you have one of those archaic physical buttons on your machine).

The following might help

```
# 16.04 runs on systemd. Try the following:
# http://askubuntu.com/questions/761180/wifi-doesnt-work-after-suspend-after-16-04-upgrade
sudo systemctl restart network-manager.service

# If this works, you can create a script to automate it.
```


### Process killing shortcuts
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
