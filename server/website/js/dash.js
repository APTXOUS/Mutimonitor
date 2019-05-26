function loginclick() {
	var user = $("#userName").val();
	var pass = $("#password").val();
	if (user == "") {
		$("#userName").focus();
		return false;
	}
	if (pass == "") {
		$("#password").focus();
		return false;
	}

	$.ajax({
		type: "POST",
		url: "./php/login_process.php",
		data: "username=" + user + "&password=" + pass,
		success: function (msg) {
			if (msg=="\nsuccess")
			{
				window.location.href = "dashboard.html";
			}
			else
				alert("登陆失败"+msg);
		}
	});
}

function getuserinfo()
{
	$.ajax({
		type: "POST",
		url: "./php/dashboard.php",
		data: JSON.stringify({                  
			command: "getinfo"// 注意不要在此行增加逗号
		}),
		dataType:"json",
		success: function (msg) {
			var nv = document.getElementById("username_p");
			nv.innerHTML=msg.username;
			var nv = document.getElementById("email_h5");
			nv.innerHTML=msg.email;

		}
	});
}