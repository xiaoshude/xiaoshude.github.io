/**
 * Created by fjywan on 2018/1/8.
 */
/**
 * 策略：
 * 优先阻止黑子5子连线 然后填充白子最可能5子连线的位置
 */
class Robot {
  constructor() {
    this.blackSuggest = [];
    this.whiteSuggest = [];
  }

  initSuggest(val) {
    if (val === 1) {
      this.whiteSuggest = [];
    }
    if (val === 2) {
      this.blackSuggest = [];
    }
  }
  addSuggest(val, x, y, count) {
    if (val === 1) {
      this.whiteSuggest.push({
        x, y, count
      })
    }
    if (val === 2) {
      this.blackSuggest.push({
        x, y, count
      })
    }
  }

  getSuggest() {
    let suggestions = [...this.blackSuggest, ...this.whiteSuggest];
    suggestions.sort((a, b) => b.count - a.count);
    return suggestions[0];
  }
}