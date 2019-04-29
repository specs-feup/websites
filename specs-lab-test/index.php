<!DOCTYPE html>
<?php
require_once 'assets/php/antarex.php';
?>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="ANTAREX H2020 Project">
        <meta name="author" content="SPeCS Lab, FEUP, Porto">
        <title>ANTAREX: <?php echo get_title() ?></title>

        <link href='https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,latin-ext,cyrillic,cyrillic-ext' rel='stylesheet' type='text/css'>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/antarex.css">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.4.0/fullcalendar.min.css">
        <!--<link rel="stylesheet" href="assets/css/responsive-calendar.css" media="screen">-->




        <!--favicon-->
        <link rel="shortcut icon" type="image/png" href="assets/img/logo/favicon.png"/>

        <!--GOOGLE ANALYTICS-->
        <script>
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-68124709-2', 'auto');
            ga('send', 'pageview');

        </script>

    </head>
    <body data-spy="scroll" data-target="#navbar-main" data-offset="95">


        <?php
        echo get_navbar();
        ?>



        <?php
        include get_content_page();
        ?>


        <!--FOOTER-->
        <div id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-1 centered">
                        <img id="eu-flag"  src="assets/img/eu_flag.svg"  alt="EU Emblem">
                    </div>
                    <div class="col-md-10 centered">
                        <span class="footer">
                            <p>
                                This project is partially funded by the European Union’s Horizon 2020 research and innovation programme under grant agreement <a href="http://cordis.europa.eu/project/rcn/197938_en.html" rel="nofollow">No 671623</a>.
                            </p>
                            <p>
                                Copyright &copy; 2015 ANTAREX. Original design by <a href="http://www.templategarden.com" rel="nofollow">TemplateGarden</a>.
                            </p>
                        </span>
                    </div>
                    <div id="social-div" class="col-md-1">
                        <ul class="list-inline social-buttons">
                            <li><a href="https://twitter.com/antarex_project"><i class="fa fa-twitter"></i></a> </li>
                            <li><a href="https://www.facebook.com/Antarex-1660673857550758/timeline/"><i class="fa fa-facebook"></i></a> </li>
                            <li><a href="https://www.linkedin.com/grp/home?gid=8409003"><i class="fa fa-linkedin"></i></a> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--FOOTER-->

        <!-- To be able to detect responsive breakpoits -->
        <div class="device-xs visible-xs"></div>
        <div class="device-sm visible-sm"></div>
        <div class="device-md visible-md"></div>
        <div class="device-lg visible-lg"></div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" ></script>

        <script src="assets/js/antarex.js"></script>

        <script src="assets/js/smoothscroll.js" ></script>

        <!--PAGINATION-->
        <script src="assets/js/bootstrap-paginator.js"></script>
        <script src="assets/js/pager.js"></script>


        <!--CALENDAR-->
<!--        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.4.0/fullcalendar.min.js"></script>
        <script src="assets/js/calendar.js"></script>-->



    </body>
</html>
