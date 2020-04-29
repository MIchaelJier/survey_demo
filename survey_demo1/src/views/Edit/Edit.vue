<template>
  <div>
    <van-nav-bar
      title="新建问卷"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div>
      <van-field name="uploader" label="封面">
        <template #input>
          <van-uploader v-model="uploader" multiple :max-count="1" />
        </template>
      </van-field>
      <van-field
        v-model="name"
        name="name"
        label="问卷名"
        placeholder="问卷名"
      />
      <van-field
        v-model="description"
        name="description"
        label="问卷描述"
        placeholder="问卷描述"
        rows="1"
        autosize
        type="textarea"
      />
      <div v-for="(item, index) in questionList" :key="index">
        <van-field
          :label="'问题' + (index + 1)"
          :placeholder="item.question === '' ? '点击编辑问题' : item.question"
          @click="editQuestion(index)"
        />
      </div>
      <div class="add_button">
        <van-button
          round
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="addQuestion"
        >
          新增问题
        </van-button>
      </div>
    </div>
    <!-- 编辑问题 -->
    <van-popup
      v-model="popupShow"
      closeable
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-field
        label="问题"
        placeholder="为什么..."
        :value="
          questionList[nowQuestion] ? questionList[nowQuestion].question : ''
        "
        @input="changeQuestion($event, 'question')"
      />
      <van-field label="问题类型">
        <template #input>
            <van-radio-group 
                :value="questionList[nowQuestion] ? questionList[nowQuestion].type : ''"
            >
                <div v-for="(item, index) in questionType" :key="index">
                    <van-radio :name="index + 1" @click="changeType(index)">{{ item.name }}</van-radio>
                </div>
            </van-radio-group>
        </template>
      </van-field>
      <van-field label="是否必填">
        <template #input>
          <van-switch
            size="20"
            :value="
              questionList[nowQuestion]
                ? questionList[nowQuestion].isNecessity
                : ''
            "
            @change="changeQuestion($event, 'isNecessity')"
          />
        </template>
      </van-field>
      <div v-if="nowQuestion >= 0">
         <div v-for="(item, index) in questionList[nowQuestion].content" :key="index">
            <van-field
                :label="'选项' + (index + 1)" 
                placeholder="选项内容" 
                :value="item" 
                @input="changeQuestionContent($event, index)"
            />
      </div>
      </div>
      <div class="add_button">
        <van-button 
            round 
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            @click="addChoose"
            v-if="questionList[nowQuestion] ? parseInt(questionList[nowQuestion].type) <= 2 : ''"
         >
          新增选项
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ref } from 'vue-function-api';
export default {
  setup(props, ctx) {
    const uploader = ref([]);
    const name = ref('');
    const description = ref('');
    const questionList = ref([]);
    const popupShow = ref(false);
    const nowQuestion = ref(-1);
    const questionType = ref([
        {type: 1, name: '单选题'},
        {type: 2, name: '多选题'},
        {type: 3, name: '填空题'},
        {type: 4, name: '打分题'},
        {type: 5, name: '时间选择题'},
    ])

    function onClickLeft() {
      ctx.router.push('/');
    }
    // 点击编辑 问题
    function editQuestion(index) {
      popupShow.value = true;
      nowQuestion.value = index;
    }
    // 新增问题
    function addQuestion() {
      popupShow.value = true;
      questionList.value.push({
        type: '',
        question: '',
        isNecessity: true,
        content: []
      });
      nowQuestion.value++;
    }
    // 新增问题选项
    function addChoose(){
        let content = questionList.value[nowQuestion.value].content;
        content.push('')
    }
    // 改变问题类型
    function changeType(index) {
        questionList.value[nowQuestion.value].type = index + 1;
        if(index > 1){
            questionList.value[nowQuestion.value].content.length = 0
        }
    }
    // 修改问题的某一个属性
    function changeQuestion(value, name) {
      questionList.value[nowQuestion.value][name] = value;
    }
    function changeQuestionContent(value, index) {
      questionList.value[nowQuestion.value].content[index] = value;
    }
    return {
      uploader,
      name,
      description,
      popupShow,
      questionList,
      nowQuestion,
      questionType,

      onClickLeft,
      addQuestion,
      addChoose,
      editQuestion,
      changeType,
      changeQuestion,
      changeQuestionContent
    };
  }
};
</script>

<style lang="scss" scoped>
@import './Edit.scss';
</style>
