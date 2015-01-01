/**
Copyright © 2014 Devaprise

Title: Bit Surfer

Credits:
  1) CTaps (CEO)
  2) Virus (COO) 
  3) Thomas L. (CTO)
  4) Marco Merlini (CFO) 
  5) MAXXtreme [Credits for making Shark]
  6) BenTheGreat
  7) The #1 Base 12 proponent[Bouncing text]
Date Started: January 7, 2014
Date Finished: Febuary 17, 2014
KA Page:https://www.khanacademy.org/cs/a/4714792006189056
Website: http://devaprise.com/
Email: devaprise@outlook.com
Twitter: @Devaprise
License: MIT License  (http://opensource.org/licenses/MIT)
*/
/************************
 *      Constants       *
 ************************/
var FPS = 30;


var KEYS  = [],
    MOUSE = [];

var SPACEBAR = 32;
var dead = false;
var EXPLODE = 0;
var particles = [];
var fade = 0;
var score = 0;
var numCircles = 360/45;
var t = 0;
var allsize = 195;
var why = allsize/13;
var manx=200;
var many=200;
var Hover = false;
var Boost = 0;
var Invincibility = 0;
var change = 0;
var arox = 203;
var aroy = 292;
/************************
 *        Events        *
 ************************/
keyPressed = function(){KEYS[keyCode] = true;};
keyReleased = function() {KEYS[keyCode] = false;};

var DISPLAY = {
    show: 'menu',
    fade: 0,
    add: function(o) {
        var origValues = {};
        for (var prop in o) {
            if (o.hasOwnProperty(prop)) {
                origValues[prop] = o[prop];
            }
        }
        o.origValues = origValues;
        o.reset = function() {
            for (var prop in o.origValues) {
                o[prop] = o.origValues[prop];
            }
        };
        this[o.name] = o;
    },
    reset: function() {
        for (var prop in this[this.show].origValues) {
            this[this.show][prop] = this[this.show].origValues[prop];
        }
    },
    draw: function() {
        this[this.show].draw();
        noStroke();
        fill(255, 255, 255, 255-this.fade);
        rect(0,0,400,400);
        if(this.fade<255) {
            this.fade+=2;
        }
    }
};

/************************
 *      Functions       *
 ************************/

var drawWater = function(y,speed) {
    var leftX = 0;
    var leftY = y - 20 + cos(frameCount * speed) * 20;
    
    var rightX = width;
    var rightY = y - 20 +sin(frameCount * speed) * 20;
    fill(0,0,255,100);
    quad(leftX, leftY, rightX, rightY, width, width, 0, width);
};
var onButton = false; 
var button = function(drawWord, x, y, width, height){
    textAlign(CENTER, CENTER);
    textSize(10);
    if(mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height){
        onButton = true;
    }
    else{
        onButton = false;
    }
    if(!onButton){
        fill(133, 188, 255);
    }
    else{
        fill(255, 255, 255);
    }
    strokeWeight(3);
    stroke(0);
    rect(x, y, width, height);
    fill(0);
    text(drawWord, x + width/ 2, y + height/2);
};
var leftX=-100;
var clouds = function(){
    fill(255,255,255,225);
    ellipse(leftX, 50, 126, 97);
    ellipse(leftX+62, 50, 70, 60);
    ellipse(leftX-62, 50, 70, 60);
};

