// Initialize Firebase
var config = {
    apiKey: "AIzaSyB8_oI17qamX3hLJUDZxRWHTtfCrrYsqi0",
    authDomain: "crossword-1dcc8.firebaseapp.com",
    databaseURL: "https://crossword-1dcc8.firebaseio.com",
    projectId: "crossword-1dcc8",
    storageBucket: "crossword-1dcc8.appspot.com",
    messagingSenderId: "169469512359"
};

jQuery(document).ready(function () {

    

    $("#b-quit").click(function () {
        window.location.href = "Main.html";
    });


    function changeBackground(cells, color) {
        if ($(cells).css("background-color") !== "rgb(0, 230, 0)") {
            $(cells).find('input').css({ 'background-color': color })
            $(cells).find('p').css({ 'background-color': color })
            $(cells).css({ 'background-color': color })
        }
    }

    function CheckIfGameOver() {
        var table = document.getElementById("matrix");
        var row;
        var col;
        for (var i = 0; i < _n; i++) {
            row = table.rows[i];
            for (var j = 0; j < _m; j++) {
                col = row.cells[j];
                if (!col.id.includes("black")) {
                    if ($(col).css("background-color") !== "rgb(0, 230, 0)") {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function fillCellsToWhite() {
        var table = document.getElementById("matrix");
        var row;
        var col;
        for (var i = 0; i < _n; i++) {
            row = table.rows[i];
            for (var j = 0; j < _m; j++) {
                col = row.cells[j];

                if (!col.id.includes("black") && $(col).css("background-color") !== "rgb(0, 230, 0)") {
                    changeBackground(col, 'white')
                }
            }
        }
    }


    $(".col-md-5").click(function () {
        $(".col-md-5").css("background-color", "transparent");
        $(this).css("background-color", "lightgray");
        console.log(this.id);
        fillCellsToWhite();
        var thenum = this.id.replace(/^\D+/g, '');
        console.log(thenum)
        if (this.id.includes('h')) {
            for (var obj = 0 ; obj < HorizontalArray.length; obj++) {
                console.log(HorizontalArray[obj])
                if (thenum == HorizontalArray[obj].pValue) {
                    break;
                }
            }
            let i = HorizontalArray[obj].index_i;
            let j = HorizontalArray[obj].index_j;
            var table = document.getElementById("matrix");
            var row = table.rows[i];
            $(row.cells[j]).find('input').focus();
            changeBackground(row.cells[j], 'lightgray')
            isHorizontalWord = true;
            var length = HorizontalArray[obj].length;
            for (var index = 1; index < length; index++) {
                col = row.cells[++j];
                changeBackground(col, 'gray');
            }
        } else {
            for (var obj = 0; obj < VerticalArray.length; obj++) {
                console.log(VerticalArray[obj])
                if (thenum == VerticalArray[obj].pValue) {
                    break;
                }
            }
            let i = VerticalArray[obj].index_i;
            let j = VerticalArray[obj].index_j;
            var table = document.getElementById("matrix");
            var row = table.rows[i];
            $(row.cells[j]).find('input').focus();
            changeBackground(row.cells[j], 'lightgray')
            isHorizontalWord = false;
            var length = VerticalArray[obj].length;
            for (var index = 1; index < length; index++) {
                row = table.rows[++i];
                col = row.cells[j];
                changeBackground(col, 'gray');
            }
        }

    });

    function isBlackCell(cell) {
        if (cell[0] === undefined || cell[0].id.includes("black")) return true;
        return false;
    }

    function changingToHorizontal(td, rowindex, cellindex) {
        isHorizontalWord = true;
        while (cellindex > 0 && mat[rowindex][cellindex - 1] != '*') {
            cellindex--;
        }
        var moveRight = $(td).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + cellindex + ')').eq(0)
        var index = moveRight.find('p')[0].innerText;
        console.log("index " + index);
        var p = $('#h-' + index)[0];
        $(".col-md-5").css("background-color", "transparent")
        $(p).css("background-color", "lightgray");
        for (var obj = 0; obj < HorizontalArray.length; obj++) {
            console.log(HorizontalArray[obj])
            console.log(HorizontalArray[obj].pValue)
            if (HorizontalArray[obj].pValue == index) {
                break;
            }
        }
        var table = document.getElementById("matrix");
        var row = table.rows[rowindex];
        fillCellsToWhite();
        console.log(HorizontalArray[obj]);
        console.log(HorizontalArray[obj].length);
        for (var index = 0; index < HorizontalArray[obj].length; index++ , cellindex++) {
            col = row.cells[cellindex];
            changeBackground(col, 'gray');
        }

    }

    function changingToVertical(td, rowindex, cellindex) {
        isHorizontalWord = false;
        while (rowindex > 0 && mat[rowindex - 1][cellindex] != '*') {
            rowindex--;
        }
        var moveRight = $(td).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + cellindex + ')').eq(0)
        var index = moveRight.find('p')[0].innerText;
        var p = $('#v-' + index)[0];
        $(".col-md-5").css("background-color", "transparent")
        $(p).css("background-color", "lightgray");
        for (var obj = 0; obj < VerticalArray.length; obj++) {
            if (VerticalArray[obj].pValue == index) {
                break;
            }
        }
        var row;
        var table = document.getElementById("matrix");
        fillCellsToWhite();
        console.log(VerticalArray)
        for (var index = 0; index < VerticalArray[obj].length; index++ , rowindex++) {
            row = table.rows[rowindex];
            col = row.cells[cellindex];
            changeBackground(col, 'gray');
        }
    }

    function isCorrectWordHorizontal(td, rowindex, cellindex) {
        isHorizontalWord = true;
        var i = rowindex;
        while (cellindex > 0 && mat[rowindex][cellindex - 1] != '*') {
            cellindex--;
        }
        var j = cellindex;
        var moveRight = $(td).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + cellindex + ')').eq(0)
        var index = moveRight.find('p')[0].innerText;
        var p = $('#h-' + index)[0];
        for (var obj = 0; obj < HorizontalArray.length; obj++) {
            if (HorizontalArray[obj].pValue == index) {
                break;
            }
        }
        var length = HorizontalArray[obj].length
        var row;
        var table = document.getElementById("matrix");
        row = table.rows[rowindex];
        for (var index = 0; index < length; index++ , cellindex++) {
            col = row.cells[cellindex];
            if ($(col).children().children("input").val() !== mat[rowindex][cellindex]) {
                break;
            }
        }
        if (index === length) {
            rowindex = i;
            cellindex = j;
            row = table.rows[rowindex];
            for (var index1 = 0; index1 < length; index1++ , cellindex++) {
                col = row.cells[cellindex];
                changeBackground(col, 'rgb(0, 230, 0)');
            }
            $(p).css("text-decoration", "line-through");
            if (CheckIfGameOver()) {
                Swal.fire('congratulation!!!',
                    'you finished the game');
                var point;
                points = firebase.database().ref('game' + localStorage['uid'] + '/points');
                points.once('value').then(function (snapshot) {
                    point = snapshot.val();
                    point = point + 10;
                    points.set(point);
                });
                setTimeout(function () { window.location.href = "Main.html" }, 3000);
            }
        }
    }


    function isCorrectWordVertical(td, rowindex, cellindex) {
        isHorizontalWord = false;
        var j = cellindex;
        while (rowindex > 0 && mat[rowindex - 1][cellindex] != '*') {
            rowindex--;
        }
        var i = rowindex;
        var moveDown = $(td).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + cellindex + ')').eq(0)
        var index = moveDown.find('p')[0].innerText;
        var p = $('#v-' + index)[0];
        for (var obj = 0; obj < VerticalArray.length; obj++) {
            if (VerticalArray[obj].pValue == index) {
                break;
            }
        }
        var length = VerticalArray[obj].length
        var row;
        var table = document.getElementById("matrix");
        for (var index = 0; index < length; index++ , rowindex++) {
            row = table.rows[rowindex];
            col = row.cells[cellindex];
            if ($(col).children().children("input").val() !== mat[rowindex][cellindex]) {
                break;
            }
        }
        if (index === length) {
            rowindex = i;
            cellindex = j;
            console.log(rowindex + " " + cellindex)
            for (var index1 = 0; index1 < length; index1++ , rowindex++) {
                row = table.rows[rowindex];
                console.log(index1 + " " + row);
                col = row.cells[cellindex];
                changeBackground(col, 'rgb(0, 230, 0)');
            }
            $(p).css("text-decoration", "line-through");
            if (CheckIfGameOver()) {
                Swal.fire('congratulation!!!',
                    'you finished the game');
                var point;
                points = firebase.database().ref('game' + localStorage['uid'] + '/points');
                points.once('value').then(function (snapshot) {
                    point = snapshot.val();
                    point = point + 10;
                    points.set(point);
                });
                setTimeout(function () { window.location.href = "Main.html" }, 3000);
            }
        }
    }


    $('td').click(function () {
        var cellindex = $(this).index()
        var rowindex = $(this).parents('tr').index();
        var cell = $(this).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + cellindex + ')').eq(0)
        var cellLeft = $(this).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + (cellindex - 1) + ')').eq(0)
        var cellRight = $(this).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + (cellindex + 1) + ')').eq(0)
        if ((isBlackCell(cellRight) && (cellindex == 0 || isBlackCell(cellLeft))) || (isBlackCell(cellLeft) && (cellindex == _m || isBlackCell(cellRight)))) {
            changingToVertical(this, rowindex, cellindex);
        } else {
            changingToHorizontal(this, rowindex, cellindex);
        }
        changeBackground(cell, 'lightgray')
        cell.find('input').focus();
    });


    $('td').keydown(function (evt) {
        event.preventDefault();
        var cellindex = $(this).index()
        var rowindex = $(this).parents('tr').index();
        var cell = $(this).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + cellindex + ')').eq(0)
        var cellUp = $(this).parents('table').find('tr:eq(' + (rowindex + 1) + ') td:eq(' + cellindex + ')').eq(0)
        var cellDown = $(this).parents('table').find('tr:eq(' + (rowindex - 1) + ') td:eq(' + cellindex + ')').eq(0)
        var cellLeft = $(this).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + (cellindex - 1) + ')').eq(0)
        var cellRight = $(this).parents('table').find('tr:eq(' + rowindex + ') td:eq(' + (cellindex + 1) + ')').eq(0)

        if (evt.keyCode == 40) {
            if (isBlackCell(cellUp)) return;
            if (isHorizontalWord === true) {
                changingToVertical(this, rowindex, cellindex);
            }
            changeBackground(cell, 'gray')
            cellUp.find('input').focus();
            changeBackground(cellUp, 'lightgray')
        } else if (evt.keyCode == 38) {
            console.log("cell" + cell + " cellDown" + cellDown);
            console.log("idBlackcellDown" + isBlackCell(cellDown) + " cell[0].id.includes" + cell[0].id.includes("0,"));

            if (isBlackCell(cellDown) || cell[0].id.charAt(6) === "0") return;
            if (isHorizontalWord === true) {
                changingToVertical(this, rowindex, cellindex);
            }
            changeBackground(cell, 'gray')
            cellDown.find('input').focus();
            changeBackground(cellDown, 'lightgray')
        } else if (evt.keyCode == 39) {
            if (isBlackCell(cellRight)) return;

            if (isHorizontalWord === false) {
                changingToHorizontal(this, rowindex, cellindex);
            }
            changeBackground(cell, 'gray')
            cellRight.find('input').focus();
            changeBackground(cellRight, 'lightgray')
        } else if (evt.keyCode == 37) {
            if (isBlackCell(cellLeft) || cell[0].id.includes(",0")) return;
            if (isHorizontalWord === false) {
                changingToHorizontal(this, rowindex, cellindex);
            }
            changeBackground(cell, 'gray')
            cellLeft.find('input').focus();
            changeBackground(cellLeft, 'lightgray')
        } else if (evt.keyCode >= 65 && evt.keyCode <= 90) { // if its a-z A-Z
            if (cell.css('backgroundColor') === "rgb(0, 230, 0)") return;
            cell.find('input').val(evt.key);
            changeBackground(cell, 'gray')
            if (isHorizontalWord === false) {
                if (isBlackCell(cellUp)) {
                    changeBackground(cell, 'lightgray');
                } else {
                    cellUp.find('input').focus();
                    changeBackground(cellUp, 'lightgray')
                }
            } else {
                if (isBlackCell(cellRight)) {
                    changeBackground(cell, 'lightgray');
                } else {
                    cellRight.find('input').focus();
                    changeBackground(cellRight, 'lightgray')
                }
            }
            if (isHorizontalWord === false) {
                isCorrectWordVertical(this, rowindex, cellindex);
            } else {
                isCorrectWordHorizontal(this, rowindex, cellindex);
            }
        } else if (evt.keyCode == 8) {
            if (cell.css('backgroundColor') === "rgb(0, 230, 0)") return;
            changeBackground(cell, 'gray')
            cell.find('input').val("");
            if (isHorizontalWord === false) {
                if (isBlackCell(cellDown) || cell[0].id.charAt(6) === "0") {
                    changeBackground(cell, 'lightgray');
                } else {
                    cellDown.find('input').focus();
                    changeBackground(cellDown, 'lightgray')
                }
            } else {
                if (isBlackCell(cellLeft) || cell[0].id.includes(",0")) {
                    changeBackground(cell, 'lightgray');
                } else {
                    cellLeft.find('input').focus();
                    changeBackground(cellLeft, 'lightgray')
                }
            }
        }
    })
});


