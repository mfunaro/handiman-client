import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function() {
    return this.store.createRecord('user');
  },
  actions: {
    save: function() {
      var user = this.currentModel;
      user.save().then(() => {
        this.get('session').authenticate('authenticator:custom', user.get('email'), user.get('password'));
        this.transitionTo('dashboard');
      });
    }
  },
  renderTemplate: function() {
      this.render({ outlet: 'unauth_content' });
    }
});
