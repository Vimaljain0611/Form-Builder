class Storage{
  existing = [];
  storageName;
  data;
  updateIndex;
  constructor(storageName) {
      this.storageName = storageName;

    }

    inti()
    {

      this.existing = localStorage.getItem(this.storageName);
      if(this.existing != null){
          this.existing = JSON.parse(this.existing);
      }else{
          this.existing = [];
      }
    }

    insertData(label,inputType,value)
    {
      this.inti();
      this.removeData(label);
      this.data = {
          label:label,
          inputType : inputType,
          value : value,
      };
      this.existing.push(this.data);
      localStorage.setItem( this.storageName, JSON.stringify(this.existing));
    }
    removeData(label)
    {
      this.inti();
      this.findIndex = this.existing.findIndex((obj => obj.label == label));
      if(this.findIndex != -1){
          this.existing.splice(this.findIndex, 1);
      }
      localStorage.setItem( this.storageName, JSON.stringify(this.existing));
    }

}
