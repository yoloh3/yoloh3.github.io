---
layout: post
title:  Installing Matlab 2012b in linux, unix 64 bit
date:   2016-11-18 07:45
teaser: This post shown the easiest method to install matlab in linux.
image:  /imgs/others/random_2.png
author: heroh396
comments: true
redirect_from: install, matlab, linux
shortUrl: 
---
File install matlab 2012b for unix 64 bit:
-   [r2012b_unix.iso](ftp://apache.uib.no/pub/ibiblio/mathlab/iso/R2012b_UNIX.iso)

File crack matlab 2012b for linux 64 bit:
-   [matlab2012b_std.dat](https://drive.google.com/file/d/0BxghKvvmdklCSEVqRnBHSllzazQ/view?usp=sharing)

First, open your folder contains file r2012_unix.iso.
Open terminal, enter the command:

```
	sudo mount -t iso9660 -o ro,loop,noauto r2012b_unix.iso /mnt
	cd /mnt
	sudo ./install
``` 
Install matlab by GUI, check  install without internet, use this key:

-   54433-42422-42196-01350-12755-09842
  
Choose custom, change the directory become:

-   home/your_user_name/matlab
   
Next, active software with file matlab2012b_std.dat. 
If you can’t active your software, you don’t worry, be continue. 
After installed matlab, open terminal and enter the command:
```
	cd /home/your_user_name/matlab/bin
	sudo ./matlab
```
Active software with file matlab2012b_std.dat. 
This is my result. :D

![Matlab result](/imgs/linux/matlab_result-1024x576.png)
