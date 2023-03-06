import flask
from flask import Flask, render_template, request

app = Flask(__name__)
@app.route('/')
def main_app():  # put application's code here
    return render_template('game.html')


if __name__ == '__main__':
    app.run()
