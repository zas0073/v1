<template>
  <div class="pa-2 search-bar mb-3">
    <v-container fluid>
      <v-form>
        <v-row>
          <v-col
            v-for="(field, index) in fields"
            :key="index"
            :cols="field.cols || 12"
            :sm="field.sm || 6"
            :md="field.md || 3"
          >
            <template v-if="field.type === 'checkbox-group'">
              <div class="checkbox-group">
                <label>{{ field.label }}</label>
                <v-checkbox
                  v-for="(option, idx) in field.props.items"
                  :key="idx"
                  v-model="searchQueries[field.name]"
                  :label="option.label"
                  :value="option.value"
                  multiple
                  class="checkbox-item"
                ></v-checkbox>
              </div>
            </template>
            <template v-else-if="field.type === 'date'">
              <v-date-input
                color="primary-2"
                :label="field.label"
                v-model="searchQueries[field.name]"
                locale="ko"
                placeholder="YYYY-MM-DD"
                prepend-icon=""
                append-inner-icon="mdi-calendar"
                hide-actions
                clearable
                v-bind="field.props"
              ></v-date-input>
            </template>
            <template v-else-if="field.type === 'date-range'">
              <v-row class="date-range-group">
                <v-col>
                  <v-date-input
                    v-model="searchQueries[field.name].startDate"
                    :label="field.label + ' 시작일'"
                    locale="ko"
                    placeholder="YYYY-MM-DD"
                    prepend-icon=""
                    append-inner-icon="mdi-calendar"
                    hide-actions
                    clearable
                    v-bind="field.props"
                  ></v-date-input>
                </v-col>
                <v-col>
                  <v-date-input
                    v-model="searchQueries[field.name].endDate"
                    :label="field.label + ' 종료일'"
                    locale="ko"
                    placeholder="YYYY-MM-DD"
                    prepend-icon=""
                    append-inner-icon="mdi-calendar"
                    hide-actions
                    clearable
                    v-bind="field.props"
                  ></v-date-input>
                </v-col>
              </v-row>
            </template>
            <component
              v-else
              :is="getFieldComponent(field.type)"
              v-model="searchQueries[field.name]"
              v-bind="field.props"
              :label="field.label"
              @update:modelValue="onFieldUpdate"
              :items="field.type === 'select' ? field.props.items : undefined"
              item-title="label"
              item-value="value"
            ></component>
          </v-col>
        </v-row>
        <v-row class="justify-end">
          <v-col cols="12" class="d-flex justify-end align-center">
            <v-btn @click="resetSearchQueries" class="my-2 mr-2">
              초기화
            </v-btn>
            <v-btn
              @click="onSearch"
              color="primary"
              prepend-icon="mdi-magnify"
              class="my-2"
            >
              조회
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import { VTextField, VSelect, VCheckbox } from "vuetify/components";
import { VDateInput } from "vuetify/labs/VDateInput";
import { format } from "date-fns";

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:searchQueries"]);

const searchQueries = ref({});

const initializeSearchQueries = () => {
  props.fields.forEach((field) => {
    if (field.type === "checkbox-group") {
      searchQueries.value[field.name] = [];
    } else if (field.type === "date-range") {
      searchQueries.value[field.name] = { startDate: "", endDate: "" };
    } else {
      searchQueries.value[field.name] = "";
    }
  });
};

const getFieldComponent = (type) => {
  switch (type) {
    case "text":
      return VTextField;
    case "select":
      return VSelect;
    case "checkbox":
      return VCheckbox;
    case "date":
      return VDateInput;
    default:
      return VTextField;
  }
};

const formatDate = (date, formatStr) => {
  return format(new Date(date), formatStr);
};

const onFieldUpdate = () => {
  // 필드 업데이트 시 로직을 여기에 추가할 수 있습니다.
};

function resetSearchQueries() {
  props.fields.forEach((field) => {
    if (field.type === "checkbox-group") {
      searchQueries.value[field.name] = [];
    } else if (field.type === "date-range") {
      searchQueries.value[field.name] = { startDate: "", endDate: "" };
    } else {
      searchQueries.value[field.name] = "";
    }
  });
}

function onSearch() {
  emit("update:searchQueries", { ...searchQueries.value });
}

watch(props.fields, initializeSearchQueries, { immediate: true });

initializeSearchQueries();
</script>

<style scoped>
.search-bar {
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.checkbox-item {
  margin: 0;
}

.date-range-group {
  display: flex;
  gap: 16px;
}
</style>
