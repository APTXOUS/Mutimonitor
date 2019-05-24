# -*- coding:  utf-8 -*-
#!/usr/bin/python
# filename: GETPOST_test.py
# codedtime: 2014-9-20 19:07:04


import bottle
import commands
import re  
def check_login(username, password):
    if username == '123' and password == '234':
        return True
    else:
        return False


@bottle.route('/running', method='POST')
def do_login():

    postValue = bottle.request.POST.decode('utf-8')
    username = bottle.request.POST.get('username')
    password = bottle.request.POST.get('password')
    command = bottle.request.POST.get('command')
    


    com="su nerd -c \""
    com+=command
    com+= " \""
    if check_login(username, password):
        a,b = commands.getstatusoutput(com)
        return b
    else:
        return "<p>Login failed. </p>"

bottle.run(host='0.0.0.0', port=8000)
