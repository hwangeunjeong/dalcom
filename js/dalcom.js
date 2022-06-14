$(document).ready(function () {
//__________________________________________________메뉴

    $(".gnbMenu").mouseenter(function () { //주메뉴 영역에 오버시
        $(this).find("li>.smenu").stop().slideDown();
        $(".bg_box").stop().slideDown();
    });

    $(".gnbMenu").mouseleave(function () { //헤더 영역에서 나갔을 시
        $(this).find("li>.smenu").stop().slideUp();
        $(".bg_box").stop().slideUp();
    });


//__________________________________________________비주얼

    let sUpimg = $(".slideUp ul");
    let sUpimgli = $(".slideUp ul li");
    let sUpbtn = $(".slideUp_btn ul li");
    let sUpnext = $(".sideUp_btn .nexup");
    let sUppre = $(".sideUp_btn .preup");
    let sUpimg_w = sUpimgli.height(); //이미지의 세로높이
    let sUpimg_n = sUpimgli.length; //이미지의 총개수  
    let sUpoldidx = 0; //기존이미지
    let sUpindex = 0; //선택된 새이미지


    //index번째 비주얼이미지 이동하는 함수생성
    function slideUpImg(sUpindex) {

        targetY = -(sUpindex * sUpimg_w); //움직이는 거리(너비)

        sUpimg.animate({
            top: targetY
        }, 600); //위에서 계산한 거리만큼 움직임
        sUpbtn.eq(sUpoldidx).removeClass("activeup"); //기존버튼 비활성화
        sUpbtn.eq(sUpindex).addClass("activeup"); //선택버튼 활성화
        sUpoldidx = sUpindex;

    };

    //슬라이드 자동함수 생성
    function slideUpAuto() {

        sUpindex++;
        if (sUpindex == sUpimg_n) { //simg_n은 이미지개수 4, index는 0,1,2,3
            sUpindex = 0;
        }
        slideUpImg(sUpindex);

    };

    autoUp = setInterval(slideUpAuto, 4000);


    //하단버튼 클릭
    sUpbtn.click(function () {

        clearInterval(autoUp); //버튼클릭시 자동함수 해지
        $(".playup").hide();
        $(".stopup").show();

        sUpindex = $(this).index();
        slideUpImg(sUpindex);
        autoUp = setInterval(slideUpAuto, 4000); //버튼 클릭안할땐 다시 자동함수 실행

    });

    //상하버튼 클릭
    sUpnext.click(function () {

        clearInterval(autoUp);
        $(".playup").hide();
        $(".stopup").show();

        sUpindex++;
        if (sUpindex > sUpimg_n - 1) { //마지막 이미지까지 오면 다시 첫번재 이미지부터 다시....
            sUpindex = 0;
        }
        slideUpImg(sUpindex);
        autoUp = setInterval(slideUpAuto, 4000);

    });

    sUppre.click(function () {

        clearInterval(autoUp);
        $(".playup").hide();
        $(".stopup").show();

        sUpindex--;
        if (sUpindex < 0) { //첫번째 이미지까지 오면 다시 맨 마지막 이미지부터 다시....
            sUpindex = sUpimg_n - 1; //총개수 4(이미지4컷)에서 1을 뺀 3->index=3(0,1,2,3) 
        }
        slideUpImg(sUpindex);
        autoUp = setInterval(slideUpAuto, 4000);

    });

    //Play,Stop 클릭
    $(".playup").hide(); //처음에는 Stop버튼은 보이게 하기위해 Play버튼은 숨김

    $(".stopup").click(function () {
        clearInterval(autoUp);
        $(".stopup").hide();
        $(".playup").show();
    });
    $(".playup").click(function () {
        autoUp = setInterval(slideUpAuto, 4000);
        $(".playup").hide();
        $(".stopup").show();
    });
//__________________________________________________coffee1 
$(".sub1 li:first").show();
    let goldidx = 0; //기존이미지
    let gidx = 0; //선택되는 이미지 

    function SeasonImg(gidx) { //idx는 선택되는 이미지 


        if (goldidx != gidx) { //기존의 이미지와 선택된 이미지가 다를떄.. 

            $(".sub2 li").eq(goldidx).css({
                "opacity": 0.3
            }); //기존의 썸네일흐리게
            $(".sub2 li").eq(gidx).css({
                "opacity": 1
            }); //선택된 썸네일 흐리게
            $(".sub1 li").eq(goldidx).stop().fadeOut(300); //기존이미지 사라짐 
            $(".sub1 li").eq(gidx).stop().fadeIn(300); //선택된 이미지 나타남
            $(".imgText li").eq(goldidx).stop().fadeOut(300); //기존 텍스트 사라짐
            $(".imgText li").eq(gidx).stop().fadeIn(300); //선택된 텍스트 나타남 

        }
        goldidx = gidx;
    }

    //썸네일버튼
    $(".sub2 li ").click(function () {
        gidx = $(this).index();
        SeasonImg(gidx);
    });

    //이전버튼
    $(".left_btn").click(function () {
        gidx--;
        if (gidx < 0) { //선택한 이미지가 0일때 다시 맨뒤부터 다시시작
            gidx = 3;
        }
        SeasonImg(gidx);
    });

    //다음버튼
    $(".right_btn").click(function () {
        gidx++;
        if (gidx > 3) {
            gidx = 0;
        }
        SeasonImg(gidx);

    });
//__________________________________________________coffee2
    let imgon_w = $(".ban ul li").width();
    let imgon_n = $(".ban ul li").length;
    let soldidxon = 0; //기존이미지
    let sindexon = 0; //선택된 새이미지

    $(".ban ul li:last").prependTo(".ban ul");
    //갤러리의 마지막 이미지를 갤러리 안의 가장 앞으로 배치 1234->4123	
    $(".ban ul").css({
        left: -imgon_w
    });
    //처음에 1이 보이기위해 앞으로 가져온 4를 왼쪽으로 밀어두기


    //index번째 비주얼이미지 이동하는 함수생성
    function banImg(sindexon, m) { //m은 prev와 next를 판단 


        if (m == 0) { //prev눌렀을때
            //이전 이미지가 슬라이드된후 마지막 이미지를 갤러리안의 제일 앞으로 배치

            $(".ban ul").stop(true, true).animate({
                left: "+=" + imgon_w + "px"
            }, 600, "easeOutCubic", function () {
                $(".ban ul li:last").prependTo(".ban ul");
                $(".ban ul").css({
                    left: -imgon_w
                });
            });


        }

        soldidxon = sindexon;

    }

    function banAuto() {
        sindexon++;
        if (sindexon == imgon_n) {
            sindexon = 0;
        }
        banImg(sindexon, 0);
    }

    auto2 = setInterval(banAuto, 4000);



});