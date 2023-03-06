from flask import Flask, render_template
from gestion_comptes import bp_gestion_comptes

app = Flask(__name__)


app.secret_key = "cbca765383981f152ef9319b17cae0109c511b7b3906732336e43cee66fbe7ad"
app.register_blueprint(bp_gestion_comptes, url_prefix='/gestion_comptes')

@app.route('/')
def main_app():  # put application's code here
    return render_template('game.html')

@app.errorhandler(404)
def bad_request(_):
    '''Pour les erreurs 404'''

    return render_template(
        'erreur.html',
        message="ERREUR 404"
    ), 404

@app.errorhandler(500)
def internal_server_error(_):
    '''Pour les erreurs 500'''
    reponse = render_template('erreur.html', message="ERREUR 500")
    reponse.cache_control.no_store = True
    reponse.status_code = 500
    return reponse

@app.errorhandler(401)
def internal_server_error_401(_):
    '''Pour les erreurs 401'''

    return render_template(
        'erreur.html',
        message="ERREUR 401"
    ), 401

@app.errorhandler(403)
def internal_server_error_403(_):
    '''Pour les erreurs 403'''

    return render_template(
        'erreur.html',
        message="ERREUR 403"
    ), 403

if __name__ == '__main__':
    app.run()
