import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  },
  observeSession: Ember.observer('session.session.authenticated.userID', function() {
    if(this.get('session.session.authenticated.userID'))
    {
      // TODO: create currentUser helper which has the populate methods from application route.
      var user_id = this.get('session.session.authenticated.userID');
      return this.store.find('user', user_id)
        .then(user => this.get('currentUser').set('content', user) && user);
    }
  }).on('init')
});
