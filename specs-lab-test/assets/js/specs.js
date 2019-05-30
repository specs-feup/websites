var clickado = false;

$("#div_exp").click(function() {
    if(clickado === false) {
        $("#div_exp p").html("Outra coisa");
        $("#div_exp p").css("color", "red");
        clickado = true;
    }  else {
        $("#div_exp p").html("Volta atrás"); 
                $("#div_exp p").css("color", "green");

        clickado = false;
    }

});
        
        
        
        
     