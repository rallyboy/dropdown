function dropdown() {
    var ddtimer;

    $("select.dd").each(function () {
        var th = $(this);
        if (th.parent().hasClass("dd")) {
            return false;
        }
        
        var id = "dd" + Math.round(999 * Math.random());
        var d = "." + id;

        var width = th.width();
        var atid = $(th).attr("id");

        th.after("<div style='cursor:pointer' bg='" + th.css("background-color") + "' class='dd " + id + " dd"+atid+"'/>");

        if (typeof atid != 'undefined') {
            //th.attr("data-id", atid).removeAttr("id");
            //$(d).attr("id", atid);
        }
        th.hide();
        $('<dt><span class="ddtxt">' + th.val() + '</span><span class="ddarrow" style="width:0;height:0;border:6px solid transparent;float:right;position:absolute;right:15px;top:50%"></span><span class="ddline" style="width: 1px;height: 70%;border-left: 1px solid #ccc;float: right;position: absolute;right: 35px;top: 15%;"></span></dt>').appendTo(d);
      
        th.appendTo(d);

      $("<div class='ddown' style='position:absolute;z-index:1001;top:0;width:100%' />").appendTo(d);

        $(d+" option").each(function () {
          var val = $(this).val();
          $(d + " .ddown").append("<li style='list-style:none;top:0;position:absolute'>" + val + "</li>");
        });
       
       var nw = width * 1.5;
       $(d).css("max-width", nw);
       var pl = parseFloat($(d+" .ddown li").css("padding-left"));
       $(d+" .ddown li").css("max-width", nw-(pl*2));


    }); // END OF EACH
  
  
  
  

    function l() {
        if (!$(".ddown").hasClass("ddopen")) {
            return false
        }
        clearInterval(ddtimer);
        console.log("#008")
        var x = "." + ($(".ddopen").parent().attr("class")).match(/(^|\s)(dd\d+)($|\s)/)[2];
        $(x + " .ddopen").removeClass("ddopen");
        $(x + " .ddown li").css("top",0);
        return false;
    }

  
  

  
    
  $(document).on("mouseenter", ".ddown",function(){
    console.log("#022");
    clearInterval(ddtimer);
  });
  
  $(document).on("mouseleave", ".ddown",function(){
    console.log("#023");
    clearInterval(ddtimer);
    if ($(".ddopen").length) {close()};
  });
  

    function close() {
        if (!$(".ddown").hasClass("ddopen")) {
            return false
        }
        ddtimer = setTimeout(function () {
            l();
        }, 1000);
    }




    // OPEN DROPDOWN
    $(document).on("click",".dd", function (e) {
        var x = "." + ($(this).attr("class")).match(/(^|\s)(dd\d+)($|\s)/)[2];

        clearInterval(ddtimer);
        e.stopPropagation();

        if ($(x + " .ddown").hasClass("ddopen")) {
            $(x + " .ddown").removeClass("ddopen");
            $(x).find("dt").css("background", $(x).attr("bg"));
            $(x + " .ddown li").css("top",0);
            return false;
        }

        var s = $(x + " dt").text();
        $(x + " .ddactive").removeClass("ddactive");
      
        $(x + " .ddown").css("width", $(x).width()).addClass("ddopen")
            .find("li").filter(function() {
               return $(this).text() === s; 
             }).addClass("ddactive");
      
      var h = $(x).height() - 1;
      $(x + " .ddown li").each(function(index){
        $(this).css("top", h * ($(this).index()+1));
      });
      close();
    });

    

    // CLOSE DROPDOWN
    $(document).on("click",".ddown li", function (e) {
        var d = "."+($(this).parent().parent().attr("class")).match(/(^|\s)(dd\d+)($|\s)/)[2];
        console.log('#012');
        var newid = $(this).text();
        $(d + " .ddtxt").text(newid);
        $(d + " select").val(newid);
        $(d + " .ddown li").css("top",0);
        return false;
    });

  
    // OUTSIDE BOX CLOSE
    $(document).click(function () {
        if ($(".ddown").hasClass("ddopen")) {
            //l();
        }
    });

} // END OF DROPDOWN



dropdown()