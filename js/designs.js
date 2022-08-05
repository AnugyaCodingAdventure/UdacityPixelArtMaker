"use strict";
var dragging = true;
var selectedBackgroundColor;
const $cellCanvas = $('#cellCanvas');
const $inputHeight = $('#inputHeight');
const $inputWidth = $('#inputWidth');
const $colorTableCreator = $('#colorTableCreator');
const defaultColor = "#000000";

function generateRandomColor() {
    var newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return newColor;
}

function ChangePageTitleColor() {
    document.getElementById('PageTitle').style.color = generateRandomColor();

}

setInterval(ChangePageTitleColor, 3500);
$colorTableCreator.submit(event => {
    event.preventDefault();

    let width = $inputWidth.val();
    let height = $inputHeight.val();

    $cellCanvas.html('');

    makeGrid(height, width);
});

function makeGrid(height, width) {
    for (let i = 0; i < height; i++) {
        let tr = $('<tr></tr>').appendTo($cellCanvas);
        for (let i = 0; i < width; i++) {
            tr.append('<td></td>');
        }
    }
    $cellCanvas.find("td")
        .prop("contenteditable", true)
        .click(onCellClick)
        .keydown(onCellKeyDown)
        .hover(onCellHover)
        .on("mousedown", onCellMouseDown)
        .on("mouseenter", onCellMouseEnter)
        .on("dblclick", onCellDblClick)

}

function onCellClick(event) {
    let color = getColor();
    $(event.currentTarget).css("background-color", color);

}
function onCellDblClick(event) {
    $(event.currentTarget).css("background-color", '');

}
function onCellKeyDown(event) {
    event.preventDefault();
    $(event.currentTarget).html('');
    const array = ["1", "2", "3", "4", "5"];
    let keyBoardInput = event.key || event.code
    if (array.includes(keyBoardInput) === true) {
        let colorPickerSelector = "#color-picker" + keyBoardInput;
        let color = $(colorPickerSelector).val();
        $(event.currentTarget).css("background-color", color)
    }
}
function onCellHover(event) {
    event.currentTarget.focus();
}
function getColor() {
    var selectedPicker = $('.color-picker[data-selected="true"]');
    let color = selectedPicker.val();
    if (!color)
        color = defaultColor;
    return color;
}

function onSelection(event) {
    let pickers = document.querySelectorAll(".color-picker");
    pickers.forEach(picker => picker.dataset.selected = false);
    event.currentTarget.dataset.selected = "true";
    $("#h1SelectedColorIndicator").css("color", event.currentTarget.value);
}
function onCellMouseDown(event) {
    dragging = true;
    selectedBackgroundColor = event.currentTarget.style.backgroundColor;
    console.log(selectedBackgroundColor);
}

function onCellMouseEnter(event) {
    if (dragging == false) return;
    event.currentTarget.style.backgroundColor = selectedBackgroundColor;
}
function onMouseUp() {
    dragging = false;
}


$(document).ready(function () {
    let pickers = document.querySelectorAll(".color-picker");
    pickers.forEach(picker => {
        picker.onfocus = onSelection;
        picker.oninput = onSelection;
        $(this).on("mouseup", onMouseUp);
    });

});
