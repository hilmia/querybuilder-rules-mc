module.exports = [{
  name: "Equals value",
  validate: {
    sql: "in_stock = 1"
  },
  rules: {
    "condition": "AND",
    "rules": [
      {
        "id": "in_stock",
        "field": "in_stock",
        "type": "integer",
        "input": "radio",
        "operator": "equal",
        "value": "1"
      }
    ]
  }
}];