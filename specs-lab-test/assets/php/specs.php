
<?php

/**
 * Tests building the HTML code for the members
 */
function get_members_test() {

    $members = json_decode(file_get_contents('db/specs_members.json'), true);





    $template = ' <div class="col-md-4 events">
                <figure>
                    <div class="img-box">
                        <img class="img-responsive" src="$image" alt="">
                    </div>
                    <figcaption>
                        <h5>$name</h5>
                        <a data-toggle="modal" href="#$id" class="btn btn-default btn-antarex">More Details</a>
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
                            <img class="img-responsive" src="$image" alt="">
                            <div class="modal-text">
                                <p>
                                <b>Name:</b> $name
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
                                
                                <p>
                                $image_path
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
        $affiliation = $member ["Affiliation"];
        $position = $member ['Position'];
        $current_status = $member ['Current Status'];

        $image = $member ['Image'];


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
            $linkedin = "<a href='$linkein_val' target='_blank'><b>LinkedIn</a>";
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
            $image_path = "<p><b>Teste da imagem: </b>" . $testeimagem . "</p>";
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
            '$image' => $image,
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
            
        );

        echo strtr($template, $sub);












//           $html = "<div class=\"col-md-4 events\">
//                <figure>
//                    <div class=\"img-box\">
//                        <img class=\"img-responsive\" src=\"assets/img/labmembers/ideian2.jpg\" alt=\"\">
//                    </div>
//                    <figcaption>
//                        <h5>";
//   $html .= $member['Name'];
//   
//   $html .= "</h5>
//                        <a data-toggle=\"modal\" href=\"#kickoffModal\" class=\"btn btn-default btn-antarex\">More Details</a>
//                    </figcaption>
//                </figure>
//            </div>";
//echo $html;
//        if (array_key_exists('ORCID', $member)) {
//            echo '<p> ORCID: ' . $member['ORCID'] . '</p>';
//         }
//
//        if (array_key_exists('Nationality', $member)) {
//            echo '<p> Nationality: ' . $member['Nationality'] . '</p>';
//        }
//
//        if (array_key_exists('Email', $member)) {
//            echo '<p> Email: ' . $member['Email '] . '</p>';
//        }
//
//        if (array_key_exists('Web Page', $member)) {
//            echo '<p> Web Page: ' . $member['Web Page'] . '</p>';
//        }
//
//        if (array_key_exists('Affiliation', $member)) {
//            echo '<p> Affiliation: ' . $member['Affiliation'] . '</p>';
//        }
//
//        if (array_key_exists('Position', $member)) {
//            echo '<p> Position: ' . $member['Position'] . '</p>';
//        }
//
//        if (array_key_exists('Web Page', $member)) {
//            echo '<p> Web Page: ' . $member['Web Page'] . '</p>';
//        }
    }
}
