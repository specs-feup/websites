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
                                    <b>Nationality:</b> $nationality
                                </p>
                                <p>
                                    <b>Email:</b> $email
                                </p>
                                <p>
                                    <b>Position:</b> $position
                                </p>

                                $webpage
                                
                                <p>
                                
                                $affiliation
                                
                                </p>
                                <p>
                                
                                $orcid
                                
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
        $image = $member ["Image"];
        $id = "id" . $counter;
        $counter = $counter + 1;
        $nationality = $member['Nationality'];
        $email = $member['Email'];
        $position = $member ['Position'];

        $webpage = '';
        if (array_key_exists('WebPage', $member)) {
            $webpage_val = $member['WebPage'];
            $webpage = "<p><b>Web Page: </b>" . $webpage_val . "</p>";
        }
        
         $affiliation = '';
        if (array_key_exists('Affiliation', $member)) {
            $affiliation_val = $member['Affiliation'];
            $affiliation = "<p><b>Affiliation: </b>" . $affiliation_val . "</p>";
            
        }
        
         $orcid = '';
        if (array_key_exists('orcid', $member)) {
            $orcid_val = $member['orcid'];
            $orcid = "<p><b>ORCID: </b>" . $orcid_val . "</p>";
        }
       

        $sub = array(
            '$name' => $name,
            '$image' => $image, 
            '$id' => $id,
            '$nationality' => $nationality,
            '$email' => $email,
            '$affiliation' => $affiliation,
            '$position' => $position,
            '$webpage' => $webpage,
            '$orcid' => $orcid
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
