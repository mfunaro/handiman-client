import DS from "ember-data";

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:4000/api',
  headers: {
     "Accept": "application/json"
  },
  createRecord: function(store, type, record) {
      var data = {};
      var serializer = store.serializerFor(type.typeKey);

      serializer.serializeIntoHash(data, type, record, { includeId: true });

      // Custom stuff
      var userId = record.get('user.id');
      var url = this.buildURL('users', userId) + '/rounds';
      return this.ajax(url, "POST", { data: data });
    }
});
