import flask
from flask import Flask
from flask import make_response,render_template,request
from flask import redirect,url_for,send_file
from datetime import timedelta

app=Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=2)


@app.route('/')
def manage():
    return send_file('./index.html')

if __name__=='__main__':
    app.run(debug=True,host='0.0.0.0',port=9090)
