
<?php

require_once 'json.php';

function get_current_members() {

    $all_members = json_decode(file_get_contents('db/specs_members.json'), true);
    $current = array_filter($all_members, "is_current_member");
    $members = array_filter($current, "is_status_member");
    $visitors = array_filter($current, "is_status_visitor");

    echo '<div class="row centered division-member">  <h3><b>Members</h3>';
    print_members_row($members);
    echo '</div>';
    echo '<div  class="row centered division-member"> <h3>Visitors</h3>';
    print_members_row($visitors);
    echo '</div>';
}

function get_past_members() {

    $all_members = json_decode(file_get_contents('db/specs_members.json'), true);
    $past = array_filter($all_members, "is_past_member");
    $members = array_filter($past, "is_status_member");
    $visitors = array_filter($past, "is_status_visitor");


    echo '<div  class="row centered division-member"> <h3>Members</h3>';
    print_members_row($members);
    echo '</div>';

    echo '<div  class="row centered division-member">     <h3>Visitors</h3>';
    print_members_row($visitors);
    echo '</div>';
}

function print_members_row($members) {

    global $counter;

    $template = ' <div class="col-md-2 events">
                <figure>
                    <div class="img-box">
                        <img class="img-responsive" src="$image_path" alt="">
                        <div class=" overlayleft">
                        <div class="overlay overlayFade">
                <div    class="blocktext"><b>$position
                </div>
                    </div>
                    </div>
                    <figcaption>
                        <h5>$firstname $lastname</h5>
                        <a data-toggle="modal" href=" #$id" class="btn btn-default btn-antarex">Info</a>
                    </figcaption>
                </figure>
            </div>
            <div class="modal fade" id="$id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">$name</h4>
                        </div>
                        <div class="modal-body">
                            <!--<img class="img-responsive" src="$image" alt="">-->
                            <div class="modal-text">

                                <img class="img-responsive" src="$image_path" alt="">
                                <p>

                                </p>
                                <p>
                                <b>Affiliation:</b> $affiliation
                                </p>

                                <p>
                                <b>Position:</b> $position
                                </p>

                                <p>
                                $context
                                </p>

                                <p>
                                <b>Current Status:</b> $current_status
                                </p>


                                <p>
                                $status
                                </p>




                                <p>
                                $visit
                                </p>

                                <p>
                                $fjobphd
                                </p>
                                                             <p>
                                $email
                                </p>

                                <p>
                                $twitter
                                </p>

                                <p>
                                $fjobmsc
                                </p>

                                <p>
                                $publickey
                                </p>

                                <p>
                                $supervisor
                                </p>

                                <p>
                                $orcid
                                </p>

                                <p>
                                $dblp
                                </p>

                                <p>
                                $researchg
                                </p>

                                <p>
                                $schoolar
                                </p>

                                <p>
                                $linkedin
                                </p>

                                <p>
                                $webpage
                                </p>


                            </div>

                        </div>
                      <div class="modal-footer">
                            <a class="btn btn-default btn-antarex" data-dismiss="modal">Close</a>
                        </div>
                    </div>
                </div>
            </div>';

    foreach ($members as $member) {

        $name = $member['Name'];
        $firstname = explode(" ", $name)[0];
        $lastname = explode(" ", $name);
        $lastname = end($lastname);
        $current_status = $member ['Current Status'];

        $affiliation = $member ["Affiliation"];
        $position = $member ['Position'];
        $id = "id" . $counter;
        $counter = $counter + 1;



        //-----------------------Optionals-----------------------//
        $context = '';
        if (array_key_exists('Context', $member)) {
            $context_val = $member['Context'];
            $context = "<p><b>Context: </b>" . $context_val . "</p>";
        }

        $visit = '';
        if (array_key_exists('Visiting Period', $member)) {
            $visit_val = $member['Visiting Period'];
            $visit = "<p><b>Visiting Period: </b>" . $visit_val . "</p>";
        }


        $fjobphd = '';
        if (array_key_exists('FirstJobAfterPhD', $member)) {
            $fjobphd_val = $member['FirstJobAfterPhD'];
            $fjobphd = "<p><b>First Job After PhD: </b>" . $fjobphd_val . "</p>";
        }


        $status = '';
        if (array_key_exists('Status', $member)) {
            $status_val = $member['Status'];
            $status = "<p><b>Status: </b>" . $status_val . "</p>";
        }


        $orcid = '';
        if (array_key_exists('ORCID', $member)) {
            $orcid_val = $member['ORCID'];
            $orcid = "<a href='$orcid_val' target='_blank'><b>ORCID</a>";
        }



        $dblp = '';
        if (array_key_exists('DBLP', $member)) {
            $dblp_val = $member['DBLP'];
            $dblp = "<a href='$dblp_val' target='_blank'><b>DBLP</a>";
        }


        $researchg = '';
        if (array_key_exists('Research Gate', $member)) {
            $researchg_val = $member['Research Gate'];
            $researchg = "<a href='$researchg_val' target='_blank'><b>Research Gate</a>";
        }



        $schoolar = '';
        if (array_key_exists('Schoolar Google', $member)) {
            $schoolar_val = $member['Schoolar Google'];
            $schoolar = "<a href='$schoolar_val' target='_blank'><b>Schoolar Google</a>";
        }

        $linkedin = '';
        if (array_key_exists('LinkedIn', $member)) {
            $linkedin_val = $member['LinkedIn'];
            $linkedin = "<a href='$linkedin_val' target='_blank'><b>LinkedIn</a>";
        }

        $twitter = '';
        if (array_key_exists('Twitter', $member)) {
            $twitter_val = $member['Twitter'];
            $twitter = "<p><b>Twitter@: </b>" . $twitter_val . "</p>";
        }

        $webpage = '';
        if (array_key_exists('WebPage', $member)) {
            $webpage_val = $member['WebPage'];
            $webpage = "<a href='$webpage_val' target='_blank'><b>WebPage</a>";
        }

        $email = '';
        if (array_key_exists('Email', $member)) {
            $email_val = $member['Email'];
            $email = "<p><b>Email: </b>" . $email_val . "</p>";


            $testeimagem = explode("@", $email_val)[0];
            // TODO: Disabled, for now
            //$image_path = "assets/img/labmembers/" . $testeimagem . ".png";
            $image_path = "assets/img/labmembers/generic.png";
        } else {
            $image_path = "assets/img/labmembers/generic.png";
        }



        $fjobmsc = '';
        if (array_key_exists('First Job After PhD/MSc', $member)) {
            $fjobmsc_val = $member['First Job After PhD/MSc'];
            $fjobmsc = "<p><b>First Job After PhD/MSc: </b>" . $fjobmsc_val . "</p>";
        }

        $publickey = '';
        if (array_key_exists('Public Key FCT', $member)) {
            $publickey_val = $member['Public Key FCT'];
            $fjobmsc = "<p><b>Public Key FCT: </b>" . $publickey_val . "</p>";
        }

        $supervisor = '';
        if (array_key_exists('Supervisor', $member)) {
            $supervisor_val = $member['Supervisor'];
            $supervisor = "<p><b>Supervisor: </b>" . $supervisor_val . "</p>";
        }

        $sub = array(
            '$name' => $name,
            '$current_status' => $current_status,
            '$context' => $context,
            '$id' => $id,
            '$email' => $email,
            '$affiliation' => $affiliation,
            '$position' => $position,
            '$webpage' => $webpage,
            '$orcid' => $orcid,
            '$visit' => $visit,
            '$supervisor' => $supervisor,
            '$publickey' => $publickey,
            '$fjobmsc' => $fjobmsc,
            '$email' => $email,
            '$webpage' => $webpage,
            '$twitter' => $twitter,
            '$linkedin' => $linkedin,
            '$schoolar' => $schoolar,
            '$researchg' => $researchg,
            '$dblp' => $dblp,
            '$status' => $status,
            '$fjobphd' => $fjobphd,
            '$image_path' => $image_path,
            '$firstname' => $firstname,
            '$lastname' => $lastname,
        );

        echo strtr($template, $sub);
    }
}

