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
            if (msg == "\nsuccess") {
                window.location.href = "dashboard.html";
            } else
                alert("登陆失败" + msg);
        }
    });
}

function getuserinfo() {
    $.ajax({
        type: "POST",
        url: "./php/dashboard.php",
        data: JSON.stringify({
            command: "getinfo" // 注意不要在此行增加逗号
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
var data = [];
var data2 = [];
var dataset;
var totalPoints = 50;
var updateInterval = 1000;
var now = new Date().getTime();


function GetData() {
    data.shift();
    data2.shift();
    while (data.length < totalPoints) {
        var y = Math.random() * 100;
        var tt = now += updateInterval;
        var temp = [tt, y];
        data.push(temp);
        $.ajax({
            type: "POST",
            url: "./php/dashboard.php",
            data: JSON.stringify({
                command: "cpu" // 注意不要在此行增加逗号
            }),
            dataType: "json",
            success: function (msg) {
                y = Math.random() * 100;
                temp = [tt, y];
                data2.push(temp);
                //alert(msg);

            }
        });

    }


}

var options = {
    series: {
        lines: {
            show: true,
            lineWidth: 1.2,
            fill: true
        }
    },
    xaxis: {
        mode: "time",
        tickSize: [2, "second"],
        tickFormatter: function (v, axis) {
            var date = new Date(v);

            if (date.getSeconds() % 20 == 0) {
                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                return hours + ":" + minutes + ":" + seconds;
            } else {
                return "";
            }
        },
        axisLabel: "Time",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 10
    },
    yaxis: {
        min: 0,
        max: 100,
        tickSize: 5,
        tickFormatter: function (v, axis) {
            if (v % 10 == 0) {
                return v + "%";
            } else {
                return "";
            }
        },
        axisLabel: "CPU loading",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 6
    },
    legend: {
        labelBoxBorderColor: "#fff"
    }
};

$(document).ready(function () {
    for (var n = 0; n < 50; n++) {
        data[n] = 0;
        data2[n] = 0;
    }

    GetData();

    dataset = [{
            label: "CPU1",
            data: data
        },
        {
            label: "CPU2",
            data: data2
        }
    ];

    $.plot($("#flotcontainer"), dataset, options);

    function update() {
        GetData();

        $.plot($("#flotcontainer"), dataset, options)
        setTimeout(update, updateInterval);
    }

    update();
});


var serverip = '0.0.0.0/running';


function getmeminfo() {
    var nv = document.getElementById("memstatus");


    $.ajax({
        type: "POST",
        url: "./php/dashboard.php",
        data: {
            command: "getmeminfo", // 注意不要在此行增加逗号
            server: serverip
        },
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            $('.knob_mem')
                .val(msg.percent)
                .trigger('change');
        }
    });
}


function getcpuinfo() {
    var nv = document.getElementById("memstatus");


    $.ajax({
        type: "POST",
        url: "./php/dashboard.php",
        data: {
            command: "getcpuinfo", // 注意不要在此行增加逗号
            server: serverip
        },
        dataType: "json",
        success: function (msg) {
            console.log(msg.percent);
            $('.knob_cpu')
                .val(msg.percent)
                .trigger('change');
        }
    });
}

function getprocessinfo() {
    var nv = document.getElementById("threadlist");


    $.ajax({
        type: "POST",
        url: "./php/dashboard.php",
        data: {
            command: "getprocessinfo", // 注意不要在此行增加逗号
            server: serverip
        },
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            var message='';
            for( let i of msg.list){
                message+= "<tr>"+
                "<td>"+i[0]+"</td>"+
                "<td>"+i[1]+"</td>"+
                "<td>"+i[2]+"</td>"+
               " <td class=\"text-success\">"+i[3]+"</td>"+
                "<td><a href=\"#\"><i class=\"fa fa-plus-circle\"></i></a></td> </tr>";
            }
            nv.innerHTML=message;
        }
    });
}

function getserverlist()
{
    var nv = document.getElementById("serverlist");
    $.ajax({
        type: "POST",
        url: "./php/dashboard.php",
        data: {
            command: "getserverlist", // 注意不要在此行增加逗号
        },
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            var message='';
            for( let i of msg.list){
                message+= "<li id=\""+i['ip']+"\" onclick=\"serverclick(this)\">"+
                "<a  >"+
                   " <span class=\"avatar bg-success\"><i class=\"glyphicon glyphicon-user\"></i></span>"+
                   " <span class=\"name\">"+i['servername']+"</span>"+
                   " <span class=\"desc\">"+i['ip']+":"+i['port']+"</span>"+
                    "<span class=\"time\">running</span></a></li>";
            }
            nv.innerHTML=message;
        }
    });
}


function serverclick(data)
{
    serverip = data.id+"/running";
    getmeminfo();
    getcpuinfo();
    getprocessinfo();
}
function getinfo() {

    

    $(".knob_mem").knob({
        width: 150,
        height: 150,
        bgColor: "#ebeff2",
        fgColor: "#f60e0e",
        angleOffset: 90,
        lineCap: "round",
        value: 80
    });
    $(".knob_cpu").knob({
        width: 150,
        height: 150,
        bgColor: "#ebeff2",
        fgColor: "#00bf4f",
        angleOffset: -125,
        lineCap: "round",
        value: 80,
        angleArc: 250,
        rotation: "anticlockwise"
    });
    getserverlist();
    window.setInterval(getmeminfo, 2000);
    window.setInterval(getcpuinfo,2000); 
    window.setInterval(getprocessinfo,10000); 
};