// Compressed 
var drawLetter=function(letter,x,y,size){letter=letter.toUpperCase();pushMatrix();translate(x,y);scale(size,size);translate(-x,-y);noStroke();switch(letter){case"A":rect(x,y,6,15);rect(x+6,y,6,4);rect(x+8,y+4,4,11);rect(x+6,y+7,3,2);break;case"B":rect(x,y,6,15);rect(x+6,y,6,3);rect(x+6,y+5,6,4);rect(x+6,y+11,6,4);rect(x+9,y,4,15);break;case"C":rect(x,y,6,15);rect(x+6,y,6,4);rect(x+6,y+11,6,4);break;case"D":rect(x,y,6,15);rect(x+6,y,6,4);rect(x+6,y+9,6,6);rect(x+8,y+4,4,5);break;case"E":rect(x,y,6,15);rect(x+6,y,6,4);rect(x+6,y+6,4,3);rect(x+6,y+11,6,4);break;case"F":rect(x,y,6,15);rect(x+6,y,6,3);rect(x+6,y+5,4,3);break;case"G":rect(x,y,6,15);rect(x+6,y,6,4);rect(x+6,y+11,6,4);rect(x+8,y+5,4,6);break;case"H":rect(x,y,6,15);rect(x+6,y+6,3,3);rect(x+8,y,4,15);break;case"I":rect(x,y,12,4);rect(x+3,y+4,6,8);rect(x,y+11,12,4);break;case"J":rect(x,y,12,4);rect(x+6,y+4,6,11);rect(x,y+12,6,3);rect(x,y+9,3,3);break;case"K":rect(x,y,6,15);rect(x+6,y+6,3,3);rect(x+9,y+2,3,4);rect(x+9,y+9,3,6);break;case"L":rect(x,y,6,15);rect(x+6,y+11,6,4);break;case"M":rect(x,y,6,15);rect(x+6,y+2,3,6);rect(x+8,y,4,15);break;case"N":rect(x,y,6,15);rect(x+6,y,3,3);rect(x+8,y,4,15);break;case"0":case"O":rect(x,y,6,15);rect(x+6,y,3,3);rect(x+6,y+12,3,3);rect(x+8,y,4,15);break;case"P":rect(x,y,6,15);rect(x+6,y,3,3);rect(x+6,y+5,3,3);rect(x+8,y,4,8);break;case"Q":rect(x,y,6,15);rect(x+6,y,3,3);rect(x+6,y+12,3,3);rect(x+8,y,4,15);rect(x+6,y+15,3,2);break;case"R":rect(x,y,6,15);rect(x+6,y,3,3);rect(x+6,y+6,3,3);rect(x+8,y,4,7);rect(x+9,y+9,3,6);break;case"S":rect(x,y,3,6);rect(x+3,y,9,3);rect(x,y+6,12,3);rect(x+6,y+9,6,6);rect(x,y+11,6,4);break;case"T":rect(x,y,12,5);rect(x+4,y+5,4,10);break;case"U":rect(x,y,6,15);rect(x+6,y+12,3,3);rect(x+8,y,4,15);break;case"V":rect(x,y,6,12);rect(x+4,y+10,8,5);rect(x+9,y,3,10);break;case"W":rect(x,y,6,15);rect(x+6,y+7,3,6);rect(x+8,y,4,15);break;case"X":rect(x,y,6,6);rect(x+3,y+6,6,3);rect(x,y+9,3,6);rect(x+6,y+9,6,6);rect(x+9,y,3,6);break;case"Y":rect(x,y,6,8);rect(x+6,y+5,6,3);rect(x+9,y,3,5);rect(x+3,y+8,6,7);break;case"Z":rect(x,y,12,3);rect(x+6,y+3,6,6);rect(x,y+6,6,3);rect(x,y+9,6,6);rect(x+6,y+12,6,3);break;case":":rect(x+3,y,6,6);rect(x+3,y+9,6,6);break;case".":rect(x+3,y+9,6,6);break;case",":rect(x+3,y+9,6,9);break;case"1":rect(x+6,y,6,15);break;case"2":rect(x,y,12,3);rect(x,y+3,4,3);rect(x+8,y+3,4,3);rect(x+4,y+6,6,3);rect(x,y+9,6,3);rect(x,y+11,12,4);break;case"3":rect(x+6,y,6,15);rect(x,y,6,4);rect(x+1,y+6,5,3);rect(x,y+11,6,4);break;case"4":rect(x+6,y,6,15);rect(x,y+6,6,3);rect(x,y,3,6);break;case"5":rect(x,y,3,6);rect(x+3,y,9,3);rect(x,y+5,12,4);rect(x+6,y+9,6,6);rect(x,y+11,6,4);break;case"6":rect(x,y,12,3);rect(x,y+3,3,12);rect(x+3,y+12,9,3);rect(x+3,y+6,9,3);rect(x+6,y+9,6,3);break;case"7":rect(x,y,12,3);rect(x+6,y+3,6,6);rect(x+3,y+6,6,8);break;case"8":rect(x,y,6,15);rect(x+6,y,6,3);rect(x+6,y+5,6,4);rect(x+6,y+11,6,4);rect(x+8,y,5,15);break;case"9":rect(x+6,y,6,15);rect(x,y,6,3);rect(x,y+3,3,6);rect(x+3,y+6,3,3);break;}popMatrix();};

