var Letters = "abcdefghijklmnopqrstuvwxyz";
var _dirX = [0, 1];
var _dirY = [1, 0];
var _n = 0;
var _m = 0;
var _board = new Array(_n); //2d char array
var _hWords = new Array(_n); //2d int array
var _vWords = new Array(_n); //2d int array
var _hCount = 0, _vCount = 0;
var _rand;
var _wordsToInsert;
var _tempBoard; //2d char array
var _bestSol = 0;
//DateTime initialTime;

function IsValidPosition(x, y) {
    return x >= 0 && y >= 0 && x < _n && y < _m;
}

function CanBePlaced(word, x, y, dir) {
    var result = 0;
    if (dir === 0) {
        for (var j = 0; j < word.length; j++) {
            var x1 = Number(x), y1 = Number(y) + Number(j);
            if (!(IsValidPosition(x1, y1) && (_board[x1][y1] == ' ' || _board[x1][y1] == word[j])))
                return -1;
            if (IsValidPosition(x1 - 1, y1))
                if (_hWords[x1 - 1][y1] > 0)
                    return -1;
            if (IsValidPosition(x1 + 1, y1))
                if (_hWords[x1 + 1][y1] > 0)
                    return -1;
            if (_board[x1][y1] == word[j])
                result++;
        }
    } else {
        for (var j = 0; j < word.length; j++) {
            var x1 = Number(x) + Number(j), y1 = y;
            if (!(IsValidPosition(x1, y1) && (_board[x1][y1] == ' ' || _board[x1][y1] == word[j])))
                return -1;
            if (IsValidPosition(x1, y1 - 1))
                if (_vWords[x1][y1 - 1] > 0)
                    return -1;
            if (IsValidPosition(x1, y1 + 1))
                if (_vWords[x1][y1 + 1] > 0)
                    return -1;
            if (_board[x1][y1] == word[j])
                result++;
        }
    }

    var xStar = Number(x) - Number(_dirX[dir]), yStar = Number(y) - Number(_dirY[dir]);
    if (IsValidPosition(xStar, yStar))
        if (!(_board[xStar][yStar] == ' ' || _board[xStar][yStar] == '*'))
            return -1;

    xStar = Number(x) + Number(_dirX[dir]) * Number(word.length);
    yStar = Number(y) + Number(_dirY[dir]) * Number(word.length);
    if (IsValidPosition(xStar, yStar))
        if (!(_board[xStar][yStar] == ' ' || _board[xStar][yStar] == '*'))
            return -1;

    return result == word.length ? -1 : result;
}

function PutWord(word, x, y, dir, value) {
    var mat = dir == 0 ? _hWords : _vWords;

    for (var i = 0; i < word.length; i++) {
        var x1 = x + _dirX[dir] * i, y1 = y + _dirY[dir] * i;
        _board[x1][y1] = word[i];
        mat[x1][y1] = value;
    }

    var xStar = x - _dirX[dir], yStar = y - _dirY[dir];
    if (IsValidPosition(xStar, yStar)) _board[xStar][yStar] = '*';
    xStar = x + _dirX[dir] * word.length;
    yStar = y + _dirY[dir] * word.length;
    if (IsValidPosition(xStar, yStar)) _board[xStar][yStar] = '*';
}

function BestPosition(word) {
    var positions = FindPositions(word);
    if (positions.length > 0) {
        var index = Math.floor(Math.random() * positions.length);
        return positions[index];
    }
    return null;
}



function AddWord(word) {

    var wordToInsert = word;
    var info = BestPosition(wordToInsert);
    if (info != null) {
        if (info[2] == 0) {
            _hCount++;
        }
        else
            _vCount++;
        var value = info[2] == 0 ? _hCount : _vCount;
        PutWord(wordToInsert, info[0], info[1], info[2], value);
        return info[2];
    }

    return -1;

}

function FindPositions(word) {
    var max = 0;
    var positions = [];
    for (var x = 0; x < _n; x++) {
        for (var y = 0; y < _m; y++) {
            for (var i = 0; i < _dirX.length; i++) {
                var dir = i;
                var wordToInsert = word;
                var count = CanBePlaced(wordToInsert, x, y, dir);

                if (count < max) continue;
                if (count > max)
                    positions = []; //Clear();

                max = count;
                positions.push(new Array(x, y, dir));
            }
        }
    }

    return positions;
}

function FreeSpaces() {
    var count = 0;
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++) {
            if (_board[i][j] == ' ' || _board[i][j] == '*')
                count++;
        }
    }
    return count;
}

function Gen(pos) {

    if (pos >= _wordsToInsert.length)
        return;

    for (var i = pos; i < _wordsToInsert.length; i++) {

        var posi = BestPosition(_wordsToInsert[i]);
        if (posi != null) {
            var word = _wordsToInsert[i];
            var value = posi[2] == 0 ? _hCount : _vCount;
            PutWord(word, posi[0], posi[1], posi[2], value);
            Gen(pos + 1);
            RemoveWord(word, posi[0], posi[1], posi[2]);
        }
        else {
            Gen(pos + 1);
        }
    }

    var c = FreeSpaces();
    if (c >= _bestSol) return;
    _bestSol = c;
    _tempBoard = _board;
}

function RemoveWord(word, x, y, dir) {
    var mat = dir == 0 ? _hWords : _vWords;
    var mat1 = dir == 0 ? _vWords : _hWords;

    for (var i = 0; i < word.length; i++) {
        var x1 = x + _dirX[dir] * i, y1 = y + _dirY[dir] * i;
        if (mat1[x1][y1] == 0)
            _board[x1][y1] = ' ';
        mat[x1][y1] = 0;
    }

    var xStar = x - _dirX[dir], yStar = y - _dirY[dir];
    if (IsValidPosition(xStar, yStar) && HasFactibleValueAround(xStar, yStar))
        _board[xStar][yStar] = ' ';

    xStar = x + _dirX[dir] * word.length;
    yStar = y + _dirY[dir] * word.length;
    if (IsValidPosition(xStar, yStar) && HasFactibleValueAround(xStar, yStar))
        _board[xStar][yStar] = ' ';
}

function HasFactibleValueAround(x, y) {
    for (var i = 0; i < _dirX.length; i++) {
        var x1 = x + _dirX[i], y1 = y + _dirY[i];
        if (IsValidPosition(x1, y1) && (_board[x1][y1] != ' ' || _board[x1][y1] == '*'))
            return true;
        x1 = x - _dirX[i];
        y1 = y - _dirY[i];
        if (IsValidPosition(x1, y1) && (_board[x1][y1] != ' ' || _board[x1][y1] == '*'))
            return true;

    }
    return false;
}

