// JavaScript Document
//payment cycle data init js
//ver 1.3 13/2/17
//ver 1.3 20/2/17

/*

COPYRIGHT NOTICE.

Ian's Beta payment calendar 3.8 javascript page vers 3.8

This copyright notice  applies to this file and the associated files with a copyright notice in them.

This is a beta version of a javascript Payment Calendar Program
It is not 100% fully functional,and is in development.

It contains (together with the associated files ) 
fully functional date routines working from the number of 
days since the 1st of Januray in the origin year,
currently set to 1964.

Setting total Months.
The routines than calculate and set total months
may not be 100% reliable.
In particular if you set the total month value to
be an effective month within the implicit year which doesn't allow the
specified day number (that's the day of the month) for that month
then it will report an error.

Eg if it implied February, but the day number was 30.

** THE POINT OF REGISTERING THIS CODE  ON GITHUB IS TO COPYRIGHT THE DATE ROUTINES ****

COPYRIGHT NOTICE.

This code is copyright  (C)  by Ian Pouncy 24/2/17,

under the   GNU GENERAL PUBLIC LICENSE,  Version 3, 29 June 2007 , see Free Software Foundation, Inc. <http://fsf.org/> 

 This means you can use it if you want under the terms of that licence.

This source code  has been registered on github (user name Ianp44) on 24/2/17.

*/




var cycle_dat_ar;
var cycle_dat_ar_top;
var cycle_trigger_ar;

var global_payment_total;

var zmax_entries;


var debit_color;
var credit_color;
var total_color;

var pound_sign_str;




function create_cycle_data_entry(lentry_id,lentry_label,lstart_date,lend_date,linterval_typ, lzperiod,lzdeb_cred, lzvalue){

this.entry_id=lentry_id;
this.entry_label=lentry_label;
this.start_date=lstart_date;
this.end_date=lend_date;
this.zdeb_cred=lzdeb_cred;
this.interval_typ= linterval_typ; 
this.zperiod= lzperiod; 
this.zvalue=lzvalue;

return(this);
	
}

function add_cycle_data_entry(lentry_id,lentry_label,lstart_date,lend_date,linterval_typ, lzperiod,lzdeb_cred ,lzvalue){
var res;
var x3;
var txt2;
if(	cycle_dat_ar_top>=zmax_entries-1){
zdates_user_error("too many payment cycle data entries in add_cycle_data_entry"	);

}

res=new create_cycle_data_entry(lentry_id,lentry_label,lstart_date,lend_date,linterval_typ, lzperiod, lzdeb_cred, lzvalue);
x3=cycle_dat_ar_top;
txt2=res.entry_label;

//cycle_dat_ar[cycle_dat_ar_top]=res;

cycle_dat_ar[cycle_dat_ar_top]=res;
cycle_trigger_ar[cycle_dat_ar_top]=0;
cycle_dat_ar_top++;
	
}


function init_data_variables(){
cycle_dat_ar=new Array();
cycle_trigger_ar=new Array();
global_payment_total=0;

cycle_dat_ar_top=0;

 debit_color='red';;
// credit_color='blue';
 //total_color='green';
credit_color='green';
 total_color='blue';
pound_sign_str='&pound;';
	
zmax_entries=40;	


	
}


/*
function init_payment_cycle_data0(){
	
//add_cycle_data_entry(lentry_id,lentry_label,lstart_date,lend_date,linterval_typ, lzperiod,lzdeb_cred ,lzvalue);
 
 add_cycle_data_entry('Widget Payment 1','Wid1','1/3/17','','w', 2,'c' ,30);
 add_cycle_data_entry('Widget Payment 2','Wid2','10/3/17','','m', 1,'c' ,60.06);
 add_cycle_data_entry('Widget Payment 3','Wid3','27/3/17','','d', 3,'c' ,3.02);
 
 add_cycle_data_entry('Factory Rent ','FaR','1/3/17','','m', 3,'d' ,300.02);
 add_cycle_data_entry('Shop Rent ','Shp','7/3/17','','w', 1,'d' ,100);
 
 
}
*/












function init_payment_cycle_data(){
init_data_variables();
 init_payment_cycle_data0();
init_trig_days()

}















function display_data_entry(x){
var txt;
var cmstr;
var tmp;
if((x<0)||(x>=cycle_dat_ar_top)){
zdates_sys_error('x out of range in display_data_entry');

	
}

cmstr=', ';
tmp=cycle_dat_ar[x];

txt='';
txt+='entry_id:'+tmp.entry_id+cmstr;
txt+='entry_label:'+tmp.entry_label+cmstr;
txt+='start_date:'+tmp.start_date+cmstr;
txt+='end_date:'+tmp.end_date+cmstr;
txt+='zdeb_cred:'+tmp.zdeb_cred+cmstr;
txt+='interval_typ:'+tmp.interval_typ+cmstr; 
txt+='zperiod:'+tmp.zperiod+cmstr; 
txt+='zvalue:'+tmp.zvalue+cmstr;
txt+='<br>\n';
return(txt);
	
}








































