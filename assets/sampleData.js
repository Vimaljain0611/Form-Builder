
class Form {
  setDropDownOptions;
  formId;
  //mainClass;
  constructor(formId) {
    this.formId = formId;
    this.init();
  }

  init() {
    this.setDropDownOptions = [
      { innerHTML: "Text", value: "text" },
      { innerHTML: "Number", value: "number" },
      { innerHTML: "Date", value: "date" },
      { innerHTML: "Range", value: "range" },
      { innerHTML: "Email", value: "email" },
      { innerHTML: "Color", value: "color" },
    ];
  }

   //create thead
  getFormRow(mainClass) {
    const form = document.createElement("form");
    form.id = this.formId;
    const row = document.createElement("div");
    row.className = "row";

    row.appendChild(this.createEle("input", "text",'','','add'));

    let selectCol = document.createElement("div");
    selectCol.className = "col-md-3";

    const dropDown = document.createElement("select");
    dropDown.className = "form-control";
    this.setDropDownOptions.forEach((opt) => {
      const optNode = document.createElement("option");
      optNode.value = opt.value;
      optNode.innerHTML = opt.innerHTML;
      return dropDown.appendChild(optNode);
    });
    selectCol.appendChild(dropDown);
    row.appendChild(selectCol);


    const addFunction = function (e) {
      e.preventDefault();
      mainClass.addRow(this.form);
    };
    row.appendChild(this.createButton("Add", addFunction));

    //remove button
    const refreshFunction = function (e) {
      e.preventDefault();
      mainClass.Refresh();
    };
    row.appendChild(this.createButton("Refresh", refreshFunction));

    form.appendChild(row);
    return form;
  }

  //creating
  createRow(label, type,value, mainClass) {
    const row = document.createElement("div");
    row.className = "row";

    row.appendChild(this.createEle("label", "", label));

    row.appendChild(this.createEle("input", type,'',value));

    //save button
    const addFunction = function (e) {
      e.preventDefault();
      mainClass.insertData(label,type,this.parentNode.previousSibling.childNodes[0].value);
    };
    row.appendChild(this.createButton("Save", addFunction));

    //remove button
    const refreshFunction = function (e) {
      e.preventDefault();
      mainClass.deleteData(label);
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    };
    row.appendChild(this.createButton("Remove", refreshFunction));

    return row;
  }

  //create elements
  createEle(Elem, type, text,value,add) {

    const divCol = document.createElement("div");
    divCol.className = "col-md-3";
    const input = document.createElement(Elem);
    if (Elem != "label") {
      input.className = "form-control";
    }
    input.type = type;
    input.value = value;
    input.textContent = text;

    if(add !== '')
    {
      input.addEventListener('blur', function(e){
        mainClass.checkForLabel(this);
      });
    }

    divCol.appendChild(input);
    return divCol;
  }

  //create buttons
  createButton(label, btnFunction) {
    let addBtnCol = document.createElement("div");
    addBtnCol.className = "col-md-3";
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = btnFunction;
    btn.className = "btn btn-primary";
    addBtnCol.appendChild(btn);

    return addBtnCol;
  }


}


