import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('user', params.user_id);
  },
  renderTemplate: function() {
      this.render({ outlet: 'content'});
  },
  actions: {
    addRound: function() {
      var params = {score: this.get('context.score'), holes: this.get('context.holes')};
      var round = this.store.createRecord('round', params);
      var _this = this;
      this.store.find('tee', 1).then(function(tee){
        round.set('tee', tee);
        round.set('user', _this.currentModel.id);
        var user = _this.currentModel.get('rounds').pushObject(round);
        user.save();
      });
    }
  }
});
