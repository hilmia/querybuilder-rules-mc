module.exports = [{
  name: "Equals value",
  validate: {
    sql: "date = '2016/03/31'"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "equal",
        "value": "2016/03/31"
      }
    ]
  }
},
{
  name: "Not equal to value",
  validate: {
    sql: "date != '2016/03/31'"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "not_equal",
        "value": "2016/03/31"
      }
    ]
  }
},
{
  name: "In list of values",
  validate: {
    sql: "date IN('2016/03/31')"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "in",
        "value": "2016/03/31"
      }
    ]
  }
},
{
  name: "Not in list of values",
  validate: {
    sql: "date NOT IN('2016/03/31')"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "not_in",
        "value": "2016/03/31"
      }
    ]
  }
},
{
  name: "Less than value",
  validate: {
    sql: "date < '2016/03/31'"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "less",
        "value": "2016/03/31"
      }
    ]
  }
},
{
  name: "Less than or equal to value",
  validate: {
    sql: "date <= '2016/03/31'"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "less_or_equal",
        "value": "2016/03/31"
      }
    ]
  }
},
{
  name: "Greater than value",
  validate: {
    sql: "date > '2016/03/31'"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "greater",
        "value": "2016/03/31"
      }
    ]
  }
},
{
  name: "Greater than or equal to value",
  validate: {
    sql: "date >= '2016/03/31'"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "greater_or_equal",
        "value": "2016/03/31"
      }
    ]
  }
},
{
  name: "Between values",
  validate: {
    sql: "date BETWEEN '2016/03/31' AND '2016/04/15'"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "between",
        "value": [
          "2016/03/31",
          "2016/04/15"
        ]
      }
    ]
  }
},
{
  name: "Not between values",
  validate: {
    sql: "date NOT BETWEEN '2016/03/31' AND '2016/04/15'"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "not_between",
        "value": [
          "2016/03/31",
          "2016/04/15"
        ]
      }
    ]
  }
},
{
  name: "Is null",
  validate: {
    sql: "date IS NULL"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
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
    sql: "date IS NOT NULL"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "date",
        "field": "date",
        "type": "date",
        "input": "text",
        "operator": "is_not_null",
        "value": null
      }
    ]
  }
}];
