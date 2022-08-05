"use strict";
var dragging = true;
var selectedBackgroundColor;
const $cellCanvas = $('#cellCanvas');
const $inputHeight = $('#inputHeight');
const $inputWidth = $('#inputWidth');
const $colorTableCreator = $('#colorTableCreator');
const defaultColor = "#000000";

/**
  * @desc generate a random hex color code
*/
function generateRandomColor() {
    var newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return newColor;
}

/**
  * @desc changes font color of the  title of the page 
*/
function ChangePageTitleColor() {
    document.getElementById('PageTitle').style.color = generateRandomColor();

}

/**
  * @desc calls methods to change font colors of the
  *       page title every 3.5 seconds.
*/
setInterval(ChangePageTitleColor, 3500);

/**
  * @desc binds function onFormSubmitted when submit 
  *       button of the page form is clicked
*/
$colorTableCreator.submit(onFormSubmitted);

/**
  * @desc removes all existing squares or cells from canvas grid.
  *       calls method to create a new  canvas with width 
  *       and height supplied by the user.
*/
function onFormSubmitted(event) {
    event.preventDefault();

    let width = $inputWidth.val();
    let height = $inputHeight.val();

    $cellCanvas.html('');

    makeGrid(height, width);
}
/**
  * @desc create a grid of squares
  * @param int height - number of squares representing the height of the grid
  * @param  int width - number of squares representing the width of the grid
*/
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

/**
  * @desc copies selected color to grid cell/handles click event on any of the cells of the grid
  * @param object event - jquery wrapped click DOM event
*/
function onCellClick(event) {
    let color = getColor();
    $(event.currentTarget).css("background-color", color);

}

/**
  * @desc remove color from grid cell when cell is double clicked
  * @param object event - jquery wrapped dblclick DOM event
*/
function onCellDblClick(event) {
    $(event.currentTarget).css("background-color", '');

}

/**
  * @desc copies color to square when numbers 1,2,3,4, or 5 is pressed on
  *       keyboard keeping cursor on the cell.
  * @param object event - jquery wrapped keydown DOM event 
*/
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

/**
  * @desc makes the cell focus when mouse is moved over it
  * @param object event - jquery wrapped DOM mouseover event object
*/
function onCellHover(event) {
    event.currentTarget.focus();
}

/**
  * @desc get the selected color from the five color pickers, 
  *       if none are selected default color is returned
*/
function getColor() {
    var selectedPicker = $('.color-picker[data-selected="true"]');
    let color = selectedPicker.val();
    if (!color)
        color = defaultColor;
    return color;
}

/**
  * @desc Marks a color picker selected when color picker is 
  *       focused or color selection popup is closed. Applies
  *       selected to color to Selected Color tag for indication.
  * @param object event -  DOM focus or input DOM event object
*/
function onSelection(event) {
    let pickers = document.querySelectorAll(".color-picker");
    pickers.forEach(picker => picker.dataset.selected = false);
    event.currentTarget.dataset.selected = "true";
    $("#h1SelectedColorIndicator").css("color", event.currentTarget.value);
}

/**
  * @desc marks dragging start when mouse is clicked over a cell.
  *       copies color of the  cell to a variable  so that it can
  *       be copied to other cells.
  * @param object event -  DOM mouse down  DOM event object
*/
function onCellMouseDown(event) {
    dragging = true;
    selectedBackgroundColor = event.currentTarget.style.backgroundColor;
}

/**
  * @desc Copies the color of cells where mouse drag 
  *       started to the cell where mouse drag has entered.
  * @param object event -  DOM mouseenter  DOM event object
*/
function onCellMouseEnter(event) {
    if (dragging == false) return;
    event.currentTarget.style.backgroundColor = selectedBackgroundColor;
}

/**
  * @desc marks mouse drag as stopped when mouse click is released.
*/
function onMouseUp() {
    dragging = false;
}

/**
  * @desc binds onSelection method to color pickers to handle focus 
  *       and input events on DOM ready event.
  *       binds onMouseup event to the web page when
*/
$(document).ready(function () {
    let pickers = document.querySelectorAll(".color-picker");
    pickers.forEach(picker => {
        picker.onfocus = onSelection;
        picker.oninput = onSelection;
        $(this).on("mouseup", onMouseUp);
    });

});
