/**
 * Created by fjywan on 2018/1/8.
 */

/**
 * 把棋盘映射到一个数据结构
 * 用二维数组表示,
 * undefined 表示无子；1表示白子；2表示黑子
 * [
 *  [undefined, 1, 2 ...], // 每一行
 *  [],
 *  []
 *  ...
 * ]
 *
 */

class chessStruct {
  /***
   * 棋盘数据结构构造函数
   * @param size 棋盘大小
   */
  constructor(size) {
    this._size = Number(size) ? Number(size) : 16;
    this._finishLimit = 5;

    this._finished = false; // 标识是否结束，结束后不允许再填子

    this._dataModel = Array.from(new Array(this._size), () => new Array(this._size));

    this._lastFillVal = 1;

    this._revertFunc = null; // 记录撤销函数
    this._undoRevertFunc = null; // // 记录取消撤销函数

    this._robot = new Robot();
  }

  fill(x, y) {
    if (this._finished) {
      return {
        status: 'finish'
      };
    }
    let val = this._lastFillVal === 1 ? 2 : 1;

    // 参数合法性校验 ...
    let oldVal = this._dataModel[y][x];
    this._dataModel[y][x] = val;
    this._lastFillVal = val;
    if (this.checkFinish(x, y, val)) {
      this._finished = true;
      return {
        status: 'finish',
        val
      };
    }
    this._revertFunc = function () {
      this._dataModel[y][x] = oldVal;
      this._undoRevertFunc = function () {
        this._dataModel[y][x] = val;
      }
    };

    return {
      status: 'progress',
      val
    };
  }

  getSuggest() {
    return this._robot.getSuggest();
  }

  revert() {
    this._revertFunc && this._revertFunc();
    this._revertFunc = null;
  }

  undoRevert() {
    this._undoRevertFunc && this._undoRevertFunc();
    this._undoRevertFunc = null;
  }

  /**
   * 每下一步棋都要检查是否已经5子连线
   */
  checkFinish(x, y, val) {
    this._robot.initSuggest(val);
    // x
    let xCount = 1; // 记录X轴连续数
    let xAvaliablePos = [];
    for (let i = x + 1; i < this._size - 1; i++) {
      if (this._dataModel[y][i] === val) {
        xCount++;
      } else {
        if (!this._dataModel[y][i]) {
          xAvaliablePos.push({
            y,
            x: i
          })
        }
        break;
      }
    }
    for (let i = x - 1; i >= 0; i--) {
      if (this._dataModel[y][i] === val) {
        xCount++;
      } else {
        if (!this._dataModel[y][i]) {
          xAvaliablePos.push({
            y,
            x: i
          })
        }
        break;
      }
    }

    if (xCount >= this._finishLimit) {
      return true
    }
    xAvaliablePos.forEach(pos => this._robot.addSuggest(val, pos.x, pos.y, xCount));

    // y
    let yCount = 1; // 记录Y轴连续数
    let yAvaliablePos = [];
    for (let i = y + 1; i < this._size - 1; i++) {
      if (this._dataModel[i][x] === val) {
        yCount++;
      } else {
        if (!this._dataModel[i][x]) {
          yAvaliablePos.push({
            y: i,
            x
          })
        }
        break;
      }
    }
    for (let i = y - 1; i >= 0; i--) {
      if (this._dataModel[i][x] === val) {
        yCount++;
      } else {
        if (!this._dataModel[i][x]) {
          yAvaliablePos.push({
            y: i,
            x
          })
        }
        break;
      }
    }

    if (yCount >= this._finishLimit) {
      return true
    }
    yAvaliablePos.forEach(pos => this._robot.addSuggest(val, pos.x, pos.y, yCount));


    // - 45度轴

    let leftBiasCount = 1; // 记录- 45度轴轴连续数
    let leftBiasAvaliablePos = [];
    for (let i = y + 1, j = x + 1; (i < this._size - 1) && (j < this._size - 1); i++, j++) {
      if (this._dataModel[i][j] === val) {
        leftBiasCount++;
      } else {
        if (!this._dataModel[i][j]) {
          leftBiasAvaliablePos.push({
            y: i,
            x: j
          })
        }

        break;
      }
    }
    for (let i = y - 1, j = x - 1; (i >= 0) && (j >= 0); i--, j--) {
      if (this._dataModel[i][j] === val) {
        leftBiasCount++;
      } else {
        if (!this._dataModel[i][j]) {
          leftBiasAvaliablePos.push({
            y: i,
            x: j
          })
        }

        break;
      }
    }

    if (leftBiasCount >= this._finishLimit) {
      return true
    }
    leftBiasAvaliablePos.forEach(pos => this._robot.addSuggest(val, pos.x, pos.y, leftBiasCount));


    //45度轴
    let rightBiasCount = 1; // 记录45度轴轴连续数
    let rightBiasAvaliablePos = []; // 记录- 45度轴轴连续数

    for (let i = y + 1, j = x - 1; (i < this._size - 1) && (j >= 0); i++, j--) {
      if (this._dataModel[i][j] === val) {
        rightBiasCount++;
      } else {
        if (!this._dataModel[i][j]) {
          rightBiasAvaliablePos.push({
            y: i,
            x: j
          })
        }
        break;
      }
    }
    for (let i = y - 1, j = x + 1; (i >= 0) && (j < this._size - 1); i--, j++) {
      if (this._dataModel[i][j] === val) {
        rightBiasCount++;
      } else {
        if (!this._dataModel[i][j]) {
          rightBiasAvaliablePos.push({
            y: i,
            x: j
          })
        }
        break;
      }
    }

    if (rightBiasCount >= this._finishLimit) {
      return true
    }
    rightBiasAvaliablePos.forEach(pos => this._robot.addSuggest(val, pos.x, pos.y, rightBiasCount));

    return false;
  }
}
