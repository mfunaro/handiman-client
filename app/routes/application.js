import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin,{
  beforeModel(transition) {
    this._super(transition);
    if (this.session.isAuthenticated && this.get('currentUser') && !this.get('currentUser.content')) {
      return this._populateCurrentUser();
    }
  },

  sessionAuthenticated() {
    this._super();
    this._populateCurrentUser().then(user => this.transitionTo('user', user.id));
  },

  _populateCurrentUser() {
    var user_id = this.get('session.session.authenticated.userID');
    return this.store.find('user', user_id)
      .then(user => this.get('currentUser').set('content', user) && user);
  }
});
