(function(){
  var Watermark = function(obj,img,options){
    this.can = obj;
    this.text = options.text || '';
    this.arrImg = options.arrImg || '';
    this.left = options.left || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.top =  options.top || 0;
    this.color = options.color || '#000';
    this.img = img;
    this.family = options.family || '12px Microsoft YaHei';
    this.init();
  };
  Watermark.prototype = {
    init:function(){
      this.draw();
    },
    draw:function(){ 
      var canvas = this.can; 
      var ctx = canvas.getContext("2d");
      ctx.drawImage(this.img,0,0);
      ctx.drawImage(this.arrImg,this.left,this.top,this.width,this.height);
    },
    getImg:function() 
    {  
      var image = this.can.toDataURL();  
      return image
    },
  }
  window.Watermark = Watermark;
})()

function saveImage(){
	
  var canvas = document.getElementById('thecanvas');
  var newImgs = document.getElementById("backImage");
  var newImgs2 = document.getElementById("draggable");
  var ui_wrapper = document.getElementsByClassName("ui-wrapper");
  
  canvas.height = newImgs.height;
  canvas.width = newImgs.width;

  var oTop = newImgs.offsetTop
  var wTop =  ui_wrapper[0].offsetTop;
  var waterPositionTop= wTop-oTop;
  
  var oLeft = newImgs.offsetLeft;
  var wLeft =  ui_wrapper[0].offsetLeft;
  var waterPositionLeft= wLeft-oLeft;
  
  if(oLeft>wLeft+newImgs2.width || wLeft>oLeft+newImgs.width || oTop > wTop+newImgs2.height || wTop > oTop + newImgs.height){
	  var dImgheight = $("#backImage").height();
	  var dImgWidth = $("#backImage").height()/2.83;
 		$("#draggable").css({
		 "width":dImgWidth+"px",
		 "height": dImgheight+"px"
	  });
	  $(".ui-wrapper").css({
		 "width":dImgWidth+"px",
		 "height": dImgheight+"px"
	  });	
	  alert("Please position the banana over your photo!")
	return false;
  }else{
$("#thecanvas,#save_final").hide();
$("#final_img").css({position: 'absolute'});
  
  
  var img2 = new Watermark(canvas,newImgs,{arrImg:newImgs2,left:waterPositionLeft,top:waterPositionTop,width:newImgs2.width,height:newImgs2.height});
  var longsurl = img2.getImg();
  
  $(function() {
      var token = $('meta[name="csrf-token"]').attr('content');
      return $.ajaxPrefilter(function(options, originalOptions, xhr) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
      });
  });