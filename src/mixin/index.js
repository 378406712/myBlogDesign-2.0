/**
 * category-detail 混入
 */
const mixins = {
  methods: {
    async getCategory(actions, data) {
      await actions(data)
    }
  }
}
export { mixins }
