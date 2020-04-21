<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view class="Router" v-show="RouterState"></router-view>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "App",
        provide(){
            return{
                reload:this.reload
            }
        },
        data(){
            return {
                transitionName: 'slide-right',
                RouterState:true,
            }
        },
        methods:{
            //本页面 动画
          reload(flag){
              //flag=false 返回
              flag?this.transitionName = 'slide-left':this.transitionName = 'slide-right';
              this.RouterState = false;
              setTimeout(()=>{
                  this.$nextTick(()=>{
                      this.RouterState = true;
                  })
              },700);
          },
        },
        watch: {
            '$route'(to, from) {
                /*console.log(from.meta.index +'->'+to.meta.index);*/
                if(to.meta.index > from.meta.index){
                    this.transitionName = 'slide-left';
                }else{
                    this.transitionName = 'slide-right';
                }
            }
        },
    }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
