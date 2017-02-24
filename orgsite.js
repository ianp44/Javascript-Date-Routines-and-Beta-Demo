
//javascript include for scitech2
//version 3.2 25/9/14

var gglob="first gglob";
var menu_top =200;
var menu_ewidth=150;
var menu_bar_width=700;
var menu_bar_left=100;
var menu_bar_height=1.3;
var menu_height=1.3;
var banner_height=148;
var banner_width=menu_bar_width+53;
var zscreen_w=800;

var main_div_top=230;
var main_div_left=menu_bar_left;
var main_div_width=banner_width-20;

//running variables
//var zpos; //x position of next menu
var zposcount; //id value of menus
var buftxt; //new div text buffer
var gdepth; //depth of current dropdown

function visswitch(d1,d2){
document.getElementById(d1).style.visibility = "hidden";
document.getElementById(d2).style.visibility = "visible";
}

function rerror(etxt){
;}

function zdump(txt){
var ltxt;
var x;
var l;
var c;
ltxt="";
l=txt.length;
x=0;
while(x<l){
//ltxt+=txt.charAt(x);
switch(txt.charAt(x)){
case '<':ltxt+="&lt";
break;
case '>':ltxt+="&gt";
break;
case '"':ltxt+="&quot";
break;
//case '/n':ltxt+="<br>";
//break;

default:ltxt+=txt.charAt(x);
break;
}


x++;
}
return(ltxt);
}

function dump_test(){
//document.getElementById("div8").innerHTML  =zdump("Test String<br>Line 2") ;
document.getElementById("div8").innerHTML  ="<b>Menu HTML Code</b><br><br>"+zdump(buftxt) ;

}


/*
function zfunc(z){
var h;
var v;
var vi;
if(z==1){h="red";v="visible";vi="hidden";}else {h="green";v="hidden";vi="visible";}


//document.getElementById("div1").style.backgroundColor = h;


document.getElementById("div1").style.visibility = v;
document.getElementById("div2").style.visibility = vi;
//document.getElementById("div5").innerHTML  = "Div 5 test replacement text 1";
document.getElementById("div8").innerHTML = "Hello World! "+gglob;

}
*/

function bannerdiv(){
buftxt+='<div id="bannerid" class="bannerclass">\n';
buftxt+='<center><span class="bannerheading"><br>Science and Technology Pages</span><br>\n';
buftxt+='<span class="bannertxt">(Ian Pouncy\'s Personal Website)</span>\n';
buftxt+="</center></div>\n";


}

function bannerlocate(){
var zdiv;
zdiv=document.getElementById("bannerid");
zdiv.style.position="absolute";
zdiv.style.width=banner_width+"px";
zdiv.style.height=banner_height+"px";
zdiv.style.top=20+"px";
zdiv.style.left=menu_bar_left+"px";

}

function maindivlocate(){
var zdiv;
zdiv=document.getElementById("maindiv");
zdiv.style.position="absolute";
zdiv.style.width=main_div_width+"px";
//zdiv.style.height=banner_height+"px";
zdiv.style.top=main_div_top+"px";
zdiv.style.left=main_div_left+"px";
zdiv.style.border="1px solid blue";


}

function zinit(){
var zdiv;
gglob="gglob here"
//document.getElementById("div8").innerHTML  = "New div8 text";
/*
zdiv=document.getElementById("menu_bar_div");
zdiv.innerHTML="menubar";
zdiv.style.position="absolute";
//zdiv.style.top=menu_top+"px";
zdiv.style.top=50+"px";
zdiv.style.width=menu_bar_width+"px";
zdiv.style.border="2px solid green";
zdiv.style.height=menu_bar_height+"em";
zdiv.style.left=menu_bar_left+200+"px";
*/
//zdiv.style.marginLeft="100px";
//zdiv.style.marginRight="auto";
generate_menu();
bannerdiv();
//zdiv.innerHTML=buftxt;
document.getElementById("spanid").innerHTML = buftxt;
bannerlocate();
maindivlocate();
}

/*
function do_test(){
document.getElementById("demo1").innerHTML  = "z test replacement text";


}
*/

function zdo_link(qtext,qhref){

buftxt+='<a  href="'
+qhref+
'" class="aclass" title="Link to '
+qhref+'">';

buftxt+=qtext;
buftxt+="</a><br>\n";

gdepth+=1;
//buftxt+= qtext+" "+qhref;
//dump_test();

}

