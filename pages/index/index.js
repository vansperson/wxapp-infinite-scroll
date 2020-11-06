const throttle = (fn, delay) => {
  var startTime = new Date();
  return function(){
      var context = this;
      var args = arguments;
      var endTime = new Date();
      var resTime = endTime - startTime;
      //判断大于等于我们给的时间采取执行函数;
      if(resTime >= delay){
          fn.apply(context, args);
          //执行完函数之后重置初始时间，等于最后一次触发的时间
          startTime = endTime;
      }
  }
}

Page({
  /** 
   * 页面的初始数据
   */
  data: {
    list: []
  },
  onLoad: function() {
    this.wholePageIndex = 0;
    this.wholeVideoList = [];
    this.currentRenderIndex = 0;
    this.index =  0 ;
    this.pageHeightArr = [];

    wx.getSystemInfo({
      success: (res) => {
        let { windowHeight } = res;
        this.windowHeight = windowHeight;
      }
    })


    const arr = [
      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx: this.index++ 
      }, 
      {
        idx: this.index++
      },

      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx: this.index++
      }, 
      {
        idx: this.index++
      },

      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx:  this.index++
      },
      {
        idx:  this.index++
      }, 
      {
        idx:  this.index++
      },

      {
        idx:  this.index++
      },
      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx:  this.index++
      },
      {
        idx:  this.index++
      }, 
      {
        idx:  this.index++
      },

      {
        idx:  this.index++
      } 
      
    ]
    this.wholeVideoList[this.wholePageIndex] = arr;
    this.setData({ ['list[' + this.wholePageIndex + ']']: arr }, () => {
      this.setHeight();
    })
  },

  setHeight: function() {
    const that = this;
    const wholePageIndex = this.wholePageIndex;
    this.query = wx.createSelectorQuery();
    this.query.select(`#wrp_${wholePageIndex}`).boundingClientRect()
    this.query.exec(function(res){
      that.pageHeightArr[wholePageIndex] = res[0] && res[0].height;
    })

  },

  onPageScroll: throttle(function(e) {
    const realScrollTop = e.scrollTop;
    const that = this;
    // 滚动的时候需要实时去计算当然应该在哪一屏幕
    let tempScrollTop = 0;
    const wholePageIndex = this.wholePageIndex;

    for(var i=0;i<this.pageHeightArr.length;i++) {
      tempScrollTop = tempScrollTop + this.pageHeightArr[i];
      if(tempScrollTop > realScrollTop + this.windowHeight) {
        console.log('set this.computedCurrentIndex' + i);
        this.computedCurrentIndex = i;
        break;
      } 
    }
    const currentRenderIndex = this.currentRenderIndex;
    if(this.computedCurrentIndex !== currentRenderIndex ) {
      // 这里给不渲染的元素占位
      let tempList = new Array(wholePageIndex+1).fill(0);
      tempList.forEach((item, index) => {
        if(this.computedCurrentIndex-1 <= index && index <=this.computedCurrentIndex+1) {
          tempList[index] = that.wholeVideoList[index];
        } else {
          tempList[index] = { height: that.pageHeightArr[index]};
        }
      })

      this.currentRenderIndex = this.computedCurrentIndex;
      // 渲染第一屏的时候，如果之前这里有看到这里，并且showVideoIcon，那么需要重新绑定一次。
  
      this.setData({ list: tempList })
    }
  }, 500),

  getVideoInfoData: function () {
    const arr = [
      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx: this.index++ 
      }, 
      {
        idx: this.index++
      },

      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx: this.index++
      }, 
      {
        idx: this.index++
      },

      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx:  this.index++
      },
      {
        idx:  this.index++
      }, 
      {
        idx:  this.index++
      },

      {
        idx:  this.index++
      },
      {
        idx: this.index++
      },
      {
        idx: this.index++
      },
      {
        idx:  this.index++
      },
      {
        idx:  this.index++
      }, 
      {
        idx:  this.index++
      },

      {
        idx:  this.index++
      } 
      
    ]
    this.wholePageIndex = this.wholePageIndex + 1;

    const wholePageIndex = this.wholePageIndex;
    this.currentRenderIndex = wholePageIndex;
    this.wholeVideoList[wholePageIndex] = arr;
    let datas = {};
    let tempList = new Array(wholePageIndex + 1).fill(0);
    if(wholePageIndex > 2) {
      tempList.forEach((item, index) => {
        if(index < tempList.length -2) {
          tempList[index] = { height: this.pageHeightArr[index]};
        } else {
          tempList[index] = this.wholeVideoList[index];
        }

      })
      datas.list = tempList;
    } else {
       datas['list[' + wholePageIndex + ']'] = arr;
    }

    this.setData(datas, () => {
      this.setHeight();
    })
  },


  /**
 * 页面下拉触底事件的处理函数
 */
  onReachBottom: function () {
    this.getVideoInfoData();
  },

})