var drawWord = function(text, x, y, size, alignment) {
    var offset = 0;
    if(alignment !== undefined) {
        if(alignment === CENTER) {
            offset = (14 * size) * text.length / 2;
        } else if(alignment === RIGHT) {
            offset = (14 * size) * text.length;
        }
    }
   
    for(var i = 0; i < text.length; i++) {
        var character = text.charAt(i) + "";
        drawLetter(character, (x + ((14 * size) * i)) - offset, y, size);
    }
};
var createParticle = function(x, y, size, color, xMotion, yMotion) {
    var particle = {
        x: x,
        y: y,
        size: size, 
        color: color, 
        xMotion: xMotion, 
        yMotion: yMotion, 
        lifeTime: random(10) + 15, 
        alive: 0
    };
    particles[particles.length] = particle;
};
var drawParticles = function() {
    for(var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        if(particle.alive >= particle.lifeTime) {
            particles.splice(i, 1);
            continue;
        }
        
        fill(particle.color);
        ellipse(particle.x, particle.y, particle.size, particle.size);
        
        particle.x += particle.xMotion;
        particle.y += particle.yMotion;
        
        particle.alive++;
    }
};
var die = function(meansOfDeath) {
    if(meansOfDeath === EXPLODE) {
        for(var i = 0; i < random(5) + 10; i++) {
            var size = random(2) + 2;
            noStroke();
            createParticle(206, 194, size, color(255, 0, 0), random(14) - 2, random(2) - 2);
        }
    }
};
var drawPlayer = function(x,y,size,size){
    noStroke();
    translate(x,y);
    scale(1/7);
    fill(255, 204, 0);// hair color
    //layer 1(top)
    rect(200 + allsize/27, 200 - allsize/1.06, allsize/4.25, why);
    //layer 2
    rect(200 - allsize/2.6, 200 - allsize/1.15, allsize/1.625, why);
    //layer 3
    rect(200 - allsize/2.6, 200 - allsize/1.26, allsize/3.25, why);
    fill(237, 213, 118); //skin color
    rect(manx - allsize/13, many - allsize/1.26, allsize/13, why);
    fill(0, 0, 0);
    rect(manx - allsize/390, many - allsize/1.26, allsize/13, why);
    fill(237, 213, 118);
    rect(manx + allsize/12.6, many - allsize/1.26, allsize/13, why);
    //layer 3
    fill(255, 204, 0);
    rect(manx - allsize/2.16, many - allsize/1.39, allsize/2.6, why);
    fill(237, 213, 118);
    rect(manx - allsize/13, many - allsize/1.39, allsize/13, why);
    fill(0, 0, 0);
    rect(manx - allsize/390, many - allsize/1.39, allsize/13, why);
    fill(237, 213, 118);
    rect(manx + allsize/12.6, many - allsize/1.39, allsize/4.333333, why);
    //layer 4
    fill(255, 204, 0);
    rect(manx - allsize/2.16, many - allsize/1.56, allsize/4.333333, why);
    rect(manx - allsize/6.4, many - allsize/1.56, allsize/13, why);
    fill(237, 213, 118);
    rect(manx - allsize/4.3, many - allsize/1.56, allsize/13, why);
    rect(manx - allsize/13, many - allsize/1.56, allsize/2.16666667, why);
    //layer 5
    fill(255, 204, 0);
    rect(manx - allsize/2.16, many - allsize/1.77, allsize/4.333333, why);
    fill(237, 213, 118);
    rect(manx - allsize/4.3, many - allsize/1.77, allsize/3.25, why);
    fill(204, 164, 138);//lip color
    rect(manx + allsize/12.6, many - allsize/1.77, allsize/4.333333, why);
    //layer 6
    fill(255, 204, 0);
    rect(manx - allsize/3.23, many - allsize/2.05, allsize/13, why);
    fill(237, 213, 118);
    rect(manx - allsize/4.3, many - allsize/2.05, allsize/2.16666667, why);
    // body layer 1 (from neck)
    rect(manx - allsize/2.6, many - allsize/2.43, allsize/2.16666667, why);
    // body layer 2 
    rect(manx - allsize/2.16, many - allsize/2.98, allsize/1.3, why);
    // body layer 3
    rect(manx - allsize/1.86, many - allsize/3.9, allsize/1.08333333, why);
    // body layer 4
    rect(manx - allsize/1.86, many - allsize/5.5, allsize/6.5, why);
    rect(manx + allsize/4.29, many - allsize/5.5, allsize/6.5, why);
    rect(manx - allsize/3.23, many - allsize/5.5, allsize/2.16666667, why);
    //hands (layers 5/6)
    rect(manx - allsize/1.86, many - allsize/9.55, allsize/4.333333, why);
    rect(manx + allsize/6.4, many - allsize/9.55, allsize/4.333333, why);
    rect(manx - allsize/1.86, many - allsize/42, allsize/6.5, why);
    rect(manx + allsize/4.29, many - allsize/42, allsize/6.5, why);
    // swimtrunks (layers 6/7/8)
    fill(179, 23, 23);
    rect(manx - allsize/3.23, many - allsize/9.55, allsize/2.16666667, why);
    rect(manx - allsize/3.23, many - allsize/42, allsize/2.16666667, why);
    rect(manx - allsize/2.6, many + allsize/18.7, allsize/4.333333, why);
    rect(manx - allsize/390, many + allsize/18.7,allsize/4.333333 , why);
    rect(manx - allsize/2.16, many + allsize/7.8, allsize/4.333333, why);
    rect(manx + allsize/12.6, many + allsize/7.8, allsize/4.333333, why);
    // feet (last layer)
    fill(237, 213, 118);
    rect(manx - allsize/1.86, many + allsize/5, allsize/3.25, why);
    rect(manx + allsize/12.6, many + allsize/5, allsize/3.25, why);
    resetMatrix();
    //surfboard 
    noStroke();
    translate(x,y-8);
    scale(1/7);
    fill(255, 132, 0);
    rect(105, 300, 162, 30);
    fill(0, 255, 51);
    rect(105, 292.5, 161, 7.5);
    rect(105, 329.5, 161, 7.5);
    rect(266, 293, 7.5, 45);
    rect(98, 293, 7.5, 45);
    rect(274, 293, 7.5, 45.0);
    rect(90, 293, 7.5, 45.0);
    rect(282, 305, 7.5, 22.5);
    rect(82, 305, 7.5, 22.5);
    fill(255, 255, 255);
    rect(134, 314, 15 * 7, 3);
    resetMatrix();
};
var drawShark = function(shark){
    noStroke(); 
    translate(-290,-100);
    fill(133,133,133);
    ellipse(shark.x+345,shark.y+124,80,25);
    triangle(shark.x+334,shark.y+112,shark.x+358,shark.y+95,shark.x+349,shark.y+112);
    triangle(shark.x+337,shark.y+129,shark.x+371,shark.y+151,shark.x+354,shark.y+127);
    triangle(shark.x+388,shark.y+125,shark.x+401,shark.y+95,shark.x+373,shark.y+125);
    triangle(shark.x+397,shark.y+148,shark.x+384,shark.y+116,shark.x+375,shark.y+125);
    fill(0,0,0);
    rect(shark.x+327,shark.y+120,1,6);
    rect(shark.x+330,shark.y+119,1,6);
    rect(shark.x+333,shark.y+120,1,6);
    fill(0,0,0);
    ellipse(shark.x+320,shark.y+120,8,4);
    fill(255,0,0);
    ellipse(shark.x+320,shark.y+120,4,4);
    fill(255,255,255);
    triangle(shark.x+307,shark.y+129,shark.x+322,shark.y+127,shark.x+324,shark.y+125);
    resetMatrix();
};
var drawCoin = function(x,y){
    translate(x,y);
    noStroke();
    
    fill(255, 213, 0);
    rect(-5, -3, 10, 6);
    rect(-3, -5, 6, 10);
    
    fill(0, 0, 0);
    rect(-2, -2, 4,4);
    resetMatrix();
};
var sine = 0;
/************************
 *        Objects       *
 ************************/
