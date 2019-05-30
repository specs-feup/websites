<!DOCTYPE html>
<?php
//require_once 'php/bibtex.php';
require_once 'php/json.php';
?>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Test PHP</title>

        <link rel="stylesheet" href="css/specs-php.css">

    </head>
    <body>
        <?php
        echo '<h1>Bibliography</h1></br>';

        //$bibtexs = array(1 => 'bib/test1.bib', 2 => 'bib/test2.bib');
        $entries = parse_json_bib('db/specs_bib.json');
        $members = json_decode(file_get_contents('db/specs_members2.json'), true);



        // Add entries by year, for the last 5 years
        for ($i = 0; $i <= 5; $i++) {
            $year = 2019 - $i;
            echo '<h2>' . $year . '</h2>';

// Only print entries of the current year
            $yearEntries = array();

            foreach ($entries as $id => $entry) {
                if ($entry["year"] == $year) {
                    // Add entry
                    $yearEntries[$id] = $entry;
                }
            }

            echo build_bib_section($yearEntries, $members, "build_presentation_entry");
        }
        /*

         *
         */
        ?>
    </body>
</html>
