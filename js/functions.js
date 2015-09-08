$(document).ready(function() {
    //$("#content").vAlign();
    //$(".bg-icon").hAlign();
    //$(".bg-laptop").hAlign();

    $(".nav .nav-item .nav-link").click(function(e){
        var menu = $('.navbar.navbar-fixed-top').height();
        var target = $(this).attr("href");
        var location = $(target).offset().top - menu;
        //alert(target);
        e.preventDefault();
        $(window).scrollTo( (location), 800 );
        //$(".collapse.in").slideUp(function() {
        //    $(".collapse.in").removeClass("in");
        //    $(".navbar-toggle").addClass("collapsed");  
        //});
        $(".collapse.in").removeClass("in");
        $(".navbar-toggle").addClass("collapsed");
    });

    $('.svg-inject').svgInject();

    $("#contact .contactform .btn").click(function(e) { 
        //e.preventDefault();
        //get input field values
        var user_name       = $('input[name=name]').val(); 
        var user_email      = $('input[name=email]').val();
        //var user_phone      = $('input[name=phone]').val();
        var user_message    = $('textarea[name=message]').val();
        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if(user_name==""){ 
            $('input[name=name]').css('border-color','red'); 
            //alert("name error");
            proceed = false;
        }
        if(user_email==""){ 
            $('input[name=email]').css('border-color','red'); 
            proceed = false;
        }
        //if(user_phone=="") {    
        //    $('input[name=phone]').css('border-color','red'); 
        //    proceed = false;
        //}
        if(user_message=="") {  
            $('textarea[name=message]').css('border-color','red'); 
            proceed = false;
        }
        
        //everything looks good! proceed...
        if(proceed) 
        {
            //data to be sent to server
            post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};
            
            //Ajax post data to server
            $.post('/contact_me.php', post_data, function(data){  
                $("#contact .contactform .form-horizontal").slideUp();
                //load success massage in #result div element, with slide effect.       
                $("#result").hide().html('<div class="success">'+data+'</div>').slideDown();
                
                //reset values in all input fields
                $('#contact .contactform input').val(''); 
                $('#contact .contactform textarea').val(''); 
                
            }).fail(function(err) {  //load any error data
                $("#result").hide().html('<div class="error">'+err.statusText+'</div>').slideDown();
            });
        }
                
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact .contactform input, #contact .contactform textarea").keyup(function() { 
        $("#contact .contactform input, #contact .contactform textarea").css('border-color',''); 
        $("#result").slideUp();
    });


});