var Player = function() {
    this.x = 0; this.y=0+cos(frameCount*3)*20+mouseX*(sin(frameCount*3)-cos(frameCount*3))/(25);
    this.startX= 20; this.startY= 20;
    this.width= 40; this.height=40;
    this.health= 100;
    this.speed= 4;
    this.lives= 3;
    this.invincible = false;
    this.falling= true; // Player is in the air until program states otherwise.
    this.yvel= 0;
    this.xvel= 0;
    this.surfboard= 280;
    this.invincible = false;
    // Used is we want to check collision between other objects like sharks and powerups.
    this.collideWith= function(obj) { 
        if(this.x+this.width>obj.x     &&
           this.x < obj.x+obj.width &&
           this.y+this.height>obj.y    &&
           this.y>obj.y+obj.height) {
            return obj;
        } else {
            return -1;
        }
    };
};
// Handles the Player's jump animation
Player.prototype.jump= function() {
    if((mouseIsPressed || KEYS[SPACEBAR])  && !this.falling) {
    this.yvel=-12;
    }
    if(this.falling) {
        this.yvel+=0.8;
    }
    this.falling = true;
    if (this.y>this.surfboard) {
        this.y=this.surfboard;
        this.falling = false;
        this.yvel = 0;
    }
};
Player.prototype.draw= function() {
    drawPlayer(this.x,this.y+cos(frameCount*3)*20+mouseX*(sin(frameCount*3)-cos(frameCount*3))/(25),this.width,this.height);
    Player.jump();
    this.x = mouseX-40;
    this.y += this.yvel;
    //debug
    // fill(255, 0, 0);
    // rect(this.x+10,this.y+cos(frameCount*3)*20+mouseX*(sin(frameCount*3)-cos(frameCount*3))/(25),this.width,this.height);
};
Player.prototype.reset= function() { // Reset for when player dies.
    this.x = this.startX;
    this.y = this.startY;
    this.health = 100;
};
var Player = new Player();
var collision = function(obj1,obj2) {
    if(obj1.x+obj1.width>obj2.x&&
       obj1.x<obj2.x+obj2.width&&
       obj1.y+obj1.height>obj2.y&&
       obj1.y<obj2.y+obj2.height)
    {
        return true;
    }
};
var coins;
var Coin = function(pat,hsh,vsh,hst,vst,xv,rev,ident) {
    this.id = ident;
    this.x = hsh;
    this.xvel = xv;
    this.y = 0;
    this.rev = rev;
    this.pattern = [pat,hsh,vsh,hst,vst]; //Pattern, H. Shift, V. Shift, H. Stretch, V. Stretch
    this.step = function() {
        if(this.rev) {
            if (this.x < -5) {
                coins.rembyid(this.id);
                score -= 15;
                return;
            }
        } else {
            if (this.x > 405) {
                coins.rembyid(this.id);
                score -= 15;
                return;
            }
        }
        switch (this.pattern[0]) {
            case sine:
                this.y = this.pattern[4]*sin((1/(this.pattern[3]))*this.x) + this.pattern[2];
        }
        this.x += this.xvel;
    };
};
Coin.prototype.draw = function() {
    fill(255, 0, 0);
    if(this.x - 3 > Player.x && this.x + 7 < Player.x + Player.width && this.y - 3 > Player.y && this.y + 7 < Player.y + Player.height) {
        coins.rembyid(this.id);
        score += 5;
        return;
    }
    drawCoin(this.x, this.y, 0.2, 0.2);
};
coins = {
    id: -1,
    coins: [],
    add: function(pat,hsh,vsh,hst,vst,xv,rev) {
        rev = rev || false;
        this.id++;
        this.coins[this.coins.length] = new Coin(pat,hsh,vsh,hst,vst,xv,rev,this.id);
        return this.id;
    },
    rembyid: function(ident) {
        var ind = -1;
        for (var i = 0; i < this.coins.length; i++) {
            if (this.coins[i].id === ident) {
                ind = i;
                break;
            }
        }
        if (ind >= 0) {
            this.coins.splice(ind, 1);
        }
    }
};
var drawPattern = function() {
    for (var i = 0, j = -200; i < 20; i++, j+=10) {
        coins.add(sine,j,230,0.4,50,2);
    }
    for (var i = 0, j = -200; i < 20; i++, j+=10) {
        coins.add(sine,j,230,0.4,-50,2);
    }
};
var drawPatternFlip = function() {
    for (var i = 0, j = -200; i < 20; i++, j+=10) {
        coins.add(sine,420-j,230,0.4,50,-2,true);
    }
    for (var i = 0, j = -200; i < 20; i++, j+=10) {
        coins.add(sine,420-j,230,0.4,-50,-2,true);
    }
};
var sharks = [];
sharks.draw = function() {
    for(var i=0; i<this.length; i++) {
        this[i].draw();
    }
};

