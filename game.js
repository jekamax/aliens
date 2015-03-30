var spritesUrls=
{
    fg:"test_fg.png",
    alien:"test_alien.jpg"
}
var sprites=spritesUrls;

function loadAndRun()
{
    var imageCount=countProperties(spritesUrls)
    var fired=false
    $.each(spritesUrls,function(name,url)
    {
       var img=new Image();
       img.onload=function()
       {
           imageCount--;
           if(imageCount==0 && !fired)
           {
               fired=true;
                runGame();    
           }
       }
       sprites[name]=img;
       img.src=url;
       
    })
}


function runGame()
{
toScreen(sprites.fg,getW(),getH(),100).css('pointer-events','none');



//var alien=toScreen(sprites.alien,10,40,-10).css({top: 50,left:50});

var alien=toScreen(sprites.alien,20,80,5).css({top: 50,left: 60});
var clicked=0;
alien.click(function()
{
  // alert("click")
  clicked++;
  $('#score').text(""+clicked);
})
setInterval(function()
{
    postAlien(alien,randInt(0,getW()),randInt(0,getH()));
    // postAlien(alien,100,100);
},2000)


}


function postAlien(obj,x,y)
{
    obj
    .css({left:x,top:y})
    .css({visibility:"visible"})
    .velocity({ 
    translateY: -30
    })
    .velocity({ 
    translateY: -30
    })
    .velocity({ 
    translateY: 0
    },
{
    complete:function(elements){
      obj.css({visibility:"hidden"})
    }
});

    
}





function toScreen(img,w,h,z)
{
    return $(img)
    .clone()
    .width((w!=0)?w:img.width)
    .height((h!=0)?h:img.height)
    .css('position', 'absolute')
    .css('z-index', z)
    .appendTo(screen());
}


function pos(object,x,y)
{
    $(object).velocity({left:x,top:y});
}

function screen()
{
  return $('#screen')
}

function getW()
{
  return screen().width();
}

function getH()
{
  return screen().height();
}

function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}

// использование Math.round() даст неравномерное распределение!
function randInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}