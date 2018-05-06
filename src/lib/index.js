import imgtopdf from './imgtopdf.vue'

const pdf ={
    install(Vue,options){
        Vue.component(imgtopdf.name,imgtopdf);
    }
}

if(typeof window!==undefined && window.Vue){
    Vue.use(imgtopdf);
}

export default pdf