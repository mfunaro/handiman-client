import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  course_rating: DS.attr('number'),
  slope_rating: DS.attr('number'),
  front_nine_course_rating: DS.attr('number'),
  front_nine_slope_rating: DS.attr('number'),
  back_nine_course_rating: DS.attr('number'),
  back_nine_slope_rating: DS.attr('number'),
  bogey_rating: DS.attr('number'),
  gender: DS.attr('string'),

  course: DS.belongsTo('course'),
  rounds: DS.hasMany('round')
});
