
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

    const labelCol = document.createElement("div");
    labelCol.className = "col-md-3";
    labelCol.appendChild(this.createEle("input", "text"));
    row.appendChild(labelCol);

    let selectCol = document.createElement("div");
    selectCol.className = "col-md-3";

    const dropDown = document.createElement("select");
    dropDown.className = "form-control";
    this.setDropDownOptions.forEach((opt, index) => {
      const optNode = document.createElement("option");
      optNode.value = opt.value;
      optNode.innerHTML = opt.innerHTML;
      return dropDown.appendChild(optNode);
    });

    selectCol.appendChild(dropDown);
    row.appendChild(selectCol);

    let addBtnCol = document.createElement("div");
    addBtnCol.className = "col-md-3";
    const addFunction = function (e) {
      e.preventDefault();
      mainClass.addRow(this.form);

    };
    addBtnCol.appendChild(this.createButton("Add", addFunction));
    row.appendChild(addBtnCol);

    let refreshBtnCol = document.createElement("div");
    refreshBtnCol.className = "col-md-3";
    const refreshFunction = function () {
      console.log(this);
    };
    refreshBtnCol.appendChild(this.createButton("Refresh", refreshFunction));
    row.appendChild(refreshBtnCol);

    form.appendChild(row);
    return form;
  }

  //creating
  createRow(label, type, mainClass) {
    const row = document.createElement("div");
    row.className = "row";

    const labelCol = document.createElement("div");
    labelCol.className = "col-md-3";
    labelCol.appendChild(this.createEle("label", "", label));
    row.appendChild(labelCol);

    const inputCol = document.createElement("div");
    inputCol.className = "col-md-3";
    inputCol.appendChild(this.createEle("input", type));
    row.appendChild(inputCol);

    let saveBtnCol = document.createElement("div");
    saveBtnCol.className = "col-md-3";
    const addFunction = function (e) {
      e.preventDefault();
      mainClass.insertData(label,type,this.parentNode.previousSibling.childNodes[0].value);
     //console.log(label,type,this.parentNode.previousSibling.childNodes[0].value);
    };
    saveBtnCol.appendChild(this.createButton("Save", addFunction));
    row.appendChild(saveBtnCol);

    let removeBtnCol = document.createElement("div");
    removeBtnCol.className = "col-md-3";
    const refreshFunction = function (e) {
      e.preventDefault();
      mainClass.deleteData(label);
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    };
    removeBtnCol.appendChild(this.createButton("Remove", refreshFunction));
    row.appendChild(removeBtnCol);
    return row;
  }

  //create elements
  createEle(Elem, type, text) {
    const input = document.createElement(Elem);
    if (Elem != "label") {
      input.className = "form-control";
    }
    input.type = type;
    input.value = " ";
    input.textContent = text;

    return input;
  }

  //create buttons
  createButton(label, btnFunction) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = btnFunction;
    btn.className = "btn btn-primary";
    return btn;
  }


}


