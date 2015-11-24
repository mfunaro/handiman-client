import Ember from 'ember';
import layout from '../templates/components/simple-modal';

export default Ember.Component.extend({
  init: function() {
     this._super();
     this.set('model', this.get('store').createRecord(this.get('modelName'))
   },
  actions: {
      ok: function() {
        this.$('.modal').modal('hide');
        this.sendAction('ok');
      }
    },
    show: function() {
      this.$('.modal').modal().on('hidden.bs.modal', function() {
        this.sendAction('close');
      }.bind(this));
    }.on('didInsertElement')
});
