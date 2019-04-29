<?php

require_once 'utils.php';

/**
 * Bibtex parsing lib from: http://bibliophile.sourceforge.net/
 */
require_once 'PARSEENTRIES.php';

/* --------- bibtex parsing --------- */

$months = array(
    1 => 'January',
    2 => 'February',
    3 => 'March',
    4 => 'April',
    5 => 'May',
    6 => 'June',
    7 => 'July',
    8 => 'August',
    9 => 'September',
    10 => 'October',
    11 => 'November',
    12 => 'December',
);

/**
 * Builds the HTML code for the given Bibtex
 */
function build_references($bibtex_file) {

    $entries = parse_bibtex($bibtex_file);
    echo build_bibtex_section($entries, 'build_presentation_entry');
}

/**
 * Builds the HTML code for the presentations section.
 */
function build_presentations() {

    $entries = parse_bibtex("db/presentations.bib");
    echo build_bibtex_section($entries, 'build_presentation_entry');
}

/**
 * Builds the HTML code for the presentations section.
 */
function build_conferences() {

    $entries = parse_bibtex("db/conferences.bib");
    echo build_bibtex_section($entries, 'build_presentation_entry');
}

/**
 * Parses a .bib file with the given name/path.
 *
 * @param string $file_name - the name/path of the .bib file
 * @return array - an associative array with bibtex entries
 */
function parse_bibtex($file_name) {

    $parse = NEW PARSEENTRIES();
    $parse->expandMacro = FALSE;
    $parse->fieldExtract = TRUE;

    $parse->openBib($file_name);
    $parse->extractEntries();
    $parse->closeBib();

    list($preamble, $strings, $entries, $undefinedStrings) = $parse->returnArrays();

    return $entries;
}

/**
 * Builds a section based on an array of bibtex entries.
 *
 * @param array $entries - all the bibtex entries
 * @param string/function $callback - the function that will deal with each entry
 * @return string - the HTML code of the section
 */
function build_bibtex_section($entries, $callback) {

    if (!empty($entries)) {

        $presentations_code = '<ul>';

        foreach ($entries as $entry) {

            $entry_code = $callback($entry);

            //if ($entry_code != '') {
            $presentations_code .= '<li>';

            $presentations_code .= $entry_code;

            $presentations_code .= '</li>';
            //}
        }

        $presentations_code .= '</ul>';

        return $presentations_code;
    }

    return '';
}

/**
 * Builds the HTML code for each entry in the presentations section.
 *
 * @global array $months - array with names of the months
 * @param array $entry - associative array with a single bibtex entry
 * @return string - the HTML code
 */
function build_presentation_entry($entry) {

    global $months;

    $entry_code = "";

    $type_code = "";
    $type = $entry['type'];
    if ($type != '') {
        $type_code = "[" . $type . "] ";
    }

    $title = add_strong($type_code . $entry['title']);
    if ($entry['url']) {
        $title = '<a target="_blank" href="' . $entry['url'] . '">' . $title . '</a>.';
    }

    //$entry_code .= add_strong("[" . $entry['type'] . "] " . $entry['title']);
    $entry_code .= add_strong($title);

    $author = $entry['author'];
    if ($author != '') {
        $entry_code .= '</br>' . $author;
    }


    $entry_code .= '</br>' . add_em($entry['booktitle']) . ", ";
    //$entry_code .= '</br>';

    $date = $months[$entry['month']];

    if ($entry['day']) {
        $date .= ' ' . $entry['day'];
    }

    if ($date) {
        $date .= ', ';
    }

    $date .= $entry['year'];

    $entry_code .= $date;

    if ($entry['address']) {
        $entry_code .= ', ' . $entry['address'];
    }

    /*
      $urlText = 'Download';
      if ($entry['urltext']) {
      $urlText = $entry['urltext'];
      }

      if ($entry['url']) {
      $entry_code .= '</br>';
      $entry_code .= $urlText . ' <a href="' . $entry['url'] . '">here</a>.';
      }
     */

    if ($entry['poster']) {
        $entry_code .= '</br>';
        $entry_code .= 'Download poster <a href="' . $entry['poster'] . '">here</a>.';
    }

    if ($entry['doi']) {
        $doiLink = get_doi_link($entry['doi']);

        $entry_code .= '</br>';
        $entry_code .= 'DOI: ' . $doiLink;
    }

    return $entry_code;
}

/* --------- page building --------- */

function get_content_page() {

    /* Fetch the page name. */
    $page = fetch_page_arg();

    $content_page = $page . '.html';

    return $content_page;
}

function fetch_page_arg() {

    $page = filter_input(INPUT_GET, 'page', FILTER_CALLBACK, array("options" => "is_page_allowed"));

    if ($page == false || $page == null) {

        $page = 'home';
    }

    return $page;
}

/**
 * Checks if the page is on the allowed pages list.
 *
 * @param type $page_name
 * @return type
 */
function is_page_allowed($page_name) {

    $pages = file('allowed.txt', FILE_IGNORE_NEW_LINES);

    if (in_array($page_name, $pages)) {
        return $page_name;
    }

    return false;
}

function get_navbar() {

    $string_to_replace = fetch_page_arg();

    $navbar_contents = file_get_contents('navbar.html');

    $final_content = str_replace('href="' . $string_to_replace . '#', 'href="#', $navbar_contents);

    return $final_content;
}

function get_title() {

    $titles = array(
        'home' => 'Home',
        'project' => 'Project Description',
        'events' => 'Activities and Events',
        'media' => 'Media Center',
        'dissemination' => 'Dissemination'
    );

    $base_name = fetch_page_arg();

    return $titles[$base_name];
}

?>