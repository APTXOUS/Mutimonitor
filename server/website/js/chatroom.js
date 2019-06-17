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