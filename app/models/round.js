import DS from 'ember-data';

export default DS.Model.extend({
  score: DS.attr('number'),
  holes: DS.attr('number'),
  differential: DS.attr('number'),
  user_id: DS.attr('number'),
  tee_id: DS.attr('number')
});
