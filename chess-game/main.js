/**
 * Created by fjywan on 2018/1/8.
 */
const SIZE = 16; // 棋盘大小
let chessModel = new chessStruct(SIZE); // 先实例化 数据模型
let chessDom, boardDom, revertBtn, undoRevertBtn, robottBtn;

const generateBoardHtml = () => {
  return Array.from(new Array((SIZE - 1) * (SIZE - 1)), () => `<span class="box"></span>`).join('')
};
const generateChessHtml = () => {
  return Array.from(new Array(SIZE), (outVal, y) => Array.from(new Array(SIZE), (innerVal, x) => `<span class="chess-item c-${x}-${y}"></span>`).join('')
  ).join('')
};


const chessClickHandler = (evt, auto) => {
  let targetClassList = evt.target.classList;
  if (targetClassList.contains('chess-container') || targetClassList.contains('black') || targetClassList.contains('white')) {
    return false;
  }

  let coorClassNameArr = targetClassList[1].split('-');
  let x = Number(coorClassNameArr[1]);
  let y = Number(coorClassNameArr[2]);
  let result;

  result = chessModel.fill(x, y);
  addChess(result, targetClassList);
  if (!checkFinish(result)) {
    if (auto) {
      let pos = chessModel.getSuggest();
      result = chessModel.fill(pos.x, pos.y);
      addChess(result, document.querySelector(`.c-${pos.x}-${pos.y}`).classList);
      checkFinish(result);
    }
  }
};

const checkFinish = (result) => {
  if (result.status === 'finish') {
    const MSG = result.val === 1 ? '白子' : '黑子';
    chessDom.onclick = null;
    setTimeout(() => {
      alert(`${MSG}胜利`);
    }, 100);

    return true
  }
  return false;
};

const addChess = (result, targetClassList) => {
  if (result.val) {
    if (result.val === 1) {
      targetClassList.add('white');
    } else {
      targetClassList.add('black');
    }
  }
};

const resetChess = () => {
  document.querySelectorAll('.chess-item').forEach(node => {
    if (node.classList.contains('black')) {
      node.classList.remove('black')
    }
    if (node.classList.contains('white')) {
      node.classList.remove('white')
    }
  });

  chessModel = new chessStruct(SIZE);
};


const render = function () {
  boardDom.innerHTML = generateBoardHtml();
  chessDom.innerHTML = generateChessHtml();
};

const addEvent = function () {
  chessDom.onclick = function(e) {
    chessClickHandler(e)
  };
  revertBtn.addEventListener('click', () => chessModel.revert());
  undoRevertBtn.addEventListener('click', () => chessModel.undoRevert());
  robottBtn.addEventListener('click', () => {
    resetChess();
    chessDom.onclick = function(e) {
      chessClickHandler(e, true)
    };
  })
};

document.addEventListener('DOMContentLoaded', function () {
  chessDom = document.querySelector('#chess');
  boardDom = document.querySelector('#board');
  revertBtn = document.querySelector('#revert');
  undoRevertBtn = document.querySelector('#undoRevert');
  robottBtn = document.querySelector('#robot');

  // 渲染 & 绑定事件
  render(boardDom, chessDom);
  addEvent();
});