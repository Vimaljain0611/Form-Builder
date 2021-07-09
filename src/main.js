class Main {

  formId;
  storageName;
  formClass;
  storageClass;

  constructor(formId, storageName) {
    this.formId = formId;
    this.storageName=storageName;

    this.formClass = new Form(this.formId,this);
    this.storageClass = new Storage(this.storageName,this);
    this.storageClass.passData(this.setRowsOnLoad.bind(this));

  }

  // store data in local storage
  insertSingleRowInStorage(label,inputType,value){
    this.storageClass.insertSingleRow(label, inputType,value);
  }

  //delete data from local storage
  deleteSingleRowFromStorage(label){
    this.storageClass.removeSingleRow(label);
  }
 // this.formClass.setRowsOnLoad(data);
  setRowsOnLoad(data){
    this.formClass.setRowsOnLoad(data);
  }

  // removes unsaved data
  refresh(){
    const allLabels = [...this.formView.getElementsByTagName('label')];
    allLabels.forEach((label,index) =>{
      const isRowAvailable = this.checkInStorage(label.innerText);
        if(!isRowAvailable)
        {
          this.formView.removeChild(allLabels[index].parentNode.parentNode)
        }
    });
  }

  // check's label in the local storage data
  checkInStorage(label){
    const localStorage = this.storageClass.getLocalStorageData();
    const isLabelAvailable = localStorage.find((data) => (data.label == label));
    return isLabelAvailable;
  }


}
const mainClass = new Main("dynamicForm", "formData");
