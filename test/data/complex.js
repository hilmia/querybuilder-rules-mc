module.exports = [{
  name: 'Compound AND/OR',
  validate: {
    sql: 'price < 10.25 AND ( category = 2 OR category = 1 )',
    mongo: {"$and":[{"price":{"$lt":10.25}},{"$or":[{"category":2},{"category":1}]}]}
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
        "value": "10.25"
      },
      {
        "condition": "OR",
        "rules": [
          {
            "id": "category",
            "field": "category",
            "type": "integer",
            "input": "select",
            "operator": "equal",
            "value": "2"
          },
          {
            "id": "category",
            "field": "category",
            "type": "integer",
            "input": "select",
            "operator": "equal",
            "value": "1"
          }
        ]
      }
    ]
  }
},
{
  name: 'AND, with IN clause',
  validate: {
    sql: 'price < 10.25 AND category IN(2, 3)',
    mongo: {"$and":[{"price":{"$lt":10.25}},{"category":{"$in": [2, 3]}}]}
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
        "value": "10.25"
      },
      {
        "id": "category",
        "field": "category",
        "type": "integer",
        "input": "select",
        "operator": "in",
        "value": ["2", "3"]
      }
    ]
  }
}];