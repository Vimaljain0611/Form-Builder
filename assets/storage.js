class Storage{

  existing = [];
  storageName;
  data;
  updateIndex;

  constructor(storageName) {
      this.storageName = storageName;
    }

    getLocalStorageData()
    {
      this.existing = localStorage.getItem(this.storageName);
      if(this.existing != null){
          this.existing = JSON.parse(this.existing);
      }else{
          this.existing = [];
      }
    }

    // pass data from local storage
    passData(callback)
    {
      this.getLocalStorageData();
      callback(this.existing);
    }

    //insert data into local storage
    insertData(label,inputType,value)
    {
      this.getLocalStorageData();
      this.removeData(label);
      this.data = {
          label:label,
          inputType : inputType,
          value : value,
      };
      this.existing.push(this.data);
      localStorage.setItem( this.storageName, JSON.stringify(this.existing));
    }

    //remove data from local storage
    removeData(label)
    {
      this.getLocalStorageData();
      this.findIndex = this.existing.findIndex((obj => obj.label == label));
      if(this.findIndex != -1){
          this.existing.splice(this.findIndex, 1);
      }
      localStorage.setItem( this.storageName, JSON.stringify(this.existing));
    }

}
