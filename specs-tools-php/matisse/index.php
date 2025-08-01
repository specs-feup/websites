<!DOCTYPE html>

<?php
require_once '../common/specsTools.php';
?>

<html>
    <head>
        <meta charset=utf-8>
        <title>MATISSE Tool</title>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,latin-ext,cyrillic,cyrillic-ext' rel='stylesheet' type='text/css'>
        <link rel=stylesheet href="../css/font-awesome.min.css">
        <link rel=stylesheet href="../css/common-style.css">
        <link rel=stylesheet href="matisse.css">

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
            <img src="matisse_300dpi.png" class="header_img" alt="MATISSE"/>
            <!-- <h1>MATISSE Online Demo</h1> -->
        </header>
        <div class="body"><div class="sidebar">
                <div class="section">
                    <li id="menu-try-it" class="active">Try it Online</li>
                    <li id="menu-copyright">About MATISSE</li>
                </div>

                <div class="section" id="menu-section-options">
                    <h3>Compile</h3>
                    <li id="menu-compile-to-c"><i class="fa fa-play"></i> Compile to C</li>
                    <li id="menu-compile-to-cl"><i class="fa fa-play"></i> Compile to C/OpenCL</li>
                    <li id="menu-compile-to-matlab"><i class="fa fa-play"></i> Compile to MATLAB</li>

                    <h3>Options</h3>
                    <p><label><input type="checkbox" id="enable-dynamic-allocation" checked>Enable Dynamic Allocation</label>
                    <p><label><input type="checkbox" id="use-pass-system" checked>Use MATISSE v2</label>
                    <p><label>OpenCL Target: <select id="target">
                                <option value="DEFAULT">Default Settings</option>
                                <optgroup label="AMD GPU">
                                    <option value="GENERIC_AMD_GPU">Generic AMD GPU</option>
                                    <option value="AMD_SPECTRE">AMD Spectre (Integrated GPU, 2014)</option>
                                    <option value="AMD_TAHITI">AMD Tahiti (Discrete GPU, 2011)</option>
                                </optgroup>
                                <optgroup label="NVIDIA GPU">
                                    <option value="GENERIC_NVIDIA_GPU">Generic NVIDIA GPU</option>
                                </optgroup>
                                <optgroup label="CPU">
                                    <option value="GENERIC_CPU">Generic CPU</option>
                                </optgroup>
                                <optgroup label="FPGA">
                                    <option value="XILINX_FPGA_ADM_PCIE_KU3_2DDR">xilinx:adm-pcie-ku3:2ddr-xpr:3.2</option>
                                </optgroup>
                            </select></label>

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
                    <li><a href="http://specs.fe.up.pt/tools/matisse.zip">Download MATISSE-CL</a></li>
                    <li><a href="http://specs.fe.up.pt/tools/matisse/language_specification.html">Language Specification</a></li>
                    <li><a href="http://specs.fe.up.pt/tools/matisse/doc/">API Documentation</a></li>
                </div>

                <?php echo get_related_tools('matisse') ?>

                    <!-- <a href="http://specs.fe.up.pt" class="aux-link"><img src="http://specs.fe.up.pt/img/SPeCS-logo.png" alt="SPeCS" /></a>
                    <a href="https://sigarra.up.pt/feup" class="aux-link"><img src="feup-logo.png" alt="FEUP" /></a> -->
            </div><div class="content">
                <div id="try-it">
                    <div class="try-it-content"><div class="code-block" id="matlab">
                            <div class="header">
                                <span>MATLAB</span>
                                <i class="fa fa-bars menu-trigger" id="matlab-menu-trigger"> More</i>
                                <div class="dropdown-menu-container" id="matlab-menu">
                                    <ul class="dropdown-menu">
                                        <li id="upload-matlab-file"><i class="fa fa-upload"></i> Upload File</li>
                                        <li class="dont-hide expander" data-target="matlab-examples">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Example</span>
                                        </li>
                                        <ul class="nested-menu" id="matlab-examples">
                                            <li class="load-matlab-example">test.m</li>
                                            <li class="load-matlab-example">matmul.m</li>
                                            <li class="load-matlab-example">closure.m</li>
                                            <li class="load-matlab-example">dilate_opencl.m</li>
                                            <li class="load-matlab-example">fir.m</li>
                                            <li class="load-matlab-example">grid_iterate.m</li>
                                            <li class="load-matlab-example">harris.m</li>
                                            <li class="load-matlab-example">latnrm.m</li>
                                            <li class="load-matlab-example">mult.m</li>
                                            <li class="load-matlab-example">subband.m</li>
                                            <li class="load-matlab-example">typo.m</li>
                                            <li class="load-matlab-example">need_for_byref_test.m</li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                            <div class="leave-fullscreen"><i class="fa fa-info-circle"></i> Press F11 to leave fullscreen</div>
                            <div id="matlabEditor" class="editor"></div>
                        </div><div class="code-block" id="lara">
                            <div class="header">
                                <span>LARA</span>
                                <i class="fa fa-bars menu-trigger" id="lara-menu-trigger"> More</i>
                                <div class="dropdown-menu-container" id="lara-menu">
                                    <ul class="dropdown-menu">
                                        <li id="toggle-ls"><i class="fa fa-book"></i> Toggle Language Specification</li>
                                        <li id="upload-lara-file"><i class="fa fa-upload"></i> Upload File</li>
                                        <li class="dont-hide expander" data-target="lara-tutorial">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Tutorial</span>
                                        </li>
                                        <ul class="nested-menu" id="lara-tutorial">
                                            <li class="load-lara-example" data-filename="ReportJoinpoint.lara">4.1. ReportJoinpoint.lara</li>
                                            <li class="load-lara-example" data-filename="StaticCallGraph.lara">4.2. StaticCallGraph.lara</li>
                                            <li class="load-lara-example" data-filename="ParforToFor.lara">4.3. ParforToFor.lara</li>
                                            <li class="load-lara-example" data-filename="NamingConventions.lara">4.4. NamingConventions.lara</li>
                                            <li class="load-lara-example" data-filename="FindTypos.lara">4.5. FindTypos.lara</li>
                                            <li class="load-lara-example" data-filename="DetectMissingPreallocations.lara">4.6. DetectMissingPreallocations.lara</li>
                                            <li class="load-lara-example" data-filename="types_subband.lara">5.1. types_subband.lara</li>
                                            <li class="load-lara-example" data-filename="SmartDefineTypes.lara">5.2. SmartDefineTypes.lara</li>
                                            <li class="load-lara-example" data-filename="UsePrimitives.lara">5.3. UsePrimitives.lara</li>
                                            <li class="load-lara-example" data-filename="InsertDirectives.lara">5.4. InsertDirectives.lara</li>
                                            <li class="load-lara-example" data-filename="AddByRefDirective.lara">5.5. AddByRefDirective.lara</li>
                                        </ul>
                                        <li class="dont-hide expander" data-target="lara-examples">
                                            <i class="fa fa-chevron-right"></i>
                                            <span>Load Example</span>
                                        </li>
                                        <ul class="nested-menu" id="lara-examples">
                                            <li class="load-lara-example">PrintXML.lara</li>
                                            <li class="load-lara-example">closure_idivide.lara</li>
                                            <li class="load-lara-example">count_loop_iterations.lara</li>
                                            <li class="load-lara-example">dilate_opencl.lara</li>
                                            <li class="load-lara-example">grid_iterate_specialization.lara</li>
                                            <li class="load-lara-example">harris_2ndConcerns.lara</li>
                                            <li class="load-lara-example">monitor_rangevalues_grid_iterate.lara</li>
                                            <li class="load-lara-example">section_num_of specific_executions.lara</li>
                                            <li class="load-lara-example">section_num_of_executions.lara</li>
                                            <li class="load-lara-example">types_fir_single.lara</li>
                                            <li class="load-lara-example">types_griditerate_double.lara</li>
                                            <li class="load-lara-example">types_griditerate_single.lara</li>
                                            <li class="load-lara-example">types_latnrm_single.lara</li>
                                            <li class="load-lara-example">types_latnrm_static_specialization.lara</li>
                                            <li class="load-lara-example">types_mult.lara</li>
                                            <li class="load-lara-example">types_subband.lara</li>
                                            <li class="load-lara-example">Matisse.lara</li>
                                            <li class="load-lara-example">MatisseOptions.lara</li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                            <div class="leave-fullscreen"><i class="fa fa-info-circle"></i> Press F11 to leave fullscreen</div>
                            <div id="laraEditor" class="editor"></div>
                        </div><div class="code-block" id="result">
                            <div class="header">
                                <span>Result</span>
                                <i class="fa fa-files-o menu-trigger" id="files-menu-trigger"> Files</i>
                                <div class="dropdown-menu-container" id="files-menu">
                                    <ul class="dropdown-menu">
                                    </ul>
                                </div>
                                <i class="fa fa-bars menu-trigger" id="result-menu-trigger"> More</i>
                                <div class="dropdown-menu-container" id="result-menu">
                                    <ul class="dropdown-menu">
                                        <li id="download-results"><a download=""><i class="fa fa-download"></i> Download</a>
                                        <li id="download-all-results"><a download=""><i class="fa fa-download"></i> Download All</a>
                                    </ul>
                                </div>
                            </div>
                            <div class="leave-fullscreen"><i class="fa fa-info-circle"></i> Press F11 to leave fullscreen</div>
                            <div id="resultEditor" class="editor">Nothing yet, press "Compile to C" or "Compile to MATLAB".</div>
                        </div><div class="code-block" id="output-log">
                            <div class="header">Output Log</div>
                            <div id="outputLog" class="editor"></div>
                        </div>
                    </div>
                </div>
                <div id="about">


                    <h2>Acknowledgments</h2>
                    <p>MATISSE is a compilation framework completely redesigned in the context of the FP7 EU-funded project <a href="http://www.reflect-project.eu/">REFLECT</a>. We acknowledge the REFLECT members, especially José Gabriel Coutinho, Zlatko Petrov and Pedro Diniz. We also acknowledge the previous contributions done in the context of the <a href="http://paginas.fe.up.pt/~specs/amadeus/">AMADEUS</a> project. The AMADEUS project was partially funded by the <a href="http://alfa.fct.mctes.pt">Portuguese Science Foundation - Fundação para a Ciência e Tecnologia (FCT)</a> under research grants PTDC/EEA-ELC/71556/2006 and PTDC/EIA/70271/2006.
                    </p>

                    <h2>Copyrights and Trademarks</h2>
                    <p>MATLAB is a registered trademark of <a href="http://www.mathworks.com/">Mathworks Inc</a>.</p>
                    <p>LARA is a domain-specific aspect-oriented language proposed during the REFLECT project (see citations) and being developed
                        by University of Porto, Porto, Portugal, and Imperial College, London, UK.</p>
                    <p>This website presents a demonstrator of the MATISSE and does not support neither the current version of MATISSE nor the full LARA technology.</p>

                    <h2>Citations</h2>
                    <p>
                        We suggest the citation to the following publication if you want to make reference to MATISSE or LARA:
                    </p>

                    <h3>MATISSE V1</h3>
                    <p>João Bispo, João M.P. Cardoso, <b>"A MATLAB subset to C compiler targeting embedded systems,"</b> in <i>Software: Practice and Experience</i>. Wiley Online Library . DOI=10.1002/spe.2408 [<a href="http://specs.fe.up.pt/tools/matisse/matisse_spe_2017.bib">bib</a>)]
                    </p>

                    <h3>MATISSE V2</h3>
                    <p>
                        Luís Reis, João Bispo, João M. P. Cardoso, <b>&quot;SSA-based MATLAB-to-C compilation and optimization,&quot;</b> in <i>Proceedings of the 3rd ACM SIGPLAN International Workshop on Libraries, Languages, and Compilers for Array Programming (ARRAY’2016)</i> 2016. [<a href="array16.bib" target="_blank">bib</a>]
                    </p>

                    <!-- <p>Contact: João M.P. Cardoso (<a href="mailto:jmpc@fe.up.pt?Subject=About%20MATISSE">jmpc@fe.up.pt</a>)</p> -->
                    <p>Contact:</p>
                    <p>Luís Reis (<a href="mailto:luis.cubal@fe.up.pt?Subject=About%20Clava">luis.cubal@fe.up.pt</a>)</p>
                    <p>João Bispo (<a href="mailto:jbispo@fe.up.pt?Subject=About%20Clava">jbispo@fe.up.pt</a>)</p>

                    <h2>Funding</h2>
                    <p>MATISSE is a project that has been partially funded by:</p>
                    <div class="funding">
                        <a href="http://www.reflect-project.eu/">
                            <img src='https://specs.fe.up.pt/img/REFLECT-logo.png' height="35px" alt='REFLECT Project' />
                        </a>

                        <a href="http://cordis.europa.eu/fp7/home_en.html">
                            <img src='https://specs.fe.up.pt/img/FP7-logo.png' height="35px" alt='Seventh Framework Programme(FP7)' />
                        </a>

                        <a href="http://paginas.fe.up.pt/~specs/amadeus/">
                            <img src='https://specs.fe.up.pt/img/AMADEUS-logo.png' height="35px" alt='AMADEUS Project' />
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