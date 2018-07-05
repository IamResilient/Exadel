function FormItem(options) {
    this.id = options.id;
    this.name = options.name;
    this.type = options.type;
    this.parentForm = null;
}

FormItem.prototype.addLabel = function(label) {
    if (!label) {
        return;
    }
    var elem = document.createElement("span");
    elem.innerText = label;
    this.domElem.append(elem);
}
FormItem.prototype.getParentForm = function() {
    return this.parentForm;
}
FormItem.prototype.setParentForm = function(parent) {
    this.parentForm = parent;
}
FormItem.prototype.onRemoveFromParent = function() {
    this.setParentForm(null);
}

FormItem.prototype.reset = function() {
}
/**
 should return `null` or object: {name: "...", value: "..."}
*/
FormItem.prototype.getValue = function() {
    return null;
}