---
layout: post
title: "Round Robin MongoDB backups to S3 with Tar"
description: ""
comments: true
categories: Cloud Server
tags: tar mongodb amazon s3
description: Have you been looking for an easy way to back something up to the cloud with minimum effort? Having explored several options we settled on the most simple solution available. Tar and Amazon S3.
---

Have you been looking for an easy way to back something up to the cloud with minimum effort? Having explored several options we settled on the most simple solution available. [Tar]({{ 'http://www.gnu.org/software/tar/' | bitly }}) and [Amazon S3]({{ 'http://aws.amazon.com/s3/' | bitly }}).

<!--more-->

> <img src="/uploads/2012/08/gnu-head.png" class="pull-right"> The Tar program provides the ability to create tar archives, as well as various other kinds of manipulation. For example, you can use Tar on previously created archives to extract files, to store additional files, or to update or list files which were already stored. Initially, tar archives were used to store files conveniently on magnetic tape. The name "Tar" comes from this use; it stands for **t**ape **ar**chiver. Despite the utility's name, Tar can direct its output to available devices, files, or other programs (using pipes), it can even access remote devices or files (as archives).

**backup.sh**

{% gist 3430452/backup.sh %}

**tarsplitter.sh**

{% gist 3430452/tarsplitter.sh %}

Make sure that `s3cmd` or `s3multiput` is in your environment path.

### Running on an AWS instance

As long as you are on an AWS instance you have the `s3multiput` utility installed and ready to start using these scripts right away. We noticed on our AWS instance that `s3multiput` did not work because FileChunkIO was not installed. The S3 command line tools are written in Python, so we installed FileChunkIO with the following command:

```sh
$ sudo easy_install FileChunkIO
```

### Non-AWS scenarios

If you are not on an AWS instance, you have to install [s3cmd]({{ 'http://s3tools.org/s3cmd' | bitly }}). Unfortunately the S3 tools available in AWS are not yet packaged for Ubuntu, which however has some [native package support]({{ 'http://alestic.com/2012/05/aws-command-line-packages' | bitly }}) for other AWS services.

#### Installing S3 Tools on Ubuntu

If you happen to have Ubuntu 12.04 LTS you can safely install `s3cmd` with `apt-get`.

```sh
$ sudo apt-get install s3cmd
```

Otherwise we recommend that you install from [source]({{ 'http://sourceforge.net/project/showfiles.php?group_id=178907&package_id=218690#files' | bitly }}).

#### Installing S3 Tools on RPM-based systems

> Users of Suse (Novell) and RedHat based Linux distributions are encouraged to add our [package repository]({{ 'http://s3tools.org/repositories' | bitly }}) to their package managers. That way you’ll always stay up to date with your s3cmd package.

As stated above it is best to add the package repository to stay up to date with the S3 tools.

#### Installing S3 Tools from source

Check out the source of S3 tools:

```sh
$ git clone git://github.com/s3tools/s3cmd.git
$ cd s3cmd
$ sudo python setup.py install
```

The above requires that you have the Python distutils module. On a Debian system (such as Ubuntu):

```sh
$ sudo apt-get install python-setuptools
```

#### Configure s3cmd

You have to run `s3cmd --configure` in order to make `s3cmd` work. This will take you through a set of guided prompts setting up your access key and secret key as well as encryption.