var Shark = function(x,y,speed,size) {
    this.x = x-10;
    this.y = y;
    
    // What's the shark's size?
    this.width = 60; 
    this.height = 40;
    
    this.speed = speed || 4; // Default: 4
    
    this.damage = 5;
    
    this.move = function(){
       this.x -= this.speed;
    };
};
Shark.prototype.draw = function() {
        // Shark Image Here -
        drawShark({x:this.x, y: this.y, width: this.width, height:this.height});
        // I might want to do this in the Player Object and not the shark's but
        // I'm leaving it here for now.
        // Update shark's X position
        this.move();
        //debug collisions
        // fill(255,0,0);
        // rect(this.x+30,this.y,this.width,this.height);
    };
var collisionWithArray = function(Player,sharks) {
    if(sharks.length>0) {
        for(var i in sharks) {
            var o = sharks[i];
            if(Player.x+o.width>o.x+60&&
               Player.x<o.x+60+o.width&&
               Player.y+o.height>o.y&&
               Player.y<o.y+o.height) {
                return o;
            }
        }
    }
};

/************************
 *        Scenes        *
 ************************/
var Game = {
    name: 'game',
    score: 0,
    draw: function() {
        var i, f;
        noStroke();
        
        // Background & Ocean
        background(161, 233, 255);
        fill(225, 255, 0);
        ellipse(0,0,100,100);
        clouds();
        
        leftX +=1;
        if (leftX-100 > width) {
            leftX = -100;
        }
        //<-
        drawWater(340,3);
        // Player
        Player.draw();

       // Sharks
        sharks.draw(Player);
       // Adds shark every two seconds
       if(frameCount%300 === 0) {
           sharks.push(new Shark(450, 300, 1.9, 2));
       }
       if(frameCount%1000 === 0){
           sharks.push(new Shark(450,300, 3, 2));
       }
       if(frameCount%2000 === 0){
           sharks.push(new Shark(450,300, 3, 2));
       }
    for (var i = 0; i < coins.coins.length; i++) {
        var id = coins.coins[i].id;
        coins.coins[i].step();
        if (coins.coins[i] && coins.coins[i].id === id) {
            coins.coins[i].draw();
        }
    }
     if(frameCount % 200 === 0) {
         drawPattern();
     }
     if(frameCount % 1000 === 0) {
         drawPatternFlip();
     }

    if(Player.invincible === false) {
        if(collisionWithArray(Player, sharks)) {
            dead = true;
            if (Shark.x < Player.x) {dead = false;}
        } 
    }
    fill(255, 89, 0);
    drawWord("SCORE:" + score.toString(), 250,10,1);
    if (dead){
        DISPLAY.show = 'death';
    }
    }
};

