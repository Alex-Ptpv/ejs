// store.js
const { makeObservable , observable, action } = require('mobx');

class Store {
  currentPage = '';

  constructor(currentPage) {
    makeObservable(this, {
      currentPage: observable,
      setCurrentPage: action
    })
    this.currentPage = currentPage
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

}

const appStore = new Store();

module.exports = appStore;