function getHorizontalWord(l, c) {
    var word_horizontal = "";
    for (; c < _m; c++) {
        if (mat[l][c] === "*" || mat[l][c] === " ") {
            return word_horizontal;
        }
        word_horizontal += mat[l][c];
    }
    return word_horizontal;
}

function getVerticalWord(l, c) {
    var word_vertical = "";
    for (; l < _n; l++) {
        if (mat[l][c] === "*" || mat[l][c] === " ") {
            return word_vertical;
        }
        word_vertical += mat[l][c];
    }
    return word_vertical;
}






function FileHelper(pathOfFileToReadFrom) {
    var request = new XMLHttpRequest();
    request.open("GET", pathOfFileToReadFrom, false);
    request.send(null);
    var returnValue = request.responseText;

    return returnValue;
}

function checkLengthWordHorizontal(i, j) {
    var length = 0;
    var table = document.getElementById("matrix");
    var row = table.rows[i];
    for (var col; col = row.cells[j]; j++) {
        if (col.id.includes("black")) {
            return length;
        }
        length++;
    }
    return length;
}

function checkLengthWordVertical(i, j) {
    var length = 0;
    var table = document.getElementById("matrix");
    for (var row; row = table.rows[i]; i++) {
        var col = row.cells[j];
        if (col.id.includes("black")) {
            return length;
        }
        length++;
    }
    return length;
}

