<template>
  <div>
    <van-nav-bar
      title="新建问卷"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      placeholder
      fixed
    />
    <div>
      <!-- <van-form @submit="onSubmit">   -->
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
        :required="false"
      />
      <van-field
        v-model="description"
        name="description"
        label="问卷描述"
        placeholder="问卷描述"
        rows="1"
        autosize
        type="textarea"
        :required="false"
      />
      <div v-for="(item, index) in questionList" :key="index">
        <van-field
          :label="'问题' + (index + 1)"
          :placeholder="item.question === '' ? '点击编辑问题' : item.question"
          @click="editQuestion(index)"
          :required="false"
          readonly
        >
          <template #button>
            <van-icon
              name="clear"
              color="#dd524d"
              size="20px"
              @click="delQuestion(index)"
            ></van-icon>
          </template>
        </van-field>
      </div>
      <div class="add_button">
        <van-button
          round
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="addQuestion"
          native-type="button"
        >
          新增问题
        </van-button>
      </div>
      <div class="submit_button xBottom">
        <van-button
          block
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="onSubmit"
        >
          提交
        </van-button>
      </div>
    </div>
    <!-- 编辑问题 -->
    <van-popup
      v-model="popupShow"
      closeable
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-field
        label="问题"
        placeholder="为什么..."
        :value="nowProperty('question')"
        @input="changeQuestion($event, 'question')"
      />
      <van-field label="问题类型">
        <template #input>
          <van-radio-group :value="nowProperty('type')">
            <div v-for="(item, index) in questionType" :key="index">
              <van-radio :name="index + 1" @click="changeType(index)">{{
                item.name
              }}</van-radio>
            </div>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="是否必填">
        <template #input>
          <van-switch
            size="20"
            :value="nowProperty('isNecessity')"
            @change="changeQuestion($event, 'isNecessity')"
          />
        </template>
      </van-field>
      <div v-if="nowQuestion >= 0">
        <div v-for="(item, index) in nowProperty('content')" :key="index">
          <van-field
            :label="'选项' + (index + 1)"
            placeholder="选项内容"
            :value="item"
            @input="changeQuestionContent($event, index)"
          >
            <template #button>
              <van-icon
                name="clear"
                color="#dd524d"
                size="20px"
                @click="delChoose(index)"
              ></van-icon> </template
            >n
          </van-field>
        </div>
      </div>
      <div class="add_button">
        <van-button
          round
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="addChoose"
          v-show="
            questionList[nowQuestion]
              ? parseInt(questionList[nowQuestion].type) <= 2
              : ''
          "
        >
          新增选项
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ref, computed } from 'vue-function-api';
import { Notify } from 'vant';
import { isHavaEmpty } from '@/common/comFunc.js';
export default {
  setup(props, ctx) {
    const uploader = ref([]);
    const name = ref('');
    const description = ref('');
    const questionList = ref([]);
    const popupShow = ref(false);
    const nowQuestion = ref(-1);
    const nowProperty = computed(() => property =>
      questionList.value[nowQuestion.value]
        ? questionList.value[nowQuestion.value][property]
        : ''
    );
    const questionType = ref([
      { type: 1, name: '单选题' },
      { type: 2, name: '多选题' },
      { type: 3, name: '填空题' },
      { type: 4, name: '打分题' },
      { type: 5, name: '时间选择题' }
    ]);

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
    // 现在选择的问题
    // const nowQuestionVaule = questionList.value[nowQuestion.value]

    // 新增问题选项
    function addChoose() {
      const content = questionList.value[nowQuestion.value].content;
      content.push('');
    }
    // 改变问题类型
    function changeType(index) {
      questionList.value[nowQuestion.value].type = index + 1;
      if (index > 1) {
        questionList.value[nowQuestion.value].content.length = 0;
      }
    }
    // 修改问题的某一个属性
    function changeQuestion(value, nowName) {
      questionList.value[nowQuestion.value][nowName] = value;
    }
    function changeQuestionContent(value, index) {
      questionList.value[nowQuestion.value].content[index] = value;
    }
    // 删除某一个问题
    function delQuestion(index) {
      questionList.value.splice(index, 1);
      nowQuestion.value = -1;
    }
    // 删除某一个选项
    function delChoose(index) {
      questionList.value[nowQuestion.value].content.splice(index, 1);
    }
    // 提交

    function onSubmit() {
      const other = {
        createId: ctx.store.getters.allInfo._id,
        questionSum: questionList.value.length,
        quoteSum: 0,
        questions: {
          title: name.value,
          description: description.value,
          list: questionList.value
        }
      };

      isHavaEmpty(other.questions);
      if (isHavaEmpty(other) > 0) {
        Notify('有空的输入框');
      } else if (uploader.value.length === 0) {
        Notify('没有封面');
      } else if (
        other.questions.list.every(
          item => item.type < 3 && item.content.length < 2
        )
      ) {
        Notify('选择题请设置2个以上选项');
      } else {
        const file = uploader.value[0].file;
        const param = new FormData();
        param.append('upload', file, file.name);
        param.append('other', JSON.stringify(other));
        ctx.api
          .submit_survey(param, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then(res => {
            Notify({ type: 'success', message: '创建成功' });
            ctx.router.push('/');
          })
          .catch(err => {
            Notify(err);
          });
      }
    }
    return {
      uploader,
      name,
      description,
      popupShow,
      questionList,
      nowQuestion,
      questionType,

      nowProperty,

      onClickLeft,
      addQuestion,
      addChoose,
      editQuestion,
      changeType,
      changeQuestion,
      changeQuestionContent,
      delQuestion,
      delChoose,
      onSubmit
    };
  }
};
</script>

<style lang="scss" scoped>
@import './Edit.scss';
</style>
