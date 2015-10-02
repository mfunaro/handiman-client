import DS from "ember-data";
import JsonApiAdapter from 'ember-json-api/json-api-adapter';

export default JsonApiAdapter;
export default DS.RESTAdapter.extend({
  host: 'http://localhost:4000/api'
});