function display_data(sw){
var txt;
var x=0;
var trigger_day;
var xlen=cycle_dat_ar_top;
var zdate3;

txt='';
x=0;

while(x<xlen){
	txt+='Data Entry:'+x+', ';
txt+=display_data_entry(x);


















if(sw==1){
	trigger_day=cycle_trigger_ar[x];
	
txt+='Trigger days:'+trigger_day;

if(trigger_day>0){
zdate3=new create_zdate();

zdate3.ztot_days=trigger_day;

calculate_zdate_from_days(zdate3);
txt+=', (';
txt+=get_zdate_str(zdate3);
txt+=')';	
}
txt+='<br>\n';	

}
x++;
	
}

return(txt);
	
	
	
}
 









 function zdisplay_data(){
var txt;
try {

txt='';
txt+='Payment Calender Payment Cycle Data<br>\n';
	 
	 
txt+=display_data(1) ;
txt+='End of Data<br>\n';

	
document.getElementById("id0_1").innerHTML=txt;
}
catch(err){
errtxt="Error:"+err+'<br>\n';

document.getElementById("err_txt").innerHTML=errtxt;



}
	
 }















function return_interval_period(s){
if(s=='d')return(1);
if(s=='w')return(7);
return(-1);	
	
}


/*
this.entry_id=lentry_id;
this.entry_label=lentry_label;
this.start_date=lstart_date;
this.end_date=lend_date;
this.zdeb_cred=lzdeb_cred;
this.interval_typ= linterval_typ; 
this.zperiod= lzperiod; 
this.zvalue=lzvalue;
*/






























/*
debit_color='red';;
 credit_color='blue';
 total_color='green';
*/

function rep_pay_cell(zcol,zlab,zvalue){
var txt;
txt='';
txt+='<span style="color:'+	zcol+';">';
txt+=zlab+': ';
txt+=pound_sign_str;
txt+=zvalue.toFixed(2);
txt+='</span>';
txt+='<br>\n';
return(txt);

}

function report_payment_txt(x,sw){
var txt;
var cmstr;
var tmp;
var zcrd_deb;
var zlab;
var zvalue2;

if((x<0)||(x>=cycle_dat_ar_top)){
zdates_sys_error('x out of range in report_payment_txt');

	
}


txt='';
cmstr=', ';
tmp=cycle_dat_ar[x];
zcrd_deb=tmp.zdeb_cred;
zlab=tmp.entry_label;
zvalue2=tmp.zvalue;

if(zcrd_deb=='c'){
txt+=rep_pay_cell(credit_color,	zlab,zvalue2);

}else
if(zcrd_deb=='d'){
txt+=rep_pay_cell(debit_color,	zlab,zvalue2);

}else{
zdates_sys_error("disallowed credit/debit character in entry:"	+x +' in report_payment_txt');

	
}
if(sw==1){
if(zcrd_deb=='c'){
global_payment_total+=zvalue2;

}else
if(zcrd_deb=='d'){
global_payment_total-=zvalue2;

}
	
}

return(txt);
	
}

function set_trig_days(){
	
	;
	
}


function do_trig_days(index_date){
var x;
var xlen;
var txt;
var res;
var trig_day;
var res_txt;
var index_day;
var res;
var empty_sw;
empty_sw=true;

txt='';
index_day=index_date.ztot_days;

x=0;
xlen=	cycle_dat_ar_top;
while(x<xlen){
trig_day=cycle_trigger_ar[x];
if(	trig_day!=-1){
if(trig_day==index_day){
	empty_sw=false;
	
txt+=report_payment_txt(x,1);
//txt+=report_payment_txt(x,1);
//txt+=rep_pay_cell(total_color,'Tot',global_payment_total);



find_next_trig_day(x,index_date);

	
}else if(trig_day<index_day){
find_next_trig_day(x,index_date);
	
	
}
}
x++;	
}
if(empty_sw&&(!trigger_sw)){
	
//return('&nbsp;'	);
return(''	);
}else {
	trigger_sw=false;
	
	txt+=rep_pay_cell(total_color,'Tot',global_payment_total);

return(txt);	
}
	
}

function init_trig_day(x){
var res;
var trig_day;
var zstart_day;
var zstart_day_date;
var zstart_day_str;
if((x<0)||(x>=cycle_dat_ar_top)){
zdates_sys_error('x out of range in find_next_trig_day');

	
}
res=cycle_dat_ar[x];
//trig_day=cycle_trigger_ar[x];
zstart_day_str=res.start_date;
zstart_day_date=create_zdate_fstr(zstart_day_str,0);
zstart_day=zstart_day_date.ztot_days;
cycle_trigger_ar[x]=zstart_day;
}


