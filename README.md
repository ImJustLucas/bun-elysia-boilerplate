# Elysia with Bun runtime

## Listes des features

### Natif / Sans librairie / Principes

### Librairie @Elysia

- [x] `@Elysia/cookie` : Gestion des cookies afin de pouvoir les manipuler facilement et de gerer l'authentification plus facilement
- [x] `@Elysia/jwt` : Gestion des JWT afin de pouvoir les manipuler facilement et de gérer l'authentification plus facilement
- [x] `@Elysia/cors` : Gestion des CORS pour sécuriser les requêtes

### Librairie tierces / non officielles

- [x] `@Elysia/helmet` : Gestion de la sécurité de l'application en ajoutant des headers de sécurité

## Explications

Bon, j'ai eu ce bug dont j'ai parlé via le mail. La fonction .verify du plugin @elysia-jwt qui ne fonctionne pas et donc ce qui rend la protection des routes impossible. je tiens à préciser que lorsque je verifie le token sur jwt.io, il est valide, donc le problème ne vient pas de la génération du token.
j'ai envoye des messages sur les discord de bun et d'elysia, de communauté français et anglaise de dev, et j'ai eu aucune réponse. (pour le moment)
j'ai donc également ouvert une issue sur le plugin elysia-jwt, en attente d'un réponse (https://github.com/elysiajs/elysia-jwt/issues/15)
j'ai passé mon dimanche a chercher une solution, sans succès.

guard qui d'ailleurs fonctionnait très bien mercredi, on avait passé du temps et tu avais vu que le guards fonctionnait (j'espère que tu t'en souviens lol)

anyway

la création de compte fonctionne, la connexion fonctionne, la génération du token fonctionne, mais la vérification du token ne fonctionne pas, donc la protection des routes ne fonctionne pas.
j'ai laissé le guard, mais le CRUD pokemon fonctionne aussi, donc tu peux tester les routes sans soucis en supprimant le guards et en le remplacant par une fonction vide par exemple

pour tester l'auth

Register: @POST - /auth/register
DTO:

```
{ "username": "test", "email": "test@test.fr", "password": "test" }
```

Login: @POST - /auth/login
DTO:

```
 { "email": "test@test.fr", "password": "test" }
```

Logout: @POST - /auth/logout
