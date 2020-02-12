var numbro = require("numbro");

function parse_amount(args) {
  let abbreviations = ['m', 'M', 'k', 'K', 'b', 'B', 'kk', 'KK']
  let amount;
  let response_message;

  if (new RegExp(abbreviations.join("|")).test(args[1])) {
    amount = numbro.unformat(args[1].toLowerCase());
  } else {
    amount = parseInt(args[1]);
  }

  return amount;
}

module.exports = {
  parse_amount
}