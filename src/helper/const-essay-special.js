/**
 * @file special-pic
 */
export const SpecialPicData = {
  select: 'all',
  spinner: false,
  saved: false,
  DateList: [],

  /**
   * @enum
   * @param {Number} percentage 进度条数字
   * @param {Boolean} none 是否显示进度条内容
   * @param {String}  media_title 标题
   * @param {String} size 大小
   * @param {Number} pic_width 宽度
   * @param {Number} pic_height 高度
   * @param {String} date 日期
   */
  UploadFile: {
    percentage: 0,
    none: true,
    src: '',
    showDetail: '',
    extraData: {
      media_title: '',
      size: '',
      date: '',
      pic_width: '',
      pic_height: '',
      file_name: '',
      description: ''
    },
    colors: [
      { color: '#f56c6c', percentage: 20 },
      { color: '#e6a23c', percentage: 40 },
      { color: '#5cb87a', percentage: 60 },
      { color: '#1989fa', percentage: 80 },
      { color: '#6f7ad3', percentage: 100 }
    ]
  },
  Special_Pic: {
    activeName: 'uploadDocs'
  },
  search: ''
}
