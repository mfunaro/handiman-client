import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin,{

  actions:{
    showModal: function(name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  },
  beforeModel() {
    if (this.session.isAuthenticated) {
      this._populateCurrentUser();
    }
  },

  sessionAuthenticated() {
    this._super();
    this.transitionTo('dashboard');
  },

  sessionInvalidated(){
   this.transitionTo('login');
  },

  _populateCurrentUser() {
    var user_id = this.get('session.session.authenticated.userID');
    return this.store.find('user', user_id)
      .then(user => this.get('currentUser').set('content', user) && user);
  }
});
