import _ from 'lodash';

const Helpers = {
  // graphql queries return strings, format them as currency
  stringToMoney: function(str) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(parseFloat(str));
  },

  // reduce returns floats, format that as currency too
  floatToMoney: function(flt) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(flt);
  }, 

  // recursively groupBy multiple object keys
  // thanks https://bl.ocks.org/joyrexus/9837596
  nest: function (seq, keys) {
    if (!keys.length)
      return seq;
    var first = keys[0];
    var rest = keys.slice(1);
    return _.mapValues(_.groupBy(seq, first), function (value) { 
      return Helpers.nest(value, rest);
    });
  }
}

export default Helpers;