//-------------------------------------------------------P A S T    M E M B E R S -------------------------------------------------------------------------//

function is_current_member($member) {

    $curr_status_val = $member['Current Status'];
    $testecurrent = explode(" ", $curr_status_val)[0];

    return $testecurrent === 'Member';
}

function is_past_member($member) {

    return !is_current_member($member);
}

function is_status_visitor($member) {
    return !is_status_member($member);
}

function is_status_member($member) {

    $memberstatus_val = $member['Status'];

    return $memberstatus_val === 'Member';
}

function get_pubs() {
    echo '<h1>Bibliography</h1></br>';

    //$bibtexs = array(1 => 'bib/test1.bib', 2 => 'bib/test2.bib');
    $entries = parse_json_bib('db/specs_bib.json');
    $members = json_decode(file_get_contents('db/specs_members2.json'), true);



    // Add entries by year, for the last 5 years
    for ($i = 0; $i <= 20; $i++) {


        $year = 2019 - $i;

        $yearEntries = array();

        foreach ($entries as $id => $entry) {

            if ($entry['year'] == $year) {
                // Add entry

                $yearEntries[$id] = $entry;
            }
        }


        // If no entries, skip
        if (sizeof($yearEntries) < 1) {
            continue;
        }

        echo '<div class="buttonclick">';

        //echo '<h2>' . $year . '⏬' . '</h2>';
        echo '<h2>' . $year . '</h2>';
        echo '</div>';




//    for ($i = 0; $i <= 20; $i++) {
//        $year = 2019 - $i;
//        $bibliography = '<div  class="row">
//        <h1   class="members-section centered"> <b> $year</b></h1>';
// Only print entries of the current year


        echo '<div id="publications_year">';


        echo build_bib_section($yearEntries, $members, "build_presentation_entry_pubs");
        echo '</div>';
    }
}
