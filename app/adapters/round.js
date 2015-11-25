import DS from "ember-data";

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:4000/api',
  headers: {
     "Accept": "application/json"
  },
  createRecord: function(store, type, record) {
      var data = {};
      debugger;
      var serializer = store.serializerFor('round');

      serializer.serializeIntoHash(data, type, record, { includeId: true });

      // Custom stuff
      var userId = data.data.relationships.user.data.id
      var url = this.buildURL('users', userId) + '/rounds';
      return this.ajax(url, "POST", { data: data });
    }
});
