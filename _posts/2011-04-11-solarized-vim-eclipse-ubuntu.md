---
layout: post
status: publish
published: true
title: Using Solarized colors with vim, Eclipse, and Ubuntu
date: 2011-04-11 16:59:17.000000000 -04:00
comments: true
categories: [Code]
tags: [eclipse,ubuntu]
alias: [/guides/solarized-vim-eclipse-ubuntu]
---

We discovered [Solarized](http://xorcode.net/ejFgVg) by Ethan Schoonover and instantly fell in love with its *"precision colors for machines and people."* Having read up on its properties and unique features we decided to try to make our Ubuntu systems use it as extensively as possible.

<!--more-->

> <img src="/uploads/2011/04/solarized-yinyang-150x150.png" class="pull-right"> Solarized is a sixteen color palette (eight monotones, eight accent colors) designed for use with terminal and gui applications. It has several [unique properties](http://xorcode.net/fK0voM). Ethan Schoonover designed this colorscheme with both precise [CIELAB](http://xorcode.net/ezzkDl) lightness relationships and a refined set of hues based on fixed color wheel relationships.

[Solarized](http://xorcode.net/ejFgVg) comes with color profiles for Mac OS X, Vim, Mutt, as well as with color palettes for Adobe Photoshop, Apple Color Picker, and GIMP.

<a class="btn btn-primary" href="http://ethanschoonover.com/solarized/files/solarized.zip"><i class="fa fa-download"></i> Download Solarized</a>

![Solarized Explained](/uploads/2011/04/solarized-vim.png)

> Solarized works as a sixteen color palette for compatibility with common terminal based applications / emulators. In addition, it has been carefull designed to scale down to a variety of five color palettes (four base monotones plus one accent color) for use in design work such as web design. In every case it retains a strong personality but doesn’t overwhelm.

## Gnome Terminal

### New method

<span class="label label-info">Updated</span> Jeff from Codefork.com supplied a shell script version of Tim Martin's script that will set your terminal colors to Solarized dark or light from the command line. Save the contents of this gist as solarize.sh:

{% gist 1397104/solarize.sh %}

<span class="label label-info">Fork</span> MontagueRanjel left a comment with an updated version of Jeff's script that allows you to unset the changes made to your terminal configuration:

{% gist 2660659/mate-term-solarize.sh %}

Before running this script please make a new copy of your current terminal profile in the "Edit" > "Profiles" menu in case you want to switch back later. To use this script, paste this file into your home folder as `solarize.sh` and then run `chmod +x solarize.sh`.

## Vim

Close down Vim and copy the `solarized.vim` file into your Vim settings directory:

```sh
$ mkdir -p ~/.vim/colors; cp solarized.vim ~/.vim/colors
```

Now open up your Vim configuration file:

```sh
$ vim ~/.vimrc
```

Add the following to the top of the file:

```vim
syntax enable
if has('gui_running')
    set background=light
else
    set background=dark
endif
set t_Co=16
let g:solarized_termcolors=16
colorscheme solarized
```

## Eclipse

Eclipse requires you to download the Eclipse Color Theme plug-in before you can use the Solarized theme.

<a class="btn btn-primary" href="http://xorcode.net/dSgWwf"><i class="fa fa-download"></i> Download Eclipse Color Theme</a>

Once you have downloaded and installed the Eclipse plug-in you can download the Solarized Dark and Solarized Light themes.

<a class="btn btn-primary" href="http://xorcode.net/h0Op38"><i class="fa fa-download"></i> Solarized Dark Theme</a>

<a class="btn btn-primary" href="http://xorcode.net/fL6Jps"><i class="fa fa-download"></i> Solarized Light Theme</a>

Several other syntax highlighters and adaptations of Ethan's Solarized exist, if you cannot find a scheme for your tool of choice, make your own and let Ethan know what you have contributed!

<span class="label label-info">Kudos!</span> Thanks to *Otis Bean* for pointing out that using `gconf-editor` is the right way to go about editing configuration files.
