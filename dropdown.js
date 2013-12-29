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

        th.after("<div style='cursor:pointer' bg='" + th.css("background-color") + "' class='dd " + id + "'/>");

        if (typeof atid != 'undefined') {
            th.attr("data-id", atid).removeAttr("id");
            $(d).attr("id", atid);
        }
        th.hide()
        $('<dt><span class="ddtxt">' + th.val() + '</span><span class="ddarrow" style="width:0;height:0;border:8px solid transparent;float:right;position:absolute;right:15px;top:50%"></span></dt>').appendTo(d);
        $(d).css("max-width", width * 1.5);
        th.appendTo(d);

        $("<div class='ddown' style='display:none;position:absolute;z-index:9999;' />").appendTo(d);

        $(d+" option").each(function () {
            var val = $(this).val();
            $(d + " .ddown").append("<li style='list-style:none'>" + val + "</li>");
        });




    }); // END OF EACH

    function l() {
        if (!$(".ddown").is(":visible")) {
            return false
        }
        clearInterval(ddtimer);
        //console.log("#008")
        var x = "." + ($(".ddown:visible").parent().attr("class")).match(/(^|\s)(dd\d+)($|\s)/)[2];
        $(".ddown").hide();

        $(x).find("dt").css("background", $(x).attr("bg"));
        return false;
    }

  

    $(".ddown").hover(function () {
        clearInterval(ddtimer);
        //console.log("#002")
    }, function () {
        clearInterval(ddtimer);
        //console.log("#007")
        close();
    });
    


    function close() {
        if (!$(".ddown").is(":visible")) {
            return false
        }
        //console.log("#009")
        ddtimer = setTimeout(function () {
            l();
        }, 800);
    }




    // OPEN DROPDOWN
    $(".dd").on("click", function (e) {
        var x = "." + ($(this).attr("class")).match(/(^|\s)(dd\d+)($|\s)/)[2];

        clearInterval(ddtimer);
        e.stopPropagation();

        if ($(x + " .ddown").is(":visible")) {
            $(x + " .ddown").hide();
            $(x).find("dt").css("background", $(x).attr("bg"));
            return false;
        }

        if ($(".ddown").is(":visible")) {
            $(".ddown").hide();
        }

        //console.log("#004")


        var s = $(x + " dt").text();
        $(x + " .ddactive").removeClass("ddactive");
        $(x + " .ddown").css("width", $(x).width()).show()
            .find("li:contains('" + s + "')")
            .addClass("ddactive");


        //$(".dd .ddown").hide();
        //$(this).css("background", "#eee");

    });

    

    // CLOSE DROPDOWN
    $(".ddown li").on("click", function (e) {
        var d = "." + ($(this).parent().parent().attr("class")).match(/(^|\s)(dd\d+)($|\s)/)[2];

        var newid = $(this).text();
        $(d + " .ddtxt").text(newid);
        $(d + " select").val(newid);
        l();
        return false;
    });




    // OUTSIDE BOX CLOSE
    $(document).click(function () {
        if ($(".ddown").is(":visible")) {
            l();
            return false
        }
    });


} // END OF DROPDOWN



dropdown()