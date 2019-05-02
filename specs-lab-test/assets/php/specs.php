<?php

/**
 * Tests building the HTML code for the members
 */

function get_members_test()  {

    $members = json_decode(file_get_contents('db/specs_members.json'), true);

    $html = '';

    foreach ($members as $member) {

        if (array_key_exists('ORCID', $member)) {
            echo '<p> ORCID: ' . $member['ORCID'] . '</p>';
         }

        if (array_key_exists('Nationality', $member)) {
            echo '<p> Nationality: ' . $member['Nationality'] . '</p>';
        }

        if (array_key_exists('Email', $member)) {
            echo '<p> Email: ' . $member['Email '] . '</p>';
        }

        if (array_key_exists('Web Page', $member)) {
            echo '<p> Web Page: ' . $member['Web Page'] . '</p>';
        }

        if (array_key_exists('Affiliation', $member)) {
            echo '<p> Affiliation: ' . $member['Affiliation'] . '</p>';
        }

        if (array_key_exists('Position', $member)) {
            echo '<p> Position: ' . $member['Position'] . '</p>';
        }

        if (array_key_exists('Web Page', $member)) {
            echo '<p> Web Page: ' . $member['Web Page'] . '</p>';
        }
    }
} 

