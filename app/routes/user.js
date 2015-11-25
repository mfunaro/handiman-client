import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      user: this.store.find('user', params.user_id),
      round: this.store.createRecord('round', {}),
      courses: this.store.findAll('course'),
    });
  },

  setupController(controller, models) {
    controller.set('user', models.user);
    controller.set('round', models.round);
    controller.set('courses', models.courses);
  },
  renderTemplate: function() {
      this.render({ outlet: 'content'});
  },
  actions: {
    addRound: function() {
      debugger;
      var params = {score: this.currentModel.round.get('score'), holes: this.currentModel.round.get('holes')};
      var round = this.store.createRecord('round', params);
      var _this = this;
      this.store.find('tee', 1).then(function(tee){
        round.set('tee', tee);
        round.set('user', _this.currentModel.user.get('id'));
        var user = _this.currentModel.user.get('rounds').pushObject(round);
        user.save();
      });
    },
  }
});
