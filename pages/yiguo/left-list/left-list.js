Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '',
    current1: '',
    scrollList: []
  },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e);
    let nowId = this.nowTopYs(e.detail.scrollTop);
    if (nowId !== this.data.current) {
      this.setData({
        current: nowId[0]
      })
    }
    console.log(this.data.current);
  },
  goToView(e) {
    console.log(e);
    this.setData({
      current1: e.currentTarget.id + '1',
      current: e.currentTarget.id
    })
  },

  // 页面渲染完成
  onReady() {
    var query = wx.createSelectorQuery();
    // 第一步
    query.select('#rightList').boundingClientRect();
    // 第二步，获取所有子元素的top
    const aaa = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < aaa.length; i++) {
      query.select('#' + aaa[i] + '1').boundingClientRect();
    }
    // 第三步，放到对象中
    query.exec(res => {
      console.log('#rightList', res);
      let scrollBoxTop = res[0].top;
      this.setData({
        scrollList: res.slice(1).map(item => {
          item.top -= scrollBoxTop;
          item.bottom -= scrollBoxTop;
          return item;
        })
      })
      console.log(this.data.scrollList);
    });
  },

  // 筛选达到顶部的元素
  nowTopYs(scrollTop) {
    let scrollList = this.data.scrollList;
    for (let i = 0, length = scrollList.length; i < length; i++) {
      if (scrollTop >= scrollList[i].top && scrollTop < scrollList[(i+1)].top) {
        return scrollList[i].id;
      }
    }
    return false;
  }

})