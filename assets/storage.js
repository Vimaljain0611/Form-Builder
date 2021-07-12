class Storage{

  formData = [];
  storageName;
  data;


  constructor(storageName) {
    this.storageName = storageName;
  }

  getLocalStorageData(){
    this.formData = localStorage.getItem(this.storageName);
    (this.formData != null) ? this.formData = JSON.parse(this.formData) : this.formData = [];
    return this.formData;
  }

  // pass data from local storage
  passData(callback){
    this.getLocalStorageData();
    callback(this.formData);
  }

  //insert data into local storage
  insertSingleRow(obj){
    this.getLocalStorageData();
    this.removeSingleRow(obj.label);
    this.data = {
        label:obj.label,
        inputType : obj.inputType,
        value : obj.value,
    };
    this.formData.push(this.data);
    localStorage.setItem( this.storageName, JSON.stringify(this.formData));
  }

  //remove data from local storage
  removeSingleRow(label){
    this.getLocalStorageData();
    this.findIndex = this.formData.findIndex((obj => obj.label == label));
    if(this.findIndex != -1){
        this.formData.splice(this.findIndex, 1);
    }
    localStorage.setItem( this.storageName, JSON.stringify(this.formData));
  }

  checkLabelInStorage(label){
    const localStorage = this.getLocalStorageData();
    const isLabelAvailable = localStorage.find((data) => (data.label == label));
    return isLabelAvailable;
  }
}
