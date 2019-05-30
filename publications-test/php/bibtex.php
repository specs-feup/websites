<?php

require_once 'utils.php';

/**
 * Bibtex parsing lib from: http://bibliophile.sourceforge.net/
 */
require_once 'PARSEENTRIES.php';

/**
 * Parses an array of .bib files with the given name/path.
 *
 * @param array $file_names - an array with the names/paths of the .bib files
 * @return array - an associative array with bibtex entries
 */
function parse_bibtexs($file_names) {


    $mergedEntries = array();

    foreach ($file_names as $file_name) {
        $parse = NEW PARSEENTRIES();
        $parse->expandMacro = FALSE;
        $parse->fieldExtract = TRUE;
        $parse->openBib($file_name);
        $parse->extractEntries();
        $parse->closeBib();
        list($preamble, $strings, $entries, $undefinedStrings) = $parse->returnArrays();

        foreach ($entries as $entry) {
            // Skip entry if already in entries
            if (array_key_exists($entry['bibtexCitation'], $mergedEntries)) {
                continue;
            }

            // Skip entries that do not have authors
            if (!array_key_exists('author', $entry)) {
                continue;
            }

            // Add entry
            $mergedEntries[$entry['bibtexCitation']] = $entry;
        }
    }


    return $mergedEntries;
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

    //$entry_code .= add_strong("[" . $entry['type'] . "] " . $entry['title']);
    $entry_code .= add_strong($entry['title']);

    $author = $entry['author'];
    if ($author != '') {
        $entry_code .= '</br>' . $author;
    }

    if ($entry['booktitle']) {
        $entry_code .= '</br>' . add_em($entry['booktitle']);
    }

    $entry_code .= '</br>';
//    $date = $months[$entry['month']];

    if ($entry['day']) {
        $date .= ' ' . $entry['day'];
    }

    if ($date) {
        $date .= ', ';
    }

    //$date .= $entry['year'];

    $entry_code .= $date;

    if ($entry['address']) {
        $entry_code .= ', ' . $entry['address'];
    }

    if ($entry['url']) {
        $entry_code .= '</br>';
        $entry_code .= 'Download <a href="' . $entry['url'] . '">here</a>.';
    }

    if ($entry['poster']) {
        $entry_code .= '</br>';
        $entry_code .= 'Download poster <a href="' . $entry['poster'] . '">here</a>.';
    }

    return $entry_code;
}
