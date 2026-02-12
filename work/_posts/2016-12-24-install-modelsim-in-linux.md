---
layout: post
title:  Install modelsim on linux
date:   2016-12-24 08:43
teaser: How to install modelsim on linux and problem solving
image:  /imgs/others/install-sw.png
author: heroh396
comments: true
redirect_from:
shortUrl: 
---

Hi everyone. 
Today, I will share you how to install ModelSim and fix some error in Linux.  Modelsim is a software use to compile, simulation HDL (VHDL, Verilog). 

# Install
-   Firstly, I need to download file ModelSimSetup-16.1.0.196-linux.run in [here](https://drive.google.com/file/d/0BxghKvvmdklCSm0yTFJJYjNYQXM/view?usp=sharing) or newest version in official website of Altera in [here](http://dl.altera.com/?product=modelsim_ae#tabs-2).
-   Go to the download location of the .run file and type:
```
	chmod +x ModelSimSetup-16.1.0.196.run
```
-   Use the command:
```
	./ModelSimSetup-13.1.0.162.run install Modelsim
```
-   Change your directory to "Location_where_you_installed_Modelsim‘/altera/13.1/modelsim_ase/linuxaloem"
-   Type
```
	./vsim
``` 

If you have error, I don’t worry. I will help you now:
# Error
_./vsim: No such file or directory_
-   I investigated further on internet and found that I require 386-32 bit libraries for Ubuntu since the Modelsim seems to be 32-bit. So I took the followings steps on the Linux command prompt:
```
	sudo dpkg --add-architecture i386 
	sudo apt-get update 
	sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 
	sudo apt-get install lib32z1 lib32ncurses5 lib32bz2-1.0 
```
_libXft.so.2: cannot open shared object file_
-   So I took the following steps:
```
  sudo  apt-get install libxft2 libxft2:i386 lib32ncurses5
```
_libXext.so.6: cannot open shared object file. libXext.so.6 not found_
-   Continues following steps:
```
   sudo apt install libxext6
   sudo apt install libxext6:i386
```

Finally, this solved the problem. I was able to invoke ModelSim using _./vsim_ command. Maybe the font size in text editor of ModelSim is very small. You can write source code by vim or gedit, then compile and simulation by ModelSim. 😀 
If you have any error, you can’t following [this website](http://mattaw.blogspot.com/2014/05/making-modelsim-altera-starter-edition.html). 
Source: [dtypist](http://vineeshvs.blogspot.com/2014/02/installing-and-using-modelsim-in-ubuntu.html), [theeureka](http://www.theeureka.net/blog/installing-altera-modelsim-on-the-64-bit-ubuntu-14-04/), [matthew](http://mattaw.blogspot.com/2014/05/making-modelsim-altera-starter-edition.html)
