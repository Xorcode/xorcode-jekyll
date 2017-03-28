---
layout: post
title: "Magento: Generic URL Rewrite Importer"
date: 2013-09-15 12:26
comments: true
categories: Code
tags: magento wordpress woocommerce extensions
---
Ever needed to import a large set of generic URL rewrites into Magento? The Generic URL Rewrite Importer for Magento helps you do just that!
<!--more-->
Xorcode just moved a sizable e-commerce site from [WordPress](http://xorcode.net/193sDO2)/[WooCommerce](http://xorcode.net/193sCtt) to [Magento](http://xorcode.net/1efkdKU). We faced the daunting task of creating over 20,000 URL rewrites since the URL slug structure of Magento ended up being slightly different from what WordPress created.

Manually entering 20,000+ URL rewrites didn't sound like fun, so we looked at other options. We could buy an extension, or we could write our own for this specific task. We choose to roll our own. Since we wrote it, we'll share it with you, for free. If you use it and like it, you can always [Flattr](https://flattr.com/profile/xorcode) this article, or send us a donation with PayPal.

<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="SADU3WX2H6CFY">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>

### Usage

Install the extension in your Magento site by logging into your admin panel and going to *Magento Connect Manager*, which is under the *System* menu. Once there, use the **Direct package file upload** option and upload the package file supplied with this article.

<a href="http://xorcode.net/1bwM9dc" class="button"><i class="fa fa-download"></i> Download URL Rewrite Importer</a>

### Creating an import profile

Once you have installed the package you need to create a new **Advanced Dataflow Profile**, you can find this under *System > Import/Export > Dataflow - Advanced Profiles*. Create your profile, name it anything you want, we suggest "Xorcode Dataflow Urlrewrite Importer."

Enter the following <abbr title="eXtended Markup Language">XML</abbr> in the *Actions XML* field:

```xml
<action type="dataflow/convert_adapter_io" method="load">
    <var name="type">file</var>
    <var name="path">var/import</var>
    <var name="filename"><![CDATA[url_rewrites.csv]]></var>
    <var name="format"><![CDATA[csv]]></var>
</action>
<action type="dataflow/convert_parser_csv" method="parse">
    <var name="delimiter"><![CDATA[,]]></var>
    <var name="enclose"><![CDATA["]]></var>
    <var name="fieldnames">true</var>
    <var name="store"><![CDATA[default]]></var>
    <var name="options"><![CDATA[RP]]></var>
    <var name="number_of_records">50</var>
    <var name="decimal_separator"><![CDATA[.]]></var>
    <var name="adapter">dataflow/convert_adapter_urlrewrite</var>
    <var name="method">parse</var>
</action>
```

You may wish to change the value of `store` and `options` to something other than the defaults provided. For instance, if your store's name is **Example**, enter `example` in the <abbr title="Character Data">CDATA</abbr> for the `store` var.

Upload a file called `url_rewrites.csv` to your web server and place it in the `var/import` folder of your Magento folder. You may have to create the `var/import` folder.

Now you are ready to run the profile. Click the **Run Profile** tab on the Dataflow profile, then click **Run Profile in Popup** and wait for magic.

If you have any suggestions, ideas, or bug reports, please [file issues in our repository](http://xorcode.net/193vmHs).
