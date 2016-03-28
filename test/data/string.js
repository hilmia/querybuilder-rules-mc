module.exports = [{
  name: "Equals value",
  validate: {
    sql: "name = 'Sh'",
    mongo: {"$and":[{"name":"Sh"}]}
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "equal",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "Not Equal to value",
  validate: {
    sql: "name != 'Sh'",
    mongo: {"$and":[{"name":{"$ne":"Sh"}}]}
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "not_equal",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "In list of values",
  validate: {
    sql: "name IN('Sh')",
    mongo: {"$and":[{"name":{"$in":["Sh"]}}]}
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "in",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "Not in list of values",
  validate: {
    sql: "name NOT IN('Sh')",
    mongo: {"$and":[{"name":{"$nin":["Sh"]}}]}
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "not_in",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "Begins with value",
  validate: {
    sql: "name LIKE('Sh%')",
    mongo: {"$and":[{"name":{"$regex":"^Sh"}}]}
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "begins_with",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "Not begins with value",
  validate: {
    sql: "name NOT LIKE('Sh%')"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "not_begins_with",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "Contains value",
  validate: {
    sql: "name LIKE('%Sh%')"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "contains",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "Not contains value",
  validate: {
    sql: "name NOT LIKE('%Sh%')"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "not_contains",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "Ends with value",
  validate: {
    sql: "name LIKE('%Sh')"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "ends_with",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "Not ends with value",
  validate: {
    sql: "name NOT LIKE('%Sh')"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "not_ends_with",
        "value": "Sh"
      }
    ]
  }
},
{
  name: "Is empty",
  validate: {
    sql: "name = ''"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "is_empty",
        "value": null
      }
    ]
  }
},
{
  name: "Is not empty",
  validate: {
    sql: "name != ''"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "is_not_empty",
        "value": null
      }
    ]
  }
},
{
  name: "Is null",
  validate: {
    sql: "name IS NULL"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "is_null",
        "value": null
      }
    ]
  }
},
{
  name: "Is not null",
  validate: {
    sql: "name IS NOT NULL"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "name",
        "field": "name",
        "type": "string",
        "input": "text",
        "operator": "is_not_null",
        "value": null
      }
    ]
  }
}];
