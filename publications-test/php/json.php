<?php

require_once 'utils.php';

/**
 * Parses a JSON file to an array .
 *
 * @param array $file_name - the name/path of the .json file
 * @return array - an associative array with bibtex entries
 */
function parse_json_bib($file_name) {
    $jsonArray = json_decode(file_get_contents($file_name), true);

    $filteredArray = array();

    foreach ($jsonArray as $id => $entry) {

        // Skip entry if already in entries
        //if (array_key_exists($entry['bibtexCitation'], $mergedEntries)) {
        //    continue;
        //}
        // Skip entries that do not have authors
        if (!array_key_exists('author', $entry)) {
            //echo "No author";
            continue;
        }

        //echo 'Found author';
        // Add entry
        $filteredArray[$id] = $entry;
    }

    return $filteredArray;
}

/**
 * Builds a section based on an array of bibtex entries.
 *
 * @param array $entries - all the bibtex entries
 * @param string/function $callback - the function that will deal with each entry
 * @return string - the HTML code of the section
 */
function build_bib_section($entries, $members, $callback) {

    if (!empty($entries)) {

        $presentations_code = '<ul>';

        foreach ($entries as $entry) {

            $entry_code = $callback($entry, $members);

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
function build_presentation_entry($entry, $members) {

    global $months;

    $entry_code = "";

    //$entry_code .= add_strong("[" . $entry['type'] . "] " . $entry['title']);
    $title = add_strong($entry['title']);

    if ($entry['ee']) {
        $title = '<a href="' . $entry['ee'] . '">' . $title . '</a>.';
    }

    $entry_code .= $title;

    $authors = $entry['author'];
    if ($authors) {
        $entry_code .= '</br>';

        $isFirst = true;
        foreach ($authors as $author) {
            if ($isFirst) {
                $isFirst = false;
            } else {
                $entry_code .= ', ';
            }

            // If $author is a member, make it bold
            $authorCode = $author;
            if (in_array($author, $members)) {
                $authorCode = '<strong>' . $authorCode . '</strong>';
            }

            $entry_code .= $authorCode;
        }
    }
    /*
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

     */
    /*
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
     */
    return $entry_code;
}
