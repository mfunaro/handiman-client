import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const { RSVP, isEmpty, run, get } = Ember;

export default Base.extend({

  /**
    The endpoint on the server that the authentication request is sent to.
    @property serverTokenEndpoint
    @type String
    @default '/users/sign_in'
    @public
  */
  serverTokenEndpoint: '/login',

  /**
  The devise resource name. __This will be used in the request and also be
  expected in the server's response.__
  @property resourceName
  @type String
  @default 'user'
  @public
  */
  resourceName: 'session',

  /**
  The token attribute name. __This will be used in the request and also be
  expected in the server's response.__
  @property tokenAttributeName
  @type String
  @default 'token'
  @public
  */
  tokenAttributeName: 'token',

  /**
  The identification attribute name. __This will be used in the request andß
  also be expected in the server's response.__
  @property identificationAttributeName
  @type String
  @default 'email'
  @public
  */
  identificationAttributeName: 'email',

  restore(data) {
    const { tokenAttributeName, identificationAttributeName } = this.getProperties('tokenAttributeName', 'identificationAttributeName');
    const tokenAttribute = get(data, tokenAttributeName);
    const identificationAttribute = get(data, 'userID'); // TODO: Add property for this?
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(tokenAttribute) && !isEmpty(identificationAttribute)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(email, password) {
      var _this = this;
    return new Ember.RSVP.Promise((resolve, reject) => {
      var store = _this.container.lookup('service:store');
      const { resourceName, identificationAttributeName } = this.getProperties('resourceName', 'identificationAttributeName');
      const data         = {};
      data[resourceName] = { password };
      data[resourceName][identificationAttributeName] = email;

      this.makeRequest(data).then(function(response, status, xhr) {
        run(null, resolve, {userID: response.data.attributes.id, token: xhr.getResponseHeader("authorization")});
        store.pushPayload('user', response);
      }, function(xhr) {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  },

  /**
    Does nothing
    @method invalidate
    @return {Ember.RSVP.Promise} A resolving promise
    @public
  */
  invalidate() {
    return RSVP.resolve();
  },

  makeRequest(data) {
   const serverTokenEndpoint = this.get('serverTokenEndpoint');
   return Ember.$.ajax({
     url:      serverTokenEndpoint,
     type:     'POST',
     url:       'http://localhost:4000/api/login',
     dataType: 'json',
     data,
     beforeSend(xhr, settings) {
       xhr.setRequestHeader('Accept', settings.accepts.json);
     }
   });
 }
});
