<template>
  <div class="SearchBox">
    <div class="Search_input_top_box">
      <img class="Search_icon" src="@/assets/images/search_icno.png" alt="" />
       <!--ios输入法中显示搜索按钮？ -->
       <form action="/" style="display: inline-block"> 
        <input
          class="Search_Input"
          placeholder="请输入问卷名称进行搜索"
          v-model="inputText"
          @keyup.enter="backBtn"
          v-focus
       />
      </form>
      <div class="Search_delIcon" v-show="delShow" @click="delText">
        <van-icon name="cross" size=".3rem" />
      </div>
      <div class="Search_btn" @click="backBtn">{{ SearchText }}</div>
    </div>
    <div class="Search_xian"></div>

    <!--搜索记录-->
    <div class="Search_record_box">
      <div class="Search_record_text">
        <p>
          搜索记录
          <img
            @click="deleteList"
            src="@/assets/images/del-icon.png"
            v-if="listarr.length > 0"
          />
        </p >
      </div>
      <!--记录搜索-->
      <div class="History_box">
        <div class="History-list">
          <p
            v-for="item in listarr"
            :key="item.index"
            @click="historyGiveInput(item)"
          >
            {{ item }}
          </p >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './Search.scss';
import { Dialog } from 'vant';
import { ref, watch } from 'vue-function-api';
export default {
  name: 'Search',
  directives: {
    focus: {
      inserted: el => {
        setTimeout(() => {
          el.focus();
        }, 500);
      }
    }
  },
  setup(props, ctx) {
    const SearchText = ref('取消');
    const inputText = ref('');
    const listarr = ref([]);
    const delShow = ref(false)

    // 获取历史记录
     localStorage.getItem('searchHistoryList')
      ? (listarr.value = JSON.parse(localStorage.getItem('searchHistoryList')))
      : (listarr.value = []);

    //点击删除历史记录按钮
    function deleteList() {
      Dialog.confirm({
        title: '提示',
        message: '确定删除历史记录?',
        showCancelButton: true
      })
        .then(action => {
          if (action === 'confirm') {
            //确认的回调
            localStorage.setItem('searchHistoryList', '');
            listarr.value = [];
          }
        })
        .catch(err => {
          if (err === 'cancel') {
            //取消的回调
            console.log('取消');
          }
        });
    }
    function delText(){
      inputText.value = '';
    }
    function historyGiveInput(item) {
      inputText.value = item;
    }
     // 返回按钮 / 搜索按钮
    function backBtn() {
      if (SearchText.value === '搜索') {
        // this.$store.commit('changeSearchValue',this.inputText);
        if (listarr.value.indexOf(inputText.value) >= 0) {
          let index = listarr.value.indexOf(inputText.value);
          listarr.value.splice(index, 1);
        }
        listarr.value.unshift(inputText.value);
        let history = JSON.stringify(listarr.value);
        //localStorage 存数组
        localStorage.setItem(`searchHistoryList`, history);
        ctx.router.push({
          path: '/',
          // 返回到url到Home页
          // 或可以存入vuex
          query: {
            search: inputText.value
          }
        });
      } else {
        ctx.router.push({
          path: '/'
        });
      }
    }
    watch(
      () => inputText.value,
      value => {
        if (value === '') {
          SearchText.value = '取消';
          delShow.value = false
        } else {
          SearchText.value = '搜索';
          delShow.value = true
        }
      }
    )

    return {
      SearchText,
      inputText,
      listarr,
      delShow,

      deleteList,
      historyGiveInput,
      backBtn,
      delText
    }
  }
};
</script>