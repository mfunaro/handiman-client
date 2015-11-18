import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('user');
  },
  renderTemplate: function() {
      this.render({ outlet: 'content' });
    }
});
