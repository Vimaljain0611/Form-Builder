class Main {

  formId;
  storageName;
  formClass;
  storageClass;
  //formRow;
  // childRow;
  // label;

  constructor(formId, storageName) {
    this.createForm(formId, storageName);
  }

  createForm(formId,storageName) {
    this.formId = formId;
    this.storageName=storageName;

    this.formView = document.getElementById("formDiv");

    //class instance
    this.formClass = new Form(this.formId);
    this.storageClass = new Storage(this.storageName);

    //get Form
    this.formView.appendChild(this.formClass.getFormRow(this));

    //get localStorage Data
    this.storageClass.passData(this.getData.bind(this));

  }

  addRow(form)
  {
    if(form.elements[0].value !== "")
    {
      this.formView.appendChild(this.formClass.createRow(form.elements[0].value ,form.elements[1].value,'',this));
      form.elements[0].value = "";
    }else{
       alert("Enter Label to add ");
    }
  }

  insertData(label,inputType,value)
  {
    this.storageClass.insertData(label, inputType,value);
  }

  deleteData(label)
  {
    this.storageClass.removeData(label);
  }

  getData(data)
  {
    data.forEach((data) => {
        this.formView.appendChild(this.formClass.createRow(data.label,data.inputType,data.value,this));
    });

  }

  Refresh()
  {
    while (this.formView.firstChild) {
      this.formView.removeChild(this.formView.firstChild);
    }

    this.formView.appendChild(this.formClass.getFormRow(this));
    //get localStorage Data
    this.storageClass.passData(this.getData.bind(this));
  }

  checkForLabel(labelInput)
  {
    //console.log(labelInput.value);
    //parent = labelInput.parentNode.parentNode.parentNode;
    var labels = document.getElementsByTagName('LABEL');

    for (var i = 0; i < labels.length; i++) {
      if (labels[i].innerText == labelInput.value) {
        alert('Label Must be Unique');
        labelInput.value = '';
      }
    }
  }
}
const mainClass = new Main("dynamicForm", "formData");
