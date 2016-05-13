<?php
/*
Plugin Name: Auto Plagin
Plugin URI: none
Description: calculating auto taxes
Version: 1.0
Author: Anna Pokidina
*/
if(!defined('WP_CONTENT_URL'))
	define('WP_CONTENT_URL', get_option('siteurl') . '/wp-content');
if(!defined('WP_CONTENT_DIR'))
	define('WP_CONTENT_DIR', ABSPATH . 'wp-content');
if(!defined('WP_PLUGIN_URL'))
	define('WP_PLUGIN_URL', WP_CONTENT_URL. '/plugins');
if(!defined('WP_PLUGIN_DIR'))
	define('WP_PLUGIN_DIR', WP_CONTENT_DIR . '/plugins');

class auto_calc_shortcode {
  static $add_script;
  static $add_styles;
  static function init () {
      add_shortcode('auto_calc', array(__CLASS__, 'auto_calc'));
      add_action('init', array(__CLASS__, 'register_script'));
      add_action('wp_footer', array(__CLASS__, 'register_style'));
      add_action('wp_footer', array(__CLASS__, 'print_script'));
  }
  static function auto_calc( $atts ) {
      self::$add_script = true; 
      self::$add_styles = true; 
	    $content =  file_get_contents(WP_PLUGIN_URL.'/'.plugin_basename(dirname(__FILE__)).'/auto_calc.html');
      $content = str_replace ( 'img/', WP_PLUGIN_URL.'/'.plugin_basename(dirname(__FILE__)).'/img/', $content );
    return  $content;
  }

  static function register_script() {
      wp_register_script( 'auto-js', WP_PLUGIN_URL.'/'.plugin_basename(dirname(__FILE__)).'/js/auto_script.js');
  }

  static function register_style() {
    if (self::$add_styles ){
    wp_enqueue_style(
    'auto-calc-style',
    WP_PLUGIN_URL.'/'.plugin_basename(dirname(__FILE__)).'/css/styles.css'
		);

     wp_enqueue_style(
    'auto-calc-style-theme',
    WP_PLUGIN_URL.'/'.plugin_basename(dirname(__FILE__)).'/css/bootstrap-theme.css',
    array('auto-calc-style')
		);

     add_action( 'wp_enqueue_scripts', 'auto-calc-style' );
     add_action( 'wp_enqueue_scripts', 'auto-calc-style-theme' );
}
  }
 
  static function print_script () {
      if ( !self::$add_script ) return;
      wp_print_scripts('auto-js');
  }

}
auto_calc_shortcode::init();
?>