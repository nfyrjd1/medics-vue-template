<script setup lang="ts">
import useHelloWorldStore from '@/stores/helloWorld';
import { PEOPLE_SHOW_USER_CELLPHONE_RIGHT } from '@/types';
import {
  DateInput,
  LoadingButton,
  SelectDepartment,
  SelectPosition,
  SelectTag,
  SelectUser,
  SelectUserCard,
  useRightStore,
  type DepartmentStructure,
} from '@medics/medics-vue-components';
import { storeToRefs } from 'pinia';
import { ref, shallowRef } from 'vue';

const rightsStore = useRightStore();
const hasRight = rightsStore.hasComputed(PEOPLE_SHOW_USER_CELLPHONE_RIGHT);

const date = ref<string | null>(null);

const department = shallowRef<DepartmentStructure>({
  acronym: 'АСУ',
  departments: [],
  id: 100,
  idCompanyReg: 1,
  idOrig: '',
  name: 'Отдел автоматизированных систем управления',
});

const position = shallowRef(2);

const helloWorldStore = useHelloWorldStore();
const { isLoading } = storeToRefs(helloWorldStore);
const { load } = helloWorldStore;
</script>

<template>
  <div class="hello-world">
    <h1 :class="[hasRight ? 'text-success' : 'text-danger']">
      {{ PEOPLE_SHOW_USER_CELLPHONE_RIGHT.right }}: {{ hasRight }}
    </h1>

    <div class="mb-3">
      <DateInput v-model="date" />
      value: {{ date }}
    </div>

    <LoadingButton :loading="isLoading" class="mb-3" @click="load()">
      Загрузить helloWorld
    </LoadingButton>

    <SelectDepartment
      label="department:"
      :model-value="department"
      required
      show-parent
      class="mb-3"
    />

    <SelectPosition label="position:" :model-value="position" required class="mb-3" />

    <SelectTag label="tag:" required class="mb-3" />

    <SelectUser label="user:" multiple required class="mb-3" />

    <SelectUserCard label="user card" required class="mb-3" />
  </div>
</template>

<style>
.hello-world {
  max-width: 40rem;
  align-self: center;
}
</style>
