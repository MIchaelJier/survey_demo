<template>
  <van-field :name="boxValue.id">
    <template #input>
      <div class="form-item">
        <p class="form-item-title">
          {{ `${boxValue.question} （${fieldName}）` }}
          <span v-if="boxValue.isNecessity" class="form-item-title-tip">*</span>
        </p>
        <!-- 单选 -->
        <div v-if="boxValue.type === 1">
          <van-radio-group v-model="state.single" direction="horizontal">
            <div class="form-item">
              <div
                v-for="(item, index) in boxValue.content"
                :key="index"
                class="form-item-checkItem"
                :class="index === state.single ? 'check' : ''"
              >
                <van-radio :name="index">{{ item }}</van-radio>
              </div>
            </div>
          </van-radio-group>
        </div>
        <!-- 多选 -->
        <div v-if="boxValue.type === 2">
          <van-checkbox-group v-model="state.group" direction="horizontal">
            <div class="form-item">
              <div
                v-for="(item, index) in boxValue.content"
                :key="index"
                class="form-item-checkItem"
                :class="state.group.includes(index) ? 'check' : ''"
              >
                <van-checkbox :name="index">{{ item }}</van-checkbox>
              </div>
            </div>
          </van-checkbox-group>
        </div>
        <!-- 填空 -->
        <div v-if="boxValue.type === 3">
          <div class="form-item">
            <div class="form-item-checkItem">
              <van-field
                placeholder="请输入内容"
                autosize
                type="textarea"
                v-model="state.single"
              />
            </div>
          </div>
        </div>
        <!-- 打分 -->
        <div v-if="boxValue.type === 4">
          <div class="form-item">
            <div class="form-item-checkItem">
              <van-rate v-model="state.single"></van-rate>
            </div>
          </div>
        </div>
        <!-- 选择器 -->
        <div v-if="boxValue.type === 5">
          <div class="form-item">
            <div class="form-item-checkItem">
              <van-field
                readonly
                clickable
                name="datetimePicker"
                :value="state.single"
                placeholder="点击选择时间"
                @click="state.showPicker = true"
              />
              <van-popup v-model="state.showPicker" position="bottom">
                <van-datetime-picker
                  type="time"
                  @confirm="onConfirm"
                  @cancel="state.showPicker = false"
                />
              </van-popup>
            </div>
          </div>
        </div>
      </div>
    </template>
  </van-field>
</template>
<script>
import { reactive, computed, watch } from 'vue-function-api';
export default {
  props: {
    boxValue: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props, ctx) {
    const state = reactive({
      group: [],
      single: '',
      showPicker: false
    });
    const swithList = ['单选', '多选', '填空', '打分', '时间选择'];
    const fieldName = computed(() => {
      return swithList[props.boxValue.type - 1];
    });
    function onConfirm(time) {
      state.single = time;
      state.showPicker = false;
    }

    watch(
      [() => state.group, () => state.single], 
      value => {
      if (value.length !== 0) {
        ctx.emit('addMap', props.boxValue.id, {
          value: value[0].length === 0 ? value[1] : value[0],
          isNecessity: props.boxValue.isNecessity
        });
      }
    });
    return {
      state,
      fieldName,
      onConfirm
    };
  }
};
</script>

<style scoped lang="sass">
@import './index.scss'
</style>
