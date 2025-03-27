function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
  // const soruMetni = document.getElementById("soruMetni");
  this.soruMetni = soruMetni;
  this.cevapSecenekleri = cevapSecenekleri;
  this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function (cevap) {
  return cevap === this.dogruCevap;
};
