/**
 * @file essay-setting
 */
export const EssaySettingData = {
  /**
   * @enum
   * @param {Boolean} showPass 显示密码保护框
   * @param {String} essayPassword 密码保护框双向绑定
   * @param {String} radioVisible 传给后台判断的文章状态(公开/私密/密码保护)
   * @param {String} showVisible 可见性按钮文字
   * @param {Boolean} keepTop 是否置顶
   * @param {Boolean} reCheck 等待复审（存入草稿）
   * @param {Array} visible v-for的可见性数据
   */
  Status_Visible: {
    showPass: false,
    essayPassword: '',
    radioVisible: 'public',
    showVisible: '公开',
    keepTop: false,
    reCheck: false,
    visible: [
      { status: 'public', info: '所有人可见。', title: '公开' },
      {
        status: 'private',
        info: '只有站点管理员和编辑可见。',
        title: '私密'
      },
      {
        status: 'protect',
        info: '受您选择的密码保护，只有持有密码的人士可查看此文章。',
        title: '密码保护'
      }
    ]
  },
  /**
   * @enum
   * @param {String} createCategory 输入框中填的目录
   * @param {Boolean} newCategory 显示新增分类输入框
   */
  Classify_Category: {
    createCategory: '',
    newCategory: false,
    checkCategory: []
  },
  /**
   * @enum
   * @param {Boolean} activeName 初始显示的标签页
   */
  Special_Pic: {
    activeName: 'uploadDocs'
  },
  publish: '发布',
  search: '',
  activeNames: ['1', '2', '3']
}
