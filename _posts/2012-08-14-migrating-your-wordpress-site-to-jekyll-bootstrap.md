---
layout: post
title: "Migrating Your WordPress Site to Jekyll Bootstrap"
comments: true
categories: Code
tags: jekyll jekyll-bootstrap wordpress ruby
---

We are always looking for ways to improve performance. As an exercise we tried to find the easiest, fastest, blog publishing tool out there. The engine behind [GitHub Pages](http://xorcode.net/Pb1LG2) caught our eye. Enter [Jekyll](http://xorcode.net/Pb1SBF). Then enter [Jekyll-Bootstrap](http://xorcode.net/SjE0JM).

<!--more-->

> <img src="/uploads/2012/08/jekyll-150x150.jpg" class="pull-right"> Jekyll is a simple, blog aware, static site generator. It takes a template directory (representing the raw form of a website), runs it through Textile or Markdown and Liquid converters, and spits out a complete, static website suitable for serving with Apache or your favorite web server. This is also the engine behind GitHub Pages, which you can use to host your project’s page or blog right here from GitHub.

Our previous choice of CMS happened to be WordPress simply because we design and maintain several WordPress installations for our clients. How does one migrate from WordPress to Jekyll?

### Installing Jekyll-Bootstrap

The Jekyll-Bootstrap site mentions that you can get your site up and running in three minutes. They are not exaggerating.

```sh
$ git clone https://github.com/plusjade/jekyll-bootstrap.git
$ cd jekyll-bootstrap
$ jekyll --server
```

Navigate to [http://localhost:4000/](http://localhost:4000/) and see what the fuss is about.

### Migrating from WordPress to Jekyll

<span class="label label-warning">vanilla migration</span> Migrating from WordPress to Jekyll happens to be dead simple:

```sh
$ sudo gem install sequel mysqlplus
$ ruby -rubygems -e 'require "jekyll/migrators/wordpress"; Jekyll::WordPress.process("database", "user", "pass")'
```

<span class="label label-info">custom migration</span> However, the WordPress migrator that comes packaged with Jekyll does not support importing tags and categories. The [mojombo/jekyll](http://xorcode.net/Pb1SBF) repository contains a more [up-to-date version](http://xorcode.net/Pb3FGT). Download that and put it in a `lib/` folder inside your `jekyll-bootstrap/` directory.

The syntax for the newer migrator has changed slightly and also introduces a way to pass options into it:

```sh
$ ruby -rubygems -r './lib/wordpress' -e 'Jekyll::WordPress.process("database", "user", "pass", "host", { :comments => false })'
```

As you may have noticed, we specified a host and also turned off importing comments since we are using [Disqus](http://disqus.com/) as our comment engine.

Since we intend to use Jekyll-Bootstrap we also made a slight change to the `wordpress.rb` migrator.

<a class="btn btn-primary" href="http://xorcode.net/SjIFeO"><i class="fa fa-bookmark"></i> Look at our wordpress.rb</a>

### Picking a parser

When you first migrate from WordPress you may run into issues with parsing. Our posts were in straight HTML format and Haruku complained and sometimes would not even finish rendering pages because of our inline HTML blocks.

There are several parsers to choose from:

 * Haruku <span class="label">default</span>
 * Rdiscount <span class="label label-info">our pick</span>
 * Kramdown

From tests we determined that Rdiscount suited our content best. We have run it extensively against our content and everything renders flawlessly. There are discussions a-plenty about the performance of these plugins so we suggest you run your own tests and benchmarks to decide on a parser that suits you.

#### Installing the parser

We selected Rdiscount. Rdiscount does not come default with Jekyll so it needs to be installed:

```sh
$ sudo gem install rdiscount
```

This also means that you will have to modify your `_config.yml` file accordingly:

```yaml
markdown: rdiscount
rdiscount:
  extensions: []
```

### Customizing Jekyll-Bootstrap

Once you have the site up and running you can start customizing the templates and the layouts. Since Jekyll-Bootstrap has support for themes you can safely create your own theme without destroying original files.

Take a look at what we have done with Jekyll and Jekyll-Bootstrap:

<a class="btn btn-primary" href="http://xorcode.net/NjG0AV"><i class="fa fa-github"></i> Jekyll-Bootstrap theme</a>

### In conclusion

So far we love Jekyll and Jekyll-Bootstrap! We also got to learn Ruby in the process.
