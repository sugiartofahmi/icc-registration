<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

import Navbar from "../../components/Navbar/index.vue";
import { supabase } from "../../supabase";

const studentData: any = ref([]);
const filtered: any = ref([]);
const filter: any = ref(100);

const filterBy = async () => {
  const res = await supabase.from("pendaftar").select();
  filtered.value = res.body;
  if (filter.value == 1) {
    studentData.value = filtered.value.filter(
      (x: any) => x.classYear === "2020"
    );
  } else if (filter.value == 2) {
    studentData.value = filtered.value.filter(
      (x: any) => x.classYear === "2021"
    );
  } else if (filter.value == 3) {
    studentData.value = filtered.value.filter(
      (x: any) => x.gradeNumber === "A1"
    );
  } else if (filter.value == 4) {
    studentData.value = filtered.value.filter(
      (x: any) => x.gradeNumber === "A2"
    );
  } else if (filter.value == 5) {
    studentData.value = filtered.value.filter(
      (x: any) => x.gradeNumber === "A3"
    );
  } else if (filter.value == 6) {
    studentData.value = filtered.value.filter(
      (x: any) => x.gradeNumber === "A4"
    );
  } else if (filter.value == 7) {
    studentData.value = filtered.value.filter(
      (x: any) => x.gradeNumber === "A5"
    );
  } else {
    studentData.value = filtered.value;
  }
};

const searchStudents = ref("");

const findStudents = async () => {
  const res = await supabase.from("pendaftar").select();
  filtered.value = res.body;
  studentData.value = filtered.value.filter(
    (x: any) =>
      x.fullName.toLowerCase().includes(searchStudents.value.toLowerCase()) ||
      x.studentId.includes(searchStudents.value)
  );
};

watch(searchStudents, (val) => {
  findStudents();
});

watch(filter, (val) => {
  filterBy();
  searchStudents.value = "";
});

onMounted(async () => {
  const res = await supabase.from("pendaftar").select();
  studentData.value = res.body;
});
</script>
<template>
  <Navbar />
  <div class="flex h-full bg-[#e5e5e5] items-start justify-center w-full">
    <div class="p-4 w-full">
      <div class="bg-white p-8 rounded-md w-full">
        <div class="flex items-center justify-between pb-6">
          <div
            class="flex flex-col space-y-6 md:flex-row w-full justify-between px-4"
          >
            <div class="flex flex-col">
              <h2 class="mb-5 text-black font-semibold">Data Pendaftar</h2>
              <div class="flex">
                <div class="flex flex-col gap-2">
                  <input
                    class="w-auto space-y-1 h-auto p-2 bg-transparent border-2 border-[#e5e5e5] rounded-lg"
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Cari Berdasarkan Nama"
                    v-model="searchStudents"
                  />
                  <select
                    v-model="filter"
                    class="w-auto space-y-1 h-auto p-2 bg-[#e5e5e5] rounded-lg"
                    name="filter"
                    id="filter"
                  >
                    <option disabled selected>Silahkan Pilih</option>
                    <option value="100">Tampilkan Semua</option>
                    <option value="1">Angkatan 2020</option>
                    <option value="2">Angkatan 2021</option>
                    <option value="3">Kelas A1</option>
                    <option value="4">Kelas A2</option>
                    <option value="5">Kelas A3</option>
                    <option value="6">Kelas A4</option>
                    <option value="7">Kelas A5</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              class="inline-block min-w-full shadow rounded-lg overflow-hidden"
            >
              <table class="min-w-full bg-[#e5e5e5] leading-normal">
                <thead class="bg-[#e5e5e5]">
                  <tr>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-black uppercase tracking-wider"
                    >
                      No
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-black uppercase tracking-wider"
                    >
                      Nama Lengkap
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-black uppercase tracking-wider"
                    >
                      NIM
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-black uppercase tracking-wider"
                    >
                      Angkatan
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-black uppercase tracking-wider"
                    >
                      Kelas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(n, i) in studentData" :key="i">
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      {{ i + 1 }}
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <div class="flex items-center">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {{ n.fullName }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ n.studentId }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ n.classYear }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ n.gradeNumber }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="flex p-4 w-full justify-center">
                <h1
                  v-if="studentData.length == 0"
                  class="text-md font-bold text-black"
                >
                  Data Tidak Tersedia
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
