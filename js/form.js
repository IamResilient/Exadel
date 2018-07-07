function Form(options) {
    this.id = options.id;
    this.targetUrl = options.targetUrl;
    this.containerSelector = options.containerSelector;
    this.container = document.querySelector(options.containerSelector);
    this.items = [];
    this.domElem = document.createElement("div");
    this.domElem.setAttribute("id", this.id);
    this.domElem.setAttribute("class", options.className);
    if (this.container) {
        this.container.append(this.domElem);
    }
}

Form.prototype.add = function() {
    for (var i = 0; i < arguments.length; i++) {
        var currParentForm = arguments[i].getParentForm();
        if (currParentForm) {
        	currParentForm.remove(arguments[i]);
        }
        this.items.push(arguments[i]);
        arguments[i].setParentForm(this);
    }
    this.render();
}
Form.prototype.move = function(elem, pos) {
    var currPos = this.items.indexOf(elem);
    if (currPos !== -1) {
        if (pos < 0) {
            pos = 0;
        }
        if (pos > this.items.length - 1) {
            pos = this.items.length - 1;
        }
        if (currPos !== pos) {
            var tmp = this.items[pos];
            this.items[pos] = this.items[currPos];
            this.items[currPos] = tmp;
        }
    }
    this.render();
}
Form.prototype.remove = function(elem) {
    var index = this.items.indexOf(elem);
    if (index !== -1) {
        this.items.splice(index, 1);
    }
    elem.onRemoveFromParent();
    this.render();
}
Form.prototype.render = function() {
    this.domElem.innerHTML = "";
    for (var i = 0; i < this.items.length; i++) {
        this.domElem.append(this.items[i].domElem);
    }
}
Form.prototype.reset = function() {
    for (var i = 0; i < this.items.length; i++) {
        this.items[i].reset();
    }
}
Form.prototype.getFormData = function() {
    var result = {}, tmp;
    for (var i = 0; i < this.items.length; i++) {
        tmp = this.items[i].getValue();
        if (tmp && tmp.name) {
            result[tmp.name] = tmp.value;
        }
        return result;            
    }  
}
Form.prototype.send = function() {
    var self = this;
    var countTrue = 0;
    var countInput = 0;
    var check = function() {
        this.validator();
    }
    var data = this.getFormData();
    var xhr = new XMLHttpRequest();
    for (var i = 0; i < this.items.length; i++) {
        countInput++
        if (this.items[i].validator) {
            check = this.items[i].validator();
            if (check == true) {
                countTrue++
                if (countTrue == countInput) {
                    xhr.open('POST', this.targetUrl);
                    xhr.setRequestHeader("Content-type", "application/json");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState !== XMLHttpRequest.DONE) return;
                        if(xhr.status != 200) {
                            alert(xhr.status);
                        } else {
                            alert("Responce: " + xhr.responseText);
                            self.reset();
                        };
                    };
                    xhr.send(JSON.stringify(data));
                }
            }
        }
    }
}