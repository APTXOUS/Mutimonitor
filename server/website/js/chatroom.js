function getchatinfo() {
	$.ajax({
		type: "POST",
		url: "./php/chatroom.php",
		data: {
			command: "getmessage"// 注意不要在此行增加逗号
		},
		dataType: "json",
		success: function (msg) {
			var nv = document.getElementById("words");        
            var message='';
            var array=msg.message;

            var nv2 = document.getElementById("username_p");
            
            for( let i of array){
                if(nv2.innerHTML==i['username'])
                {
                    message+="<div class=\"btalk\"><span id=\"asay\">"+i['message']
                    +"</span> <img src=\"img/people.jpg\" /> <p>"+i['time']+' '+i['username']+"</p></div>";
                }
                else
                {
                    message+="<div class=\"atalk\"><span id=\"asay\">"+i['message']
                    +"</span> <img src=\"img/people.jpg\" /> <p>"+i['time']+' '+i['username']+"</p></div>";
                }
            }
            if( nv.scrollTop+700 == nv.scrollHeight)
            {
                nv.innerHTML = message;
                nv.scrollTo(0,nv.scrollHeight); 
            }
            else
            {
                nv.innerHTML = message;
            }
		}
    });
}

function getserviceinfo() {
  //  var interest = $('ul#type').find('li.active').data('interest');

    var body = document.getElementById("body");
    cover=body.innerHTML;
	$.ajax({
		type: "POST",
		url: "./php/chatroom.php",
		data: {
            command: "getservicelist"// 注意不要在此行增加逗号
            
		},
		dataType: "json",
		success: function (msg) {

            var nv = document.getElementById("servicelist");
            var message='';
            var array=msg.message;
            for( let i of array){
                message+="<div class=\"col-lg-4 col-md-6 col-xs-12 margin-bottom-30\">"+
                "<a href=\"#"+i['servicename']+"\" id=\""+i['servicename']+"\"class=\"prj-item\" onclick=\"showmodel(this)\">"+
                    "<div class=\"top-project-section\">"+
                   " <div class=\"project-icon\">"+
                       " <img src=\"assets/images/logo/logo-1.png\" alt=\"\">"+
                    "</div>"+
                    "<h3>"+i['servicename']+"</h3>"+
                   " <div class=\"meta\">"+
                        "<p class=\"author\">"+
                        "by <span>"+i['creator']+"</span>"+
                       " </p>"+
                    "</div>"+
              "  </div>"+
                   " <div class=\"bottom-project-section\">"+
                        "<div class=\"meta\">"+
                            "<div class=\"points\">"+
                               " <i class=\"fa fa-heart-o\"></i>"+i['likenum']+
                            "</div>"+
                            "<div class=\"views\">"+
                               " <i class=\"fa fa-eye\"></i> "+i['view']+
                           " </div>"+
                           " <span class=\"feedable-time timeago\">"+i['time']+"</span></div></div></a></div>";
            }
            nv.innerHTML = message;
		}
    });
}
function getuserinfo() {
	$.ajax({
		type: "POST",
		url: "./php/dashboard.php",
		data: JSON.stringify({
			command: "getinfo"// 注意不要在此行增加逗号
		}),
		dataType: "json",
		success: function (msg) {
			var nv = document.getElementById("username_p");
			nv.innerHTML = msg.username;
			var nv = document.getElementById("email_h5");
			nv.innerHTML = msg.email;

		}
	});
}

var cover;
function showmodel(click)
{
    var body = document.getElementById("body");
    body.innerHTML=cover;
    getuserinfo();
    getserviceinfo();

    var nv = document.getElementById("serviceinfo");

    message=" <td class=\"title\">"+
    "<a href=\"#\" class=\"logo\">"+click.id+"</a>"+
    "</td>";
    nv.innerHTML = message;

    $.ajax({
		type: "POST",
		url: "./php/chatroom.php",
		data: {
            command: "getserviceinfo",// 注意不要在此行增加逗号
            service: click.id
		},
		dataType: "json",
		success: function (msg) {
			var nv = document.getElementById("words");        
            
            var array=msg.message;
            for( let i of array){
                var nv2 = document.getElementById("serviceintro");
                nv2.innerHTML=i['introduction'];
            }
            var list=msg.list;
            var message='';
            
            var nv3 = document.getElementById("title_head");
            for( let i of list){
                message="<tr class=\"details\"><td>"+
                i['ip']+":"+i['port']+"----"+i['servername']+
                "</td></tr>"; 
                var newNode = document.createElement("tr");
                newNode.innerHTML=message;
                insertAfter(newNode,nv3)
            }
            $('#myModal').modal('show');
         
		}
    });
}

function insertAfter(newElement, targetElement) {
    "use strict";
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
function main()
{
    getchatinfo();
    var t2 = window.setInterval(getchatinfo,100); 
}

function sendmeaage()
{
    var me = document.getElementById("inputmessage"); 
    if(me.value=='')
        return;
    var ur = document.getElementById("username_p");
    $.ajax({
		type: "POST",
		url: "./php/chatroom.php",
		data: {
            command: "sendmessage",// 注意不要在此行增加逗号
            data:me.value,
            username:ur.innerHTML
		},
		dataType: "json",
		success: function (msg) {
			var nv = document.getElementById("words");        
            var message='';
            var array=msg.message;

            var nv2 = document.getElementById("username_p");
            
            for( let i of array){
                if(nv2.innerHTML==i['username'])
                {
                    message+="<div class=\"btalk\"><span id=\"asay\">"+i['message']
                    +"</span> <img src=\"img/people.jpg\" /> <p>"+i['time']+' '+i['username']+"</p></div>";
                }
                else
                {
                    message+="<div class=\"atalk\"><span id=\"asay\">"+i['message']
                    +"</span> <img src=\"img/people.jpg\" /> <p>"+i['time']+' '+i['username']+"</p></div>";
                }
            }

            nv.innerHTML = message;
            nv.scrollTo(0,nv.scrollHeight); 
            me.value='';
		}
    });   

}


function sendtest()
{
    alert("您的分数为 8/10");
}