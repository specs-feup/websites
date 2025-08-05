function build_related_tools_code() {
  // script.js should expose TOOL
  let $current_tool = TOOL;

  $toolsCode = `<div class="section" id="menu-section-related-tools">
                    <h3>Related Tools:</h3>
					<li class="with-link"><a href="https://www.npmjs.com/package/@specs-feup/lara" target="_blank">LARA</a></li>`;

  if ($current_tool != "kadabra") {
    $toolsCode =
      $toolsCode +
      '<li class="with-link"><a href="http://specs.fe.up.pt/tools/kadabra/" target="_blank">Kadabra <em>(Java)</em></a></li>';
  }

  if ($current_tool != "matisse") {
    $toolsCode =
      $toolsCode +
      '<li class="with-link"><a href="http://specs.fe.up.pt/tools/matisse/" target="_blank">MATISSE <em>(MATLAB)</em></a></li>';
  }

  if ($current_tool != "clava") {
    $toolsCode =
      $toolsCode +
      '<li class="with-link"><a href="http://specs.fe.up.pt/tools/clava/" target="_blank">Clava <em>(C/C++)</em></a></li>';
  }

  if ($current_tool != "jackdaw") {
    $toolsCode =
      $toolsCode +
      '<li class="with-link"><a href="http://specs.fe.up.pt/tools/jackdaw/" target="_blank">Jackdaw <em>(JavaScript)</em></a></li>';
  }
  /*
  $toolsCode = $toolsCode + "<h3>Legacy Tools:</h3>";

  if ($current_tool != "manet") {
    $toolsCode =
      $toolsCode +
      '<li class="with-link"><a href="http://specs.fe.up.pt/tools/manet/" target="_blank">MANET <em>(ANSI C)</em></a></li>';
  }

  if ($current_tool != "reflectc") {
    $toolsCode =
      $toolsCode +
      '<li class="with-link"><a href="http://specs.fe.up.pt/tools/reflectc/" target="_blank">ReflectC</a></li>';
  }

  if ($current_tool != "harmonic") {
    $toolsCode =
      $toolsCode +
      '<li class="with-link"><a href="http://specs.fe.up.pt/tools/harmonic/" target="_blank">Harmonic <em>(C/C++)</em></a></li>';
  }
*/

  $toolsCode = $toolsCode + "</div>";

  $toolsCode =
    $toolsCode +
    '<a href="http://specs.fe.up.pt" class="aux-link"><img src="https://specs.fe.up.pt/img/SPeCS-logo.png" alt="SPeCS" /></a>';
  $toolsCode =
    $toolsCode +
    '<a href="https://sigarra.up.pt/feup" class="aux-link"><img src="feup-logo.png" alt="FEUP" /></a>';

  return $toolsCode;
}

// Set div contents
document.querySelector("#menu-section-related-tools").innerHTML =
  build_related_tools_code();
