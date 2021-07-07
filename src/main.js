
class Main {
  formId;
  storageName;
  formClass;
  storageClass;
  formRow;
  childRow;
  label;
  constructor(formId, storageName) {
    this.createForm(formId, storageName);
  }
  createForm(formId,storageName) {
    this.formId = formId;
    this.storageName=storageName;
    this.formView = document.getElementById("formDiv");
    this.formClass = new Form(this.formId);
    this.storageClass = new Storage(this.storageName);

    this.formRow = this.formView.appendChild(this.formClass.getFormRow(this));
  }

  addRow(form)
  {
    this.appendRow(form.elements[0].value , form.elements[1].value , this);
  }

  appendRow(label, type) {
    this.formRow.appendChild(this.formClass.createRow(label, type,this));
  }

  insertData(label,type,value)
  {
    this.storageClass.insertData(label, type,value);
  }

  deleteData(label)
  {
    this.storageClass.removeData(label);
  }
}
const mainClass = new Main("dynamicForm", "formData");