function init_trig_days(){
var x;
var xlen;
x=0;
xlen=	cycle_dat_ar_top;
while(x<xlen){
init_trig_day(x);
x++;

}
	

}



function find_next_trig_day(x,index_date){
var res;
var trig_day;
var zstart_day;
var zstart_day_date;
var zstart_day_str;
var zend_day_date;
var zend_day_str;
var zend_day;
var zperiod_days;
var zpercode;
var zint_str;
var zperiods;
var target_date;
var zyear_periods;
var nzyears;
var ltotmonths;
var nzmonth_periods;
var ntotmonths;
var lday_interval;
var nday_periods;

var c;
var days_target;

var res_date2;

if((x<0)||(x>=cycle_dat_ar_top)){
zdates_sys_error('x out of range in find_next_trig_day');

	
}


//cycle_trigger_ar[x]+=7;
//return(0);

res=cycle_dat_ar[x];
trig_day=cycle_trigger_ar[x];










zstart_day_str=res.start_date;
zstart_day_date=create_zdate_fstr(zstart_day_str,0);
zstart_day=zstart_day_date.ztot_days;

zend_day=-1;	

/*
zend_day_str=res.end_date;
if(zend_day_str==''){
zend_day=-1;	
}else {



zend_day_date=create_zdate_fstr(zend_day_str,0);
zend_day=zend_day_date.ztot_days;

}
*/

zperiods=res.zperiod;
if(zperiods<=0){
zdates_sys_error('payment period value  must be > 0  in find_next_trig_day');
	
}

//cycle_trigger_ar[x]+=zperiods;
//return(0);

//calculate new trigger date
zint_str=res.interval_typ;

if((zint_str=='y')||(zint_str=='m')){
target_date=new create_zdate();
zcopy_zdate(target_date,zstart_day_date);

if(zint_str=='y'){
zyear_difference=index_date.zyear-zstart_day_date.zyear;
if(zyear_difference<0)return(-1);

zyear_periods=(Math.ceil((zyear_difference+1)/zperiods)-1);
zyear_periods++;
nzyears=zyear_periods*zperiods;
nzyears+=zstart_day_date.zyear;
target_date.zyear=nzyears;
res_date2=calculate_days_from_zdate(target_date);


//##a	
}
else 

//calculate_totmonths_from_zdate
if(zint_str=='m'){
	calculate_totmonths_from_zdate(zstart_day_date);
	
	calculate_totmonths_from_zdate(index_date);
	ltotmonths=index_date.tot_months-zstart_day_date.tot_months;
if(	ltotmonths<0)return(-1);

nzmonth_periods=Math.ceil((ltotmonths+1)/zperiods)-1;
ntotmonths=(nzmonth_periods+1)*zperiods;
ntotmonths+=zstart_day_date.tot_months;
res_date2= set_zdate_totmonths(target_date,ntotmonths)	;
}

days_target=res_date2.ztot_days;

}
else {
c=return_interval_period(zint_str)	;
if(c==-1){
zdates_sys_error('disallowed interval type code in out of range in entry:'+x+' in find_next_trig_day');

	
}
if(c==1){
lday_interval=index_date.ztot_days-zstart_day;
if(	lday_interval<0)return(-1);

nday_periods=Math.ceil((lday_interval+1)/zperiods)-1;


days_target=index_date.ztot_days+zperiods;
days_target=zstart_day+((nday_periods+1)*zperiods);

	
}else {
	
	
	
	
	
	
	
	
	
	
	



lday_interval=index_date.ztot_days-zstart_day;
if(	lday_interval<0)return(-1);
zperiods*=7;

nday_periods=Math.ceil((lday_interval+1)/zperiods)-1;


days_target=index_date.ztot_days+zperiods;
days_target=zstart_day+((nday_periods+1)*zperiods);
	
	
	
	
	
	
	
//per_length=c;
//cycle_trigger_ar[x]+=zperiods;
//return(0);

//day_interval=index_date.ztot_days-zstart_day_date.ztot_days;

/*
lday_interval=index_date.ztot_days-zstart_day;
//zstart_day
if(	lday_interval<0)return(-1);

nday_periods=Math.ceil((lday_interval+1)/7)-1;
days_target=index_date.ztot_days+(7*zperiods);
*/









//days_target=(nday_periods+1)*zperiods;
//days_target+=zstart_day;
}
}
/*
if(zend_day!=-1){
if(days_target>	zend_day){
cycle_trigger_ar[x]=-1;
return(-1);
	
}

}
*/












if(trig_day>=days_target){
zdates_sys_error('old trig day value is >= new value in entry:'+x+' in find_next_trig_day');

}


//cycle_trigger_ar[x]=days_target;






















	

cycle_trigger_ar[x]=days_target;
return(0);
}













 
function tst_display_data(){
	
;	
	
	
}
