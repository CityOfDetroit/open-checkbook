const Helpers = {
  stringToMoney: function(str) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(parseFloat(str));
  },

  floatToMoney: function(flt) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(flt);
  }
}

export default Helpers;
