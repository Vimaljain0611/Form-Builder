
class Form {
  setDropDownOptions;
  formId;
  formView;
  checkBoxDropdown;
  checkBoxOption;
  formClass;

  constructor(formId,mainClass) {
    this.formId = formId;
    this.init();
    this.formClass = this;
    this.mainClass =mainClass;
    this.formView = document.getElementById("formDiv");
    this.formView.appendChild(this.getFormRow(mainClass,this));
    this.checkBoxDropdown = this.formView.childNodes[0];
  }

  init() {
    this.setDropDownOptions = [
      { title: "Text", value: "text" },
      { title: "Number", value: "number" },
      { title: "Date", value: "date" },
      { title: "Range", value: "range" },
      { title: "Email", value: "email" },
      { title: "Color", value: "color" },
      { title: "Checkbox", value: "Checkbox" },
      // { innerText: "Radio", value: "Radio" },
    ];

    this.checkBoxOptions=[
      { title:"Yes" , value:"yes"},
      { title:"No" , value:"no"}
    ];
  }

  setRowsOnLoad(data){
    data.forEach((data) => {
        this.formView.appendChild(this.createRow(data.label,data.inputType,data.value,this.mainClass,this.formClass ));
    });
   }

   //create formRow
  getFormRow(mainClass,formClass) {
    const form = document.createElement("form");
    form.id = this.formId;
    const row = document.createElement("div");
    row.className = "row";

    row.appendChild(this.createSideCheckBox(this.formView,'allCheck'));

    const dataObject = {Elem:"input" ,type:"text" ,text:'', value:'' ,add:'add'};
    row.appendChild(this.createEle(dataObject,formClass));

    const selectCol = document.createElement("div");
    selectCol.className = "col-3";
    const dropDown = document.createElement("select");
    dropDown.className = "input";
    this.setDropDownOptions.forEach((opt) => {
      const optNode = document.createElement("option");
      optNode.value = opt.value;
      optNode.innerText = opt.title;
      return dropDown.appendChild(optNode);
    });
    dropDown.onchange = function(){
      const value = this.value;
      if(value == 'Checkbox')
      {
        if(formClass.checkBoxDropdown.childNodes[1]){
          formClass.checkBoxDropdown.removeChild(formClass.checkBoxDropdown.childNodes[1])
        }
        formClass.checkBoxDropdown.appendChild(formClass.checkBoxValue());
      }else{
        formClass.checkBoxDropdown.removeChild(formClass.checkBoxDropdown.childNodes[1])
      }
    }
    selectCol.appendChild(dropDown);
    row.appendChild(selectCol);

    const addFunction = function (e) {
      e.preventDefault();
      const form = this.form;

      if(form.elements[1].value == 'Checkbox')
      {
        if(form.elements[4].value !== 'select')
        {
          formClass.addNewRow(form);
        }else{
          alert("Select Checkbox Option");
        }

      }else{
        formClass.addNewRow(form);
      }
    };
    row.appendChild(this.createButton("Add", addFunction));

    //remove button
    const refreshFunction = function (e) {
      e.preventDefault();
      formClass.refresh(mainClass);
    };
    row.appendChild(this.createButton("Refresh", refreshFunction));

    const deleteFunction = function (e) {
      e.preventDefault();
      formClass.deleteSelected(mainClass);
    };
    row.appendChild(this.createButton("Delete", deleteFunction));
    form.appendChild(row);
    return form;
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

  //add row
  addNewRow(form){
    //console.log(form.elements[0].type)
    if(form.elements[1].value)
    {
      if(form.elements[2].value == 'Checkbox'){
        if(form.elements[6].value != 'select')
        {
          this.formView.appendChild(this.createRow(form.elements[1].value ,form.elements[2].value,form.elements[6].value,this.mainClass,this));
          form.elements[1].value = "";
        }else{
          alert('Select Checkbox option')
        }

      }else{
        this.formView.appendChild(this.createRow(form.elements[1].value ,form.elements[2].value,'',this.mainClass,this));
        form.elements[1].value = "";
      }
    }else{
       alert("Enter Label to add ");
    }
   }

   checkBoxValue()
   {
      const row = document.createElement("div");
      row.className = "row";

      const selectCol = document.createElement("div");
      selectCol.className = "col-3 checkboxSelect";
      const dropDown = document.createElement("select");
      dropDown.className = "input";
          const blankOptNode = document.createElement("option");
          blankOptNode.setAttribute('hidden','hidden');
          blankOptNode.innerText = 'select';
          dropDown.appendChild(blankOptNode);
          this.checkBoxOptions.forEach((option)=>{
            const optionNode = document.createElement("option");
            optionNode.value = option.value;
            optionNode.innerText = option.title;
            dropDown.appendChild(optionNode);
          });
      selectCol.appendChild(dropDown);
      row.appendChild(selectCol);
      return row;
   }
  // removes unsaved data
  refresh(mainClass){
    const allLabels = [...this.formView.getElementsByTagName('label')];
    allLabels.forEach((label,index) =>{
      const isRowAvailable = mainClass.checkInStorage(label.innerText);
        if(!isRowAvailable)
        {
          this.formView.removeChild(allLabels[index].parentNode.parentNode)
        }
    });
  }

  //creating
  createRow(label, type,value,mainClass,formClass) {
    const row = document.createElement("div");
    row.className = "row";

    row.appendChild(this.createSideCheckBox());

    const labelObject = {Elem:"label" ,type:"" ,text:label, value:'' ,add:''};
    row.appendChild(this.createEle(labelObject,formClass));

    const inputObject = {Elem:"input" ,type:type ,text:'', value:value ,add:''}
    row.appendChild(this.createEle(inputObject,formClass));

    //save button
    const addFunction = function (e) {
      e.preventDefault();
      var value ='';
      if(type == 'Checkbox')
      {
        value =  (this.parentNode.previousSibling.childNodes[0].checked == true) ? 'yes' : 'no' ;
      }else
      {
         value = this.parentNode.previousSibling.childNodes[0].value;
      }
      const dataObject = { label: label, inputType:type ,value:value};
      mainClass.insertSingleRowInStorage(dataObject);
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

  createEle(obj,formClass) {
    const divCol = document.createElement("div");
    (obj.Elem == "label") ? divCol.className = "col-3 label" : divCol.className = "col-3" ;
    const input = document.createElement(obj.Elem);
    if (obj.Elem != "label") {
      input.className = "input";
    }
    input.type = obj.type;
    input.textContent = obj.text;
    input.value = obj.value;
    if(obj.type == 'Checkbox' )
    {
        if(obj.value == 'yes'){ input.setAttribute('checked','checked') ;}
    }
    if(obj.add){
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
    addBtnCol.className = "col-3";
    const btn = document.createElement("button");
    btn.textContent = label;
    if(btn.textContent == 'Delete')
    {
      btn.style.display = 'none';
    }
    btn.onclick = btnFunction;
    btn.className = "btn";
    addBtnCol.appendChild(btn);
    return addBtnCol;
  }
  createSideCheckBox(formView,allCheck)
    {
      const checkBoxDiv = document.createElement("div");
      checkBoxDiv.className = "col-1";
      const checkBox = document.createElement("input");
      checkBox.type='checkbox';
      let buttonTags =[...document.getElementsByTagName("button")];
      let deleteButton = buttonTags.find((label) => (label.innerText == 'Delete'));
      if(allCheck)
      {
        checkBox.className ='sideMainCheckbox';
        checkBox.addEventListener( 'change', function() {
          const allCheckedBox = [...formView.getElementsByClassName('sideCheckbox')];
          let buttonTags =[...document.getElementsByTagName("button")];
          let deleteButton = buttonTags.find((label) => (label.innerText == 'Delete'));
          if(this.checked){
            allCheckedBox.forEach((checkValue) =>{ checkValue.checked = 'checked';  });
            deleteButton.style.display = 'block';
          }else{
            allCheckedBox.forEach((checkValue) =>{ checkValue.checked = ''; });
            deleteButton.style.display = 'none';
          }
         });
      }else{
        checkBox.className ='sideCheckbox';
        checkBox.addEventListener( 'change', function() {
          const formView = this.parentNode.parentNode.parentNode;
          const CheckedBox = [...formView.getElementsByClassName('sideCheckbox')];
          const isAnyChecked  = CheckedBox.every((checkValue) =>(checkValue.checked) );
          const isSomeChecked  = CheckedBox.find((checkValue) =>(checkValue.checked) );
          const checked = [...formView.getElementsByClassName('sideMainCheckbox')];
          (isAnyChecked) ? checked[0].checked ='checked': checked[0].checked = '';
          (isSomeChecked) ? deleteButton.style.display = 'block':deleteButton.style.display = 'none';
        });
      }
      checkBoxDiv.appendChild(checkBox);
      return checkBoxDiv;
    }

    deleteSelected(mainClass){
      const allCheckedBox = [...this.formView.getElementsByClassName('sideCheckbox')];
      const buttonTags =[...document.getElementsByTagName("button")];
      const deleteButton = buttonTags.find((label) => (label.innerText == 'Delete'));
      allCheckedBox.forEach((checkValue,index) =>{
        const isRowAvailable = checkValue.checked;
          if(isRowAvailable)
          {
              const node = allCheckedBox[index].parentNode.parentNode;
              const labelNode = [...node.getElementsByClassName('label')];
              mainClass.deleteSingleRowFromStorage(labelNode[0].innerText);
              this.formView.removeChild(allCheckedBox[index].parentNode.parentNode)
          }
          const mainChecked = [...this.formView.getElementsByClassName('sideMainCheckbox')];
          mainChecked[0].checked ='';
          deleteButton.style.display = 'none';
      });
    }

}
