module.exports = [{
  name: "Equals value",
  validate: {
    sql: "price = 321.02"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "equal",
        "value": "321.02"
      }
    ]
  }
},
{
  name: "Not Equal to value",
  validate: {
    sql: "price != 321.02"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "not_equal",
        "value": "321.02"
      }
    ]
  }
},
{
  name: "In list of values",
  validate: {
    sql: "price IN(321.02)"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "in",
        "value": "321.02"
      }
    ]
  }
},
{
  name: "Not in list of values",
  validate: {
    sql: "price NOT IN(321.02)"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "not_in",
        "value": "321.02"
      }
    ]
  }
},
{
  name: "Less than value",
  validate: {
    sql: "price < 321.02"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "less",
        "value": "321.02"
      }
    ]
  }
},
{
  name: "Less than or equal to value",
  validate: {
    sql: "price <= 321.02"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "less_or_equal",
        "value": "321.02"
      }
    ]
  }
},
{
  name: "Greater than value",
  validate: {
    sql: "price > 321.02"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "greater",
        "value": "321.02"
      }
    ]
  }
},
{
  name: "Greater than or equal to value",
  validate: {
    sql: "price >= 321.02"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "greater_or_equal",
        "value": "321.02"
      }
    ]
  }
},
{
  name: "Between values",
  validate: {
    sql: "price BETWEEN 321.02 AND 654.98"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "between",
        "value": [
          "321.02",
          "654.98"
        ]
      }
    ]
  }
},
{
  name: "Not between values",
  validate: {
    sql: "price NOT BETWEEN 321.02 AND 654.98"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "not_between",
        "value": [
          "321.02",
          "654.98"
        ]
      }
    ]
  }
},
{
  name: "Is null",
  validate: {
    sql: "price IS NULL"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
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
    sql: "price IS NOT NULL"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "price",
        "field": "price",
        "type": "double",
        "input": "text",
        "operator": "is_not_null",
        "value": null
      }
    ]
  }
}];