function menu_depth(zlen){
if(zlen<1)rerror("zlen too small in menu_depth");
if(zlen==1)return(1);
if(zlen==2)return(1);
if((zlen-1)%2!=0)rerror("zlen off boundary in menu_depth");
return((zlen-1)/2+1);

}

function drop_id(){
return ('drop_down'+zposcount);
}
function top_id(){
return ('top_id'+zposcount);
}

function do_drop_down(menuar){
gdepth=1;
var k;
buftxt+='<div id="'+drop_id()+'" class="drop_class" '; 
buftxt+='style="height:'+(menu_depth(menuar.length)*menu_height)+'em; left:'+(zposcount*menu_ewidth+menu_bar_left)+'px;" ';
buftxt+='onmouseover="visswitch(';
buftxt+="'"+top_id()+"','"+drop_id()+"') "+'" ';
buftxt+='onmouseout="visswitch(';
buftxt+="'"+drop_id()+"','"+top_id()+"') "+'" ';

buftxt+=">\n"; //div header
buftxt+=menuar[0]+"<br>"; //menu header, needs styled
while(gdepth<menu_depth(menuar.length)){
k=1+(gdepth-1)*2;
zdo_link(menuar[k],menuar[k+1]);
}
buftxt+='</div>\n';

}


//generates one tab and drop down div
//takes a array format menu, [entry, href] til end]
function generate_tab(menuar){

buftxt+='<div id="'+top_id()+'" class="upper_class" '; 
buftxt+='style="left:'+(zposcount*menu_ewidth+menu_bar_left)+'px;" ';


if(menuar.length<3){
//single entry menu= no drop down no mouseover
buftxt+=' >\n';
if(menuar.length==2){//one link only
zdo_link(menuar[0],menuar[1]);
//buftxt+=menuar[0]+" "+menuar[1];
;
}
else{ 
buftxt+=menuar[0]+"<br>"; //menu header, needs styled
}
buftxt+="</div>\n"; //end of div
zposcount++;
return;
}
 //put in mouseover
buftxt+='onmouseover="visswitch('+"'";
buftxt+=top_id()+"','"+drop_id()+"')"+'"';
buftxt+=' >\n';
buftxt+=menuar[0]+"<br>"; //menu header, needs styled







buftxt+="</div>\n"; //end of div

//has drop down
do_drop_down(menuar); //generate drop down div


zposcount++;

}

// generates the drop down menu HTML
function generate_menu(){
zposcount=0;
buftxt="";
/*
generate_tab(["Menu1","test1.html"]);
//generate_tab(["Menu1"]);
generate_tab(["Menu2","test1.html"]);
generate_tab(["Menu3","test1.html"]);
//generate_tab(["Menu2"]);
//generate_tab(["Menu3"]);
*/
//generate_tab(["Menu_z"]);
generate_tab(["Home Page","default.htm"]);
/*
generate_tab(["Admin",
"My Public Site","../default.htm",
"My PHP Index","../php/default.htm",
"Google","http://www.google.co.uk"
//,"Opt4","default.htm"
]);
*/
generate_tab(["Admin",
"My Public Site","public.html",
"What's New Page","new.html",

"Index Page","zindex.html",
"System Requirements","system1.html",
"Help","help.html",
"About","about.html",
"Contact","contact.html",

"Faqs Page","faqs.html"
]);

generate_tab(["Index","zindex.html"]);

/*generate_tab(["PHP Sine Graph",
"PHP 1","../php/trig1.php",
"View Source","../php/filedump1.php?trig1.php",
"PHP 2","../php/trig2.php",
"View Source","../php/filedump1.php?trig2.php"]
);

*/
/*
generate_tab(["JS Sine Graph",

"Javascript 1","../php/javascript/trig1.html",
"View Source","../php/filedump1.php?javascript/trig1.html",
"Javascript 2","../php/javascript/frm_trig1.html",
"View Source","../php/filedump1.php?javascript/frm_trig1.html"
]

);
*/
generate_tab(["View Menus Source",
"(Home) Web Page","filedump1.php?default.htm",
"Javascript","filedump1.php?orgsite.js",
"CSS","filedump1.php?orgsite.css"
]);

generate_tab(["Help","help.html"]);

//dump_test();
}

