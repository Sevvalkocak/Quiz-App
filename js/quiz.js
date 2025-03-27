function Quiz(sorular) {
    this.soruIndex = 0;
    this.sorular = sorular;
    this.dogruCevapSayisi = 0;
}

Quiz.prototype.soruGetir = function() {
    return this.sorular[this.soruIndex];
}

Quiz.prototype.soruGotur = function() {
    return this.sorular[this.soruIndex-1];
}