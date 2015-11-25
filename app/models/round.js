import DS from 'ember-data';

export default DS.Model.extend({
  score: DS.attr('number'),
  holes: DS.attr('number'),
  differential: DS.attr('number'),
  user: DS.belongsTo('user'),
  tee: DS.belongsTo('tee'),
});
