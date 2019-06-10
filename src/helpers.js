const Helpers = {
  stringToMoney: function(str) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(parseFloat(str));
  }
}

export default Helpers;
