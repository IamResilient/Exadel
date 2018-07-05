function Select(options) {
    FormItem.call(this, options);
    this.domElem = document.createElement("div");
    this.addLabel(options.label);
    this.targetDomElement = document.createElement("select");
    this.targetDomElement.setAttribute("id", this.id);
    this.targetDomElement.setAttribute("name", this.name);
    var option = document.createElement("option");
    this.targetDomElement.append(option);
    if (options.optionsArray && options.optionsArray.length) {
        for (var i = 0; i < options.optionsArray.length; i++) {
            option = document.createElement("option");
            option.setAttribute("value", options.optionsArray[i].value);
            option.innerText = options.optionsArray[i].label;
            this.targetDomElement.append(option);
        }
    }
    this.targetDomElement.value = options.value || "";
    this.domElem.append(this.targetDomElement);
}
Select.prototype = Object.create(FormItem.prototype);
Select.prototype.constructor = Select;
Select.prototype.getValue = function(callback) {
    return {
        name: this.name,
        value: this.targetDomElement.value
    }
}
Select.prototype.reset = function(callback) {
    this.targetDomElement.value = "";
}