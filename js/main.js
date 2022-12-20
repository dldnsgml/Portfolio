$(function(){
	// 1) 페이지 이동 관련
	var scrollT=0; // 윈도우 상단 좌표 변수입니다.
	var darkN=0; // 메뉴 인터랙션 활성화 변수입니다.
	var pageN=0; // 페이지 활성화 변수입니다.
	var targetY=0; // 클릭했을 때 윈도우 상단 좌표 변수입니다.
	var winHalf;
	var categoryFlag=false; // 페이지 활성화를 시키지 못하게 하는 변수입니다.

	function init(){
		$(".floating_menu li").eq(darkN).addClass("active");
		$("#header .menu li").eq(darkN).addClass("active");
		$("#start .controller li").eq(darkN).addClass("active");
		$("html").animate({scrollTop: targetY}, 300);
	}
	init();

	$(window).scroll(function(){
		scrollT=$(window).scrollTop();

		if(scrollT <= $("#page1").offset().top){
			darkN=0;
		}
		else if(scrollT <= $("#page2").offset().top){
			darkN=1;
		}
		else if(scrollT <= $("#page3").offset().top){
			darkN=2;
		}
		else if(scrollT <= $("#page4").offset().top){
			darkN=3;

			if(Math.floor(scrollT) == $(document).height()-$(window).height()){ // 끝까지 내려올 경우
				darkN=4;
			}
		}
		else{
			darkN=4;
		}



		// console.log("darkN : "+darkN);

		$(".floating_menu li").removeClass("active");
		$(".floating_menu li").eq(darkN).addClass("active");
		$("#header .menu li").removeClass("active");
		$("#header .menu li").eq(darkN).addClass("active");
		$("#start .controller li").removeClass("active");
		$("#start .controller li").eq(darkN).addClass("active");

		if(darkN == 1 || darkN == 2 || darkN == 3){ /* 배경색이 흰색 */
			$("#start .controller").addClass("dark");
			$("#header .menu").addClass("dark");
			$(".fix_logo").addClass("dark");
			$(".fix_tab").addClass("dark");
			$(".fix_copy").addClass("dark");
			$(".fix_contact").addClass("dark");
			$(".fix_contact .checkout").addClass("dark");
		}
		else{
			$("#start .controller").removeClass("dark");
			$("#header .menu").removeClass("dark");
			$(".fix_logo").removeClass("dark");
			$(".fix_tab").removeClass("dark");
			$(".fix_copy").removeClass("dark");
			$(".fix_contact").removeClass("dark");
			$(".fix_contact .checkout").removeClass("dark");
		}

		if(scrollT <= $("#page1").offset().top-winHalf){
			pageN=0;
		}
		else if(scrollT <= $("#page2").offset().top-winHalf){
			pageN=1;
		}
		else if(scrollT <= $("#page3").offset().top-winHalf){
			pageN=2;
		}
		else if(scrollT <= $("#page4").offset().top-winHalf){
			pageN=3;
		}
		else{
			pageN=4;
		}
		// console.log("pageN : "+pageN);

		if(pageN == 0){
			$(".download_pc").removeAttr("style").removeClass("bright");
			$(".download_mobile").removeAttr("style").removeClass("bright");
		}
		else if(pageN == 3){
			$(".download_pc").hide().removeClass("bright");
			$(".download_mobile").hide().removeClass("bright");
		}
		else{
			$(".download_pc").removeAttr("style").addClass("bright");
			$(".download_mobile").removeAttr("style").addClass("bright");
		}

		/*
		if(categoryFlag){
			return;
		}
		else{
			if(pageN == 0){
				$("#header").addClass("active");
			}
			else{
				$("#page"+pageN).addClass("active");

				if(pageN == 4){
					categoryFlag=true;
				}
			}
		}
		*/

		if(categoryFlag) return;

		if(pageN == 0){
			$("#start").addClass("active");
		}
		else{
			$("#page"+pageN).addClass("active");

			if(pageN == 4){
				categoryFlag=true;
			}
		}
	});

	// 2) 화면 크기 조정 관련
	$(window).resize(function(){
		winHalf=$(window).height()/2;
	});

	$(window).trigger("resize");
	$(window).trigger("scroll");

	// 3) 탭 이동 관련
	$(".fix_tab").click(function(e){
		e.preventDefault();

		if($(this).hasClass("active")){
			$("body").removeClass("fixed");
			$(this).removeClass("active");
			$(".floating_menu").removeClass("active");
		}
		else{
			$("body").addClass("fixed");
			$(this).addClass("active");
			$(".floating_menu").addClass("active");
		}
	});
	$("#header .menu li, #start .controller li").click(function(e){
		e.preventDefault();
		darkN=$(this).index();

		if(darkN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+darkN).offset().top+1;
		}

		$("html").animate({scrollTop: targetY}, 300);
	});

	$(".floating_menu li").click(function(e){
		e.preventDefault();
		darkN=$(this).index();

		if(darkN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+darkN).offset().top+1;
		}

		$("body").removeClass("fixed");
		$(".fix_tab").removeClass("active");
		$(".floating_menu").removeClass("active");
		$("html").delay(400).animate({scrollTop: targetY}, 300);
	});

	// 4) 비디오 구현 관련
	// SwiperJS + Video + Map
	var videoUrl=["video1", "video2", "video3"];
	var videoTotal=videoUrl.length-1; // 3, 총 개수 ---> 2, 인덱스(0, 1, 2)
	var videoN=0;
	var videoPath="";
	var video=document.getElementById("my_video");
	video.muted=true;
	// video.play();

	function videoDimmed(){
		$(".media video").hide().css({opacity: 0});
		// hide() : display none

		setTimeout(function(){
			$(".media video").show().animate({opacity: 1}, 300, function(){
				video.play();
			});
		}, 800);
		$(".preload, .cover, .cover .title").addClass("loaded");
	}

	video.addEventListener("loadeddata", function(){
		videoDimmed();
	});
	video.addEventListener("ended", function(){
		if(videoN < videoTotal){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		video.pause();
		videoPath="video/"+videoUrl[videoN]+".mp4";
		$("#my_video").attr({src: videoPath});
		videoDimmed();
	});
	$(".arrow .left").click(function(e){
		e.preventDefault();

		if(videoN > 0){
			videoN-=1;
		}
		else{
			videoN=videoTotal;
		}

		video.pause();
		videoPath="video/"+videoUrl[videoN]+".mp4";
		$("#my_video").attr({src: videoPath});
	});
	$(".arrow .right").click(function(e){
		e.preventDefault();

		if(videoN < videoTotal){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		video.pause();
		videoPath="video/"+videoUrl[videoN]+".mp4";
		$("#my_video").attr({src: videoPath});
	});

	





	var projectN=0;

	$(".project:first").addClass("active");

	$(".project .title_area").click(function(e){
		e.preventDefault();
		var project=$(this).parents(".project");

		if(projectN != project.index()){
			ptojectN=project.index();
			$(".project").removeClass("active");
			project.addClass("active");

			var projectY=$(this).offset().top-60;
			$("html").animate({scrollTop:projectY}, 800);
		}
	});

	/*
	function mobileLink(){
		if(isMobile){
			$("a.project1").attr({href:"project1/mobile/index.html"});
		}
		else{
			$("a.project1").attr({href:"project1/pc/index.html"});
		}
		$("a.project2").attr({href:"project2/index.html"});
	}

	mobileLink();
	*/

	$(".global_tabs").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$("body").toggleClass("fixed");
		$(".floating_menu").toggleClass("active");
	});
	$("#gnb ul li").click(function(e){
		e.preventDefault();
		pageN=$(this).index();

		if(pageN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+pageN).offset().top;
		}
		$("html").animate({"scrollTop":targetY}, 300);
	});
	$(".mobile_menu li").click(function(e){
		e.preventDefault();
		pageN=$(this).index();

		$(".global_tabs").removeClass("active");
		$("body").removeClass("fixed");
		$(".floating_menu").removeClass("active");

		if(pageN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+pageN).offset().top;
		}

		$("html").delay(400).animate({"scrollTop":targetY}, 300);
	});

	// setTimeout(function(){
	// 	$(".preload, .cover").addClass("loaded");
	// }, 10);
});