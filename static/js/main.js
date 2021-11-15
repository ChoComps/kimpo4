jQuery(document).ready(function( $ ) {

  // Header fixed and Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });

  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
    $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
    $('body').append( $mobile_nav );
    $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
    $('body').append( '<div id="mobile-body-overly"></div>' );
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e){
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e){
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
       if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if( $('#header').length ) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ( $(this).parents('.nav-menu').length ) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Porfolio filter
  $("#portfolio-flters li").click ( function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function() {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });


  //Google Map
  var get_latitude = $('#google-map').data('latitude');
  var get_longitude = $('#google-map').data('longitude');

  function initialize_google_map() {
    var myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
    var mapOptions = {
      zoom: 14,
      scrollwheel: false,
      center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize_google_map);

// custom code

});



    function validate() {
        //event.preventDefault();
        var objID = document.getElementById("my_id");
        var objPwd1 = document.getElementById("my_pwd");
        var objPwd2 = document.getElementById("my_pwd2");
        var objEmail = document.getElementById("my_mail");
        var objName = document.getElementById("my_name");
        var objNum1 = document.getElementById("my_num1");
        var objNum2 = document.getElementById("my_num2");
        var objPnum = document.getElementById("my_pnumber");
        var objNum = document.getElementById("my_number");

        var arrNum1 = new Array();
        var arrNum2 = new Array();

        var tempSum=0;//주민번호 합을 넣는 공간

        //아이디와 패스워드 값 데이터 정규화 공식
        var regul1 = /^[a-zA-Z0-9]{4,12}$/;
        //이메일 값 데이터 유효성 체크
        //[]안에 있는 값만 쓰겠다

        //이메일 정규화 공식
        var regul2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
        //이름 정규화 공식
        var regul3 = /^[가-힝a-zA-Z]{2,}$/;
        //var email = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);

        //아이디 입력 하지 않았을 경우
        if ((objID.value) == ""){
            alert("아이디를 입력하지 않았습니다.");
            objID.focus();
            return false;
        }
        //아이디 유효성 검사
        //내가 입력한 데이터를 검사하는 check()
        //만약 내가 아이디에 정규화 방식을 하나라도 지키지 않으면 if문 안으로 들어가서 alert message를 띄움
        if (!check(regul1,objID,"아이디는 4~12자의 대소문자와 숫자로만 입력 가능합니다.")) {
            return false;//반환 할 곳 없이 if문 탈출
        }
        //아이디 입력 하지 않았을 경우
        if ((objID.value) == ""){
            alert("아이디를 입력하지 않았습니다.");
            objID.focus();
            return false;
        }
        //휴대번호를 입력 하지 않았을 경우
         if ((objPnum.value) == ""){
            alert("휴대번호를 입력하지 않았습니다.");
            objID.focus();
            return false;
        }
        //비밀번호 입력 하지 않았을 경우
        if ((objPwd1.value) == ""){
            alert("비밀번호를 입력해 주세요");
            objPwd1.focus();
            return false;
        }
        if ((objPwd2.value=="")){
            alert("비밀번호를 입력해 주세요");
            objPwd2.focus();
            return false;
        }

        //비밀번호 유효성 검사
        //만약 내가 비밀번호에 정규화 방식을 하나라도 지키지 않으면 if문 안으로 들어가서 alert message를 띄움
        if (!check(regul1,objPwd1,"비밀번호는 4~12자의 대소문자와 숫자로만 입력 가능합니다.")) {
            return false;
        }

        //비밀번호와 비밀번호 확인이 일치 하지 않을 경우
        if ((objPwd1.value)!=(objPwd2.value)) {
            alert("비밀번호가 일치 하지 않습니다.");
            objPwd1.focus();
            objPwd2.focus();
            return false;
        }
        //이메일 입력 안했을 경우
        if ((objEmail.value)=="") {
            alert("이메일을 입력해 주세요");
            objEmail.focus();
            return false;
        }
        //이메일이 잘못된 경우
        if (!check(regul2,objEmail,"이메일을 잘못 입력 했습니다.")) {
            return false;
        }
        //이름 입력 안 한 경우
        if ((objName.value)=="") {
            alert("이름을 입력해 주세요");
            objName.focus();
            return false;
        }
        //이름에 특수 문자가 들어간 경우
        if (!check(regul3,objName,"이름이 잘못 되었습니다.")) {
            return false;
        }

        //주민번호 앞자리를 각 배열에 넣어 검색 및 비교하기위한 단계
        //앞자리 값 만큼 돌림
        for (var i = 0; i <objNum1.value.length; i++) {
            //배열 칸마다 앞자리 값 하나씩 넣어줌
            arrNum1[i]=objNum1.value.charAt(i);
        }

        //주민번호 뒷자리를 각 배열에 넣어 검색 및 비교하기위한 단계
        //뒷자리 값 만큼 돌림
        for (var i = 0; i <objNum2.value.length; i++) {
            //배열 칸마다 뒷자리 값 하나씩 넣어줌
            arrNum2[i]=objNum2.value.charAt(i);
        }
        //주민번호 앞자리를 tempSum에 집어 넣기
        //앞자리 만큼 돌림
        for (var i = 0; i <objNum1.value.length; i++) {
            //tempSum에 앞자리를 연이어 넣어줌
            tempSum += arrNum1[i]*(2+i);
        }
        //주민번호 뒷자리를 tempSum에 집어 넣기
        //뒷자리 -1을 해주는 이유 : 뒷자리 마지막 자리는 더할 필요 없어서
        //뒷자리의 -1만큼 돌림
        for (var i = 0; i <objNum2.value.length-1; i++) {
            //뒷자리 2번째 자리 부터
            if (i>=2) {
                //tempSum에 2~6번째까지 넣어줌
                tempSum += arrNum2[i]*i;
            }else{//뒷자리 0~1번째 자리
                //tempSum에 0~1번째까지 넣어줌
                tempSum += arrNum2[i]*(8+i);
            }
        }
        //주민번호 유효성 체크
        //주민번호 구하는 식
        if (((11-(tempSum%11))%10)!=arrNum2[6]) {
            alert("올바른 주민 번호가 아닙니다.");
            objNum1.value="";
            objNum2.value="";
            objNum1.focus();
            return false;
        }
        //주민번호를 입력하면 생년월일이 자동으로 입력된다.
        //substring은 시작문자와 끝문자를 검색하는 역할
        if (arrNum2[0]==1 || arrNum2[0]==2) {//1900년생 일때
            var y = parseInt(objNum1.value.substring(0,2));
            var m = parseInt(objNum1.value.substring(2,4));
            var d = parseInt(objNum1.value.substring(4,6));
            //년도,월,일을 각각 구함
            f.my_year.value = 1900+y;//년도
            f.month.value = m;//월
            f.day.value = d;//일
        }else if(arrNum2[0]==3||arrNum2[0]==4){//2000년생 일때
            var y = parseInt(objNum1.value.substring(0,2));
            var m = parseInt(objNum1.value.substring(2,4));
            var d = parseInt(objNum1.value.substring(4,6));

            f.my_year.value = 2000+y;//년도
            f.month.value = m;//월
            f.day.value = d;//일
        }
    }
    function check(re,what,message){//정규화데이터,아이템 id,메세지
        if (re.test(what.value)) {//what의 문자열에 re의 패턴이 있는지 나타내는 함수 test
        //만약 내가 입력한 곳의 값이 정규화 데이터를 썼다면 true를 반환해서 호출 된 곳으로 리턴됨
            return true;
        }
        alert(message);
        what.value = "";
        what.focus();
    }


    //휴대번호
    function inputPhoneNumber(obj) {



    var number = obj.value.replace(/[^0-9]/g, "");
    var phone = "";



    if(number.length < 4) {
        return number;
    } else if(number.length < 7) {
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3);
    } else if(number.length < 11) {
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3, 3);
        phone += "-";
        phone += number.substr(6);
    } else {
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3, 4);
        phone += "-";
        phone += number.substr(7);
    }
    obj.value = phone;
}


