import Form from "../assets/form.js";
import Storage from "../assets/storage.js";
export default class Main {
  formClass;
  storageClass;
  storageName;
  constructor(formId, storageName) {
    this.mainClass = this;
    this.storageName = storageName,
    this.formId = formId;
    this.storageName=storageName;
    this.dataObject={
        formId : this.formId,
        divId:"formDiv",
    }
    this.createForm(this.dataObject ,this)

    this.storageClass = new Storage(this.storageName,this);
    this.storageClass.passData(this.setRowsOnLoad.bind(this));
  }
  createForm(dataObject ,mainClass) {
    this.formId = dataObject.formId;
    this.formClass = new Form(dataObject.formId, mainClass, dataObject.divId);
    this.storageClass = new Storage(this.storageName,this);
    this.storageClass.storeNewForm(dataObject);
  }

  insertSingleRowInStorage(dataObject,formId) {
    this.storageClass.insertSingleRow(dataObject,formId);
  }

  deleteSingleRowFromStorage(label) {
    this.storageClass.removeSingleRow(label);
  }

  // setRowsOnLoad(data){
  //   this.setRowsOnLoad(data);

  // }
   setRowsOnLoad(data) {

    data.forEach((dataObj) => {
        if(dataObj.formId == 'dynamicForm' )
        {
          if(dataObj.data)
          {
            this.formView = document.getElementById('formDiv');
              dataObj.data.forEach((rowData) =>{
                this.formView.childNodes[0].appendChild(this.formClass.createRow(rowData.label, rowData.inputType, rowData.value, this.mainClass,this.formClass ));
              });
          }
        }else
        {
          const getParentDiv = document.getElementById(dataObj.parentDiv);
          let newDiv;
          if(getParentDiv) {
            newDiv = document.createElement("div");
            newDiv.id = dataObj.divId;
            newDiv.className = "childDiv";
            getParentDiv.parentNode.appendChild(newDiv);
            this.formClass = new Form(dataObj.formId, this.mainClass, dataObj.divId);
            //newDiv.appendChild(this.formClass.getFormRow(this.mainClass, this.formClass ,dataObj.formId));
            //getParentDiv.parentNode.appendChild(newDiv);

            if(dataObj.data)
            {
                dataObj.data.forEach((rowData) =>{
                  newDiv.appendChild(this.formClass.createRow(rowData.label, rowData.inputType, rowData.value, this.mainClass,this.formClass ));
                });
            }
          }
      }
    });
  }

  checkInStorage(label) {
    const isLabelAvailable = this.storageClass.checkLabelInStorage(label);
    return isLabelAvailable;
  }
}

new Main("dynamicForm", "formData");