var Menu = {
    name: 'menu',
    draw: function() {
        noStroke();
        fill(245, 199, 120);
        rect(0, 325, width, 75);
        fill(222, 189, 124);
        rect(0, 285, width, 40);
        fill(189, 154, 83);
        rect(0, 265, width, 20);
        fill(255, 255, 255);
        rect(0, 260, width, 5);
        fill(160, 218, 250);
        rect(0, 255, width, 5);
        fill(4, 50, 179);
        rect(0, 201, width, 54);
        fill(30, 90, 230);
        rect(0, 171, width, 30);
        fill(160, 218, 250);
        rect(0, 167, width, 4);
        fill(183, 229, 240); //sky color
        rect(0, 0, width, 167);
        var r = 0;
        randomSeed(r);
        var wavestroke = 0;
        //sea foam
        fill(255, 255, 255);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(300, random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(random(0, 400), random(171, 250), 5, 5);
        rect(350, 222, 5, 5);
        rect(230, 205, 5, 5);
        rect(240, 230, 5, 5);
        fill(0,0,255);
        drawPlayer(200,130,40,40);
        textAlign(CENTER,CENTER);
        textSize(40);
        fill(255);
        drawWord("BIT", 54, 1, 4.5);
        drawWord("SURFER", 201, 75, 3.8,CENTER);
        button("START GAME", 92, 305,225,35);
        if(onButton && mouseIsPressed){
            DISPLAY.show = 'game';
        }
        button("HOW TO PLAY",92,357,225,35);
        if(onButton && mouseIsPressed){
            DISPLAY.show = 'help';
        }
        
        textAlign(RIGHT,RIGHT);
        textSize(10);
        stroke(163, 163, 163,255-frameCount*2%255);
        noFill();
        ellipse(365,400,frameCount%(255/2),frameCount%(255/2));
        fill(10, 10, 10);
        text('BenTheGreat',390,350);
        text('Thomas L.',390,360);
        text('Marco',390,370);
        text('Virus',390,380);
        text('Micah31',390,390);
        text('Ctaps33',390,398);
    }
};
var Help = {
    name : 'help',
    draw: function() {
        background(250, 237, 180);
        fill(0);
        textSize(20);
        text("Move the dude with your mouse",200,100); 
        textSize(15);
        text("Click your mouse or press the spacebar to jump", 200, 130);
        text('If you miss coins, your score goes down.',200,150);
        button("BACK",160,250,125,35);
        if(onButton && mouseIsPressed){
            DISPLAY.show = 'menu';
        }
    }
};
var Death = {
    name: 'death',
    draw: function() {
        noStroke();
        background(161, 233, 255);
        drawWater(32,2);
        fill(random(56,250),random(100,250),random(250,100));
        drawWord("YOU DIED",123,71,1.5);
        drawParticles();
        pushMatrix();
        drawPlayer(161,168,40,40);
        die(EXPLODE);
        fill(255, 0, 0);
        drawWord("You scored " + score.toString(),125,220,1);
        button("RETURN TO MENU",92,290,225,35);
        if(onButton && mouseIsPressed){
            Program.restart();
        }
    }
};
DISPLAY.add(Game);
DISPLAY.add(Menu);
DISPLAY.add(Help);
DISPLAY.add(Death);
frameRate(FPS);
draw = function(){DISPLAY.draw();};