
var sprites =  {
    alien: $('#alien'),
    alien_shot: $('#alien_shot')
}

var sw=63;
var sh=178;

var timer=null;
var placeDelay=4000;


function runGame() {
   
    fillBuffer(15);
    timer=setInterval(placeAlien, placeDelay)


}


function placeAlien()
{
    var p = points[randInt(0, points.length)];
       postAlien(p.x, p.y, p.a + randInt(-5, 5));
}

var alienBuffer = [];


var found = 0;

function upscore() {
 found++
    if(found>0)
    {
        var word=getNumEnding(found,['контакт','контакта','контактов']);   
        $('#score').text('Обнаружено '+found+' '+word);
    }
    
placeDelay-=(placeDelay/7);        
clearInterval(timer);
 timer=setInterval(placeAlien, placeDelay)

}

var lostcount=0;

function updeath() {
    lostcount++
    if(lostcount>0)
    {
        var word=getNumEnding(lostcount,['контакт','контакта','контактов']);   
        $('#fail').text('Власти скрыли '+lostcount+' '+word);
        $('#credits').css({
                    visibility: "visible"
                })
    }
    if(lostcount>4)
    {
       
        $('#maxfail').css({
                    visibility: "visible"
                })
    }
    if(lostcount>=70)
    {
        placeDelay=400000;
        clearInterval(timer);
        var word=getNumEnding(found,['контакт','контакта','контактов']); 
        var youlost='Власти добрались до тебя.<br> Но ты успел обнаружить<br>'+found+' '+word+'.'
        $('#totalfail').html(youlost);
        $('#totalfail').css({visibility:'visible'});
        
    }
}



function postAlien(x, y, a) {
    var step = 170;
    var alien = null;
    for (var i = 0; i < alienBuffer.length; ++i) {
        alien = alienBuffer[i];
        if (alien.data('use') == false) {
            alien.data('use',true)
            alien.css('background', 'url(alien.png) no-repeat');
            alien.css({
                    left: x,
                    top: y
                })
                .css({
                    visibility: "visible"
                })
                .velocity({
                    translateY: step,
                }, {
                    duration: 0
                })
                .velocity({
                    translateY: 0,
                    rotateZ: a
                })
                .velocity({
                    translateY: step,
                    rotateZ: 0
                }, {
                    delay: 600,
                    complete: function(elements) {
                        alien.css({
                            visibility: "hidden"
                        })
                        alien.data('use', false)
                        if (alien.data('clicked') == false) {
                            updeath();
                        }
                    }
                }); 
            break;
        }
    }


}


function fillBuffer(num) {
    for (var i = 0; i < num; ++i) {
        var alien = makeAlien(sprites.alien, sw, sh, 5);
        alien.data('use', false);
        alien.data('clicked', false)
        alien.click(function() {
            var obj=$(this);
            if (obj.data('clicked') == false) {
                upscore();
                obj.data('clicked', true)
            }
            obj.velocity('stop');
             obj.css('background', 'url(alien_shot.png) no-repeat');
            obj.velocity({
                translateY: obj.height()
            }, {
                delay: 800,
                complete: function(elements) {
                    obj.css({
                        visibility: "hidden"
                    })
                    obj.data('use', false)
                    obj.data('clicked', false)
                }
            }) 


        })
        alienBuffer.push(alien);
    }
}


function makeAlien(img, w, h, z) {
    return $('<div></div>')
        .width((w != 0) ? w : img.width())
        .height((h != 0) ? h : img.height())
        .css('position', 'absolute')
        .css('z-index', z)
        .appendTo(screen())
        .css('visibility', 'hidden');
}


function pos(object, x, y) {
    $(object).velocity({
        left: x,
        top: y
    });
}

function screen() {
    return $('#screen')
}

function getW() {
    return screen().width();
}

function getH() {
    return screen().height();
}

function countProperties(obj) {
    var count = 0;

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}

// использование Math.round() даст неравномерное распределение!
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNumEnding(iNumber, aEndings)
{
    var sEnding, i;
    iNumber = iNumber % 100;
    if (iNumber>=11 && iNumber<=19) {
        sEnding=aEndings[2];
    }
    else {
        i = iNumber % 10;
        switch (i)
        {
            case (1): sEnding = aEndings[0]; break;
            case (2):
            case (3):
            case (4): sEnding = aEndings[1]; break;
            default: sEnding = aEndings[2];
        }
    }
    return sEnding;
}
$(window).load(runGame());