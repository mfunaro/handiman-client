import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  city: DS.attr('number'),
  state: DS.attr('number'),
  tees: DS.hasMany('tee')
});
