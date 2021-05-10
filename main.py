from flask import Flask, request, render_template, redirect
from replit import db

print("Hey!")

app = Flask(__name__)

@app.route('/')
def app_index():
    return render_template('index.html')

@app.route('/create', methods=['POST'])
def app_create():
    url = request.form['url']
    slug = request.form.get('end')
    db[slug] = url
    return render_template('create.html') % (slug, slug)

@app.route('/<slug>')
def app_redir(slug):
    return redirect(db.get(slug, '/'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)