//전화번호
function inputTelNumber(obj) {

    var number = obj.value.replace(/[^0-9]/g, "");
    var tel = "";

    // 서울 지역번호(02)가 들어오는 경우
    if(number.substring(0, 2).indexOf('02') == 0) {
        if(number.length < 3) {
            return number;
        } else if(number.length < 6) {
            tel += number.substr(0, 2);
            tel += "-";
            tel += number.substr(2);
        } else if(number.length < 10) {
            tel += number.substr(0, 2);
            tel += "-";
            tel += number.substr(2, 3);
            tel += "-";
            tel += number.substr(5);
        } else {
            tel += number.substr(0, 2);
            tel += "-";
            tel += number.substr(2, 4);
            tel += "-";
            tel += number.substr(6);
        }

    // 서울 지역번호(02)가 아닌경우
    } else {
        if(number.length < 4) {
            return number;
        } else if(number.length < 7) {
            tel += number.substr(0, 3);
            tel += "-";
            tel += number.substr(3);
        } else if(number.length < 11) {
            tel += number.substr(0, 3);
            tel += "-";
            tel += number.substr(3, 3);
            tel += "-";
            tel += number.substr(6);
        } else {
            tel += number.substr(0, 3);
            tel += "-";
            tel += number.substr(3, 4);
            tel += "-";
            tel += number.substr(7);
        }
    }

    obj.value = tel;
}