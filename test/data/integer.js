module.exports = [{
  name: "Equals value",
  validate: {
    sql: "rate = 321"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "equal",
        "value": "321"
      }
    ]
  }
},
{
  name: "Not Equal to value",
  validate: {
    sql: "rate != 321"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "not_equal",
        "value": "321"
      }
    ]
  }
},
{
  name: "In list of values",
  validate: {
    sql: "rate IN(321)"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "in",
        "value": "321"
      }
    ]
  }
},
{
  name: "Not in list of values",
  validate: {
    sql: "rate NOT IN(321)"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "not_in",
        "value": "321"
      }
    ]
  }
},
{
  name: "Less than value",
  validate: {
    sql: "rate < 321"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "less",
        "value": "321"
      }
    ]
  }
},
{
  name: "Less than or equal to value",
  validate: {
    sql: "rate <= 321"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "less_or_equal",
        "value": "321"
      }
    ]
  }
},
{
  name: "Greater than value",
  validate: {
    sql: "rate > 321"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "greater",
        "value": "321"
      }
    ]
  }
},
{
  name: "Greater than or equal to value",
  validate: {
    sql: "rate >= 321"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "greater_or_equal",
        "value": "321"
      }
    ]
  }
},
{
  name: "Between values",
  validate: {
    sql: "rate BETWEEN 321 AND 654"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "between",
        "value": [
          "321",
          "654"
        ]
      }
    ]
  }
},
{
  name: "Not between values",
  validate: {
    sql: "rate NOT BETWEEN 321 AND 654"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "not_between",
        "value": [
          "321",
          "654"
        ]
      }
    ]
  }
},
{
  name: "Is null",
  validate: {
    sql: "rate IS NULL"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
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
    sql: "rate IS NOT NULL"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "rate",
        "field": "rate",
        "type": "integer",
        "input": "text",
        "operator": "is_not_null",
        "value": null
      }
    ]
  }
}];
