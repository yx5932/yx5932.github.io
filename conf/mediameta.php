<?php
/**
 * This configures which meta data will be editable through
 * the media manager. Each field of the array is an array with the
 * following contents:
 *   fieldname - Where data will be saved (EXIF or IPTC field)
 *   label     - key to lookup in the $lang var, if not found printed as is
 *   htmltype  - 'text', 'textarea' or 'date'
 *   lookups   - array additional fields to lookup the data (EXIF or IPTC fields)
 *
 * The fields are not ordered continously to make inserting additional items
 * in between simpler.
 *
 * This is a PHP snippet, so PHP syntax applies.
 *
 * Note: $fields is not a global variable and will not be available to any
 *       other functions or templates later
 *
 * You may extend or overwrite this variable in a optional
 * conf/mediameta.local.php file
 *
 * For a list of available EXIF/IPTC fields refer to
 * http://www.dokuwiki.org/devel:templates:detail.php
 */


$fields = array(
    10 => array('Iptc.Headline',
                '名称',
                'text'),
    20 => array('Iptc.Keywords',
                '关键词',
                'text'),
    30 => array('Iptc.Caption',
                '描述',
                'textarea',
                array('Exif.UserComment',
                      'Exif.TIFFImageDescription',
                      'Exif.TIFFUserComment')),
);
