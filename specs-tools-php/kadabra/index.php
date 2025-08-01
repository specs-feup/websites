<!DOCTYPE html>

<?php
require_once '../common/specsTools.php';
?>

<html>
    <head>
        <meta charset=utf-8>
        <title>Kadabra Tool</title>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,latin-ext,cyrillic,cyrillic-ext' rel='stylesheet' type='text/css'>
        <link rel=stylesheet href="../css/font-awesome.min.css">
        <link rel=stylesheet href="../css/common-style.css">
        <link rel=stylesheet href="kadabra.css">

        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
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

            ga('create', 'UA-39611099-1', 'up.pt');
            ga('send', 'pageview');
        </script>
    </head>
    <body>
        <header>
            <img src="kadabra_300dpi.png" class="header_img" alt="KADABRA"/>
            <!--<h1>Kadabra Online Demo</h1>-->
        </header>
        <div class="body">
            <div class="sidebar">
                <div class="section">
                    <li id="menu-try-it" class="active">Try it Online</li>
                    <li id="menu-copyright">About Kadabra</li>
                </div>

                <div class="section" id="menu-section-options">
                    <h3>Compile</h3>
                    <li id="menu-compile-to-java"><i class="fa fa-play"></i> Weave Application</li>

                    <h3>Options</h3>
                    <p>
                        Input<br>
                        <select id="input_type" onchange="onScriptTypeChange();">
                            <option value="lara" selected="selected">LARA</option>
                            <option value="js">JavaScript</option>
                        </select>
                    </p>
                    <!--<p><label>Main Type<input type="text" id="main-class"></label>-->
                    <p><label title="Compile with incomplete classpath"><input type="checkbox" id="incomplete-path"> Incomplete Path</label>  <!--checked-->

                    <h3>Text Editor</h3>
                    <p>Font size:
                        <select id="font_size">
                            <option value="8px">8</option>
                            <option value="10px">10</option>
                            <option value="12px" selected>12</option>
                            <option value="14px">14</option>
                            <option value="16px">16</option>
                            <option value="18px">18</option>
                            <option value="20px">20</option>
                            <option value="24px">24</option>
                        </select>
                    </p>
                    <p>Press F11 to toggle fullscreen</p>
                </div>

                <div class="section">
                    <h3>Resources</h3>
                    <li><a href="http://specs.fe.up.pt/tools/kadabra.zip">Download KADABRA</a></li>
                    <li><a href="http://specs.fe.up.pt/tools/kadabra/language_specification.html">Language Specification</a></li>
                    <li><a href="http://specs.fe.up.pt/tools/kadabra/doc/">API Documentation</a></li>
                    <li><a href="https://github.com/specs-feup/kadabra/">GitHub</a></li>
                </div>


                <?php echo get_related_tools('kadabra') ?>

                    <!--<a href="http://specs.fe.up.pt" class="aux-link"><img src="http://specs.fe.up.pt/img/SPeCS-logo.png" alt="SPeCS" /></a>
                    <a href="https://sigarra.up.pt/feup" class="aux-link"><img src="feup-logo.png" alt="FEUP" /></a>-->
            </div>

            <div class="content">
                <div id="try-it">
                    <div class="try-it-content">
                        <!-- JAVA SOURCE CODE -->
                        <div class="code-block" id="java">
                            <div class="header">
                                <span>Java Source Code</span>
                                <i class="fa fa-bars menu-trigger" id="java-menu-trigger"> More</i>
                                <div class="dropdown-menu-container" id="java-menu">
                                    <ul class="dropdown-menu">
                                        <li id="upload-java-file"><i class="fa fa-upload"></i> Upload File</li>
                                        <li class="dont-hide expander" data-target="java-tutorial">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Tutorial</span>
                                        </li>
                                        <ul class="nested-menu" id="java-tutorial">
                                            <li class="load-java-example" data-filename="MedianSmoother.java">6.1->6.3 MedianSmoother.java</li>
                                            <li class="load-java-example" data-filename="ExtendedMedianSmoother.java">6.4. MedianSmoother.java</li>
                                        </ul>
                                        <li class="dont-hide expander" data-target="java-examples">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Example</span>
                                        </li>
                                        <ul class="nested-menu" id="java-examples">
                                            <li class="load-java-example">HelloWorld.java</li>
                                            <li class="load-java-example">Fir1D.java</li>
                                            <li class="load-java-example">MedianSmoother.java</li>
                                            <li class="load-java-example">Sobel.java</li>
                                            <li class="load-java-example">WeightedSmoother.java</li>
                                            <li class="load-java-example">MatrixMultiplier.java</li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                            <div class="leave-fullscreen"><i class="fa fa-info-circle"></i> Press F11 to leave fullscreen</div>
                            <div id="javaEditor" class="editor"></div>
                        </div>
                        <!-- JAVA SOURCE CODE -->

                        <!-- LARA SOURCE CODE -->
                        <div class="code-block" id="lara">
                            <div class="header">
                                <span id="source_script_type">NOT SELECTED</span>
                                <i class="fa fa-bars menu-trigger" id="lara-menu-trigger"> More</i>
                                <div class="dropdown-menu-container" id="lara-menu">
                                    <!--<script src="../Matisse-new/script.js" type="text/javascript"></script>-->
                                    <ul class="dropdown-menu">
                                        <li id="toggle-ls"><i class="fa fa-book"></i> Toggle Language Specification</li>
                                        <li id="upload-lara-file"><i class="fa fa-upload"></i> Upload File</li>
                                        <li class="dont-hide expander" data-target="lara-tutorial">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Tutorial</span>
                                        </li>
                                        <ul class="nested-menu" id="lara-tutorial">
                                            <li class="load-lara-example" data-filename="StaticCodeReport.lara">6.1 StaticCodeReport.lara</li>
                                            <li class="load-lara-example" data-filename="StaticCallGraph.lara" >6.2 StaticCallGraph.lara</li>
                                            <li class="load-lara-example" data-filename="ExtendedStaticCallGraph.lara">6.2.1 ExtendedStaticCallGraph.lara</li>
                                            <li class="load-lara-example" data-filename="DynamicCallGraph.lara">6.3 DynamicCallGraph.lara</li>
                                            <li class="load-lara-example" data-filename="PrepareCall.lara">6.4 PrepareCall.lara</li>
                                            <li class="load-lara-example" data-filename="SpecializeWithSwitch.lara">6.4.1 SpecializeWithSwitch.lara</li>
                                            <li class="load-lara-example" data-filename="SpecializeWithMap.lara">6.4.2 SpecializeWithMap.lara</li>
                                        </ul>
                                        <li class="dont-hide expander" data-target="lara-examples">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Example</span>
                                        </li>
                                        <ul class="nested-menu" id="lara-examples">
                                            <li class="load-lara-example">EmptyAspect.lara</li>
                                            <li class="load-lara-example">LanguageSpecificationPrinter.lara</li>
                                            <li class="load-lara-example">CountLoopIterations.lara</li>
                                            <li class="load-lara-example">StaticCallGraph.lara</li>
                                            <li class="load-lara-example">DynamicCallGraph.lara</li>
                                            <li class="load-lara-example">AdaptMedianSmooth.lara</li>
                                            <li class="load-lara-example">MutateOperator.lara</li>
                                            <li class="load-lara-example">MutateTester.lara</li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                            <div class="leave-fullscreen"><i class="fa fa-info-circle"></i> Press F11 to leave fullscreen</div>
                            <div id="laraEditor" class="editor"></div>
                        </div>
                        <!-- LARA SOURCE CODE -->

                        <div class="code-block" id="result">
                            <div class="header">
                                <span>Result</span>
                                <i class="fa fa-bars menu-trigger" id="result-menu-trigger"> More</i>
                                <div class="dropdown-menu-container" id="result-menu">
                                    <ul class="dropdown-menu">
                                        <li><a id="download-java-file" href="data:text/java;charset=utf-8" download="code.java"><i class="fa fa-download"></i> Download Code</a></li>
                                        <li class="dont-hide expander" data-target="result-files">
                                            <i class="fa fa-chevron-right"></i> Weaved Files
                                        </li>
                                        <ul class="nested-menu" id="result-files">
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                            <div class="leave-fullscreen"><i class="fa fa-info-circle"></i> Press F11 to leave fullscreen</div>
                            <div id="resultEditor" class="editor">Nothing yet, press "Weave Application".</div>
                        </div>

                        <div class="code-block" id="output-log">
                            <div class="header">Output Log</div>
                            <div id="outputLog" class="editor"></div>
                        </div>
                    </div>
                </div>
                <div id="about">

                    <i>This website presents a demonstration of Kadabra. It does not represent neither the current version of Kadabra nor the full LARA technology.</i>

                    <h2>Acknowledgments</h2>

                    <p>
                        Kadabra is a Java-to-Java compilation tool for code instrumentation and transformations controlled by the LARA language.
                        Kadabra is currently under development in the context of PhD grant SFRH/BD/90507/2012, funded by the <a href="http://alfa.fct.mctes.pt/">Portuguese Science Foundation - Fundação para a Ciência e Tecnologia (FCT)</a>.
                    </p>

                    <p>
                        Kadabra uses the <a href="http://spoon.gforge.inria.fr/">Spoon</a>, a Java-to-Java an open-source library developed by the <a href="https://team.inria.fr/spirals/">Spirals research group</a>.
                        LARA [1] is a domain-specific, aspect-oriented language proposed during the REFLECT project and currently being maintained and further developed by University of Porto, Porto, Portugal, and Imperial College, London, UK.
                    </p>

                    <p>
                        For more information on LARA, please see the LARA <a href="http://www.fe.up.pt/~specs/projects/lara">wiki</a>.
                    </p>

                    <h2>References</h2>
                    <p>
                        [1] João M.P. Cardoso, Tiago Carvalho, José G.F. Coutinho, Wayne Luk, Ricardo Nobre, Pedro Diniz, and Zlatko Petrov. 2012. LARA: an aspect-oriented programming language for embedded systems. In Proceedings of the 11th annual international conference on Aspect-oriented Software Development (AOSD '12). ACM, New York, NY, USA, 179-190. <a href="http://doi.acm.org/10.1145/2162049.2162071">[ACM]</a> <a href="lara_aosd12.bib">[bibtex]</a>
                    </p>

                    <h2>Contacts</h2>
                    <p>João M.P. Cardoso (<a href="mailto:jmpc@fe.up.pt?Subject=About%20MANET">jmpc@fe.up.pt</a>)</p>

                    <h2>Funding</h2>
                    <p>Kadabra is a project that has been funded by:</p>
                    <div class="funding">
                        <a href="http://alfa.fct.mctes.pt">
                            <img src='https://specs.fe.up.pt/img/FCT-logo.png' height="35px" alt='Fundação para a Ciência e Tecnologia (FCT)' />
                        </a>
                    </div>
                </div>
            </div>

            <!-- ////////////////////////////////////////// LS ////////////////////////////////////////// -->
            <div id="lsView" class="invisible">
                <div class="header">
                    <span>Join Points </span>
                    <select id="joinpoints"></select>
                    <a id="closeLS" class="closeLS"><i class="fa fa-times-circle" ></i></a>
                </div>
                <div class="lsScroll">
                    <!--</i>        var image = "fa-puzzle-piece";-->
                    <div id="attrDiv" class="invisible">
                        <h4><i class="fa fa-puzzle-piece"> </i> Attributes</h4>
                        <ul id="attributes"><!-- class="fa-ul"-->
                            <!--Test content-->
                        </ul>
                    </div>
                    <div id="selDiv" class="invisible">
                        <h4><i class="fa fa-search"></i> Selects</h4>
                        <ul id="selects">
                            <!--Test content-->
                        </ul>
                    </div>
                    <div id="actDiv" class="invisible">
                        <h4><i class="fa fa-cogs"></i> Actions</h4>
                        <ul id="actions">
                            <!--Test content-->
                        </ul>
                    </div>
                </div>
            </div>
            <!-- ////////////////////////////////////////// LS ////////////////////////////////////////// -->
            <div id="lsView" class="invisible">
                <div class="header">
                    <span>Join Points </span>
                    <select id="joinpoints"></select>
                    <a id="closeLS" class="closeLS"><i class="fa fa-times-circle" ></i></a>
                </div>
                <div class="lsScroll">

                    <div class="joinpoint-base-info">
                        <b>joinpoint</b>
                        <span id="joinpoint-name">NAME</span>
                        <span id="joinpoint-extends"><b>extends</b> <span id="joinpoint-base">BASE</span></span>
                        <div id="joinpoint-short-description" class="joinpoint-short-documentation">SHORT DESCRIPTION</div>
                        <div id="joinpoint-default-attr">DEFAULT ATTRIBUTE</div>
                    </div>

                    <!--</i>        var image = "fa-puzzle-piece";-->
                    <div id="attrDiv" class="invisible">
                        <h4><i class="fa fa-puzzle-piece"> </i> Attributes</h4>
                        <ul id="attributes"><!-- class="fa-ul"-->
                            <!--Test content-->
                        </ul>
                    </div>
                    <div id="selDiv" class="invisible">
                        <h4><i class="fa fa-search"></i> Selects</h4>
                        <ul id="selects">
                            <!--Test content-->
                        </ul>
                    </div>
                    <div id="actDiv" class="invisible">
                        <h4><i class="fa fa-cogs"></i> Actions</h4>
                        <ul id="actions">
                            <!--Test content-->
                        </ul>
                    </div>
                </div>
            </div>
            <!-- ////////////////////////////////////////// LS ////////////////////////////////////////// -->

        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
        <script src="../scripts/ace.js"></script>
        <script src="../scripts/common-script.js"></script>
        <script src="../scripts/jquery-3.2.1.min.js"></script>
        <script src="../scripts/preserve_code.js"></script>
        <script src="script.js"></script>
    </body>
</html>