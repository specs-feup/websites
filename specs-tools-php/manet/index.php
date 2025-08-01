<!DOCTYPE html>

<?php
require_once '../common/specsTools.php';
?>

<html>
    <head>
        <meta charset=utf-8>
        <title>MANET Tool</title>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,latin-ext,cyrillic,cyrillic-ext' rel='stylesheet' type='text/css'>
        <link rel=stylesheet href="../css/font-awesome.min.css">
        <link rel=stylesheet href="../css/common-style.css">
        <link rel=stylesheet href="manet.css">

        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    </head>
    <body>
        <header>
            <img src="manet_300dpi.png" class="header_img" alt="MATISSE"/>
            <!--<h1>MANET Online Demo</h1>-->
        </header>
        <div class="body">
            <div class="sidebar">
                <div class="section">
                    <li id="menu-try-it" class="active">Try it Online</li>
                    <li id="menu-copyright">About MANET</li>
                </div>

                <div class="section" id="menu-section-options">
                    <h3>Compile</h3>
                    <li id="menu-compile-to-c"><i class="fa fa-play"></i> Weave Application</li>

                    <h3>Options</h3>
                    <p><label><input type="checkbox" id="format-output" checked>Format Output</label>

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

                <?php echo get_related_tools('manet') ?>

                <!-- <a href="http://specs.fe.up.pt" class="aux-link"><img src="http://specs.fe.up.pt/img/SPeCS-logo.png" alt="SPeCS" /></a>
                <a href="https://sigarra.up.pt/feup" class="aux-link"><img src="feup-logo.png" alt="FEUP" /></a> -->
            </div>

            <div class="content">
                <div id="try-it">
                    <div class="try-it-content">
                        <!-- C SOURCE CODE -->
                        <div class="code-block" id="c">
                            <div class="header">
                                <span>C Source Code</span>
                                <i class="fa fa-bars menu-trigger" id="c-menu-trigger"> More</i>
                                <div class="dropdown-menu-container" id="c-menu">
                                    <ul class="dropdown-menu">
                                        <li id="upload-c-file"><i class="fa fa-upload"></i> Upload File</li>
                                        <hr>
                                        <!-- TUTORIAL -->
                                        <li class="dont-hide expander" data-target="c-tutorial-1">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Tutorial Example : Group 1</span>
                                        </li>
                                        <ul class="nested-menu" id="c-tutorial-1">

                                            <li class="load-c-example" data-filename="empty_main.c">1.1 empty_main.c</li>
                                            <li class="load-c-example" data-filename="mibench_dijkstra.c">1.2 -> 1.5 mibench_dijkstra.c</li>
                                        </ul>
                                        <li class="dont-hide expander" data-target="c-tutorial-2">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Tutorial Example : Group 2</span>
                                        </li>
                                        <ul class="nested-menu" id="c-tutorial-2">

                                            <li class="load-c-example" data-filename="sum_squares.c">2.1 sum_squares.c</li>
                                            <li class="load-c-example" data-filename="disparity_sample_1.c">2.2 disparity_sample_1.c</li>
                                            <li class="load-c-example" data-filename="mibench_dijkstra.c">2.3 mibench_dijkstra.c</li>
                                            <li class="load-c-example" data-filename="disparity.c">2.3.1 disparity.c</li>
                                            <li class="load-c-example" data-filename="disparity.c">2.4 disparity.c</li>
                                        </ul>
                                        <li class="dont-hide expander" data-target="c-tutorial-3">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Tutorial Example : Group 3</span>
                                        </li>
                                        <ul class="nested-menu" id="c-tutorial-3">

                                            <li class="load-c-example" data-filename="dot_prod.c">3.1 dot_prod.c</li>
                                            <li class="load-c-example" data-filename="disparity_sample_2.c">3.2 disparity_sample_2.c</li>
                                            <li class="load-c-example" data-filename="disparity_sample_2.c">3.2.1 disparity_sample_2.c</li>
                                            <li class="load-c-example" data-filename="disparity_sample_3.c">3.3 disparity_sample_3.c</li>
                                        </ul>
                                        <li class="dont-hide expander" data-target="ant-demo">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>ANTAREX Demo</span>
                                        </li>
                                        <ul class="nested-menu" id="ant-demo">

                                            <li class="load-c-example" data-filename="multi_and_tuner.c">multi_and_tuner.c</li>
                                        </ul>
                                        <!-- TUTORIAL -->
                                        <!--                                        <li class="dont-hide expander" data-target="c-examples">
                                                                                    <i class="fa fa-chevron-right"></i>
                                                                                    <span>Load Example</span>
                                                                                </li>
                                                                                <ul class="nested-menu" id="c-examples">

                                                                                    <li class="load-c-example">dot_prod.c</li>
                                                                                    <li class="load-c-example">empty_main.c</li>
                                                                                    <li class="load-c-example">filter_subband.c</li>
                                                                                    <li class="load-c-example">function_stack.c</li>
                                                                                    <li class="load-c-example">grid_iterate.c</li>
                                                                                    <li class="load-c-example">mibench_dijkstra.c</li>
                                                                                    <li class="load-c-example">prepare_program_test.c</li>
                                                                                    <li class="load-c-example">rank_test.c</li>
                                                                                    <li class="load-c-example">disparity.c</li>
                                                                                </ul>-->
                                    </ul>
                                </div>
                            </div>
                            <div class="leave-fullscreen"><i class="fa fa-info-circle"></i> Press F11 to leave fullscreen</div>
                            <div id="cEditor" class="editor">
                            </div>
                        </div>
                        <!-- C SOURCE CODE -->

                        <!-- LARA SOURCE CODE -->
                        <div class="code-block" id="lara">
                            <div class="header">
                                <span>LARA</span>
                                <i class="fa fa-bars menu-trigger" id="lara-menu-trigger"> More</i>
                                <div class="dropdown-menu-container" id="lara-menu">
                                    <ul class="dropdown-menu">
                                        <li id="toggle-ls"><i class="fa fa-book"></i> Toggle Language Specification</li>
                                        <li id="upload-lara-file"><i class="fa fa-upload"></i> Upload File</li>
                                        <hr>
                                        <!-- TUTORIAL -->
                                        <li class="dont-hide expander" data-target="lara-tutorial-1">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Tutorial Example : Group 1</span>
                                        </li>
                                        <ul class="nested-menu" id="lara-tutorial-1">

                                            <li class="load-lara-example">1.1 TargetLanguageReport.lara</li>
                                            <li class="load-lara-example">1.2 CallerAndCallee.lara</li>
                                            <li class="load-lara-example">1.2.1 CallerAndCalleeComplete.lara</li>
                                            <li class="load-lara-example">1.3 StaticCallGraph.lara</li>
                                            <li class="load-lara-example">1.4 LibCalls.lara</li>
                                            <li class="load-lara-example">1.4.1 LibCallsInLoops.lara</li>
                                            <li class="load-lara-example">1.5 StaticCodeReport.lara</li>
                                        </ul>
                                        <li class="dont-hide expander" data-target="lara-tutorial-2">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Tutorial Example : Group 2</span>
                                        </li>
                                        <ul class="nested-menu" id="lara-tutorial-2">

                                            <li class="load-lara-example">2.1 TimingCodeFragments.lara</li>
                                            <li class="load-lara-example">2.2 BranchCoverage.lara</li>
                                            <li class="load-lara-example">2.3 DynamicCallGraph.lara</li>
                                            <li class="load-lara-example">2.3.1 ComplexDynamicCallGraph.lara</li>
                                            <li class="load-lara-example">2.4 RangeValuesMonitoring.lara</li>
                                        </ul>
                                        <li class="dont-hide expander" data-target="lara-tutorial-3">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Tutorial Example : Group 3</span>
                                        </li>
                                        <ul class="nested-menu" id="lara-tutorial-3">

                                            <li class="load-lara-example">3.1 SimpleLoopUnroll.lara</li>
                                            <li class="load-lara-example">3.2 ChangeDataTypes.lara</li>
                                            <li class="load-lara-example">3.2.1 ChangeDataTypesFiltered.lara</li>
                                            <li class="load-lara-example">3.3 CloningAndTransformations.lara</li>
                                        </ul>
                                        <li class="dont-hide expander" data-target="lara-ant-demo">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>ANTAREX Demo</span>
                                        </li>
                                        <ul class="nested-menu" id="lara-ant-demo">

                                            <li class="load-lara-example">MultiversioningMain.lara</li>
                                            <li class="load-lara-example">AutotunerMain.lara</li>
                                            <li class="load-lara-example">MultiTunerMain.lara</li>
                                        </ul>
                                        <!-- TUTORIAL -->
                                        <!--                                        <hr>
                                                                                <li class="dont-hide expander" data-target="lara-examples">
                                                                                    <i class="fa fa-chevron-right"></i>
                                                                                    <span>Load Other Example</span>
                                                                                </li>
                                                                                <ul class="nested-menu" id="lara-examples">

                                                                                    <li class="load-lara-example">CountLoopIterations.lara</li>
                                                                                    <li class="load-lara-example">DynamicCallGraph.lara</li>
                                                                                    <li class="load-lara-example">EmptyAspect.lara</li>
                                                                                    <li class="load-lara-example">LoopInterchange.lara</li>
                                                                                    <li class="load-lara-example">LoopTimer.lara</li>
                                                                                    <li class="load-lara-example">LoopUnroll.lara</li>
                                                                                    <li class="load-lara-example">PrepareProgram.lara</li>
                                                                                    <li class="load-lara-example">RankTest.lara</li>
                                                                                    <li class="load-lara-example">RenameFunctions.lara</li>
                                                                                    <li class="load-lara-example">ReplacePrintf.lara</li>
                                                                                    <li class="load-lara-example">StaticCallGraph.lara</li>
                                                                                </ul>-->
                                    </ul>
                                </div>
                            </div>
                            <div class="leave-fullscreen"><i class="fa fa-info-circle"></i> Press F11 to leave fullscreen</div>
                            <div id="laraEditor" class="editor">
                            </div>
                        </div>
                        <!-- LARA SOURCE CODE -->

                        <div class="code-block" id="result">
                            <div class="header">Result</div>
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

                    <i>This website presents a demonstration of MANET. It does not represent neither the current version of MANET nor the full LARA technology.</i>

                    <h2>Acknowledgments</h2>

                    <p>
                        MANET is a C-to-C compilation tool for code instrumentation and transformations controlled by the LARA language. MANET is being currently used and improved in the context of <a href="http://autoseer.fe.up.pt/">AutoSeer</a> and <i>RL8 - Real Time Languages and tools for critical real time systems</i> projects. AutoSeer is partially funded by the <a href="http://alfa.fct.mctes.pt/">Portuguese Science Foundation - Fundação para a Ciência e Tecnologia (FCT</a> under grant PTDC/EIA-CCO/116796/2010. RL8 - Real Time Languages and tools for critical real time systems is partially funded by FEDER/ON2 and FCT project NORTE-07-124-FEDER-000062. We also acknowledge the support of FCT through grant SFRH/BD/90507/2012.
                    </p>

                    <p>
                        MANET uses the <a href="http://cetus.ecn.purdue.edu/">Cetus</a> compiler, a C-to-C compiler developed at Purdue University. LARA [1] is a domain-specific, aspect-oriented language proposed during the REFLECT project and currently being maintained and further developed by University of Porto, Porto, Portugal, and Imperial College, London, UK.
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
                    <p>MANET is a project that has been partially funded by:</p>
                    <div class="funding">
                        <a href="autoseer.fe.up.pt">
                            <img src='http://specs.fe.up.pt/img/autoseer-logo.png' height="35px" alt='AutoSeer Project' />
                        </a>

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

<!-- http://specs.fe.up.pt/img/autoseer-logo.png -->