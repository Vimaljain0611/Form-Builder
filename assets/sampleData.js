
class Form {
  setDropDownOptions;
  formId;
  formView;

  constructor(formId,mainClass) {

    this.formId = formId;
    this.init();
     this.mainClass = mainClass;

    this.formView = document.getElementById("formDiv");
    this.formView.appendChild(this.getFormRow(mainClass,this));

  }

  init() {
    this.setDropDownOptions = [
      { innerText: "Text", value: "text" },
      { innerText: "Number", value: "number" },
      { innerText: "Date", value: "date" },
      { innerText: "Range", value: "range" },
      { innerText: "Email", value: "email" },
      { innerText: "Color", value: "color" },
    ];
  }

  //add row
  addNewRow(form){
    if(form.elements[0].value)
    {
      this.formView.appendChild(this.createRow(form.elements[0].value ,form.elements[1].value,'',this.mainClass));
      form.elements[0].value = "";
    }else{
       alert("Enter Label to add ");
    }
   }

   setRowsOnLoad(data,mainClass){

    data.forEach((data) => {
        this.formView.appendChild(this.createRow(data.label,data.inputType,data.value));
    });
   }

   // to avoid duplication of the label
  checkForLabel(labelName){
    const allLabels = [...this.formView.getElementsByTagName('label')];
    const isLabelAvailable = allLabels.find((label) => (label.innerText == labelName.value));
    if(isLabelAvailable)
    {
      alert('Label Must be Unique');
      labelName.value = '';
    }
  }


   //create thead
  getFormRow(mainClass,formClass) {
    const form = document.createElement("form");
    form.id = this.formId;
    const row = document.createElement("div");
    row.className = "row";

    row.appendChild(this.createEle("input", "text",'','','add',formClass));

    const selectCol = document.createElement("div");
    selectCol.className = "col-md-3";
    const dropDown = document.createElement("select");
    dropDown.className = "input";
    this.setDropDownOptions.forEach((opt) => {
      const optNode = document.createElement("option");
      optNode.value = opt.value;
      optNode.innerText = opt.innerText;
      return dropDown.appendChild(optNode);
    });
    selectCol.appendChild(dropDown);
    row.appendChild(selectCol);

    const addFunction = function (e) {
      e.preventDefault();

      formClass.addNewRow(this.form); };
    row.appendChild(this.createButton("Add", addFunction));

    //remove button
    const refreshFunction = function (e) {
      e.preventDefault();
      mainClass.refresh();
    };
    row.appendChild(this.createButton("Refresh", refreshFunction));

    form.appendChild(row);
    return form;
  }

  //creating
  createRow(label, type,value,mainClass) {
    const row = document.createElement("div");
    row.className = "row";

    row.appendChild(this.createEle("label", "", label));

    row.appendChild(this.createEle("input", type,'',value));

    //save button
    const addFunction = function (e) {
      e.preventDefault();

      mainClass.insertSingleRowInStorage(label,type,this.parentNode.previousSibling.childNodes[0].value);
    };
    row.appendChild(this.createButton("Save", addFunction));

    //remove button
    const removeFunction = function (e) {
      e.preventDefault();
      mainClass.deleteSingleRowFromStorage(label);
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    };
    row.appendChild(this.createButton("Remove", removeFunction));

    return row;
  }

  //create elements
  createEle(Elem, type, text,value,add,formClass) {
    const divCol = document.createElement("div");
    divCol.className = "col-md-3";
    const input = document.createElement(Elem);
    if (Elem != "label") {
      input.className = "input";
    }
    input.type = type;
    input.value = value;
    input.textContent = text;

    if(add){
      input.addEventListener('blur', function(e){
        formClass.checkForLabel(this);
      });
    }

    divCol.appendChild(input);
    return divCol;
  }

  //create buttons
  createButton(label, btnFunction) {
    const addBtnCol = document.createElement("div");
    addBtnCol.className = "col-md-3";
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = btnFunction;
    btn.className = "btn";
    addBtnCol.appendChild(btn);

    return addBtnCol;
  }
}
