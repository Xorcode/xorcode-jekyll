---
layout: post
title: "AWS PaaS: Running Node.js with Dokku on an Ubuntu instance"
date: 2013-07-28 11:48
comments: true
categories: Cloud Server
tags: node.js dokku docker ubuntu paas
description: After having tried several fully featured PaaS stacks such as Nodejitsu, Heroku, and OpenShift we decided to roll our own simple PaaS stack with Dokku and AWS.
---
After having tried several fully featured <abbr title="Platform As A Service">PaaS</abbr> stacks such as [Nodejitsu]({{ 'https://www.nodejitsu.com/' | bitly }}), [Heroku]({{ 'https://www.heroku.com/' | bitly }}), and [OpenShift]({{ 'https://www.openshift.com/' | bitly }}) we decided to roll our own simple PaaS stack with [Dokku]({{ 'https://github.com/progrium/dokku' | bitly }}) and [AWS]({{ 'http://aws.amazon.com/' | bitly }}).

<!--more-->

> Docker powered mini-Heroku. The smallest PaaS implementation you've ever seen.

During our initial testing we started out with a *t1.micro* instance, which seemed sufficient for development needs. The instance consumes a constant 100% CPU during operation, yet the different services respond in a timely fashion with a few megabytes of RAM to spare with two to three applications running. Definitely not the configuration we would use for a production environment.

### Prerequisites

<div class="alert alert-error"><i class="icon-warning-sign"></i> Dokku requires the host name of the server to properly resolve or it will not install the necessary <code>VHOST</code> records. You can use any <abbr title="Fully Qualified Domain Name">FQDN</abbr> that will resolve using <code>dig +short $HOSTNAME</code> on your instance.</div>

The domain you use for your Dokku server needs to support wildcard sub-domains.

An example has been provided below:

```
example.org    A     <Elastic IP>
*              A     <Elastic IP>
```

Your server also needs to be able to respond to port 80, make sure that the Security Group for the server includes a rule that opens port 80 to `0.0.0.0/0` to ensure a proper working server.

### Creating AWS Instance

Instantiate a new <abbr title="Amazon Web Services">AWS</abbr> instance using the Ubuntu 13.04 image. Once this process completes, go ahead and log into the instance via <abbr title="Secure SHell">SSH</abbr> as the user **ubuntu**.

Also create a new Elastic IP and assign it to your newly created instance. Modify your DNS as described above to point both the bare domain as well as the wildcard sub domain to the assigned Elastic IP.

Set `/etc/hostname` to this domain name and make sure to also change the server host name.

```sh
$ sudo cat "example.org" > /etc/hostname
$ sudo hostname example.org
```

### Installing Dokku

After following the steps above, run the following command line script as the user **ubuntu**:

```sh
$ wget -qO- https://raw.github.com/progrium/dokku/master/bootstrap.sh | sudo bash
```

Dokku will begin installation, a process which usually takes less than five minutes to complete.

Once installation completes, Dokku will notify you to create a git key. Open a new terminal window on your local machine. Determine which SSH key to use for authentication. Most systems use either `id_dsa` or `id_rsa` by default.

```sh
$ cat ~/.ssh/id_rsa.pub | ssh example.org "sudo gitreceive upload-key example"
```

Once you have added your key to the Dokku server you are ready to deploy your first application to your new PaaS!

### Deploying Node.js to Dokku

Dokku supports Node.js as well as several other [buildpacks]({{ 'https://github.com/progrium/buildstep#supported-buildpacks' | bitly }}). In order to deploy your application to your Dokku instance follow these simple steps.

```sh
$ cd node-js-sample
$ git remote add example git@example.org:node-js-app
$ git push example master
```

This will initialize the deployment process and bootstrap your Node.js application on your Dokku server.

Once your application has been deployed, it will start responding on **http://node-js-app.example.org**.

Please see the [Dokku]({{ 'https://github.com/progrium/dokku' | bitly }}) project on Github for more information.
