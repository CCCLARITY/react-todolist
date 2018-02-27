import AV from 'leancloud-storage'

var APP_ID = 'As0jeXVikLpvucJD7bA61VBk-gzGzoHsz';
var APP_KEY = 'AceBf1kFRFQfw2J1Ucxjg0LS';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV;