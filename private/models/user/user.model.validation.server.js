/**
 * Created by vcantu on 6/20/17.
 */

// returns null if validation fails
// returns validated user
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var validations = {
    validatesCanAuthenticate: validatesCanAuthenticate,
    validatesUsername: validatesUsername,
    validatesEmail: validatesEmail
};
module.exports = validations;

// can be authenticated (locally, facebook or google)
function validatesCanAuthenticate(user) {
    var local = user.hasOwnProperty('email') &&
        // user.hasOwnProperty('username_lower') &&
        user.hasOwnProperty('password');
    var facebook = user.facebook &&
        user.facebook.hasOwnProperty('id') &&
        user.facebook.hasOwnProperty('token');
    var google = user.google &&
        user.google.hasOwnProperty('id') &&
        user.google.hasOwnProperty('token');
    if (local || facebook || google)
        return user;
    return null;
}

// if there is a username it adds a lowercase username
function validatesUsername(user) {
    if (!user.username)
        return user;
    user.username_lower = user.username.toLowerCase();
    return user;
}

// must have email and it must be valid
function validatesEmail(user) {
    // TODO: google or facebook may not have an email
    if (!user.email)
        return null;
    if (!emailRegex.test(user.email))
        return null;
    user.email = user.email.toLowerCase();
    return user;
}