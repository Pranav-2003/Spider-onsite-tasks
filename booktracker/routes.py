from datetime import datetime
from imp import reload
from flask import render_template, url_for, flash, redirect, request, abort
from booktracker import app, db, bcrypt
from booktracker.forms import BookForm, BookUpdateForm, DeleteForm, LoginForm, RegistrationForm
from booktracker.models import Book, User
from flask_login import login_user, current_user, logout_user, login_required

@app.route("/", methods=['GET', 'POST'])
@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', form=form)

@app.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route("/home", methods=['GET', 'POST'])
@login_required
def home():
    b = Book.query.filter_by(uid=current_user.id)
    return render_template('home.html',b=b)

@app.route("/create", methods=['GET','POST'])
@login_required
def create():
    form = BookForm()
    if form.validate_on_submit():
        f = Book(uid=current_user.id,bname=form.name.data,author=form.author.data,edition=form.edition.data)
        db.session.add(f)
        db.session.commit()
        flash('Book has been added to your collection!','success')
        return redirect(url_for('home'))
    return render_template('create.html',form=form)

@app.route('/edit/<int:id>', methods=['GET','POST'])
@login_required
def edit(id):
    form = BookUpdateForm()
    b = Book.query.filter_by(uid=current_user.id,id=id).first()
    if form.validate_on_submit():
        b.bname = form.name.data
        b.author = form.author.data
        b.edition = form.edition.data
        db.session.commit()
        flash("Book has been updated","success")
        return redirect(url_for('home'))
    elif request.method=='GET':
        form.name.data = b.bname
        form.author.data = b.author
        form.edition.data = b.edition
    return render_template('edit.html',form=form,b=b)

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route("/delete/<int:id>")
def delete(id):
    b = Book.query.filter_by(uid=current_user.id,id=id).first()
    db.session.delete(b)
    db.session.commit()
    return redirect(url_for('home'))


