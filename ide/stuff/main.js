ace.require("ace/ext/language_tools");
function update()
{
    var idoc = document.getElementById('iframe').contentWindow.document;

    idoc.open();
    idoc.write(editor.getValue());
    idoc.close();
}

function setupEditor()
{
window.editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");
(`<!DOCTYPE html>
<html>
<head>
</head>

<body>
</body>
</html>`,1); //1 = moves cursor to end

editor.getSession().on('change', function() {
    update();
});

editor.focus();


editor.setOptions({
    fontSize: "16pt",
    showLineNumbers: true,
    vScrollBarAlwaysVisible:true,
    enableBasicAutocompletion: true, enableLiveAutocompletion: false
});

editor.setShowPrintMargin(false);
editor.setBehavioursEnabled(false);
}

function ready() {
    setupEditor();
    update();
}
function save() {
    download(editor.getValue(), document.getElementById("fileName").innerHTML, "text/javascript");
}
function ready() {
    setupEditor();
}
function reset() {
    setupEditor();
}
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
editor.setOptions({
    enableBasicAutocompletion: true
});
function newJS() {
    editor.getSession().setMode("ace/mode/javascript");
}
function newCSS() {
    editor.getSession().setMode("ace/mode/css");
}
function newHTML() {
    editor.getSession().setMode("ace/mode/html");
}
