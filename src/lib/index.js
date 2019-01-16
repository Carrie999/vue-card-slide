import VueCardSlide from './vue-card-slide'   //引入组件
const cardSlide = {
  // install: function(Vue) {
  //   Vue.component(VueComment.name, VueComment)
  // }
  install: function(Vue) {
  	if (typeof window !== 'undefined' && window.Vue) {
	  // Vue = window.Vue
	  window.Vue.use(cardSlide) 
	}
    Vue.component(VueCardSlide.name, VueCardSlide) //全局组件
  }
}

export default cardSlide  //导出

