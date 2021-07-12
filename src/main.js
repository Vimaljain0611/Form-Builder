class Main {

  formClass;
  storageClass;
  constructor(formId, storageName) {
    this.formId = formId;
    this.storageName=storageName;
    this.formClass = new Form(this.formId,this);
    this.storageClass = new Storage(this.storageName,this);
    this.storageClass.passData(this.setRowsOnLoad.bind(this));
  }

  insertSingleRowInStorage(dataObject){
    this.storageClass.insertSingleRow(dataObject);
  }

  deleteSingleRowFromStorage(label){
    this.storageClass.removeSingleRow(label);
  }

  setRowsOnLoad(data){
    this.formClass.setRowsOnLoad(data);
  }

  checkInStorage(label){
    const isLabelAvailable = this.storageClass.checkLabelInStorage(label);
    return isLabelAvailable;
  }

}

