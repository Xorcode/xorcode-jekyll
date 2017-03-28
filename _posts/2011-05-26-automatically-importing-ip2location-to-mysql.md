---
layout: post
status: publish
published: true
title: Automatically importing IP2Location to MySQL
date: 2011-05-26 15:23:06.000000000 -04:00
categories: Code
tags: web php
---

Have you ever found that you need to know where in the world a user happens to browse from? We did, and we tried several API services that proved to be unreliable and also created overhead when an API call was placed for each visitor of the site.

<!--more-->

> <img src="{{ '/assets/uploads/2011/05/globe-150x150.png' | relative_url }}" class="pull-right"> [IP2Location](http://xorcode.net/jdBHWg) is a geo IP solution to help you to identify visitor's geographical location, such as country, region, city, latitude, longitude, ZIP code, time zone, connection speed, ISP and domain name, IDD country code, area code, weather station code and name, and mobile carrier information using a proprietary IP address lookup database and technology without invading the Internet user's privacy.

## Requirements

 * [PHP 5.3.x](http://xorcode.net/jBkXxG)
 * [Zend Framework 1.11.x](http://xorcode.net/lm0zQC)

### Import Script

The following simple script utilizes straight MySQL calls instead of using any kind of Zend DB functionality. As an exercise to the reader you could insert calls to Doctrine or Zend DB here instead. We will be using <a href="http://xorcode.net/lhFyOz" target="_blank">Zend_Filter_Decompress</a> to extract the information from the archive file being downloaded.

We will download the free version of the [IP database](http://xorcode.net/lAyPsB), which requires that you have [set up an API key](http://xorcode.net/jfZKkW) by registering.

{% highlight php filename="import.php" %}
<?php
define('TEMP_DIR', sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'ipinfodb');
define('API_KEY', 'INSERT_YOUR_API_KEY_HERE');
define('DATABASE_URL', 'http://lite.ip2location.com/?file=IP2LOCATION-LITE-DB9.CSV.ZIP&key=' . API_KEY);
define('ARCHIVE_FILE', TEMP_DIR . DIRECTORY_SEPARATOR . 'ip2location.zip');
define('DATABASE_FILE', TEMP_DIR . DIRECTORY_SEPARATOR . 'IP2LOCATION-LITE-DB9.CSV');

define('DATABASE_HOST', '');
define('DATABASE_NAME', '');
define('DATABASE_USER', '');
define('DATABASE_PASS', '');
define('DATABASE_TABLE', 'ipinfodb');

// "16778240","16779263","AU","AUSTRALIA","QUEENSLAND","MILTON","-35.316667","150.433333","-"
define('FIELD_IP_START', 0);
define('FIELD_IP_END', 1);
define('FIELD_COUNTRY_CODE', 2);
define('FIELD_COUNTRY_NAME', 3);
define('FIELD_STATE', 4);
define('FIELD_CITY', 5);
define('FIELD_LATITUDE', 6);
define('FIELD_LONGITUDE', 7);
define('FIELD_ZIP', 8);

$field_map = array(
	FIELD_IP_START => 'ip_start',
	FIELD_IP_END => 'ip_end',
	FIELD_COUNTRY_CODE => 'country_code',
	FIELD_COUNTRY_NAME => 'country_name',
	FIELD_STATE => 'state',
	FIELD_CITY => 'city',
	FIELD_LATITUDE => 'latitude',
	FIELD_LONGITUDE => 'longitude',
	FIELD_ZIP => 'zipcode'
);

if (!file_exists(TEMP_DIR)) {
	mkdir(TEMP_DIR, 0777);
}

if (!file_exists(DATABASE_FILE)) {
	require_once 'Zend/Filter/Decompress.php';
	$zip = new Zend_Filter_Decompress(array(
		'adapter' => 'Zip',
		'options' => array(
			'target' => TEMP_DIR
		)
	));

	$archive = file_get_contents(DATABASE_URL);
	file_put_contents(ARCHIVE_FILE, $archive, LOCK_EX);
	$result = $zip->filter(ARCHIVE_FILE);
}

if (($handle = fopen(DATABASE_FILE, 'r')) !== false) {
	$db = mysql_connect(DATABASE_HOST, DATABASE_USER, DATABASE_PASS);
	if (!$db) {
		die('Could not connect: ' . mysql_error());
	}
	$result = mysql_select_db(DATABASE_NAME, $db);
	if (!$result) {
		die('Could not select database: ' . mysql_error());
	}
	$row = 0;
	while (($data = fgetcsv($handle, 1000, ',')) !== false) {
		$fields = array();
		$values = array();
		foreach ($field_map as $num => $field) {
			$fields[$num] = sprintf('`%s`', $field);
			$values[$num] = sprintf("'%s'", mysql_real_escape_string($data[$num]));
		}
		$result = mysql_query(sprintf('INSERT INTO `%s` (%s) VALUES(%s)', DATABASE_TABLE, implode(',', $fields), implode(',', $values)), $db);
		if (!$result) {
			die('Invalid query: ' . mysql_error());
		}
		$row++;
	}
	printf('Imported %d rows.', $row);
	fclose($handle);
	mysql_close($db);
} else {
	die('Could not open database file: ' . DATABASE_FILE);
}
?>
{% endhighlight %}

The above script gives you a database table that you can query like this:

{% highlight php filename="query.php" %}
<?php
$sql = sprintf('SELECT * FROM ipinfodb WHERE ip_start <= %d ORDER BY ip_start DESC LIMIT 1', ip2long($_SERVER['REMOTE_ADDR']));
?>
{% endhighlight %}
