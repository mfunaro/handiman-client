import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users', function() {
    this.route('new');
  });

  this.route('user', { path: '/users/:user_id' });
  this.route('login')
});

export default Router;