function randomWordByLength(length) {
    let words = [];
    for (var i = 0; i < englishWords.length; i++) {
        if (englishWords[i].length === length) {
            words.push(englishWords[i]);
        }
    }
    var randomWord = words[Math.floor(Math.random() * words.length)];
    while (wordInBoard.includes(randomWord)) {
        randomWord = words[Math.floor(Math.random() * words.length)];
    }
    wordInBoard.push(randomWord);
    return randomWord;
}

function fillBoard(i, j, word, isHorizontal) {
    console.log(word)

    if (isHorizontal) {
        console.log(map[word]);
        var obj = {
            number: HorizontalCount,
            index_i: i,
            index_j: j,
            isHorizontal: true,
            word: word,
            length: word.length,
            pValue: 0,
        };
        
        console.log(HorizontalArray[0])


        var table = document.getElementById("matrix");
        var row = table.rows[i];
        var col = $(row.cells[j]).find('p');
        var pVal;
        if (col == undefined) return;
        if ($(col)[0].innerText === "") {
            $(col)[0].innerText = globalCount;
            pVal = globalCount++;
        } else {
            pVal = $(col)[0].innerText; 
        }
        obj.pValue = pVal;
        HorizontalArray.push(obj);
        if (++HorizontalCount > 11) {
            $("#col-1-hori").append('<div class="row"><div id="h-' + pVal + '" class="col-md-5">' + map[word] + '</div><div class="col-md-1">' + "." + pVal + '</div > ');
        }
        else {
            $("#col-2-hori").append('<div class="row"><div id="h-' + pVal + '" class="col-md-5">' + map[word] + '</div><div class="col-md-1">' + "." + pVal + '</div > ');
        }
        
    } else {
        var obj = {
            number: VerticalCount,
            index_i: i,
            index_j: j,
            isHorizontal: false,
            word: word,
            length: word.length,
            pValue: 0,
        };
        

        var table = document.getElementById("matrix");
        var row = table.rows[i];
        var col = $(row.cells[j]).find('p');
        var pVal;
        if (col == undefined) return;
        if ($(col)[0].innerText === "") {
            $(col)[0].innerText = globalCount;
            pVal = globalCount++;
        } else {
            pVal = $(col)[0].innerText;
        }
        obj.pValue = pVal;
        VerticalArray.push(obj);
        if (++VerticalCount > 20) {
            $("#col-1-verti").append('<div class="row"><div id="v-' + pVal + '" class="col-md-5">' + map[word] + '</div><div class="col-md-1">' + "." + pVal + '</div > ');
        }
        else {
            $("#col-2-verti").append('<div class="row"><div id="v-' + pVal + '" class="col-md-5">' + map[word] + '</div><div class="col-md-1">' + "." + pVal + '</div > ');
        }
    }
}

