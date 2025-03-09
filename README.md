# MediSync
MediSync provides an intuitive interface that supports patients throughout their post-hospital journey, helping them track their recovery and stay connected with their healthcare needs.  


## Deploying the project to Heroku

***(Using resources for this app counts towards your usage. [Delete your app](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-apps-destroy) and [database](https://devcenter.heroku.com/articles/heroku-postgresql#removing-the-add-on) as soon as you are done experimenting to control costs.)

### Deploy on Heroku [Cedar](https://devcenter.heroku.com/articles/generations#cedar)

```text
$ git clone https://github.com/mildshield14/MedSync
$ cd MedSync/src/main/java/com/heroku/java
$ heroku create
$ git push heroku main
$ heroku open
```

### Deploy on Heroku [Fir](https://devcenter.heroku.com/articles/generations#fir)

By default, apps on [Fir](https://devcenter.heroku.com/articles/generations#fir) use 1X-Classic dynos. To create an app on [Fir](https://devcenter.heroku.com/articles/generations#fir) you'll need to
[create a private space](https://devcenter.heroku.com/articles/working-with-private-spaces#create-a-private-space)
first.

```text
$ git clone https://github.com/mildshield14/MedSync
$ cd MedSync/src/main/java/com/heroku/java
$ heroku create --space <space-name>
$ git push heroku main
$ heroku ps:wait
$ heroku open
```

## Documentation

For more information about using Java on Heroku, see these Dev Center articles:

- [Java on Heroku](https://devcenter.heroku.com/categories/java)
