<template>
  <div class="SearchBox">
    <div class="Search_input_top_box">
      <img class="Search_icon" src="@/assets/images/search_icno.png" alt="" />
      <input
        class="Search_Input"
        placeholder="请输入商品、品牌名称进行搜索"
        v-model="inputText"
        v-focus
      />
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
        </p>
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
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './Search.scss';
import { Dialog } from 'vant';
export default {
  name: 'Search',
  data() {
    return {
      SearchText: '取消',
      inputText: '',
      listarr: []
    };
  },
  methods: {
    //点击删除历史记录按钮
    deleteList() {
      Dialog.confirm({
        title: '提示',
        message: '确定删除历史记录?',
        showCancelButton: true
      })
        .then(action => {
          if (action === 'confirm') {
            //确认的回调
            localStorage.setItem('searchHistoryList', '');
            this.listarr = [];
          }
        })
        .catch(err => {
          if (err === 'cancel') {
            //取消的回调
            console.log('取消');
          }
        });
    },
    historyGiveInput(item) {
      this.inputText = item;
    },
    // 返回按钮 / 搜索按钮
    backBtn() {
      if (this.SearchText === '搜索') {
        // this.$store.commit('changeSearchValue',this.inputText);
        if (this.listarr.indexOf(this.inputText) >= 0) {
          let index = this.listarr.indexOf(this.inputText);
          this.listarr.splice(index, 1);
        }
        this.listarr.unshift(this.inputText);
        let history = JSON.stringify(this.listarr);
        //localStorage 存数组
        localStorage.setItem(`searchHistoryList`, history);
        this.$router.push({
          path: '/',
          // 可以返回到url作为参考
          query: {
            search: this.inputText
          }
        });
      } else {
        this.$router.push({
          path: '/'
        });
      }
    }
  },
  created() {
    localStorage.getItem('searchHistoryList')
      ? (this.listarr = JSON.parse(localStorage.getItem('searchHistoryList')))
      : (this.listarr = []);
  },
  watch: {
    inputText: function() {
      if (this.inputText === '') {
        this.SearchText = '取消';
      } else {
        this.SearchText = '搜索';
      }
    }
  },
  directives: {
    focus: {
      inserted: el => {
        setTimeout(() => {
          el.focus();
        }, 500);
      }
    }
  }
};
</script>
