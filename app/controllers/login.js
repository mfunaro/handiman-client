import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { email, password } = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:custom', email, password).catch((reason) => {
        if (reason.errors && reason.errors.message === 'unauthorized') {
          this.set('errorMessage', 'Invalid email or password');
          $('#loginAlert').show();
        }
      });
    }
  },
});