function changeCss() {

    switch (_n) {
        case 5:
            $(".squere").css("height", "120px");
            $(".squere").css("width", "120px");
            $("input").css("height", "100px");
            $("input").css("width", "100px");
            break;
        case 10:
            $(".squere").css({ 'height': '60px' });
            $(".squere").css({ 'width': '60px' });
            $("input").css({ 'height': '40px' });
            $("input").css({ 'width': '40px' });
            break;
        case 15:
            $(".squere").css({ 'height': '40px' });
            $(".squere").css({ 'width': '40px' });
            $("input").css({ 'height': '20px' });
            $("input").css({ 'width': '20px' });
            $("td").css({ 'font-size': '15px' });
            break;
        case 20:
            $(".squere").css({ 'height': '30px' });
            $(".squere").css({ 'width': '25px' });
            $("input").css({ 'height': '15px' });
            $("input").css({ 'width': '10px' });
            $("td").css({ 'font-size': '10px' });
            break;
    }
}

function isStart(i, j, isHorizontal) {
    var table = document.getElementById("matrix");
    var row = table.rows[i];
    var col = row.cells[j];
    if (col.id.includes("black")) {
        return false;
    }
    if (isHorizontal) {
        if (j == 0) {
            return true;
        } else if (row.cells[j - 1].id.includes("black")) {
            return true;
        } else {
            return false;
        }
    } else {
        if (i == 0) {
            return true;
        } else if (table.rows[i-1].cells[j].id.includes("black")) {
            return true;
        } else {
            return false;
        }
    }
}
