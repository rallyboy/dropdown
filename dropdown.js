function dropdown() {

    $("select.dd").each(function () {
        var th = $(this);
        if (th.parent().hasClass("dd")){return false;}
      
      
        var id = "dd" + Math.round(9999999 * Math.random());
        var d = "." + id;
        
        var width = th.width();
        var atid = $(th).attr("id");
      
        
        
        th.after("<div style='cursor:pointer' class='dd " + id + "'/>");
      
        if (typeof atid != 'undefined'){
          th.attr("data-id",atid).removeAttr("id");
          $(d).attr("id",atid); 
        }

        th.css({"position": "absolute"}).hide()
        $("<dt>" + th.val() + "</dt>").appendTo(d);
        $(d).css("max-width", width * 1.5);
        th.appendTo(d);
        
        $("<div class='ddown' style='display:none;position:absolute;z-index:99999'/>").appendTo(d);
        var span = '<span style="width: 0px;height: 0px;border-style: solid;border-width: 8px 7.5px 0 7.5px;loat:right;transition : border 150ms ease-out;"></span>';
        $(span).appendTo(d + " dt");
      
        
        th.find("option").each(function () {
            var val = $(this).val();
            $(d + " .ddown").append("<li style='list-style:none'>" + val + "</li>");
        });

        var slideTimer;

      function close(){
        slideTimer = setInterval(function() {
               $(d + " .ddown").fadeOut(200);
                $(d).find("dt").css("background","white");
            }, 800);
      }

      
        // OPEN DROPDOWN
        $(d + " dt").on("click", function (e) {
          clearInterval(slideTimer);
          e.stopPropagation();
          
          if ($(d + " .ddown").is(":visible")){
            $(d + " .ddown").fadeOut("fast");
            $(d).find("dt").css("background","white");
            return false;
          }
            $(".dd .ddown").hide();
            $(this).css("background","#eee");
            var s = $(d + " dt").text();          
            $(d + " .ddactive").removeClass("ddactive");            
            $(d + " .ddown").css("width",$(d).width()).fadeIn(200)
            .find("li:contains('"+s+"')")
            .addClass("ddactive");
          
            
            close();
          
            $(d + " .ddown").hover(function(){
              clearInterval(slideTimer);
            },function(){
              clearInterval(slideTimer);
              close();
            });
          });
          
      
        // CLOSE DROPDOWN
        $(d + " li").on("click", function (e) {
            var newid = $(this).text();
            $(d + " dt").text(newid);
            $(d + " .ddown").fadeOut(200);
            $(d + " select").val(newid);
            $(d + " dt").append(span);
        });
        
      
      
        // OUTSIDE BOX CLOSE
        $(document).click(function () {
            $(d + " .ddown").fadeOut("fast");
            $(d).find("dt").css("background","white");
        });

       

      
          
    
      
      
      
      
      
      
    });
}


dropdown()