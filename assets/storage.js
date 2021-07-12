export default class Storage {
  formData = [];
  storageName;
  data;

  constructor(storageName) {
    this.storageName = storageName;
  }

  getLocalStorageData() {
    this.formData = localStorage.getItem(this.storageName);
    this.formData != null
      ? (this.formData = JSON.parse(this.formData))
      : (this.formData = []);
    return this.formData;
  }

  storeNewForm(dataObject)
  {
      this.getLocalStorageData();
      this.rowData = this.formData.find((data) => data.formId == dataObject.formId);
      if(!this.rowData)
      {
        const data = {
          formId: dataObject.formId,
          parentDiv: dataObject.parentDiv,
          divId: dataObject.divId,
          data: []
        };
        this.formData.push(data);
        localStorage.setItem(this.storageName, JSON.stringify(this.formData));
     }
  }
  // pass data from local storage
  passData(callback) {
    this.getLocalStorageData();
    callback(this.formData);
  }

  //insert data into local storage
  insertSingleRow(obj,formId) {

    this.getLocalStorageData();
    this.rowData = this.formData.find((data) => data.formId == formId);
    this.removeSingleRow(formId);

    if(this.rowData.data.length !== 0)
    {
      this.rowData= this.removeSingleRowData(this.rowData ,obj.label );
    }

    this.data = {
      label: obj.label,
      inputType: obj.inputType,
      value: obj.value,
    };
    this.rowData.data.push(this.data);
    this.formData.push(this.rowData);
   localStorage.setItem(this.storageName, JSON.stringify(this.formData));
  }

  //remove data from local storage
  removeSingleRow(formId) {
    this.getLocalStorageData();
    this.findIndex = this.formData.findIndex((obj) => obj.formId == formId);
    if (this.findIndex != -1) {
      this.formData.splice(this.findIndex, 1);
    }

  }
  removeSingleRowData(rowData ,label )
  {
    this.findIndex = rowData.data.findIndex((obj) => obj.label == label);
    if (this.findIndex != -1) {
      rowData.data.splice(this.findIndex, 1);
    }
    return rowData;
  }
  checkLabelInStorage(label) {
    const localStorage = this.getLocalStorageData();
    const isLabelAvailable = localStorage.find((data) => data.label == label);
    return isLabelAvailable;
  }
}
