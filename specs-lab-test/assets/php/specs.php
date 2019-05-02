<?php

/**
 * Tests building the HTML code for the members
 */
function get_members_test() {

    $members = json_decode(file_get_contents('db/specs_members.json'), true);

    foreach ($members as $member) {
        echo '<p>' . $member['name'] . '</p>';

        if (array_key_exists('ORCID', $member)) {
            echo '<p> ORCID: ' . $member['ORCID'] . '</p>';
        }
    }
}
