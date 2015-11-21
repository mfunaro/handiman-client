import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  handicap: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  error: DS.attr('string'),
  course_count: DS.attr('number'),

  rounds: DS.hasMany('round'),
});
